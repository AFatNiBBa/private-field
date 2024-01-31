
import { Identity, createPrivateField as createPrivateFieldImpl } from "./create";

export { Identity };

/** Completely typed version of {@link createPrivateFieldImpl} */
export const createPrivateField = createPrivateFieldImpl as typeof createPrivateFieldImpl & {

    /** Nullable version of {@link createPrivateField} */
    <T>(v?: undefined): ReturnType<typeof createPrivateFieldImpl<T | undefined>>
};