import { Store } from "use-global-hook";
import { ActionTypes, GlobalState } from "./types";

const actions = {
  setIsMoving: (store: Store<GlobalState, ActionTypes>, isMoving: boolean) => {
    store.setState({ ...store.state, isMoving });
  },
  setIsLoadingAssets: (store: Store<GlobalState, ActionTypes>, newState: boolean) => {
    store.setState({ ...store.state, isLoadingAssets: newState })
  }
};

export default actions;
