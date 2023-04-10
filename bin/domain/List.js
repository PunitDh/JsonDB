class IndexOutOfBoundsException extends Error {
  constructor(...args) {
    super(...args);
  }
}

class NoSuchElementException extends Error {
  constructor(...args) {
    super(...args);
  }
}

class List extends Array {
  constructor(...args) {
    super(...args);
  }

  /**
   * Size of the list
   */
  get size() {
    return this.length;
  }

  /**
   * Returns the valid indices of the list
   */
  get indices() {
    return Object.keys(this).map((n) => parseInt(n));
  }

  /**
   * Returns the last valid index of the list
   */
  get lastIndex() {
    return this.length - 1;
  }

  /**
   * Checks if the list contains a given element
   * @param {*} element
   * @returns {Boolean}
   */
  contains(element) {
    return this.includes(element);
  }

  /**
   * Checks if a list contains all given elements
   * @param  {...any} elements
   * @returns {Boolean}
   */
  containsAll(...elements) {
    return this.includesAll(...elements);
  }

  /**
   * Returns the nth element in the list
   * @param {Number} index
   * @returns {*}
   */
  get(index) {
    return this[index];
  }

  /**
   * Creates a sub list based on the fromIndex and toIndex
   * @param {Number} fromIndex
   * @param {Number} toIndex
   * @returns {List}
   */
  subList(fromIndex, toIndex) {
    return this.slice(fromIndex, toIndex);
  }

  /**
   * Returns the first element in the array or the first element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  first(predicate) {
    if (predicate) {
      const element = this.firstOrNull(predicate);
      if (element === null) {
        throw new NoSuchElementException(`No such element`);
      }
      return element;
    } else {
      return this[0];
    }
  }

  /**
   * Returns the first element in the array or the first element that matches the predicate or null
   * @param {Function} predicate
   * @returns {* | null}
   */
  firstOrNull(predicate) {
    if (predicate) {
      for (const item of this) {
        if (predicate(item)) {
          return item;
        }
      }
      return null;
    } else {
      return this[0];
    }
  }

  /**
   * Returns the second element in the array or the first element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  second(predicate) {
    if (predicate) {
      const element = this.secondOrNull(predicate);
      if (element === null) {
        throw new NoSuchElementException(`No such element`);
      }
      return element;
    } else {
      return this[1];
    }
  }

  /**
   * Returns the second element in the array or the second element that matches the predicate or null
   * @param {Function} predicate
   * @returns {*}
   */
  secondOrNull(predicate) {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (predicate(item)) {
          if (count === 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementException(`No such element`);
    } else {
      return this[1];
    }
  }

  /**
   * Returns the third element in the array or the third element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  third(predicate) {
    if (predicate) {
      const element = this.thirdOrNull(predicate);
      if (element === null) {
        throw new NoSuchElementException(`No such element`);
      }
      return element;
    } else {
      return this[2];
    }
  }

  /**
   * Returns the third element in the array or the third element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  thirdOrNull(predicate) {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (predicate(item)) {
          if (count === 2) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementException(`No such element`);
    } else {
      return this[2];
    }
  }

  /**
   * Returns the fourth element in the array or the fourth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  fourth(predicate) {
    if (predicate) {
      const element = this.fourthOrNull(predicate);
      if (element === null) {
        throw new NoSuchElementException(`No such element`);
      }
      return element;
    } else {
      return this[3];
    }
  }

  /**
   * Returns the fourth element in the array or the fourth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  fourthOrNull(predicate) {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (predicate(item)) {
          if (count === 3) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementException(`No such element`);
    } else {
      return this[3];
    }
  }

  /**
   * Returns the fifth element in the array or the fifth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  fifth(predicate) {
    if (predicate) {
      const element = this.fifthOrNull(predicate);
      if (element === null) {
        throw new NoSuchElementException(`No such element`);
      }
      return element;
    } else {
      return this[4];
    }
  }

  /**
   * Returns the fifth element in the array or the fifth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  fifthOrNull(predicate) {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (predicate(item)) {
          if (count === 4) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementException(`No such element`);
    } else {
      return this[4];
    }
  }

  /**
   * Returns the sixth element in the array or the sixth element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  sixth(predicate) {
    if (predicate) {
      const element = this.sixthOrNull(predicate);
      if (element === null) {
        throw new NoSuchElementException(`No such element`);
      }
      return element;
    } else {
      return this[5];
    }
  }

  /**
   * Returns the sixth element in the array or the sixth element that matches the predicate
   * @param {Function} predicate
   * @returns {*}
   */
  sixthOrNull(predicate) {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (predicate(item)) {
          if (count === 5) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementException(`No such element`);
    } else {
      return this[5];
    }
  }

  /**
   * Returns the last element in the array or the last element that matches the predicate
   * @param {Function | undefined} predicate
   * @returns {*}
   * @throws {NoSuchElementException}
   */
  last(predicate) {
    if (predicate) {
      const element = this.lastOrNull(predicate);
      if (element === null) {
        throw new NoSuchElementException(`No such element`);
      }
      return element;
    } else {
      return this[this.length - 1];
    }
  }

  /**
   * Returns the last element in the array or the last element that matches the predicate
   * @returns {*}
   */
  lastOrNull(predicate) {
    if (predicate) {
      const values = this.reverse();
      for (const value of values) {
        if (predicate(value)) {
          return value;
        }
      }
      throw new NoSuchElementException(`No such element`);
    } else {
      return this[this.length - 1];
    }
  }

  /**
   * Returns the nth element in the array or the nth element that matches the predicate
   * @param {Function} predicate
   * @param {Number} nth
   * @returns {*}
   */
  match(predicate, nth) {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (predicate(item)) {
          if (count === nth - 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      throw new NoSuchElementException(`No such element`);
    } else {
      return this[nth - 1];
    }
  }

  /**
   * Returns the nth element in the array or the nth element that matches the predicate
   * @param {Function} predicate
   * @param {Number} nth
   * @returns {*}
   */
  matchOrNull(predicate, nth) {
    if (predicate) {
      let count = 0;
      for (const item of this) {
        if (predicate(item)) {
          if (count === nth - 1) {
            return item;
          } else {
            count++;
          }
        }
      }
      return null;
    } else {
      return this[nth - 1];
    }
  }

  /**
   * Returns the first non-null value produced by transform function being applied to elements of this
   * collection in iteration order, or throws NoSuchElementException if no non-null value was produced.
   * @param {Function} transform
   * @returns {List}
   */
  firstNotNullOf(transform) {
    for (const it of this) {
      if (it && transform(it)) {
        return transform(it);
      }
    }
    const error = `No such element`;
    throw new NoSuchElementException(error);
  }

  /**
   * Returns the first non-null value produced by transform function being applied to elements of
   * this collection in iteration order, or null if no non-null value was produced.
   * @param {Function} transform
   * @returns {List}
   */
  firstNotNullOfOrNull(transform) {
    for (const it of this) {
      if (it && transform(it)) {
        return transform(it);
      }
    }
    return null;
  }

  /**
   * Halves the list into two and returns the two parts
   * @returns {List}
   */
  halve() {
    const firstHalf = listOf(...this.slice(0, this.length / 2));
    const secondHalf = listOf(...this.slice(this.length / 2, this.length));
    return listOf(firstHalf, secondHalf);
  }

  /**
   * Returns the first half of the list
   * @returns {List}
   */
  firstHalf() {
    return this.halve().first();
  }

  /**
   * Returns the second half of the list
   * @returns {List}
   */
  secondHalf() {
    return this.halve().last();
  }

  /**
   * Returns a list containing all elements except first n elements
   * @param {Number} n
   * @returns {List}
   */
  drop(n) {
    return this.slice(n);
  }

  /**
   * Returns a list containing all elements except last n elements
   * @param {Number} n
   * @returns {List}
   */
  dropLast(n) {
    return this.slice(0, n);
  }

  /**
   * Returns a list containing first n elements.
   * @param {Number} n
   * @returns {List}
   */
  take(n) {
    return this.head(n);
  }

  /**
   * Returns a list containing last n elements.
   * @param {Number} n
   * @returns {List}
   */
  takeLast(n) {
    return this.tail(n);
  }

  /**
   * Returns a list containing first elements satisfying the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  takeWhile(predicate) {
    const filtered = listOf();
    let found = false;
    for (const item of this) {
      if (predicate(item)) {
        filtered.push(item);
        found = true;
      } else {
        if (!found) {
          continue;
        } else {
          break;
        }
      }
    }
    return filtered;
  }

  /**
   * Returns a list containing last elements satisfying the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  takeLastWhile(predicate) {
    const filtered = listOf();
    let found = false;
    for (const item of this.reverse()) {
      if (predicate(item)) {
        filtered.push(item);
        found = true;
      } else {
        if (!found) {
          continue;
        } else {
          break;
        }
      }
    }
    return filtered.reverse();
  }

  /**
   * Returns a list containing all elements except first elements
   * that satisfy the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  dropWhile(predicate) {
    let dropped = false;
    const droppedList = listOf();
    for (const it of this) {
      if (predicate(it) && !dropped) {
        dropped = true;
      } else {
        droppedList.push(it);
      }
    }
    return droppedList;
  }

  /**
   * Returns a list containing all elements except last
   * elements that satisfy the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  dropLastWhile(predicate) {
    let dropped = false;
    const droppedList = listOf();
    for (const it of this.reverse()) {
      if (predicate(it) && !dropped) {
        dropped = true;
      } else {
        droppedList.push(it);
      }
    }
    return droppedList.reverse();
  }

  /**
   * Returns an element at the given index or throws an IndexOutOfBoundsException if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAt(index) {
    if (this[index]) {
      return this[index];
    }
    const error = `Index out of bounds: ${index}`;
    throw new IndexOutOfBoundsException(error);
  }

  /**
   * Returns an element at the given index or the result of calling the defaultValue function if the index is out of bounds of this list.
   * @param {Number} index
   * @param {Function} defaultValue
   * @returns {*}
   */
  elementAtOrElse(index, defaultValue) {
    return index < index.length ? this[index] : defaultValue();
  }

  /**
   * Returns an element at the given index or null if the index is out of bounds of this list.
   * @param {Number} index
   * @returns {*}
   */
  elementAtOrNull(index) {
    return this[index] ? this[index] : null;
  }

  /**
   * Returns a list containing all elements that are instances of specified type parameter .
   * @param {Class} clazz
   * @returns {List}
   */
  filterIsInstance(clazz) {
    return this.filter((item) => item instanceof clazz);
  }

  /**
   * Appends all elements that are instances of specified type parameter R to the given destination.
   * @param {List} destination
   * @param {Class} clazz
   * @returns {List}
   */
  filterIsInstanceTo(destination, clazz) {
    const filtered = this.filter((item) => item instanceof clazz);
    return new List(...destination.concat(filtered));
  }

  /**
   * Returns a list containing all elements not matching the given predicate.
   * @param {Function} predicate
   * @returns {List}
   */
  filterNot(predicate) {
    return this.filter((it) => !predicate(it));
  }

  /**
   * Filters out all the elements in the array that are not null
   * @returns {List}
   */
  filterNotNull() {
    return this.filter((value) => value !== null);
  }

  /**
   * Filters out the first null element, but keeps the rest
   * @returns {List}
   */
  filterFirstNotNull() {
    let filtered = false;
    let filteredList = listOf();
    for (const it of this) {
      if (it == null && !filtered) {
        filtered = true;
        continue;
      }
      filteredList.push(it);
    }
    return filteredList;
  }

  /**
   * Filters out all values that are truthy
   * @returns {List}
   */
  filterTruthy() {
    return this.filter(Boolean);
  }

  /**
   * Only returns values that are falsy
   * @returns {List}
   */
  filterFalsy() {
    return this.filter((it) => !Boolean(it));
  }

  /**
   * Appends all elements that are not null to the given destination.
   * @param {List} destination
   * @returns {List}
   */
  filterNotNullTo(destination) {
    const filtered = this.filterNotNull();
    return new List(...destination.concat(filtered));
  }

  /**
   * Filters out all the elements in the array that are not undefined
   * @returns {List}
   */
  filterNotUndefined() {
    return this.filter((value) => value !== undefined);
  }

  /**
   * Appends all elements matching the given predicate to the given destination.
   * @param {List} destination
   * @param {Function} predicate
   * @returns
   */
  filterTo(destination, predicate) {
    const filtered = this.filter(predicate);
    return new List(...destination.concat(filtered));
  }

  /**
   * Appends all elements not matching the given predicate to the given destination.
   * @param {List} destination
   * @param {Function} predicate
   * @returns
   */
  filterNotTo(destination, predicate) {
    const filtered = this.filterNot(predicate);
    return new List(...destination.concat(filtered));
  }

  /**
   * Flattens the list by a given depth
   * @param {Number} depth
   * @returns {List}
   */
  flatten(depth) {
    return this.flat(depth);
  }

  /**
   * Same as reduce
   * @param {Function} callback
   * @param {*} initialValue
   * @returns {*}
   */
  fold(callback, initialValue) {
    return this.reduce(callback, initialValue);
  }

  /**
   * Same as a string join, but with a prefix and a postfix
   * @param {String} separator
   * @param {String} prefix
   * @param {String} postfix
   * @returns {String}
   */
  joinTo(separator, prefix = "", postfix = "") {
    return `${prefix}${this.join(separator)}${postfix}`;
  }

  /**
   * Performs an async await operation on an array and returns the resultant array.
   * Note: The result must be awaited, i.e. The 'await' keyword must be used before it
   * @param {Function} callback
   * @returns {List}
   */
  async mapAsync(callback) {
    let result = listOf();
    for (let [it, idx] of this.entries()) {
      const promise = await callback(it, idx);
      result.push(promise);
    }
    return result;
  }

  /**
   * Performs an async await operation on an array
   * @param {Function} callback
   */
  async forEachAsync(callback) {
    for (let [it, idx] of this.entries()) {
      await callback(it, idx);
    }
  }

  /**
   * Takes in a number of arguments and excludes them from the array
   * @returns {List}
   */
  exclude(...exclusions) {
    return this.filter((item) => !exclusions.includes(item));
  }

  /**
   * Returns the distinct elements in an array
   * @returns {List}
   */
  distinct() {
    return new List(...new Set(this));
  }

  /**
   * Returns a list containing only elements from the given collection having distinct keys returned by the given selector function.
   * @param {Function} keySelector
   * @returns {List}
   */
  distinctBy(keySelector) {
    const distinctList = listOf();
    for (const it of this) {
      const notInList = !distinctList.find(
        (item) => keySelector(it) == keySelector(item)
      );
      if (notInList) {
        distinctList.push(it);
      }
    }
    return distinctList;
  }

  /**
   * Returns the unique elements in an array
   * @returns {List}
   */
  unique() {
    return this.distinct();
  }

  /**
   * Converts all elements in the array to upper case
   * @returns {Array<String>}
   */
  toUpperCase() {
    return listOf(...this).map((arg) => arg.toUpperCase());
  }

  /**
   * Converts all elements in the array to lower case
   * @returns {Array<String>}
   */
  toLowerCase() {
    return listOf(...this).map((arg) => arg.toLowerCase());
  }

  /**
   * Returns the sum of all elements in an array
   * @returns {Number}
   */
  sum() {
    return this.reduce((acc, cur) => +acc + cur, 0);
  }

  /**
   * Returns the sum of all elements in an array
   * @returns {Number}
   */
  sumOf(selector) {
    const values = this.map(selector);
    return values.sum();
  }

  /**
   * Returns the multiplication product of all elements in an array
   * @returns {Number}
   */
  product() {
    return this.reduce((acc, cur) => acc * cur, 1);
  }

  /**
   * Checks whether an array is empty
   * @returns {Boolean}
   */
  isEmpty() {
    return this.length === 0;
  }

  /**
   * Checks whether an array is empty
   * @returns {Boolean}
   */
  isNotEmpty() {
    return this.length > 0;
  }

  /**
   * Chunks an array into specified size
   * @param {Number} size
   * @returns {Array<Array<any>>}
   */
  chunked(size) {
    const chunkedArray = listOf();
    for (let i = 0; i < this.length; i += Math.abs(size)) {
      chunkedArray.push(this.slice(i, i + Math.abs(size)));
    }
    return chunkedArray;
  }

  /**
   * Checks whether the array includes all the arguments
   * @returns {Boolean}
   */
  includesAll() {
    const values = [...arguments].flat();
    for (const value of values) {
      if (!this.includes(value)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Finds intersection between two arrays
   * @param {List} array
   * @returns {List}
   */
  intersect(array) {
    return this.intersection(array);
  }

  /**
   * Finds intersection between two arrays
   * @param {List} array
   * @returns {List}
   */
  intersection(array) {
    if (!array) return null;
    return array.filter((item) => this.includes(item));
  }

  /**
   * Finds the difference between the two arrays
   * @param {List} array
   * @returns {List}
   */
  difference(array) {
    const diff = listOf();
    array.forEach((item) => {
      if (!this.includes(item)) {
        diff.push(item);
      }
    });
    this.forEach((item) => {
      if (!array.includes(item)) {
        diff.push(item);
      }
    });
    return diff;
  }

  /**
   * Returns a set containing all distinct elements from both collections.
   * @param {List} list
   * @returns {Set}
   */
  union(list) {
    return new Set(this.intersect(list));
  }

  /**
   * Returns the number of elements matching a given predicate function
   * @param {Function} predicate
   * @returns {Number}
   */
  count(predicate) {
    let count = 0;
    this.forEach((item, index) => {
      if (predicate(item, index)) {
        count++;
      }
    });
    return count;
  }

  /**
   * Returns the largest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Number}
   */
  maxOf(selector) {
    const nums = this.map(selector);
    return nums.max();
  }

  /**
   * Returns the smallest value among all values produced by selector
   * function applied to each element in the collection.
   * @param {Function} selector
   * @returns {Number}
   */
  minOf(selector) {
    const nums = this.map(selector);
    return nums.min();
  }

  /**
   * Finds the max number in the arguments provided
   * @this {Array<Number>}
   * @returns {Number}
   */
  max() {
    return Math.max(...this);
  }

  /**
   * Finds the min number in the arguments provided
   * @this {Array<Number>}
   * @returns {Number}
   */
  min() {
    return Math.min(...this);
  }

  minmax() {
    return new List(this.min(), this.max());
  }

  minmaxOf(selector) {
    return new List(this.minOf(selector), this.maxOf(selector));
  }

  /**
   * Adds all the elements to the array
   * @param  {...any} elements
   * @returns {List}
   */
  plus(...elements) {
    return this.concat(elements);
  }

  /**
   * Removes all the elements from the array
   * @param  {...any} elements
   * @returns {List}
   */
  minus(...elements) {
    return this.exclude(...elements);
  }

  /**
   * Returns a list containing successive accumulation values generated by applying
   * operation from left to right to each element and current accumulator value that
   * starts with initial value.
   * @param {*} initialValue
   * @param {Function} operation
   * @returns {List}
   */
  scan(operation, initialValue = 0) {
    const accumulated = listOf();
    this.reduce((acc, cur) => {
      const operated = operation(acc, cur);
      accumulated.push(acc);
      return operated;
    }, initialValue);
    return accumulated;
  }

  /**
   * Returns the single element matching the given predicate, or
   * throws exception if there is no or more than one matching element.
   * @param {Function} predicate
   * @returns {*}
   */
  single(predicate) {
    const found = this.filter(predicate);
    if (found.length !== 1) {
      const error = `No single element matches the given predicate Found: (${found.length})`;
      throw new NoSuchElementException(error);
    }
    return found.first();
  }

  /**
   * Returns the single element matching the given predicate, or
   * null if element was not found or more than one element was found.
   * @param {Function} predicate
   * @returns {List}
   */
  singleOrNull(predicate) {
    const found = this.filter(predicate);
    if (found.length !== 1) {
      return null;
    }
    return found.first();
  }

  /**
   * Rounds all the numbers in the arguments provided
   * @this {Array<Number>}
   * @returns {Array<Number>}
   */
  round() {
    return this.map((item) => Math.round(item));
  }

  /**
   * Rounds all the numbers up in the arguments provided
   * @this {Array<Number>}
   * @returns {Array<Number>}
   */
  ceil() {
    return this.map((item) => Math.ceil(item));
  }

  /**
   * Rounds all the numbers down in the arguments provided
   * @this {Array<Number>}
   * @returns {Array<Number>}
   */
  floor() {
    return this.map((item) => Math.floor(item));
  }

  /**
   * Returns whether none of the items match the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  none(predicate) {
    if (predicate) {
      for (const item of this) {
        if (predicate(item)) {
          return false;
        }
      }
      return true;
    } else {
      return this.length === 0;
    }
  }

  /**
   * Checks if an object exists inside an array using a deep comparison
   * @param {Object} object
   * @returns {Boolean}
   */
  includesObject(object) {
    for (const item of this) {
      if (typeof item === "object") {
        if (object.equals(item)) {
          return true;
        }
      } else {
        if (item === object) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Deletes any given number of elements from an array
   * @param {*} elements
   * @returns {List}
   */
  delete(...elements) {
    return this.filter((item) => !elements.includes(item));
  }

  /**
   * Returns a randomly chosen element within the array
   * @returns {*}
   */
  random() {
    const index = Math.floor(Math.random() * this.length);
    return this[index];
  }

  /**
   * Returns a randomly chosen sample of elements within the array
   * @param {Number} sampleSize
   * @param {Boolean} repeat
   * @returns {List}
   */
  sample(sampleSize, repeat = true) {
    const sample = listOf();

    if (repeat) {
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * this.length);
        sample.push(this[index]);
      }
    } else {
      let duplicateArray = listOf(...this);
      if (sampleSize > this.length) {
        const errorMessage = `Sample size of '${sampleSize}' is greater than the array length of '${this.length}'`;
        throw new Error(errorMessage);
      }
      while (sample.length < sampleSize) {
        const index = Math.floor(Math.random() * duplicateArray.length);
        const elem = duplicateArray[index];
        duplicateArray = duplicateArray.filter((n) => n !== elem);
        sample.push(elem);
      }
    }
    return sample;
  }

  /**
   * Returns a new array with its original elements randomly shuffled
   * @returns {List}
   */
  shuffled() {
    return this.map((item) => item).sort(() => Math.random() - 0.5);
  }

  /**
   * Casts each item in the array to its boolean value
   * @returns {Array<Boolean>}
   */
  toBoolean() {
    return this.map((item) => Boolean(item));
  }

  /**
   * Checks whether all the elements in the array matches a given element
   * @param {Function} predicate
   * @param {*} thisArg
   * @returns {Boolean}
   */
  all(predicate, thisArg = undefined) {
    return this.every(predicate, thisArg);
  }

  /**
   * Checks whether any of the elements in the array matches a given element
   * @param {Function} predicate
   * @param {*} thisArg
   * @returns {Boolean}
   */
  any(predicate, thisArg = undefined) {
    return this.some(predicate, thisArg);
  }

  /**
   * Groups the items in a unique key-value pair based on the key selector
   * @param {Function} keySelector
   * @returns {Object}
   * @example
   */
  groupBy(keySelector) {
    const grouped = {};
    const distinctProperties = Array.from(new Set(this.map(keySelector)));
    distinctProperties.forEach((property) => {
      grouped[property] = this.filter((item) => keySelector(item) === property);
    });
    return grouped;
  }

  /**
   * Groups the items in a unique key-value pair based on the key selector
   * @param {Object} destination
   * @param {Function} keySelector
   * @returns {Object}
   * @example
   */
  groupByTo(destination, keySelector) {
    const grouped = this.groupBy(keySelector);
    return { ...destination, ...grouped };
  }

  binarySearch(element, fromIndex = 0, toIndex = this.length) {
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    if (element === this[halfIndex]) return halfIndex;
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    return element < this[halfIndex]
      ? this.binarySearch(element, fromIndex, halfIndex)
      : this.binarySearch(element, halfIndex, toIndex);
  }

  binarySearchBy(element, keySelector, fromIndex = 0, toIndex = this.length) {
    const halfIndex = Math.floor((toIndex - fromIndex) / 2 + fromIndex);
    const keySelect = keySelector(this[halfIndex]);
    if (element === keySelect) return this[halfIndex];
    if (Math.abs(fromIndex - toIndex) === 1) return null;
    return element < keySelect
      ? this.binarySearchBy(element, keySelector, fromIndex, halfIndex)
      : this.binarySearchBy(element, keySelector, halfIndex, toIndex);
  }

  /**
   *
   * @param {List} destination
   * @param {Function} transform
   */
  mapTo(destination, transform) {
    const mapped = this.map(transform);
    return new List(...destination.concat(mapped));
  }

  /**
   * Performs a map on all elements in the array that are not null or undefined
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNull(transform) {
    let results = listOf();
    for (let it = 0; it < this.length; it++) {
      if (this[it] !== null && this[it] !== undefined) {
        const promise = transform(this[it], it);
        results.push(promise);
      }
    }
    return results;
  }

  /**
   * Performs a map on all elements in the array that are not null or undefined and appends it to the destination
   * @param {List} destination
   * @param {Function} transform
   * @returns {List}
   */
  mapNotNullTo(destination, transform) {
    if (!Array.isArray(destination)) {
      const error = `Parameter 'destination' must be an Array or List`;
      throw new Error(error);
    }
    let results = listOf();
    for (let it = 0; it < this.length; it++) {
      if (this[it] !== null && this[it] !== undefined) {
        const promise = transform(this[it], it);
        results.push(promise);
      }
    }
    return new List(...destination.concat(results));
  }

  /**
   * Given two lists, merges them into a map
   * @param {List} other
   * @returns {Map}
   */
  mapWith(other) {
    const map = new Map();
    for (let i = 0; i < Math.min(this.length, other.length); i++) {
      map.set(this[i], other[i]);
    }
    return map;
  }

  unzip() {}

  /**
   * Given two lists, returns pairs of one element in one list with
   * another element in the other list
   * @param {List} other
   * @returns {List}
   */
  zip(other) {
    const zipped = listOf();
    for (let i = 0; i < Math.min(this.length, other.length); i++) {
      zipped.push(listOf(this[i], other[i]));
    }
    return zipped;
  }

  /**
   * Given two lists, merges them into an object
   * @param {List} other
   * @returns {Object}
   */
  pairWith(other) {
    const obj = {};
    for (let i = 0; i < Math.min(this.length, other.length); i++) {
      obj[this[i]] = other[i];
    }
    return obj;
  }

  /**
   * Splits the original collection into pair of lists, where first list
   * contains elements for which predicate yielded true, while second list
   * contains elements for which predicate yielded false.
   * @param {Function} predicate
   * @returns {Array<Array<any>>}
   */
  partition(predicate) {
    const listTrue = listOf();
    const listFalse = listOf();
    for (const item of this) {
      if (predicate(item)) {
        listTrue.push(item);
      } else {
        listFalse.push(item);
      }
    }
    return listOf(listTrue, listFalse);
  }

  /**
   * Repeats the list n times and returns the result
   * @param {Number} n
   * @returns {List}
   */
  repeat(n) {
    const repeatedList = listOf();
    for (const _ of listOf(0, n - 1).range()) {
      repeatedList.push(...this);
    }
    return repeatedList;
  }

  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortBy(selector) {
    const newArray = this.map((n) => n);
    return newArray.sort((a, b) => (selector(a) > selector(b) ? 1 : -1));
  }

  /**
   * Returns a list of all elements sorted according to natural sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedBy(selector) {
    return this.sortBy(selector);
  }

  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortByDescending(selector) {
    const newArray = this.map((n) => n);
    return newArray.sort((a, b) => (selector(a) > selector(b) ? -1 : 1));
  }

  /**
   * Returns a list of all elements sorted by descending order according to natural
   * sort order of the value returned by specified selector function.
   * @param {Function} selector
   * @returns {List}
   */
  sortedByDescending(selector) {
    return this.sortByDescending(selector);
  }

  /**
   * Sorts numbers in ascending order
   * @returns {List}
   */
  sortNumbers() {
    return this.sort((a, b) => a - b);
  }

  /**
   * Sorts numbers in descending order
   * @returns {List}
   */
  sortNumbersDescending() {
    return this.sort((a, b) => b - a);
  }

  /**
   * Adds the element to the array and returns the array
   * @param {any} element
   * @returns {List}
   */
  add(element) {
    this.push(element);
    return this;
  }

  /**
   * Returns the average of the supplied array
   * @returns {Number}
   */
  mean() {
    return this.reduce((acc, cur) => +acc + cur, 0) / this.length;
  }

  /**
   * Returns the median of the supplied array
   * @returns {Number}
   */
  median() {
    const sorted = this.sort((a, b) => a - b);
    const idx = Math.floor(sorted.length / 2);
    return sorted[idx];
  }

  /**
   * Returns the mode (most frequently occurring element) of the array
   * @returns {*}
   */
  mode() {
    const counts = {};
    for (let i = 0; i < this.length; i++) {
      if (counts[this[i]]) {
        counts[this[i]] += 1;
      } else {
        counts[this[i]] = 1;
      }
    }
    const max = Math.max(...Object.values(counts));
    for (const [key, value] of Object.entries(counts)) {
      if (value === max) {
        return key;
      }
    }
  }

  /**
   * Calculate the standard deviation of the array of numbers
   * @returns {Number}
   * @example [3,4,8,7,6].stdev() ==> 1.8547236990991407
   */
  stdev() {
    const mean = this.reduce((acc, cur) => +acc + cur) / this.length;
    return Math.sqrt(
      this.map((n) => (n - mean) ** 2).reduce((a, b) => +a + b) / this.length
    );
  }

  filterOddNumbers() {
    return this.filter((it) => it % 2 === 1);
  }

  filterEvenNumbers() {
    return this.filter((it) => it % 2 === 0);
  }

  filterPrimeNumbers() {
    return this.filter((num) => {
      for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
      }
      return num > 1;
    });
  }

  /**
   * Counts all unique occurences in the array and returns them as an object along with the count
   * @returns {Object}
   * @example ['apple', 'apple', 'orange', 'banana', 'banana', 'banana'].counts() ==> { apple: 2, orange: 1, banana: 3 }
   */
  counts() {
    const cts = {};
    for (let i = 0; i < this.length; i++) {
      if (this[i] in cts) {
        cts[this[i]] = +cts[this[i]] + 1;
      } else {
        cts[this[i]] = 1;
      }
    }
    return cts;
  }

  /**
   * Returns an object containing key-value pairs provided by transform function applied to each elements of the array
   * @param {Function} transform
   * @returns {Object}
   * @example ['apple','banana','orange'].associate(fruit => fruit.toUpperCase()) ==> { apple: 'APPLE', banana: 'BANANA', orange: 'ORANGE' }
   */
  associate(transform) {
    const obj = {};
    for (const item of this) {
      obj[item] = transform(item);
    }
    return obj;
  }

  /**
   * Returns a Map where keys are elements from the given collection and values are produced by the
   * valueSelector function applied to each element.
   * @param {Function} valueSelector
   * @returns {Map}
   */
  associateWith(valueSelector) {
    const map = new Map();
    for (const it of this) {
      map.set(it, valueSelector(it));
    }
    return map;
  }

  /**
   * Multiplies each element in the array with a given number
   * @param {Number} number
   * @returns {List}
   * @example [3,2,1].multiply(2) ==> [6,4,2]
   */
  multiply(number) {
    return this.map((n) => n * number);
  }

  /**
   * Divides each element in the array with a given number
   * @param {Number} number
   * @returns {List}
   * @example [4,8,10].divide(2) ==> [2,4,5]
   */
  divide(number) {
    return this.map((n) => n / number);
  }

  /**
   * Raises each element in the array to the power of a given number
   * @param {Number} number
   * @returns {List}
   * @example [1,2,3].power(2) ==> [1,4,9]
   */
  power(number) {
    return this.map((n) => n ** number);
  }

  /**
   * Sets the decimal places of each number in the array
   * @param {Number} number
   * @returns {List}
   * @example [1,2,3].toFixed(2) ==> ['1.00', '2.00', '3.00']
   */
  toFixed(number) {
    return this.map((n) => n.toFixed(number));
  }

  /**
   * Converts a list of numbers into english
   * @returns {List}
   */
  toEnglish() {
    return this.map((num) => (!isNaN(num) ? numToEnglish(num) : num));
    function numToEnglish(num) {
      const dictionary = {
        1: "One",
        2: "Two",
        3: "Three",
        4: "Four",
        5: "Five",
        6: "Six",
        7: "Seven",
        8: "Eight",
        9: "Nine",
        10: "Ten",
        11: "Eleven",
        12: "Twelve",
        13: "Thirteen",
        14: "Fourteen",
        15: "Fifteen",
        16: "Sixteen",
        17: "Seventeen",
        18: "Eighteen",
        19: "Nineteen",
        20: "Twenty",
        30: "Thirty",
        40: "Forty",
        50: "Fifty",
        60: "Sixty",
        70: "Seventy",
        80: "Eighty",
        90: "Ninety",
        100: "Hundred",
      };
      const bigNums = listOf(
        "Thousand",
        "Million",
        "Billion",
        "Trillion",
        "Quadrillion",
        "Quintrillion",
        "Sextillion",
        "Septillion",
        "Octillion",
        "Nonillion",
        "Decillion"
      );
      const sign = Math.sign(num);
      const number = Math.abs(num);
      const [integer, decimal] = number.toString().split(".");
      const chunks = integer.split("").reverse().toList().chunked(3);
      if (number === 0) {
        return "Zero";
      }

      const lastDigits = (num, n) =>
        num.toString().slice(num.toString().length - n);

      function parseThreeDigits(num) {
        if (num < 10) {
          return dictionary[parseInt(num)];
        }
        const twoPlaces = lastDigits(num, 2);
        let twoPlacesEnglish = dictionary[twoPlaces];
        if (!twoPlacesEnglish) {
          const [tens, ones] = twoPlaces.split("");
          const tensEnglish = dictionary[tens * 10] || "";
          const onesEnglish = dictionary[ones] || "";
          twoPlacesEnglish =
            parseInt(twoPlaces) > 0 ? `${tensEnglish} ${onesEnglish}` : "";
        }
        let hundredth = "",
          hundredthEnglish;
        if (num >= 100) {
          hundredth = Math.floor(num / 100);
          hundredthEnglish = `${dictionary[hundredth]} ${
            dictionary[(hundredth * 100) / hundredth]
          }${twoPlaces > 0 ? " and " : ""}`;
          return `${hundredthEnglish}${twoPlacesEnglish}`;
        }
        return twoPlacesEnglish;
      }

      const hundredthChunks = chunks.map((chunk) =>
        parseThreeDigits(chunk.reverse().join(""))
      );

      const integerEnglish =
        (sign < 0 ? "Minus " : "") +
        hundredthChunks
          .map((digit, index) => {
            if (index === 0) return digit;
            if (digit) return `${digit} ${bigNums[index - 1]}`;
          })
          .filter(Boolean)
          .reverse()
          .join(", ");

      const decimalEnglish =
        decimal &&
        decimal
          .split("")
          .map((digit) => {
            if (digit === "0") return "Zero";
            return dictionary[digit];
          })
          .join(" ");

      if (decimal) {
        return `${integerEnglish} Point ${decimalEnglish}`;
      }
      return integerEnglish;
    }
  }

  /**
   * Replaces every occurence of an element in an array with a new value
   * @param {any} element
   * @param {any} replaced
   * @returns {List}
   * @example  [1,2,3,4].replace(2,7) ==> [1,7,3,4]
   */
  replace(element, replaced) {
    return this.map((item) => (item === element ? replaced : item));
  }

  /**
   * Returns an array of numbers counting from start to end
   * @returns {List}
   * @example [1, 4].range()  ==> [1,2,3,4]
   */
  range() {
    const start = this[0];
    const end = this[1];
    const arr = listOf();
    for (
      let i = start;
      start < end ? i <= end : i >= end;
      start < end ? i++ : i--
    ) {
      arr.push(i);
    }
    return arr;
  }

  /**
   * Checks if an item exists in the array that matches the given predicate
   * @param {Function} predicate
   * @returns {Boolean}
   */
  exists(predicate) {
    for (const item of this) {
      if (predicate(item)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns the first 'n' elements in an array
   * @param {Number} n
   * @returns {List}
   */
  head(n) {
    return n ? (n > this.length ? this : this.slice(0, n)) : [this[0]];
  }

  /**
   * Returns the last 'n' elements in an array
   * @param {Number} n
   * @returns {List}
   */
  tail(n) {
    return n
      ? n > this.length
        ? this
        : this.slice(this.length - n, this.length)
      : [this[this.length - 1]];
  }

  clear() {
    while (this.length) {
      this.pop();
    }
    return this;
  }

  static isList(list) {
    return list instanceof List;
  }

  equals(list) {
    if (this.length !== list.length) return false;
    for (let i = 0; i < this.length; i++) {
      if (List.isList(this[i]) && List.isList(list[i])) {
        if (!this[i].equals(list[i])) {
          return false;
        }
      } else if (this[i] !== list[i]) {
        return false;
      }
    }
    return true;
  }
}

class Triple extends Array {
  constructor(first, second, third) {
    Object.freeze(super(first, second, third));
  }

  get first() {
    return this[0];
  }

  get second() {
    return this[1];
  }

  get third() {
    return this[2];
  }

  toList() {
    return listOf(this[0], this[1], this[2]);
  }
}

class Pair extends Array {
  constructor(key, value) {
    Object.freeze(super(key, value));
  }

  get first() {
    return this[0];
  }

  get second() {
    return this[1];
  }

  toList() {
    return listOf(this[0], this[1]);
  }
}

class Node {
  constructor(value = null, next = null, previous = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  /**
   * Returns a string representation of the linked list
   */
  toString() {
    let output = "";
    let current = this.head;
    while (current) {
      output = `${output}${current.value} -> `;
      current = current.next;
    }
    return `${output}null`;
  }

  static fromValues(...values) {
    const ll = new LinkedList();
    for (let i = values.length - 1; i >= 0; i--) {
      ll.insertAtHead(values[i]);
    }
    return ll;
  }

  static fromList(list) {
    return this.fromValues(...list);
  }

  toList() {
    let list = listOf();
    let current = this.head;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list;
  }

  /**
   * Inserts data at head
   * @param {any} data
   */
  insertAtHead(data) {
    const newNode = new Node(data, this.head);
    this.head = newNode;
    this.length++;
    return this;
  }

  /**
   * Inserts data at an index
   * @param {Number} index
   * @param {any} data
   * @returns
   */
  insertAtIndex(index, data) {
    if (index === 0) return this.insertAtHead(data);
    const previous = this.getNodeByIndex(index - 1);
    if (previous === null) return null;
    previous.next = new Node(data, previous.next);
    this.length++;
    return this;
  }

  /**
   * Gets the node at a particular index
   * @param {Number} index
   * @returns {Node}
   */
  getNodeByIndex(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  /**
   * Returns the value at a particular index
   * @param {Number} index
   * @returns {any}
   */
  getValueByIndex(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current.value;
  }

  /**
   * Removes the node at the head of the linked list
   */
  removeHead() {
    this.head = this.head.next;
    this.length--;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node();
    this.length = 0;
    this.tail = this.head;
  }

  toString() {
    let output = "";
    let current = this.head;
    while (current) {
      output = `${output}${current.value || null} <-> `;
      current = current.next;
    }
    return `${output}null`;
  }

  static fromValues(...values) {
    const ll = new DoublyLinkedList();
    for (let i = 0; i < values.length; i++) {
      ll.insertAtHead(values[i]);
    }
    return ll;
  }

  static fromList(list) {
    return this.fromValues(...list);
  }

  toList() {
    let list = listOf();
    let current = this.head;
    while (current) {
      list.push(current.value);
      current = current.next;
    }
    return list.filterFirstNotNull();
  }

  insertAtHead(value) {
    return this.append(value);
  }

  insertAtTail(value) {
    return this.prepend(value);
  }

  append(value) {
    let newNode = new Node(value);
    this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;
    this.length++;
    return this;
  }

  prepend(value) {
    let newNode = new Node(value);
    newNode.next = this.head;
    this.head.previous = newNode;
    this.head = newNode;
    this.length++;
    return this;
  }

  insert(index, value) {
    return this.insertAtIndex(index, value);
  }

  insertAtIndex(index, value) {
    if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
      throw new Error(`Invalid index. Current length is ${this.length}`);
    }

    if (index === 0) {
      this.prepend(value);
      return this;
    }

    if (index === this.length) {
      this.append(value);
    }

    let newNode = new Node(value);
    let previousNode = this.head;

    for (let k = 0; k < index - 1; k++) {
      previousNode = previousNode.next;
    }

    let nextNode = previousNode.next;
    newNode.next = nextNode;
    previousNode.next = newNode;
    newNode.previous = previousNode;
    nextNode.previous = newNode;

    this.length++;
    return this;
  }

  remove(index) {
    if (!Number.isInteger(index) || index < 0 || index > this.length + 1) {
      throw new Error(`Invalid index. Current length is ${this.length}`);
    }

    if (index === 0) {
      this.head = this.head.next;
      this.head.previous = null;
      this.length--;
      return this;
    }

    if (index === this.length - 1) {
      this.tail = this.tail.previous;
      this.tail.next = null;
      this.length--;
      return this;
    }

    let previousNode = this.head;

    for (let k = 0; k < index - 1; k++) {
      previousNode = previousNode.next;
    }

    let deleteNode = previousNode.next;
    let nextNode = deleteNode.next;

    previousNode.next = nextNode;
    nextNode.previous = previousNode;

    this.length--;
    return this;
  }
}

function listOf(...args) {
  if (args.length === 1) {
    return new List(1).fill(...args);
  }
  return new List(...args);
}

function pairOf(arg1, arg2) {
  if (arguments.length !== 2) {
    const error = `Argument length of two expected`;
    throw new Error(error);
  }
  return new Pair(arg1, arg2);
}

function tripleOf(first, second, third) {
  if (arguments.length !== 3) {
    const error = `Argument length of three expected`;
    throw new Error(error);
  }
  return new Triple(first, second, third);
}

Array.prototype.toList = function () {
  return listOf(...this);
};

Set.prototype.toList = function () {
  return listOf(...this);
};

module.exports = {
  listOf,
  pairOf,
  tripleOf,
  Pair,
  Triple,
  List,
  LinkedList,
  DoublyLinkedList,
};
