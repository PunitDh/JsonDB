const fs = require("fs");
const {
  UniqueConstraintViolationError,
  RequiredValueViolationError,
  IllegalTypeError,
  IllegalPrimaryKeyError,
  UnknownTableError,
  UnknownColumnError,
  ForeignKeyConstraintError,
} = require("./errors");
const Enkryptonite = require("../utils/enkryptonite");
const { EncType, OnDeleteActions } = require("./constants");

Array.prototype.exclude = function (...exclusions) {
  return this.filter((item) => !exclusions.includes(item));
};

class JsonDB {
  #filename = "";
  #data = null;
  constructor() {}

  /**
   * Connects to the local json database
   * @param {String} filename
   * @returns {DB}
   */
  connect(filename) {
    this.#filename = filename;
    if (!fs.existsSync(this.#filename)) {
      fs.writeFileSync(this.#filename, "", EncType.UTF8);
    }
    this.#data = JSON.parse(
      Enkryptonite.decrypt(
        fs.readFileSync(filename, EncType.UTF8),
        process.env.DB_SECRET_KEY
      ) || "{}"
    );
    return this;
  }

  /**
   * Creates a boiler-plate JsonDB database with a schema, table list and sequence numbers
   * @returns {DB}
   */
  create() {
    this.#data = {
      ...this.#data,
      _schema: this.#data._schema || {},
      tables: this.#data.tables || [],
      _seq: this.#data._seq || {},
    };
    this.save();
    return this;
  }

  /**
   * Creates a table in the database
   * @param {String} name - Name of the table
   * @param {Array} columns - A list of columns
   *
   */
  createTable({ name, columns }) {
    this.#data.tables = Array.from(new Set([...this.#data.tables, name]));
    const primaryKeys = columns
      .filter((column) => column.primary)
      .map((column) => column.name);
    if (primaryKeys.length > 1) {
      const error = `Table '${name}' cannot have more than one primary keys. Found: [${primaryKeys}]`;
      throw new IllegalPrimaryKeyError(error);
    }
    const foreignKeyColumns = columns.filter((col) =>
      col.hasOwnProperty("foreignKey")
    );
    foreignKeyColumns.forEach((column) => {
      const { table, column: col } = column.foreignKey;
      if (!this.tableExists(table)) {
        const error = `ERROR in table name '${table}': No such table`;
        throw new UnknownTableError(error);
      }
      const columnExists = this.columnExists(table, col);
      if (!columnExists) {
        const error = `ERROR in column name: Table '${table}' has no such column: '${col}'`;
        throw new UnknownColumnError(error);
      }
    });
    this.#data._schema[name] = columns;
    if (!this.tableExists(name)) {
      this.#data[name] = [];
    }
    this.save();
  }

  /**
   * Checks if a table exists - if not, creates it
   * @param {String} table
   */
  tableChecker(table) {
    if (!this.#data[table]) {
      this.#data[table] = [];
    }
    if (!this.#data._seq[table]) {
      this.#data._seq[table] = 0;
    }
  }

  /**
   * Inserts a row in a table in the database
   * @param {String} table
   * @returns {Function}
   */
  insert(table) {
    this.tableChecker(table);
    return (data) => {
      this.checkConstraints(table, data);
      const newId = this.#data._seq[table] + 1;
      this.#data._seq[table] += 1;
      const newData = { ...data, id: newId };
      this.#data[table].push(newData);
      this.save();
      return newData;
    };
  }

  /**
   * Updates a row in a table in the database
   * @param {String} table
   * @returns {Function}
   */
  update(table) {
    this.tableChecker(table);
    return (id, data) => {
      this.checkConstraints(table, data, id);
      this.#data[table] = this.#data[table].map((item) =>
        item.id == id ? { ...item, ...data } : item
      );
      this.save();
      return this.#data[table].find((m) => m.id == id);
    };
  }

  /**
   * Deletes a row in a table in the database
   * @param {String} table
   * @returns
   */
  delete(table) {
    return (id) => {
      const item = this.#data[table].find((m) => m.id == id);
      const foreignKeyReferences = this.findForeignKeys(table, "id");

      if (foreignKeyReferences.length) {
        foreignKeyReferences.forEach((reference) => {
          const onDeleteAction =
            reference.onDelete &&
            reference.onDelete.split("_").join(" ").toLowerCase();

          if (onDeleteAction) {
            switch (onDeleteAction) {
              case OnDeleteActions.CASCADE:
                this.#data[reference.table] = this.#data[
                  reference.table
                ].filter((m) => m[reference.column] != id);
                break;
              case OnDeleteActions.SET_NULL:
                this.#data[reference.table] = this.#data[reference.table].map(
                  (item) =>
                    item[reference.column] == id
                      ? { ...item, [reference.column]: null }
                      : item
                );
                break;
              default:
                break;
            }
          } else {
            const message = `ERROR: Foreign key constraint failed: id '${id}' is referenced in  '${reference.table}' table '${reference.column}' column.`;
            throw new ForeignKeyConstraintError(message);
          }
        });
      }
      this.#data[table] = this.#data[table].filter((m) => m.id != id);
      this.save();
      return item;
    };
  }

  /**
   * Selects rows from a table in the database
   * @param {String} table
   * @returns {Function}
   */
  select(table) {
    return (where) => {
      if (where) {
        if (typeof where === "object") {
          const entries = Object.entries(where);
          const result = [];
          if (this.#data[table]) {
            for (const item of this.#data[table]) {
              let found = true;
              for (const [column, value] of entries) {
                if (item[column] == value) {
                  continue;
                } else {
                  found = false;
                  break;
                }
              }
              if (found) {
                result.push(item);
              }
            }
          }
          return result;
        }
        return this.#data[table].find((m) => m.id == where);
      }
      return this.#data[table];
    };
  }

  /**
   * Checks if a given value is a foreign key
   * @param {String} table
   * @param {String} column
   */
  findForeignKeys(table, column) {
    return this.getAllForeignKeys().filter(
      ({ referenceTable, referenceColumn }) =>
        referenceTable === table && referenceColumn === column
    );
  }

  /**
   * Checks if a table exists in the database
   * @param {String} table
   * @returns {Boolean}
   */
  tableExists(table) {
    return Boolean(this.#data[table]);
  }

  /**
   * Checks if a column exists on a table in the database
   * @param {String} table
   * @param {String} column
   * @returns {Boolean}
   */
  columnExists(table, column) {
    return Boolean(
      this.#data._schema[table].find((col) => col.name === column)
    );
  }

  getAllForeignKeys() {
    const foreignKeys = [];
    Object.entries(this.#data._schema).forEach(([table, columns]) => {
      const fKeys = columns.filter((column) =>
        column.hasOwnProperty("foreignKey")
      );
      foreignKeys.push(
        fKeys.map((col) => ({
          table,
          column: col.name,
          referenceTable: col.foreignKey.table,
          referenceColumn: col.foreignKey.column,
          onDelete: col.foreignKey.onDelete,
          onUpdate: col.foreignKey.onUpdate,
        }))
      );
    });
    return foreignKeys.flat();
  }

  getForeignKeys(table) {
    return this.#data._schema[table].filter((column) =>
      column.hasOwnProperty("foreignKey")
    );
  }

  /**
   * Checks the constraints and throws an error if a constraint is violated
   * @param {String} table
   * @param {Object} data
   * @param {Number} id
   */
  checkConstraints(table, data, id) {
    const requiredColumns = this.#data._schema[table]
      .filter((col) => col.required)
      .map((col) => col.name)
      .exclude("id");
    requiredColumns.forEach((col) => {
      if (!Object.keys(data).includes(col)) {
        throw new RequiredValueViolationError(
          `ERROR in column '${col}': Column '${col}' is required`
        );
      }
    });
    const defaultValueColumns = this.#data._schema[table].filter((col) =>
      col.hasOwnProperty("default")
    );
    defaultValueColumns.forEach((column) => {
      if (data[column.name] === null || data[column.name] === undefined) {
        data[column.name] = column.default;
      }
    });
    const foreignKeyColumns = this.#data._schema[table].filter((col) =>
      col.hasOwnProperty("foreignKey")
    );
    foreignKeyColumns.forEach(({ name, foreignKey }) => {
      const referenceValue = this.#data[foreignKey.table].find(
        (object) => object[foreignKey.column] == data[name]
      );
      if (!referenceValue) {
        const error = `ERROR in table '${table}': No such row exists in '${foreignKey.table}' table: '${foreignKey.column}'='${data[name]}'`;
        throw new ForeignKeyConstraintError(error);
      }
    });

    Object.entries(data).forEach(([key, value]) => {
      const column = this.#data._schema[table].find((col) => col.name === key);
      if (column && column.required) {
        if (!value) {
          throw new RequiredValueViolationError(
            `ERROR in column '${key}': Column '${key}' is required`
          );
        }
      }

      if (column && column.type) {
        if (typeof value !== column.type) {
          const error = `ERROR in column '${
            column.name
          }': '${typeof value}' is not assignable to the type '${column.type}'`;
          throw new IllegalTypeError(error);
        }
      }
      if (column && column.unique) {
        if (this.#data[table].map((item) => item[key]).includes(value) && !id) {
          throw new UniqueConstraintViolationError(
            `ERROR in column '${column.name}': Value '${value}' violates unique constraint`
          );
        }
      }
    });
  }

  /**
   * Saves the database to local disk
   */
  save() {
    if (this.#filename && this.#data) {
      fs.writeFileSync(
        this.#filename,
        Enkryptonite.encrypt(
          JSON.stringify(this.#data),
          process.env.DB_SECRET_KEY
        ),
        EncType.UTF8
      );
    }
  }

  /**
   * Returns the JSON-parsed database (Debug only)
   * @returns {Object}
   */
  visualize() {
    if (this.#filename && this.#data) {
      return this.#data;
    }
    return null;
  }
}

module.exports = JsonDB;
