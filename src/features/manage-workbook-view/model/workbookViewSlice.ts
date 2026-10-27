import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface WorkbookViewState {
  activeVertical: string | null;
  filters: Record<string, string | number | boolean>;
  savedViews: string[];
  query: string;
  sort: string | null;
  density: 'comfortable' | 'compact';
  columnBands: string[];
  expandedRollups: string[];
  accuracyView: boolean;
}

const initialState: WorkbookViewState = { activeVertical: null, filters: {}, savedViews: [], query: '', sort: null, density: 'comfortable', columnBands: [], expandedRollups: [], accuracyView: false };

export const workbookViewSlice = createSlice({
  name: 'workbookView', initialState,
  reducers: {
    verticalChanged: (state, action: PayloadAction<string | null>) => { state.activeVertical = action.payload; },
    filtersChanged: (state, action: PayloadAction<WorkbookViewState['filters']>) => { state.filters = action.payload; },
    queryChanged: (state, action: PayloadAction<string>) => { state.query = action.payload; },
    sortChanged: (state, action: PayloadAction<string | null>) => { state.sort = action.payload; },
    densityChanged: (state, action: PayloadAction<WorkbookViewState['density']>) => { state.density = action.payload; },
    accuracyViewChanged: (state, action: PayloadAction<boolean>) => { state.accuracyView = action.payload; },
  },
  selectors: { selectActiveVertical: (state) => state.activeVertical, selectFilters: (state) => state.filters, selectQuery: (state) => state.query, selectDensity: (state) => state.density, selectAccuracyView: (state) => state.accuracyView },
});

export const { verticalChanged, filtersChanged, queryChanged, sortChanged, densityChanged, accuracyViewChanged } = workbookViewSlice.actions;
