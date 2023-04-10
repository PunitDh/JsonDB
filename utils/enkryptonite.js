const Enkryptonite = {
  /**
   * Encrypts data using a secret key
   * @param {String} stringData
   * @param {String} secretKey
   * @returns {String}
   */
  encrypt: function (stringData, secretKey) {
    let encryptedStr = "";
    for (let i = 0; i < stringData.length; i++) {
      let charCode =
        stringData.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
      encryptedStr += String.fromCharCode(charCode);
    }
    return Buffer.from(encryptedStr).toString("base64");
  },

  /**
   * Decrypts data using the secret key
   * @param {String} encryptedString
   * @param {String} secretKey
   * @returns {String}
   */
  decrypt: function (encryptedString, secretKey) {
    const converted = Buffer.from(encryptedString, "base64").toString();
    let decryptedStr = "";
    for (let i = 0; i < converted.length; i++) {
      let charCode =
        converted.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
      decryptedStr += String.fromCharCode(charCode);
    }
    return decryptedStr;
  },
};

module.exports = Enkryptonite;
