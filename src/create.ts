
/** Utility class that returns whatever has been passed as the first argument of its constructor */
export class Identity {
    constructor(obj: object) { return obj; }

    /**
     * Calls the current constructor on the provided object and types it correctly
     * @param obj The object on which to call the constructor
     */
    static define<T extends object>(obj: T) { return new this(obj) as T; }
}

/**
 * Creates a new JavaScript private field which can be attached to any object and will only be accessible through the methods provided by the return type of this function.
 * You can't use the private field on an object until you define it.
 * Each call creates a new private field, and they will all have their own indipendent value
 * @param v The default value for the private field
 * @returns A class with some utility methods that allow you to interact with the newly created private field
 */
export function createPrivateField<V>(v: V) {
	return class Self extends Identity {
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
		static get(obj: object) { return (obj as Self).#value; }

        /**
         * Sets the value of the private field in the provided object
         * @param obj The object in which to set the value of the private field
         * @param v The new value for the private field
         * @returns The same thing that's inside {@link v}
         */
		static set<T extends V>(obj: object, v: T) { return (obj as Self).#value = v; }
	}
}