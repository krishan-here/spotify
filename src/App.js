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

  const removePlaylist = (removeList) => {
    setLocalPlaylists((prev) => {
      return prev.filter((list) => list.name !== removeList.name);
    });
    localStorage.setItem(
      "localPlaylists",
      JSON.stringify(
        localPlaylists.filter((list) => list.name !== removeList.name)
      )
    );
  };

  return (
    <div className="row p-3">
      <div className="col-lg-4">
        <Left addPlaylist={addPlaylist} />
      </div>
      <div className="col-lg-8">
        <Right
          localPlaylists={localPlaylists}
          removePlaylist={removePlaylist}
        />
      </div>
    </div>
  );
}

export default App;
