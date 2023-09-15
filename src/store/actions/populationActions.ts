export const setSelectedCountry = (country: string) => ({
  type: 'SET_SELECTED_COUNTRY',
  payload: country,
});

export const setSelectedYears = (year1: string, year2: string) => ({
  type: 'SET_SELECTED_YEARS',
  payload: { year1, year2 },
});
