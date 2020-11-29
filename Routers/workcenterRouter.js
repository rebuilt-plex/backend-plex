const express = require('express');
const { workcenter, employee, department, title, plant } = require('./ClassModel');
const verify_employee = require('../utils/verify_employee');


const router = express.Router();
// simple get_all route to return all workcenters
router.get('/all_workcenters', async (req, res, next) => {
    try {
        let all_wcs = await workcenter.get_all();
        res.status(200).json(all_wcs);
    } catch (e) {
        console.log(e)
        return e
    }
});
// route for employee to login to workcenter
router.post('/login', async (req, res, next) => {
   try {
       // grabbing wc_id and employee_num from body
       let { workcenter_id, employee_num, employee_id } = req.body;
       // async function to help with array method
        async function login_employee(emp) {
            try {
                // looking up the employee by id
                let my_employee = await employee.find_by({id: emp});
                // updating the employee record to log into workcenter
                let updated_employee = await employee.update(my_employee.id, {workcenter_id})
                // check to make sure employee is clocked in
                // if not we clock the employee in
                if (updated_employee.clocked_in === 0) {
                    updated_employee.clocked_in = 1
                }
                // lines 38-41 are replacing id's with values from db
                let department_id = await department.find_by({id: updated_employee.department_id});
                let title_id = await title.find_by({id: updated_employee.title_id});
                let workcenter_name = await workcenter.find_by({id: workcenter_id});
                let plant_id = await plant.find_by({id: updated_employee.plant_id});
                // adding the values from lines 38-41 to return data structure
                updated_employee = {
                    ...updated_employee,
                    department: department_id.name,
                    title: title_id.name,
                    workcenter: workcenter_name.name,
                    plant: plant_id.name
                }
                // lines 51-55 are deleting id's used above and user password for security
                delete updated_employee.department_id
                delete updated_employee.title_id
                delete updated_employee.plant_id
                delete updated_employee.workcenter_id
                delete updated_employee.password
                // returning the updated employee
                return updated_employee
            } catch (e) {
                console.log(e)
                return e
            }
        }

        const set_employee_login = async () => {
            return await Promise.all(employee_id.map((arr) => login_employee(arr)))
        }

        set_employee_login().then((data) => {
            res.status(200).json(data)
        })

   } catch (e) {
       console.log(e)
       return e
   }
});
// route to return an array of employees by workcenter
router.get('/:id/employees', async (req, res, next) => {
    try {
        // pulling the workcenter id from url
        let workcenter_id = req.params.id;
        // using workcenter_id to find all currently logged in employees for WC
        let wc_employees = await employee.employee_workcenter(workcenter_id);
        // async function to help with our array method
        async function employee_structure(emp) {
            try {
                // using department and title id's to find useful values (ie: name)
                let department_id = await department.find_by({id: emp.department_id});
                let title_id = await title.find_by({id: emp.title_id});
                // updated employee with values from id's
                emp.department_name = department_id.name
                emp.title_name = title_id.name
                // cleaning up employee obj to return
                delete emp.workcenter_id
                delete emp.password
                delete emp.department_id
                delete emp.title_id
                delete emp.plant_id
            } catch (e) {
                console.log(e)
                return e
            }
        }
        // async function to await all promises returned from our array method
        const set_employees = async () => {
            return await Promise.all(wc_employees.map((arr) => employee_structure(arr)))
        }
        // all our async function and return our updated employees
        // currently logged into selected workcenter
        set_employees().then(() => {
            res.status(200).json(wc_employees)
        })
    } catch (e) {
        console.log(e)
        return e
    }
});

router.post('/logout', async (req, res, next) => {
   let employees = req.body.employees;
   // creating a container to hold return employee record
   let logged_out = []
   // async function to help with our array method
   async function logout_employees(emp) {
       try {
           // using the employee id we retrieve the employees first and last name
           let my_employee = await employee.employee_logout(emp)
           // we concatenate the names to push into our return container
           let employee_name = my_employee.last_name + "," +my_employee.first_name
           // updating employee record, logged out of current workcenter and put into general labor
           await employee.update(emp, {workcenter_id: 25})
           // updating our return container
           logged_out.push(employee_name)
       } catch (e) {
           console.log(e)
           return e
       }
   }
   // async function to await all promises from our db through our array method
   const set_logout = async () => {
       return await Promise.all(employees.map((arr) => logout_employees(arr)))
   }
   // calling then return our data, along with a message that everything was successful
   set_logout().then(() => {
       res.status(200).json({
           message: 'All employees logged out',
           logged_out_employees: logged_out
       })
   })
});

module.exports = router;