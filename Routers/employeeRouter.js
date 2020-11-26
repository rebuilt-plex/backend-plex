const express = require('express');
const { employee } = require('./ClassModel');
const hr_admin = require('../utils/hr_admin');


let router = express.Router();

// route to return all employees currently clocked in
router.get('/clocked_in', async (req, res, next) => {
    try {
        // TODO create migration to add plants (buildings)
        // create new table for plants
        let all_employees = await employee.clocked_in()
        res.status(200).json(all_employees)
    } catch (e) {
        console.log(e)
        return e
    }
});
// protected route for hr use only
// route used to register a new employee
router.post('/new_employee', hr_admin(), async (req, res, next) => {
   try {
       // pulling all data need for a new employee from body
        let {
            first_name,
            last_name,
            department_id,
            title_id,
            employee_num,
            password,
        } = req.body
       // check to make sure the employee_num is not already in DB
       let verify_employee_num = await employee.find_by({employee_num})
       if (verify_employee_num) {
           res.status(401).json({
               error_message: `${employee_num} already exists`
           })
       }
       // inserting new employee data with default values for some keys
       let new_employee = await employee.insert({
           first_name,
           last_name,
           department_id: department_id || 1,
           title_id: title_id || 1,
           password: password || "123",
           employee_num
       })
       // return type: new employee id and employee_num
       // message to confirm employee has been registered
       res.status(201).json({
           id: new_employee.id,
           employee_num,
           message: `${new_employee.last_name}, ${new_employee.first_name} has been added`
       })
   } catch (e) {
       console.log(e)
       return e
   }
});
// PUT route for HR to update employee records
router.put('/update_employee', hr_admin(), async (req, res, next) => {
   try {
       // pulling out all possible updatable DB fields
       let { employee_num,
             first_name,
             last_name,
             department_id,
             title_id,
             password
       } = req.body;
       // using employee_num to verify employee is real
       let verify_employee = await employee.find_by({employee_num});
       // check and return message if employee is not found
       if (!verify_employee) {
           res.status(400).json({
               error_message: `${employee_num} does not exist in our database`
           })
       }
       // object of updatable fields we'll pass to our DB models
       let new_employee_data = {
           first_name,
           last_name,
           department_id,
           title_id,
           password,
       }
       // updating employee based of our DB id
       let updated_employee = await employee.update(verify_employee.id, new_employee_data);
       // returning updated employee record
       res.status(200).json(updated_employee)
   } catch (e) {
       console.log(e)
       return e
   }
});
// post route to handle removing an employee for the database
router.post('/remove_employee', hr_admin(), async (req, res, next) => {
    try {
       let { employee_num } = req.body
        // using employee_num to verify employee is real
        let verify_employee = await employee.find_by({employee_num});
        // check and return message if employee is not found
        if (!verify_employee) {
            res.status(400).json({
                error_message: `${employee_num} does not exist in our database`
            })
        }
        // retrieving employee name to return
        let employee_name = await employee.employee_name(verify_employee.id);
        // updating database to remove selected employee
        let removed_employee = await employee.remove(verify_employee.id)
        // check to make sure the employee was removed successfully
        if (removed_employee) {
            res.status(200).json({
                message: `${employee_name.last_name}, ${employee_name.first_name} has been removed`
            })
        } else {
            // general error if employee was NOT removed from database
            res.status(500).json({
                error_message: 'Server error please contact IT'
            })
        }
   } catch (e) {
       console.log(e)
       return e
   }
});

module.exports = router