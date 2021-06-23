import React from "react";

function Card(props) {
  let imageUrl = null;
  if (props.item.images.length !== 0) {
    imageUrl = props.item.images[0].url;
  }

  return (
    <div className="custom-card m-3">
      <div className="row">
        <div className="col-4 card-image">
          <img src={imageUrl} alt="playlistImage" />
        </div>
        <div className="col-8 p-4 text-left">
          <h4 className="text-truncate">{props.item.name}</h4>
          <p className="text-truncate">{props.item.description}</p>
          {props.addbtn && (
            <button
              className="btn"
              onClick={() => props.addPlaylist(props.item)}
            >
              add to playlists
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
