import React from "react";
import axios from "axios";

const accessToken =
  "BQBH0C02kXRxs9H1WifgBLASVFP8FqUNkCOJoBc5PAInBkrz6ixa4_8NP12v1IQxpP5I4lToO54evo4OVASvR0re2ohGsVMX3apt_8WFMkBwmG5mgTUWbeg6Ygqz2anQ1wVe4wJ5lEj-xVYzezHdPEudUG_0kv8";
const authAxios = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

function Card(props) {
  let imageUrl = null;
  if (props.item.images.length !== 0) {
    imageUrl = props.item.images[0].url;
  }

  return (
    <div className="custom-card">
      <div className="row">
        <div className="col-4 card-image">
          <img src={imageUrl} alt="playlistImage" />
        </div>
        <div className="col-8 p-3 text-center">
          <h3 className="text-truncate">{props.item.name}</h3>
          <p className="text-truncate">{props.item.description}</p>
          {props.addbtn && (
            <button
              className="btn btn-primary"
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
