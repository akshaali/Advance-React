import React from "react";
import logo from "./logo.svg";
import "./App.css";
import InfiniteScrolling from "./features/InfiniteScrolling";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <InfiniteScrolling />
      </header>
    </div>
  );
}

export default App;
