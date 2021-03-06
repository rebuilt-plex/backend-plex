exports.seed = async function(knex) {
    await knex('workcenter').insert([
        {id: 1, status_id: 7, plant_id: 1, name: 'Weld 279', department_id: 1},
        {id: 2, status_id: 7, plant_id: 1, name: 'Weld 275', department_id: 1},
        {id: 3, status_id: 7, plant_id: 1, name: 'Weld 331a', department_id: 1},
        {id: 4, status_id: 7, plant_id: 1, name: 'Weld 331b', department_id: 1},
        {id: 5, status_id: 7, plant_id: 1, name: 'Weld 162b', department_id: 1},
        {id: 6, status_id: 7, plant_id: 1, name: 'Weld 354a', department_id: 1},
        {id: 7, status_id: 7, plant_id: 1, name: 'Weld 354b', department_id: 1},
        {id: 8, status_id: 7, plant_id: 1, name: 'Weld 338', department_id: 1},
        {id: 9, status_id: 7, plant_id: 1, name: 'Machine 3021', department_id: 10},
        {id: 10, status_id: 7, plant_id: 1, name: 'Plasma 003', department_id: 10},
        {id: 11, status_id: 7, plant_id: 1, name: 'Spot-Welder 272', department_id: 5},
        {id: 12, status_id: 7, plant_id: 1, name: 'Weld 152', department_id: 1},
        {id: 13, status_id: 7, plant_id: 1, name: 'Roll 088', department_id: 2},
        {id: 14, status_id: 7, plant_id: 1, name: 'Roll 094', department_id: 2},
        {id: 15, status_id: 7, plant_id: 1, name: 'Roll 078', department_id: 2},
        {id: 16, status_id: 7, plant_id: 1, name: 'Roll 115', department_id: 2},
        {id: 17, status_id: 7, plant_id: 1, name: 'Roll 047', department_id: 2},
        {id: 18, status_id: 7, plant_id: 1, name: 'Roll 087', department_id: 2},
        {id: 19, status_id: 7, plant_id: 1, name: 'Roll 066', department_id: 2},
        {id: 20, status_id: 7, plant_id: 1, name: 'Machine 1088', department_id: 5},
        {id: 21, status_id: 7, plant_id: 1, name: 'Machine 1078', department_id: 5},
        {id: 22, status_id: 7, plant_id: 1, name: 'Machine 324', department_id: 5},
        {id: 23, status_id: 7, plant_id: 1, name: 'Debur 031', department_id: 20},
        {id: 24, status_id: 7, plant_id: 1, name: 'Weld 294', department_id: 1},
        {id: 25, status_id: 7, plant_id: 1, name: 'General Labor', department_id: 1}
    ])
};
