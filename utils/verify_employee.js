const { employee } = require('../Routers/ClassModel');

function verify_employee(employee_num) {
    return async (req, res, next) => {
        try {
            let my_employee = await employee.find_by({ employee_num })
            if (!my_employee) {
                return res.status(400).json({
                    error_message: `${employee_num} does not match any employee`
                })
            } else {
                return my_employee
            }
        } catch (e) {
            console.log(e)
            return e
        }
    }
}
// TODO not currently working, would help to dry up the code if we can get this running
module.exports = verify_employee;