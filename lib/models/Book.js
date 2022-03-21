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

    static async findAll() {
        const { rows } = await pool.query(
            `
            SELECT 
              *
            FROM
              books
            `,
        );
        return rows.map((row) => new Book(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `
        SELECT
        *
        FROM
        books
        WHERE
        id=$1
        `,
        [id]
      );

      return new Book(rows[0]);
    }

    static async updateById(id, attributes) {
      const bookInDb = await Book.findById(id);
      const updateAttributes = { ...bookInDb, ...attributes };
      const { title, pages } = updateAttributes;
      const { rows } = await pool.query(
        `
        UPDATE
          books
        SET
          title=$1,
          pages=$2
        WHERE 
          id=$3
        RETURNING
          *
        `,
        [title, pages, id]
      );

      return new Book(rows[0]);
    }

    static async deleteById(id) {
      const { rows } = await pool.query(
        `DELETE FROM
          books
        WHERE
          id=$1
        RETURNING
          *
        `,
        [id]
      );
      return new Book(rows[0]);
    }
}