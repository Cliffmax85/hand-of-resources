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

    static async insert({ name, type }) {
        const { rows } = await pool.query(
            `
            INSERT INTO
              fish (name, type)
            VALUES
              ($1, $2)
            RETURNING
              *
            `,
            [name, type]
        );
        return new Fish(rows[0]);
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

    static async findById(id) {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM
              fish
            WHERE
              id=$1
            `,
            [id]
        );
        return new Fish(rows[0]);
    }

    static async updateById(id, attributes) {
        const fishInDb = await Fish.findById(id);
        const updateAttributes = { ...fishInDb, ...attributes };
        const { name, type } = updateAttributes;
        const { rows } = await pool.query(
            `
            UPDATE
              fish
            SET
              name=$1,
              type=$2
            WHERE
              id=$3
            RETURNING
              *
            `,
            [name, type, id]
        );
        return new Fish(rows[0]);
    }
}