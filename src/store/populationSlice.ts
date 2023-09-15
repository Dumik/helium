import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface PopulationData {
  Year: string;
  Nation: string;
  Population: number;
}

interface PopulationState {
  data: { data: PopulationData[] };
  loading: boolean;
  error: string | null;
}

const initialState: PopulationState = {
  data: { data: [] },
  loading: false,
  error: null,
};

// Create an async thunk to fetch population data from an API
export const fetchPopulationData = createAsyncThunk(
  'population/fetchPopulationData',
  async () => {
    // Fetch population data from an external API
    const response = await fetch(
      'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
    );

    // Check if the response is successful, otherwise throw an error
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    // Parse the response as JSON and return the data
    const data = await response.json();
    return data;
  },
);

// Create a population slice using createSlice
const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Handle actions related to fetching population data
    builder
      .addCase(fetchPopulationData.pending, state => {
        // Set loading to true when the request is pending
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(
        fetchPopulationData.fulfilled,
        (state, action: PayloadAction<PopulationData[]>) => {
          // Handle successful data fetching
          state.loading = false; // Set loading to false
          (state.data as any) = action.payload; // Update state with fetched data
        },
      )
      .addCase(fetchPopulationData.rejected, (state, action) => {
        // Handle the case where data fetching is rejected
        state.loading = false; // Set loading to false
        state.error = action.error.message || 'An unknown error occurred'; // Store the error message
      });
  },
});

export default populationSlice.reducer; // Export the reducer for use in the Redux store
