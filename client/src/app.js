import butterflies from "./assets/butterflies.svg";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <div className="App-home">
        <img src={butterflies} className="Butterflies" alt="butterflies" />
        <p>welcome!</p>
      </div>
      <Header />
    </div>
  );
}

export default App;
