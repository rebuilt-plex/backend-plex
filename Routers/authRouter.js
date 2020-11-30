const express = require('express');
const { employee, department, title } = require('./ClassModel');
const employee_check = require('../utils/verify_employee');

const router = express.Router();

// route for employees to login
// using employee_check middleware to verify and return employee record
router.post('/login', employee_check(), async (req, res, next) => {
    try {
        // updating employee DB record to be clocked in
        await employee.update(req.my_employee.id, {clocked_in: 1})
        // use department and title models to add fields for id's
        let department_id = await department.find_by({id: req.my_employee.department_id});
        let title_id = await title.find_by({id: req.my_employee.title_id});
        // constructing return data type
        req.my_employee = {
            ...req.my_employee,
            department: department_id.name,
            title: title_id.name
        }
        // deleting the user password from return obj for security reasons
        delete req.my_employee.password
        delete req.my_employee.clocked_in
        res.status(200).json(req.my_employee)
    } catch (e) {
        console.log(e)
        return e
    }
})
// route to log employee out
// using middleware to verify employee
router.post('/logout', employee_check(), async (req, res, next) => {
    try {
        // updating employee record to clock out employee
        await employee.update(req.my_employee.id, {clocked_in: 0})
        res.status(200).json({
            message: `${req.my_employee.first_name} ${req.my_employee.last_name} has been logged out`
        })
    } catch (e) {
        console.log(e)
        return e
    }
});

module.exports = router;