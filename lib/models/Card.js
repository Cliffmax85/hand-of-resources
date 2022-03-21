const pool = require('../utils/pool');

module.exports = class Card {
    id;
    value;
    color;

    constructor(row) {
        this.id = row.id;
        this.value = row.value;
        this.color = row.color;
    }

    static async insert({ value, color }) {
        const { rows } = await pool.query(
            `
            INSERT INTO
              cards (value, color)
            VALUES
              ($1, $2)
            RETURNING
              *
            `,
            [value, color]
        );
        return new Card(rows[0]);
    }

    static async findAll() {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM 
              cards
            `,
        );
        return rows.map((row) => new Card(row));
    }
}