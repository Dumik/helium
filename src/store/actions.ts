export const setSelectedYear = (year: number) => ({
  type: 'SET_SELECTED_YEAR',
  payload: year,
});

export const setSelectedCountry = (country: string) => ({
  type: 'SET_SELECTED_COUNTRY',
  payload: country,
});
