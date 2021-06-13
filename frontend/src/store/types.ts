export type ActionTypes = {
  setIsMoving: (isMoving: boolean) => void;
  setIsLoadingAssets: (newState: boolean) => void;
  setIsNavigating: (newState: boolean) => void;
};

export type GlobalState = {
  isMoving: boolean;
  isLoadingAssets: boolean;
  isNavigating: boolean;
};
