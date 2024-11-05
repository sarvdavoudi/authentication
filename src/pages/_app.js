import store from "@/redux/store";
import "@/styles/globals.css";
import { ThemeProvider } from "@/styles/theme";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}
