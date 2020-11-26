const { employee } = require('../Routers/ClassModel');

function hr_admin(hr_id) {
    return async (req, res, next) => {
        try {
            // pulling employee id from body
            let { id } = req.body || hr_id;
            // finding employee record
            let employee_data = await employee.find_by({id});
            // catch if id is not found in DB
            if (!employee_data) {
                res.status(400).json({
                    error_message: `No employee found with ${id}`
                })
            }
            // check if employee is not part of the HR department
            if (employee_data.department_id !== 16) {
                res.status(401).json({
                    error_message: `${employee_data.first_name} ${employee_data.last_name} is not allowed`
                })
              // allowing the employee to continue
            } else next()
        } catch (e) {
            console.log(e)
            return e
        }
    }
}

module.exports = hr_admin;

