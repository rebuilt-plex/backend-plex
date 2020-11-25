const db = require('../Database/config');
const bcrypt = require('bcrypt');

class base_model {
    constructor(table) {
        this.table =table;
    };

    get_all() {
        return db(this.table);
    };

    async find_by(data) {
        console.log(data)
        try {
            return await db(this.table).select('*').where(data).first()
        } catch (e) {
            console.log(e);
            return e
        }
    };

    update(id, data) {
        try {
            return db(this.table).update(data).where({id: id})
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

    clocked_in() {
        try {
            return db(this.table).where({clocked_in: 1})
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

const employee = new employee_model('employees');
const department = new department_model('department');
const title = new title_model('title')

module.exports = {
    employee,
    department,
    title
}