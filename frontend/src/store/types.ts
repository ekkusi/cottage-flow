export type ActionTypes = {
  setIsMoving: (isMoving: boolean) => void;
  setIsLoadingAssets: (newState: boolean) => void;
  setIsNavigatingOut: (newState: boolean) => void;
  setIsNavigatingIn: (newState: boolean) => void;
  setIsPromptOpen: (newState: boolean) => void;
};

export type GlobalState = {
  isMoving: boolean;
  isLoadingAssets: boolean;
  isNavigatingOut: boolean;
  isNavigatingIn: boolean;
  isPromptOpen: boolean;
};
