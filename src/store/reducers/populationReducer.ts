const initialState = {
  selectedCountry: '',
  selectedYear1: '0',
  selectedYear2: '0',
};

const populationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SELECTED_COUNTRY':
      return {
        ...state,
        selectedCountry: action.payload,
      };
    case 'SET_SELECTED_YEARS':
      return {
        ...state,
        selectedYear1: action.payload.year1,
        selectedYear2: action.payload.year2,
      };
    default:
      return state;
  }
};

export default populationReducer;
