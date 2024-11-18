import { alpha } from "@mui/material";

// theme/palette.js
const lightModePalette = {
  mode: "light",
  background: {
    default: "#f2fbfa",
    paper: "#fFFF",
  },
  primary: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
    contrastText: "#fff",
  },
  secondary: {
    light: "#FFFFFF",
    main: "#313A43",
  },
  info: {
    main: "hsl(20, 50%, 98%)",
    dark: "hsl(13, 31%, 94%)",
    text: "#FFFFFF",
  },
  error: {
    lighter: "rgba(235, 87, 87, 0.20)",
    main: "#EB5757",
    light: "rgba(235, 87, 87, 0.30)",
  },
  success: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
  },
  warning: {
    light: "rgba(248, 167, 30, 0.20)",
    main: "#F8A71E ",
  },
  gray: {
    0: "#FFFFFF",
    50: "#EEEEEE",
    100: "#F4F4FA",
    200: "#F6F8F9",
    300: "#E1E9EB",
    400: "#9BB5BE",
    500: "#cecfcf",
    600: "#5A6B87",
    700: "#161C24",
  },
};

const darkModePalette = {
  mode: "dark",
  primary: {
    main: "#2e7d32",
    light: "#4caf50",
    dark: "#1b5e20",
  },
  secondary: {
    light: "#FFFFFF",
    main: "#313A43",
    dark: "#FFFFFF",
  },
  info: {
    main: "hsl(220, 15%, 20%)",
    dark: "hsl(220, 20%, 15%)",
    text: "#FFFFFF",
  },
  background: {
    default: "#1a242e", // A lighter black (adjust this shade as desired)
    paper: "#313A43", // A lighter background for paper elements
  },
  gray: {
    1000: "#313A43",
    1100: "#1A242E",
    1200: "#09151F",
    500_8: alpha("#97AAC8", 0.08),
    500_12: alpha("#97AAC8", 0.12),
    500_16: alpha("#97AAC8", 0.16),
    500_24: alpha("#97AAC8", 0.24),
    500_32: alpha("#97AAC8", 0.32),
    500_48: alpha("#97AAC8", 0.48),
    500_56: alpha("#97AAC8", 0.56),
    500_80: alpha("#97AAC8", 0.8),
  },
};
export { lightModePalette, darkModePalette };
