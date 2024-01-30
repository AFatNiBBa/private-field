
/** Utility class that returns whatever has been passed as the first argument of its constructor */
class Base { constructor(obj: object) { return obj; } }

/**
 * Creates a new JavaScript private field which can be attached to any object and will only be accessible through the methods provided by the return type of this function.
 * You can't use the private field on an object until you define it.
 * Each call creates a new private field, and they will all have their own indipendent value
 * @param v The default value for the private field
 * @returns A class with some utility methods that allow you to interact with the newly created private field
 */
export function createPrivateField<V>(v: V) {
	return class Self extends Base {
		#value: V = v;

        /**
         * Tells whether the private field is defined in the provided object 
         * @param obj The object in which to check for the presence of the private field
         */
        static has(obj: object) { return #value in obj; }

        /**
         * Gets the value of the private field in the provided object
         * @param obj The object from which to get the value of the private field
         */
		static get(obj: any) { return (obj as Self).#value; }

        /**
         * Sets the value of the private field in the provided object
         * @param obj The object in which to set the value of the private field
         * @param v The new value for the private field
         * @returns The same thing that's inside {@link v}
         */
		static set<T extends V>(obj: any, v: T) { return (obj as Self).#value = v; }

        /**
         * Defines the private field on {@link obj}
         * @param obj The object on which to define the private field
         */
		static define<T extends object>(obj: T) { return new this(obj) as T; }
	}
}