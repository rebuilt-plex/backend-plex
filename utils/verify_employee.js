const { employee } = require('../Routers/ClassModel');
// middleware function to verify and return employee record
function verify_employee() {
    return async (req, res, next) => {
        try {
            // using employee_num to restive employee record
            let my_employee = await employee.find_by({employee_num: req.body.employee_num})
            // check to return 400 if no employee found
            if (!my_employee) {
                return res.status(400).json({
                    error_message: `${req.body.employee_num} does not match any employee`
                })
            }
            // attaching the employee record to the req obj
            req.my_employee = my_employee
            next()
        } catch (e) {
            console.log(e)
            return e
        }
    }
}
// TODO not currently working, would help to dry up the code if we can get this running
module.exports = verify_employee;