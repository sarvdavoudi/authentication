import Typography from "@/styles/theme/typography";
import breakpoints from "@/styles/theme/breakpoints";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { darkModePalette, lightModePalette } from "./palette";
import { setTheme } from "@/redux/slices/themeSlice";

export const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.themeSlice.mode);

  // همگام‌سازی Redux با localStorage هنگام بارگذاری صفحه
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  const themeOptions = {
    palette: themeMode === "light" ? lightModePalette : darkModePalette,
    typography: Typography,
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
