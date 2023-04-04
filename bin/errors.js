const LOGGER = require("./Logger");

class ApplicationError extends Error {
  constructor(...args) {
    super(...args);
    LOGGER.error(...args);
  }
}

class UniqueConstraintViolationError extends ApplicationError {
  constructor(...args) {
    super(...args);
  }
}

class RequiredValueViolationError extends ApplicationError {
  constructor(...args) {
    super(...args);
  }
}

class IllegalTypeError extends ApplicationError {
  constructor(...args) {
    super(...args);
  }
}

class IllegalPrimaryKeyError extends ApplicationError {
  constructor(...args) {
    super(...args);
  }
}

class UnknownTableError extends ApplicationError {
  constructor(...args) {
    super(...args);
  }
}

class UnknownColumnError extends ApplicationError {
  constructor(...args) {
    super(...args);
  }
}

class ForeignKeyConstraintError extends ApplicationError {
  constructor(...args) {
    super(...args);
  }
}

module.exports = {
  UniqueConstraintViolationError,
  RequiredValueViolationError,
  IllegalTypeError,
  IllegalPrimaryKeyError,
  UnknownTableError,
  UnknownColumnError,
  ForeignKeyConstraintError
};
