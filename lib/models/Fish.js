const pool = require('../utils/pool');

module.exports = class Fish {
    id;
    name;
    type;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.type = row.type;
    }

    static async findAll() {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM
              fish
            `,
        );
        return rows.map((row) => new Fish(row));
    }
}