import React, { useState } from "react";
import Left from "./components/Left";
import Right from "./components/Right";

function App() {
  const [localPlaylists, setLocalPlaylists] = useState(
    JSON.parse(localStorage.getItem("localPlaylists"))
      ? JSON.parse(localStorage.getItem("localPlaylists"))
      : []
  );

  const addPlaylist = (list) => {
    setLocalPlaylists((prev) => {
      return [...prev, list];
    });
    localStorage.setItem(
      "localPlaylists",
      JSON.stringify([...localPlaylists, list])
    );
  };

  return (
    <div className="row p-3">
      <div className="col-lg-4">
        <Left addPlaylist={addPlaylist} />
      </div>
      <div className="col-lg-8">
        <Right localPlaylists={localPlaylists} />
      </div>
    </div>
  );
}

export default App;
