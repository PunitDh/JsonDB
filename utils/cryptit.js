/**
 *
 * @param {Number} saltRounds
 * @returns {String}
 */
function generateSalt(saltRounds) {
  const characters =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let salt = "";
  for (let i = 0; i < saltRounds; i++) {
    salt += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return salt;
}

/**
 * Hashes a password with a given salt string
 * @param {String} password
 * @param {String} salt
 * @returns {String}
 */
function hashWithSalt(password, salt) {
  let hash = "";
  for (let i = 0; i < salt.length; i++) {
    const charCode = password.charCodeAt(i % salt.length) ^ salt.charCodeAt(i);
    hash += String.fromCharCode(charCode);
  }
  return Buffer.from(hash).toString("base64");
}

Number.prototype.isBetween = function (min, max) {
  return this > min && this < max;
};

module.exports = {
  /**
   * Hashes a password given the salt rounds
   * @param {String} password
   * @param {Number} saltRounds
   * @returns {String}
   */
  hashPassword: function (password, saltRounds = process.env.SALT_ROUNDS || 10) {
    const salt = generateSalt(saltRounds);
    const hashedPassword = hashWithSalt(password, salt);
    const zeroPadded = saltRounds.isBetween(0, 10)
      ? "0" + saltRounds
      : saltRounds;
    return `$2b$${zeroPadded}$${salt}${hashedPassword}`;
  },

  /**
   * Verifies the password against the stored hashed password
   * @param {String} inputPassword
   * @param {String} hashedPassword
   * @returns {Boolean}
   */
  verifyPassword: function (inputPassword, hashedPassword) {
    const [, , saltLength, saltedPassword] = hashedPassword.split("$");
    const salt = saltedPassword.substring(0, +saltLength);
    const password = saltedPassword.substring(+saltLength);
    const calculatedHash = hashWithSalt(inputPassword, salt);
    return calculatedHash === password;
  },
};
