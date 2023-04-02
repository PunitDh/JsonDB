const Enkryptonite = {
  encrypt: function (str, secretKey) {
    let encryptedStr = "";
    for (let i = 0; i < str.length; i++) {
      let charCode =
        str.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
      encryptedStr += String.fromCharCode(charCode);
    }
    return Buffer.from(encryptedStr).toString("base64");
  },

  decrypt: function (str, secretKey) {
    const converted = Buffer.from(str, "base64").toString();
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
