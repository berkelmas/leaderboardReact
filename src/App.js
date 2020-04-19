import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Header from "./components/Header";
import MainPage from "./components/MainPage";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import CountryLeaderboardPage from "./components/CountryLeaderboardPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#65B8F9",
      // dark: will be calculated from palette.primary.main,
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: ["Poppins"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <div className="p-4 mt-3">
          <Route path="/" exact component={MainPage} />
          <Route
            path="/country-leaderboard"
            exact
            component={CountryLeaderboardPage}
          />
          <Redirect path="*" to={"/"} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
