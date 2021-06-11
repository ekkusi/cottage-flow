import { Store } from "use-global-hook";
import { ActionTypes, GlobalState } from "./types";

const actions = {
  setIsMoving: (store: Store<GlobalState, ActionTypes>, isMoving: boolean) => {
    store.setState({ isMoving });
  },
};

export default actions;
