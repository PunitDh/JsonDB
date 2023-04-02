const fs = require("fs");
const {
  UniqueConstraintViolationError,
  RequiredValueViolationError,
  IllegalTypeError,
  IllegalPrimaryKeyError,
} = require("./errors");
const Enkryptonite = require("../utils/enkryptonite");
const { EncType } = require("./constants");

Array.prototype.exclude = function (...exclusions) {
  return this.filter((item) => !exclusions.includes(item));
};

class Collection extends Array {
  constructor(...args) {
    super(...args);
  }

  exclude(...exclusions) {
    return this.filter((item) => !exclusions.includes(item));
  }
}

const DB = {
  filename: "",
  data: null,
  connect: function (filename) {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, "", EncType.UTF8);
    }
    this.data = JSON.parse(
      Enkryptonite.decrypt(
        fs.readFileSync(filename, EncType.UTF8),
        process.env.DB_SECRET_KEY
      ) || "{}"
    );
    return this;
  },
  create: function () {
    this.data = {
      ...this.data,
      _schema: this.data._schema || {},
      tables: this.data.tables || [],
      _seq: this.data._seq || {},
    };
    this.save();
    return this;
  },
  createTable: function ({ name, columns }) {
    this.data.tables = Array.from(new Set([...this.data.tables, name]));
    const primaryKeys = columns
      .filter((column) => column.primary)
      .map((column) => column.name);
    if (primaryKeys.length > 1) {
      const error = `Table '${name}' cannot have more than one primary keys. Found: [${primaryKeys}]`;
      throw new IllegalPrimaryKeyError(error);
    }
    this.data._schema[name] = columns;
    this.save();
  },
  tableChecker: function (table) {
    if (!this.data[table]) {
      this.data[table] = [];
    }
    if (!this.data._seq[table]) {
      this.data._seq[table] = 0;
    }
  },
  insert: function (table) {
    this.tableChecker(table);
    return (data) => {
      const newId = this.data._seq[table] + 1;
      this.data._seq[table] += 1;
      this.checkConstraints(table, data);
      const newData = { ...data, id: newId };
      this.data[table].push(newData);
      this.save();
      return newData;
    };
  },
  update: function (table) {
    this.tableChecker(table);
    return (id, data) => {
      this.checkConstraints(table, data, id);
      this.data[table] = this.data[table].map((item) =>
        item.id == id ? { ...item, ...data } : item
      );
      this.save();
      return this.data[table].find((m) => m.id == id);
    };
  },
  delete: function (table) {
    return (id) => {
      const item = this.data[table].find((m) => m.id == id);
      this.data[table] = this.data[table].filter((m) => m.id != id);
      this.save();
      return item;
    };
  },
  select: function (table) {
    return (where) => {
      if (where) {
        if (typeof where === "object") {
          const entries = Object.entries(where);
          const result = [];
          for (const item of this.data[table]) {
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
          return result;
        }
        return this.data[table].find((m) => m.id == where);
      }
      return this.data[table];
    };
  },
  /**
   *
   * @param {String} table
   * @param {Object} data
   */
  checkConstraints: function (table, data, id) {
    const requiredColumns = this.data._schema[table]
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
    const defaultValueColumns = this.data._schema[table].filter((col) =>
      col.hasOwnProperty("default")
    );
    defaultValueColumns.forEach((column) => {
      if (data[column.name] === null || data[column.name] === undefined) {
        data[column.name] = column.default;
      }
    });

    Object.entries(data).forEach(([key, value]) => {
      const column = this.data._schema[table].find((col) => col.name === key);
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
        if (this.data[table].map((item) => item[key]).includes(value) && !id) {
          throw new UniqueConstraintViolationError(
            `ERROR in column '${column.name}': Value '${value}' violates unique constraint`
          );
        }
      }
    });
  },
  save: function () {
    if (this.filename && this.data) {
      fs.writeFileSync(
        this.filename,
        Enkryptonite.encrypt(
          JSON.stringify(this.data),
          process.env.DB_SECRET_KEY
        ),
        EncType.UTF8
      );
    }
  },
  visualize: function () {
    if (this.filename && this.data) {
      return this.data;
    }
    return null;
  },
};

module.exports = DB;
