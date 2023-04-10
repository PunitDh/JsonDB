class UUID extends String {
  constructor(...args) {
    super(...args);
  }

  toNumber() {
    return this.split("-").map(part => parseInt(`0x${part}`))
  }
}

function uuid() {
  const segments = [8, 4, 4, 4, 12];
  const chars = "0123456789abcdef";
  const choose = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const uuidParts = segments.map((length) => {
    const segment = [];
    for (let i = 0; i < length; i++) {
      segment.push(choose(chars));
    }
    return segment.join("");
  });
  const joined = new UUID(uuidParts.join("-"));
  return joined;
}

console.log(uuid());
