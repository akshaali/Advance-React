import React from 'react';
import logo from './logo.svg';
import './App.css';
import ComponentA, { ComponentB } from './components/ComponenetA';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ComponentA>
          {/* the child throws during render when you click it, which triggers the boundary */}
          <ComponentB />
        </ComponentA>
      </header>    </div>
  );
}

export default App;
