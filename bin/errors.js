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

module.exports = {
  UniqueConstraintViolationError,
  RequiredValueViolationError,
  IllegalTypeError,
  IllegalPrimaryKeyError,
};
