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
        this.is_paired = row.isPaired;
    }

    static async insert({ brand, condition, isPaired }) {
        const { rows } = await pool.query(
            `
            INSERT INTO
              socks (brand, condition, isPaired)
            VALUES
            ($1, $2, $3)
            RETURNING
              *
            `,
            [brand, condition, isPaired]
        );
        return new Sock(rows[0]);
    }
}