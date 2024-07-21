const { HashMap } = require('../HashMap');
const { LinkedList } = require('../../Linked-List/LinkedList'); 

describe('HashMap', () => {
  let hashMap;

  beforeEach(() => {
    hashMap = new HashMap();
  });

  test('should create an empty hash map', () => {
    expect(hashMap.length()).toBe(0);
    expect(hashMap.getKeys()).toEqual([]);
  });

  test('should set and get values by key', () => {
    hashMap.set('name', 'Alice');
    expect(hashMap.get('name')).toBe('Alice');
  });

  test('should update the value of an existing key', () => {
    hashMap.set('name', 'Alice');
    hashMap.set('name', 'Bob');
    expect(hashMap.get('name')).toBe('Bob');
  });

  test('should return null for a non-existing key', () => {
    expect(hashMap.get('nonexistent')).toBeNull();
  });

  test('should correctly handle hash collisions', () => {
    // Forcing collision by using keys that would hash to the same bucket
    hashMap.set('abc', 'value1');
    hashMap.set('acb', 'value2');
    expect(hashMap.get('abc')).toBe('value1');
    expect(hashMap.get('acb')).toBe('value2');
  });

  test('should return the correct length', () => {
    hashMap.set('name', 'Alice');
    hashMap.set('age', 25);
    expect(hashMap.length()).toBe(2);
  });

  test('should correctly check for existence of a key', () => {
    hashMap.set('name', 'Alice');
    expect(hashMap.has('name')).toBe(true);
    expect(hashMap.has('age')).toBe(false);
  });

  test('should remove a key-value pair', () => {
    hashMap.set('name', 'Alice');
    expect(hashMap.remove('name')).toBe(true);
    expect(hashMap.get('name')).toBeNull();
    expect(hashMap.length()).toBe(0);
  });

  test('should return false when trying to remove a non-existing key', () => {
    expect(hashMap.remove('nonexistent')).toBe(false);
  });

  test('should clear all entries in the hash map', () => {
    hashMap.set('name', 'Alice');
    hashMap.set('age', 25);
    hashMap.clear();
    expect(hashMap.length()).toBe(0);
    expect(hashMap.get('name')).toBeNull();
    expect(hashMap.get('age')).toBeNull();
  });

  test('should return all keys', () => {
    hashMap.set('name', 'Alice');
    hashMap.set('age', 25);
    expect(hashMap.getKeys()).toEqual(expect.arrayContaining(['name', 'age']));
  });

  test('should return all values', () => {
    hashMap.set('name', 'Alice');
    hashMap.set('age', 25);
    expect(hashMap.values()).toEqual(expect.arrayContaining(['Alice', 25]));
  });

  test('should return all key-value pairs', () => {
    hashMap.set('name', 'Alice');
    hashMap.set('age', 25);
    expect(hashMap.entries()).toEqual(expect.arrayContaining([['name', 'Alice'], ['age', 25]]));
  });

  test('should resize the hash map and rehash all keys', () => {
    const initialSize = hashMap.buckets.length;
    for (let i = 0; i < initialSize * 2; i++) {
      hashMap.set(`key${i}`, `value${i}`);
    }
    expect(hashMap.buckets.length).toBeGreaterThan(initialSize);
    for (let i = 0; i < initialSize * 2; i++) {
      expect(hashMap.get(`key${i}`)).toBe(`value${i}`);
    }
  });
});
