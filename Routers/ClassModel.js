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

    async employee_workcenter(id) {
        try {
            return await db(this.table).where({workcenter_id: id})
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async employee_logout(id) {
        try {
            return await db(this.table)
                .where({id:id})
                .select('first_name', 'last_name')
                .first();
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

    async return_department(id) {
        try {
            return await db(this.table).where({id:id}).select('id','name').first();
        } catch (e) {
            console.log(e)
            return e
        }
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

class workcenter_model extends base_model {
    constructor(table) {
        super(table);
    }
}

class status_model extends base_model {
    constructor(table) {
        super(table);
    }

    async status_department() {
        try {
            return await db(this.table)
                .select('department_id')
                .distinct();
        } catch (e) {
            console.log(e)
            return e
        }
    }

    async status_department_id(id) {
        try {
            return await db(this.table)
                .where(id)
                .select('*');
        } catch (e) {
            console.log(e)
            return e
        }
    }
}

const employee = new employee_model('employees');
const department = new department_model('department');
const title = new title_model('title');
const plant = new plant_model('plant');
const workcenter = new workcenter_model('workcenter');
const status = new status_model('status')

module.exports = {
    employee,
    department,
    title,
    plant,
    workcenter,
    status
}