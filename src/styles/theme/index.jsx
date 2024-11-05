import Typography from "@/styles/theme/typography";
import breakpoints from "@/styles/theme/breakpoints";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { darkModePalette, lightModePalette } from "./palette";
export const ThemeProvider = ({ children }) => {
  const themeMode = useSelector((state) => state.themeSlice.mode);
  const themeOptions = {
    palette: themeMode === "light" ? lightModePalette : darkModePalette,
    Typography,
    breakpoints,
  };
  const theme = createTheme(themeOptions);
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};
