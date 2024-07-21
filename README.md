# Hash Map

This project provides an implementation of a HashMap data structure in JavaScript. The HashMap class is designed to store key-value pairs with efficient insert, delete, and lookup operations. It uses separate chaining with linked lists to handle hash collisions.


## Features

**Dynamic Resizing**: Automatically resizes and rehashes when the load factor exceeds a specified threshold.

**Efficient Operations**: Supports set, get, has, remove, length, clear, getKeys, values, and entries methods.

**Hash Collision Handling**: Uses linked lists to manage hash collisions.


## Installation

To use the HashMap implementation, clone the repository and ensure you have Node.js installed.

**1. Clone the repository:**

```
git clone https://github.com/hieuhocit/HashMap.git
```

**2. Install Dependencies:**

```
npm install
```

## Running Tests

**1. Run the tests:**

```
npm test
```


## Usage

```
const { HashMap } = require('./path/to/HashMap');
const hashMap = new HashMap();

// Setting a value
hashMap.set('name', 'Alice');

// Getting a value
console.log(hashMap.get('name')); // Outputs: Alice

// Checking if a key exists
console.log(hashMap.has('name')); // Outputs: true

// Removing a value
hashMap.remove('name');
console.log(hashMap.get('name')); // Outputs: null

// Getting the number of keys
console.log(hashMap.length()); // Outputs: 0
```

## Methods

- `set(key, value):` Sets the value for a key in the hash map.
- `get(key):` Returns the value associated with the key, or null if the key is not present.
- `has(key):` Checks if a key is present in the hash map.
- `remove(key):` Removes the value associated with the key and returns true. Returns false if the key is not present.
- `length():` Returns the number of keys in the hash map.
- `clear():` Removes all entries from the hash map.
- `getKeys():` Returns an array of all the keys in the hash map.
- `values():` Returns an array of all the values in the hash map.
- `entries():` Returns an array of key-value pairs.


## Author

This project is developed by [@hieuhocit](https://github.com/hieuhocit).
