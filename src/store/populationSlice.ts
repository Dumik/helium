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

export const fetchPopulationData = createAsyncThunk(
  'population/fetchPopulationData',
  async () => {
    const response = await fetch(
      'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  },
);

const populationSlice = createSlice({
  name: 'population',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPopulationData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPopulationData.fulfilled,
        (state, action: PayloadAction<PopulationData[]>) => {
          state.loading = false;
          (state.data as any) = action.payload;
        },
      )
      .addCase(fetchPopulationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An unknown error occurred';
      });
  },
});

export default populationSlice.reducer;
