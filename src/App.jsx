import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./footer/Footer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="app-container">
        <main className="main-content">{/* Page Content */}</main>
      </div>

      {/* <h1>Vite + React</h1>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
