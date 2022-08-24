import "./App.css";
import Test from "./components/Test";

function App() {
  const textStr =
    "Sed ut perspiciatis, unde omnis iste natus error sit voluptatem.";

  return (
    <div className="App" style={{ fontFamily: "monospace" }}>
      <Test textStr={textStr} />
    </div>
  );
}

export default App;
