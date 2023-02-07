import React from "react";
import './styles/index.css';
import { SnackbarProvider } from "notistack";

import Router from "./Router";
import UserContextProvider from "./components/UserContextProvider";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <div className="App">
        <UserContextProvider>
          <Router />
        </UserContextProvider>
      </div>
    </SnackbarProvider>
  );
}

export default App;
