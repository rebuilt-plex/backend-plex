const express = require('express');
const { employee } = require('./ClassModel');


let router = express.Router();

router.get('/clocked_in', async (req, res, next) => {
    try {
        let all_employees = await employee.clocked_in()
        res.status(200).json(all_employees)
    } catch (e) {
        console.log(e)
        return e
    }
});

module.exports = router