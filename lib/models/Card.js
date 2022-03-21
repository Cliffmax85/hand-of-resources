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

    static async findById(id) {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM
              cards
            WHERE
              id=$1
            `,
            [id]
        );

        return new Card(rows[0]);
    }

    static async updateById(id, attributes) {
        const cardInDb = await Card.findById(id);
        const updatedAttributes = { ...cardInDb, ...attributes };
        const { value, color } = updatedAttributes;
        const { rows } = await pool.query(
            `
            UPDATE
              cards
            SET
              value=$1,
              color=$2
            WHERE
              id=$3
            RETURNING
              *
            `,
            [value, color, id]
        );
        return new Card(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
            `
            DELETE FROM
              cards
            WHERE
              id=$1  
            RETURNING
              *
            `,
            [id]
        );
        return new Card(rows[0]);
    }
}