const pool = require('../utils/pool');

module.exports = class Sock {
    id;
    brand;
    condition;
    is_paired;

    constructor(row) {
        this.id = row.id;
        this.brand = row.brand;
        this.condition = row.condition;
        this.isPaired = row.is_paired;
    }

    static async insert({ brand, condition, isPaired }) {
        const { rows } = await pool.query(
            `
            INSERT INTO
              socks (brand, condition, is_paired)
            VALUES
            ($1, $2, $3)
            RETURNING
              *
            `,
            [brand, condition, isPaired]
        );
        return new Sock(rows[0]);
    }

    static async findAll() {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM
              socks
              `,
        );
        return rows.map((row) => new Sock(row));
    }

    static async findById(id) {
        const { rows } = await pool.query(
            `
            SELECT
              *
            FROM
              socks
            WHERE
              id=$1
            `,
            [id]
        );

        return new Sock(rows[0]);
    }

    static async updateById(id, attributes) {
        const sockInDB = await Sock.findById(id);
        const updateAttributes = { ...sockInDB, ...attributes};
        const { brand, condition, isPaired } = updateAttributes;
        const { rows } = await pool.query(
            `
            UPDATE
              socks
            SET
              brand=$1,
              condition=$2,
              is_paired=$3
            WHERE
              id=$4
            RETURNING
              *
            `,
            [brand, condition, isPaired, id]
        );
        return new Sock(rows[0]);
    }
}