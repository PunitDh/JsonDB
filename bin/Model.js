const DB = require("./DB");
const pluralize = require("pluralize");

class Model {
  constructor(data = {}) {
    this.id = data.id;
  }

  static get __tablename__() {
    return pluralize.plural(this.name.toLowerCase());
  }

  exclude(...args) {
    args.forEach((arg) => {
      delete this[arg];
    });
    return this;
  }

  static all() {
    const data = DB.select(this.__tablename__)() || []
    return data.map((n) => this.asModel(n));
  }

  static find(id) {
    const result = DB.select(this.__tablename__)(id);
    return this.asModel(result);
  }

  static findBy(obj) {
    return this.asModel(DB.select(this.__tablename__)({ ...obj })[0]);
  }

  static where(obj) {
    const results = DB.select(this.__tablename__)(obj);
    return results.map((result) => this.asModel(result));
  }

  static create(body) {
    return this.asModel(DB.insert(this.__tablename__)(body));
  }

  static delete(id) {
    return this.asModel(DB.delete(this.__tablename__)(id));
  }

  static update(id, body) {
    return this.asModel(DB.update(this.__tablename__)(id, body));
  }

  static asModel(m) {
    return m ? new this.prototype.constructor(m) : null;
  }

  save() {
    const { id, ...body } = this;
    return this.id
      ? this.constructor.update(this.id, body)
      : this.constructor.create(this);
  }

  delete() {
    return this.constructor.delete(this.id);
  }
}

module.exports = Model;
