export const initialState = {
  user: [],
  bucket: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    //   case "UPDATE_IMAGE":
    //     return{
    //       ...state,
    //       image:[...state.image,action.item]
    //     };

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
