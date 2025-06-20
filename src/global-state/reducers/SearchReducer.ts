import type { SearchAction } from "../actions/SearchFilterAction";

export interface SearchState {
  searchText: string;
  types: string[];
  habitats: string[];
  classification: string;
  results: any[];
  loading: boolean;
  error: string | null;
}



export const initialSearchState: SearchState = {
  searchText: "",
  types: [],
  habitats: [],
  classification: "",
  results: [],
  loading: false,
  error: null,
};


export const searchReducer = (state: SearchState, action: SearchAction): SearchState => {
  switch (action.type) {
    case "SET_SEARCH_TEXT":
      return { ...state, searchText: action.payload };
    case "SET_TYPES":
      return { ...state, types: action.payload };
    case "SET_HABITATS":
      return { ...state, habitats: action.payload };
    case "SET_CLASSIFICATION":
      return { ...state, classification: action.payload };
    case "SET_RESULTS":
      return { ...state, results: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET_FILTERS":
      return { ...state, types: [], habitats: [], classification: "" };
    default:
      return state;
  }
};
