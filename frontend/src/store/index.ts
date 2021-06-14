import React from "react";
import globalHook from "use-global-hook";
import actions from "./actions";
import { GlobalState, ActionTypes } from "./types";

const initialState: GlobalState = {
  isMoving: false,
  isLoadingAssets: true,
  isNavigatingOut: false,
  isNavigatingIn: true,
  isPromptOpen: true,
};

const useGlobal = globalHook<GlobalState, ActionTypes>(
  React,
  initialState,
  actions
);

export default useGlobal;
