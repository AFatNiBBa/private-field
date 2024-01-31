
# private-field
Allows you to define native private fields on arbitrary objects

## `createPrivateField()`
Crates a class with some static methods that allow you to define a private field on anything

### Static methods

#### `has()`
Tells whether the private field is defined in the provided object

#### `get()`
Gets the value of the private field in the provided object

#### `set()`
Sets the value of the private field in the provided object

#### `define()`
Defines the private field on the provided object

### Usage
```ts
const field = createPrivateField(12);
const obj = {};
console.log(field.has(obj));              // → false
console.log(field.define(obj) === obj);   // → true
console.log(field.has(obj));              // → true
console.log(field.get(obj));              // → 12
console.log(field.set(obj, 14));          // → 14
console.log(field.get(obj));              // → 14
```
Unfortunately, you can't use a private field until you define it
```ts
const field = createPrivateField();
const obj = {};
field.get(obj);                           // Error: The property is not defined on the object
field.set(obj);                           // Error: Same thing, even when setting it
field.has(obj);                           // Ok: Checking always works
```
You can create multiple private fields using the same function and they will all be indipendent from each other
```ts
const a = createPrivateField(1);
const b = createPrivateField("string");
const obj = {};
a.define(obj);
b.define(obj);
console.log(a.get(obj));                  // → 1
console.log(b.get(obj));                  // → "string"
```
If you define a private field on a `Proxy`, it won't be defined on the target, but on the `Proxy` itself (This is standard behaviour by the way).
You can see it clearly in the DevTools
```ts
const field = createPrivateField();
const target = {}, handler = {};
const proxy = new Proxy(target, handler);
field.define(proxy);
console.log(field.has(target));           // → false
console.log(field.has(handler));          // → false
console.log(field.has(proxy));            // → true
```
The function has multiple overloads that infer the type of the field:
```ts
createPrivateField();                     // The field type is `unknown`
createPrivateField(1);                    // The field type is `number`
createPrivateField(1 as const);           // The field type is `1`
createPrivateField("string");             // The field type is `string`
createPrivateField<boolean>();            // The field type is `boolean | undefined` since I didn't pass the initial value
```

## `Identity`
Utility class that returns whatever has been passed as the first argument of its constructor.
You can use it to define your own attached private properties
```ts
class AttachedFields extends Identity {
    #field1 = 1;
    #field2 = 2;
    #field3 = 3;
    // ...

    // Methods or accessors that can access those private fields
}

const obj = {};
AttachedFields.define(obj);               // The `define()` static method is on the base class
console.log(obj);                         // → { #field1: 1, #field2: 2, #field3: 3 }
```