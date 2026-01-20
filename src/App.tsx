import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Gameboard from "./components/Gameboard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Gameboard />
      </header>
    </div>
  );
}

export default App;
