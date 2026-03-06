import "./App.css";
import Rerender from "./features/Rerender";
import UseReducer from "./features/UnderstandingHooks/UseReducer";
import UseActionState from "./features/UnderstandingHooks/UseActionState";
import UseOptimistic from "./features/UnderstandingHooks/UseOptimistic";

function App() {
  return (
    <div >
      <header className="App-header">
        <UseOptimistic />
      </header>
    </div>
  );
}

export default App;
