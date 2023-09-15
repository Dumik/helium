const initialState = {
  selectedYear: 0, // Initial value
  selectedCountry: '', // Initial value
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_YEAR':
      return {
        ...state,
        selectedYear: action.payload,
      };
    case 'SET_SELECTED_COUNTRY':
      return {
        ...state,
        selectedCountry: action.payload,
      };
    default:
      return state;
  }
};
