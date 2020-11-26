const express = require('express');
const { employee } = require('./ClassModel');
const hr_admin = require('../utils/hr_admin');


let router = express.Router();

// route to return all employees currently clocked in
//TODO add building location to employee / new table
router.get('/clocked_in', async (req, res, next) => {
    try {
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

module.exports = router