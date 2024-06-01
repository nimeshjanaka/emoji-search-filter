import "./App.css";
import Home from "./component/Home";

function App() {
  return (
    <div
      className="App"
      style={{
        position: "relative",
        height: "100vh",
        maxHeight: "auto",
        background: "#33121d",
      }}
    >
      <Home />
    </div>
  );
}

export default App;
