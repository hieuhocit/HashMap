const { LinkedList } = require('../Linked-List/LinkedList');

const defaultHashMapSize = 16;
const defaultLoadFactor = 0.75;

class HashMap {
  /**
   * @param {number} hashMapSize
   * @param {number} loadFactor
   */
  constructor(hashMapSize = defaultHashMapSize, loadFactor = defaultLoadFactor) {
    this.buckets = new Array(hashMapSize).fill(null).map(() => new LinkedList());
    this.keys = {};
    this.loadFactor = loadFactor;
    this.count = 0;
  }

  /**
   * Converts key string to hash number.
   *
   * @param {string} key
   * @returns {number}
   */
  hash(key) {
    const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0), 0);
    return hash % this.buckets.length;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;

    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (!node) {
      bucketLinkedList.append({ key, value });
      this.count++;
    } else {
      node.data.value = value;
    }

    if (this.count > this.buckets.length * this.loadFactor) {
      this.resize();
    }
  }

  /**
   * Resizes the hash map
   */
  resize() {
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.buckets.length * 2).fill(null).map(() => new LinkedList());
    this.keys = {};
    this.count = 0;

    for (const bucket of oldBuckets) {
      if (bucket.size > 0) {
        bucket.toArray().map((LinkedListNode) => {
          this.set(LinkedListNode.data.key, LinkedListNode.data.value);
        });
      }
    }
  }

  /**
   * Takes one argument as a key and returns the value that is assigned to this key
   *
   * @param {string} key
   * @returns {*}
   */
  get(key) {
    const keyHash = this.hash(key);
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.data.value : null;
  }

  /**
   *  Takes a key as an argument and returns true or false based on whether or not the key is in the hash map
   *
   * @param {string} key
   * @returns {boolean}
   */
  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  /**
   * Takes a key as an argument. If the key is in the hash map, it should remove the entry with that key and return true. Otherwise, it returns false
   *
   * @param {string} key
   * @returns {boolean}
   */
  remove(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];

    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    if (node) {
      this.count--;
      return bucketLinkedList.remove(node.data);
    }
    return false;
  }

  /**
   * Returns the number of stored keys in the hash map
   *
   * @returns {number} length
   */
  length() {
    return Object.keys(this.keys).length;
  }

  /**
   * Removes all entries in the hash map
   */
  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => new LinkedList());
    this.keys = {};
    this.count = 0;
  }

  /**
   * Returns an array containing all the keys inside the hash map
   *
   * @returns {string[]} keys
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  /**
   * Returns an array containing all the values
   *
   * @return {*[]} values
   */
  values() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray().map((LinkedListNode) => LinkedListNode.data.value);
      return values.concat(bucketValues);
    }, []);
  }

  /**
   * Returns an array that contains each 'key, value' pair
   *
   * @returns {*[]} key-value
   */
  entries() {
    return this.buckets.reduce((values, bucket) => {
      const bucketKeyValues = bucket
        .toArray()
        .map((LinkedListNode) => [LinkedListNode.data.key, LinkedListNode.data.value]);
      return values.concat(bucketKeyValues);
    }, []);
  }
}

module.exports = { HashMap };
