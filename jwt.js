function createJWT(data, secret = "mySecret", { expiresIn = 1 } = {}) {
  const header = Buffer.from(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  ).toString("base64");
  const randomString = Math.random().toString(36).substring(2, 15);
  data.iat = new Date().getTime();
  data.exp = data.iat + expiresIn * 3600 * 1000;
  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  let signature = "";
  const hasher = `${header}.${payload}${randomString}.${secret}`;
  for (let i = 0; i < 32; i++) {
    let hash = hasher.charCodeAt(i % hasher.length);
    for (let j = 0; j < secret.length; j++) {
      hash ^= secret.charCodeAt(j) + i;
    }
    signature += (hash & 0xff).toString(16);
  }

  return `${header}.${payload.replace(/=/gi, "")}.${signature}`;
}

function verifyJWT(token, secret = "mySecret") {
  const [header, payload, signature] = token.split(".");

  const expectedHeader = Buffer.from(
    JSON.stringify({
      alg: "HS256",
      typ: "JWT",
    })
  ).toString("base64");

  if (header !== expectedHeader) return false;

  let expectedSignature = "";
  const { _irand, ...data } = JSON.parse(
    Buffer.from(payload, "base64").toString("utf8")
  );
  if (new Date().getTime() > data.exp) return false;
  const hasher = `${header}.${Buffer.from(JSON.stringify(data)).toString(
    "base64"
  )}${_irand}.${secret}`;
  for (let i = 0; i < 32; i++) {
    let hash = hasher.charCodeAt(i % hasher.length);
    for (let j = 0; j < secret.length; j++) {
      hash ^= secret.charCodeAt(j) + i;
    }
    expectedSignature += (hash & 0xff).toString(16);
  }
  if (signature !== expectedSignature) return false;
  return data;
}

const jwt = createJWT({
  username: "pxd1",
  password: "pwd1",
});

console.log(jwt, verifyJWT(jwt));
