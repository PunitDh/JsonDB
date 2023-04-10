class Data extends Object {
  constructor(...args) {
    super(args);
    return Object.assign(this, ...args);
  }

  exclude(...args) {
    args.forEach((arg) => {
      delete this[arg];
    });
    return this;
  }
}

function DataOf(...args) {
  return new Data(...args);
}

const Function = DataOf({ s: "4" }, { p: 4 });
console.log(Function.exclude("p"), Function instanceof Data);
