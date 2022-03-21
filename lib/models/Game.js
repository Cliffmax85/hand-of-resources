const pool = require('../utils/pool');

module.exports = class Game {
    id;
    name;
    system;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.system = row.system;
    }

    static async insert({ name, system }) {
        const { rows } = await pool.query(
            `
            INSERT INTO
              games (name, system)
            VALUES
              ($1, $2)
            RETURNING
              *
            `,
            [name, system]
        );

        return new Game(rows[0]);
    }

    static async findAll() {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM 
              games
            `,
        );

        return rows.map((row) => new Game(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM
              games
            WHERE
              id=$1
              `,
              [id]
        );

        return new Game(rows[0]);
    }
}
