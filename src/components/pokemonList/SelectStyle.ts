import type { StylesConfig, ThemeConfig } from "react-select";

interface FilterOption {
  value: string;
  label: string;
}

// Neutral color palette
const white = "#FFFFFF";
const lightGray = "#F9FAFB"; // light hover
const grayBorder = "#D1D5DB"; // border
const darkText = "#111827"; // slightly darker than before
const neutralText = "#6B7280"; // placeholder and icon

export const selectStyles: StylesConfig<FilterOption, boolean> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: `1px solid ${state.isFocused ? grayBorder : grayBorder}`,
    borderRadius: 4,
    boxShadow: "none",
    minHeight: 40,
    cursor: "pointer",
    "&:hover": {
      borderColor: grayBorder,
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: white,
    border: `1px solid ${grayBorder}`,
    borderRadius: 4,
    marginTop: 4,
    zIndex: 10,
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    backgroundColor: isSelected ? lightGray : isFocused ? "#F3F4F6" : white,
    color: darkText,
    padding: "8px 12px",
    cursor: "pointer",
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: darkText,
    padding: "2px 6px",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: neutralText,
    ":hover": {
      color: "#374151",
      backgroundColor: "transparent",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: neutralText,
  }),
  input: (base) => ({
    ...base,
    color: darkText,
  }),
  singleValue: (base) => ({
    ...base,
    color: white,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: neutralText,
    padding: 4,
    ":hover": {
      color: darkText,
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
