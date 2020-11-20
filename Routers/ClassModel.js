const db = require('../Database/config');
const bcrypt = require('bcrypt');

class base_model {
    constructor(table) {
        this.table =table;
    };

    get_all() {
        return db(this.table);
    };

    async find_by(filter) {
        try {
            return await db(this.table).select('*').where(filter).first()
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
}

const employee = new employee_model('employee')

module.exports = {
    employee
}