import React from "react";
import Left from "./components/Left";
import Right from "./components/Right";

function App() {
  return (
    <div className="row">
      <div className="col-4">
        <Left />
      </div>
      <div className="col-8">
        <Right />
      </div>
    </div>
  );
}

export default App;
