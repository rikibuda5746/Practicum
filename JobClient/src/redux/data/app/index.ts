import reducer, { actions, selectors, STATE_KEY } from "./modules/slice";
import saga from "./modules/saga";

export const appStateKey = STATE_KEY;
export { saga, reducer, actions, selectors };
