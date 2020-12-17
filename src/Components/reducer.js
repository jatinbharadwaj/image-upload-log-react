export const initialState = {
  user: [],
  bucket: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BUCKET":
      return {
        ...state,
        bucket: [...state.bucket, action.item],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
