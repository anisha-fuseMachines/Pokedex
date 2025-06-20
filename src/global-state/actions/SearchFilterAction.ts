export type SearchAction =
  | { type: "SET_SEARCH_TEXT"; payload: string }
  | { type: "SET_TYPES"; payload: string[] }
  | { type: "SET_HABITATS"; payload: string[] }
  | { type: "SET_CLASSIFICATION"; payload: string }
  | { type: "SET_RESULTS"; payload: any[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_FILTERS" };