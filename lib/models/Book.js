const pool = require('../utils/pool');

module.exports = class Book {
    id;
    title;
    pages;

    constructor(row) {
        this.id = row.id;
        this.title = row.title;
        this.pages = row.pages;
    }

    static async insert({ title, pages }) {
        const { rows } = await pool.query(
            `
            INSERT INTO
              books (title, pages)
            VALUES
              ($1, $2)
            RETURNING
              *
            `,
            [title, pages]
        );
        return new Book(rows[0]);
    }
}