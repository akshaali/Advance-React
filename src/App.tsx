import "./App.css";
import Rerender from "./features/Rerender";
import UseReducer from "./features/UnderstandingHooks/UseReducer";
import UseActionState from "./features/UnderstandingHooks/UseActionState";

function App() {
  return (
    <div >
      <header className="App-header">
        <UseActionState />
      </header>
    </div>
  );
}

export default App;
