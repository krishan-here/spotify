import React, { useState } from "react";
import Card from "./Card";

function Right(props) {
  const [showPlaylists, setShowPlaylists] = useState({ start: 0, end: 3 });

  const nextPlayLists = () => {
    setShowPlaylists((prev) => {
      if (prev.end + 4 < props.localPlaylists.length)
        return { start: prev.end + 1, end: prev.end + 4 };
      else {
        let remain = props.localPlaylists.length - prev.end - 1;
        return {
          start: props.localPlaylists.length - remain,
          end: props.localPlaylists.length - 1,
        };
      }
    });
  };
  const prevPlayLists = () => {
    setShowPlaylists((prev) => {
      if (prev.start - 4 >= 0)
        return { start: prev.start - 4, end: prev.end - 4 };
      else return { start: 0, end: 3 };
    });
  };

  return (
    <div className="text-center pane py-3">
      <div className="d-flex justify-content-between px-5">
        <h3>Local playlists</h3>
      </div>

      <div className="row">
        {props.localPlaylists.map((item, index) => {
          if (index >= showPlaylists.start && index <= showPlaylists.end) {
            return (
              <div className="col-lg-6" key={index}>
                <Card
                  item={item}
                  addbtn={false}
                  removePlaylist={props.removePlaylist}
                />
              </div>
            );
          }
        })}
      </div>
      {props.localPlaylists.length && (
        <div className="text-center">
          <button className="m-5 btn" onClick={() => prevPlayLists()}>
            {" "}
            {"<"}{" "}
          </button>
          <button className="m-5 btn" onClick={() => nextPlayLists()}>
            {" "}
            {">"}{" "}
          </button>
        </div>
      )}
    </div>
  );
}

export default Right;
