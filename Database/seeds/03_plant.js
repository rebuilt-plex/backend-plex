exports.seed = async function(knex) {
    await knex('plant').insert([
        {id: 1, location: 'Grand Haven, MI', name: '172nd'},
        {id: 2, location: 'Grand Haven, MI', name: '1835'},
        {id: 3, location: 'Grand Haven, MI', name: '1835i'},
        {id: 4, location: 'Grand Haven, MI', name: '1825'},
        {id: 5, location: 'Grand Haven, MI', name: '1825i'},
        {id: 6, location: 'Grand Haven, MI', name: 'Tech Center'},
        {id: 7, location: 'Grand Haven, MI', name: '1900'},
        {id: 8, location: 'Spring Lake, MI', name: 'Stampings'},
        {id: 9, location: 'Grand Haven, MI', name: 'Coatings'},
        {id: 10, location: 'Grand Haven, MI', name: 'Comstock'},
        {id: 11, location: 'Spring Lake, MI', name: 'VanWagnor'},
        {id: 12, location: 'Norton Shores, MI', name: 'Ponaluna'},
    ])
};
