const db = require('../Database/config');
const bcrypt = require('bcrypt');

// base model to define other class by, basic SQL commands
class base_model {
    constructor(table) {
        this.table = table;
    };

    get_all() {
        return db(this.table);
    };

    async insert(data) {
        try {
            let [id] = await db(this.table).insert(data);
            return await this.find_by({id})
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async find_by(data) {
        try {
            return await db(this.table).select('*').where(data).first()
        } catch (e) {
            console.log(e);
            return e
        }
    };

    async update(id, data) {
        try {
            await db(this.table).update(data).where({id: id})
            return this.find_by({id})
        } catch (e) {
            console.log(e.message)
            return e
        }
    };
}

class employee_model extends base_model {
    constructor(table) {
        super(table);
    }

    clocked_in(id) {
        try {
            return db(this.table).where({clocked_in: 1}).where({plant_id: id});
        } catch (e) {
            console.log(e)
            return e
        }
    }

    employee_name(id) {
        try {
            return db(this.table).where({id}).select('first_name', 'last_name').first();
        } catch (e) {
            console.log(e)
            return e
        }
    }
    async remove(id) {
        try {
            return await db(this.table).where({id}).delete();
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async employee_plant(id) {
        try {
            return await db(this.table).where({plant_id: id});
        } catch (e) {
            console.log(e)
            return e
        }
    }
}

class department_model extends base_model {
    constructor(table) {
        super(table);
    }
}

class title_model extends base_model {
    constructor(table) {
        super(table);
    }
}

class plant_model extends base_model {
    constructor(table) {
        super(table);
    }

    plant_department(id) {
        return db("plant_department as pd")
            .join("plant as p", "p.id", "=", "pd.plant_id")
            .join("department as d", "d.id", "=", "pd.department_id")
            .where("p.id", id)
            .select("d.name", "d.id");
    }
}

const employee = new employee_model('employees');
const department = new department_model('department');
const title = new title_model('title');
const plant = new plant_model('plant');

module.exports = {
    employee,
    department,
    title,
    plant
}