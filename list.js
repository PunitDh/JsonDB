const {
  listOf,
  LinkedList,
  List,
  DoublyLinkedList,
  pairOf,
  tripleOf,
} = require("./bin/domain/List");

// console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(new List())).sort());

const l = List.from([-2, 4, 7, 10, 11, 12, 14]);

const m = listOf(2, 4, 6, 8, 1, 3, 5, 7, 9, 2, 6, 8, 1, 23, 5, 5);

const q = listOf(88);
const p = listOf(
  { id: 1, name: "Tony" },
  { id: 2, name: "Leon" },
  { id: 3, name: "Kat" },
  { id: 4, name: "Tony" },
  { id: 5, name: "Porch" },
  { id: 6, name: "Tony" }
);

const ll = LinkedList.fromList(m).insertAtIndex(2, "Tet");
const dll = DoublyLinkedList.fromList(l);
const pair = pairOf(1, 2);
const triple = tripleOf(1, 2, 3);
const arr = [1, 2, 4];
// console.log(p.binarySearchBy(5, (it) => it.id));

function* generateId() {
  let id = 1;
  while (id<0x15) {
    yield id;
    id++;
  }
}

const idGenerator = generateId()


console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())
console.log(idGenerator.next())

