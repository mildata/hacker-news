import "./App.scss";
import Header from "./components/Header";
import Stories from "./components/Stories";

function App() {
  return (
    <div className="container">
      <header className="header">
        <Header />
      </header>
      <div className="content">
        <Stories />
      </div>
    </div>
  );
}

export default App;
