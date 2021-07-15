export const initialState = {
  user: null,
  token: null,
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  RESET_USER: 'RESET_USER',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case actionTypes.RESET_USER:
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
