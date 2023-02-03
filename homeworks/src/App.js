import React from "react";
import './styles/index.css';

import Router from "./Router";
import UserContextProvider from "./components/UserContextProvider";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </div>
  );
}

export default App;
