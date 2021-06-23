import React from "react";
import Card from "./Card";

function Right(props) {
  return (
    <div className="text-center bg-light">
      <div className="d-flex justify-content-between px-5">
        <h3>Local playlists</h3>
      </div>

      <div className="bg-light row">
        {props.localPlaylists.map((item) => {
          return (
            <div className="col-6">
              <Card item={item} addbtn={false} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Right;
