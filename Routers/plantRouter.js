const express = require('express');
const { plant, employee } = require('./ClassModel');

const router = express.Router();
// route to return an array of all plants
router.get('/', async (req, res, next) => {
   try {
       let all_plants = await plant.get_all();
       res.status(200).json(all_plants);
   } catch (e) {
       console.log(e)
       return e
   }
});
// route to return what departments are in which plants
router.get('/plant_departments', async (req, res, next) => {
   try {
       let all_plants = await plant.get_all();
       // helper function to run database query
       async function setDepartments(arr) {
           arr.deparments = await plant.plant_department(arr.id)
       }
       // iterating through our plants and waiting for promise to return
       const getDepartments = async () => {
           return await Promise.all(all_plants.map((arr) => setDepartments(arr)))
       }
       // helper function to run an array method async with our database
       getDepartments().then(() => {
        res.status(200).json(all_plants)
       })
   } catch (e) {
       console.log(e)
       return e
   }
});

router.get('/plant_employees', async (req, res, next) => {
    let all_plants = await plant.get_all();
    // helper function to run database query
    async function setEmployees(arr) {
        arr.employees = await employee.employee_plant(arr.id)
    }
    // iterating through our plants and waiting for promise to return
    const getEmployees = async () => {
        return await Promise.all(all_plants.map((arr) => setEmployees(arr)))
    }
    // helper function to run an array method async with our database
    getEmployees().then(() => {
        res.status(200).json(all_plants)
    })
});

module.exports = router;