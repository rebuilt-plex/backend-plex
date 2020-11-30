const express = require('express');
const { status, department } = require('./ClassModel');

const router = express.Router()

// base route to return all departments with a status code
router.get('/', async (req, res, next) => {
   try {
       // returning all unique status based on department
       // no duplicate department id's
        let all_status = await status.status_department();
        // async function to help handle array method
        async function get_department(arr) {
            try {
                // turning the id's from line 11 to values with name
                return await department.return_department(arr.department_id)
            } catch (e) {
                console.log(e)
                return e
            }
        }
        // async Promise.all to handle return from array method
        const set_departments = async () => {
            return await Promise.all(all_status.map((arr) => get_department(arr)))
        }
        // call our async function to map through our array and make calls to the DB
        set_departments().then((data) => {
            res.status(200).json(data)
        })

   } catch (e) {
       console.log(e)
       return e
   }
});
// returns an array of status code options for selected department
// TODO look into creating route to handle one click "down waiting for"
// create different id for "down waiting for" or SQL to select only those???
router.get('/:id', async (req, res, next) => {
    try {
        // pulling department id out of our url
        let department_id = req.params.id
        // using ID to return a list of all status codes with ID
        let all_status = await status.status_department_id({department_id:department_id})
        // check to make sure we don't send back an empty array
        if (all_status.length < 1) {
            res.status(500).json({
                error_message: `${department_id} not found`
            })
        }
        // returning our data
        res.status(200).json(all_status)
    } catch (e) {
        console.log(e)
        return e
    }
})


module.exports = router;