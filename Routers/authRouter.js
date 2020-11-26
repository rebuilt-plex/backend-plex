const express = require('express');
const { employee, department, title } = require('./ClassModel');

const router = express.Router();

// route for employees to login
router.post('/login', async (req, res, next) => {
    try {
        // grabbing the employee_num from the body
        let { employee_num } = req.body;
        // using employee class model to use employee_num to retrieve employee data
        let employee_data = await employee.find_by({employee_num});
        // if no employee with provided employee_num: return error message
        if (!employee_data) {
            res.status(400).json({
                error_message: `No employee with ${employee_num} found`
            });
        }
        // updating employee DB record to be clocked in
        await employee.update(employee_data.id, {clocked_in: 1})
        // use department and title models to add fields for id's
        let department_id = await department.find_by({id: employee_data.department_id});
        let title_id = await title.find_by({id: employee_data.title_id});
        // constructing return data type
        employee_data = {
            ...employee_data,
            department: department_id.name,
            title: title_id.name
        }
        // deleting the user password from return obj for security reasons
        delete employee_data.password
        delete employee_data.clocked_in
        res.status(200).json(employee_data)
    } catch (e) {
        console.log(e)
        return e
    }
})

router.post('/logout', async (req, res, next) => {
    try {
        // grabbing the employee_num from the body
        let {employee_num} = req.body;
        // using employee class model to use employee_num to retrieve employee data
        let employee_data = await employee.find_by({employee_num});
        // if no employee with provided employee_num: return error message
        if (!employee_data) {
            res.status(400).json({
                error_message: `No employee with ${employee_num} found`
            });
        }
        // updating employee record to clock out employee
        await employee.update(employee_data.id, {clocked_in: 0})
        res.status(200).json({
            message: `${employee_data.first_name} ${employee_data.last_name} has been logged out`
        })
    } catch (e) {
        console.log(e)
        return e
    }
});

module.exports = router;