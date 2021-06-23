import React from "react";
import Card from "./Card";

function Right(props) {
  return (
    <div className="text-center pane py-3">
      <div className="d-flex justify-content-between px-5">
        <h3>Local playlists</h3>
      </div>

      <div className="row">
        {props.localPlaylists.map((item, index) => {
          return (
            <div className="col-lg-6" key={index}>
              <Card
                item={item}
                addbtn={false}
                removePlaylist={props.removePlaylist}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Right;
