import { toggleTheme } from "@/redux/slices/themeSlice";
import { Switch } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const SwitchThemeBtn = () => {
  const themeMode = useSelector((state) => state.themeSlice.mode);
  const isLight = themeMode === "light";
  const dispatch = useDispatch();
  const handleToggle = () => {
    dispatch(toggleTheme());
  };
  return (
    <>
      <Switch checked={!isLight} onChange={handleToggle} />
    </>
  );
};

export default SwitchThemeBtn;
