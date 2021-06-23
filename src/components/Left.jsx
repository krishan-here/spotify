import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

// const url="https://api.spotify.com/v1/browse/featured-playlists";
const accessToken =
  "BQBH0C02kXRxs9H1WifgBLASVFP8FqUNkCOJoBc5PAInBkrz6ixa4_8NP12v1IQxpP5I4lToO54evo4OVASvR0re2ohGsVMX3apt_8WFMkBwmG5mgTUWbeg6Ygqz2anQ1wVe4wJ5lEj-xVYzezHdPEudUG_0kv8";
const authAxios = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

function Left(props) {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    authAxios
      .get(
        "https://api.spotify.com/v1/browse/featured-playlists?country=IN&limit=2"
      )
      .then((response) => {
        setPlaylists(response.data.playlists);
      })
      .catch((err) => console.log(err));
  }, []);

  const nextPlayLists = () => {
    authAxios
      .get(playlists.next)
      .then((response) => {
        setPlaylists(response.data.playlists);
      })
      .catch((err) => console.log(err));
  };
  const prevPlayLists = () => {
    authAxios
      .get(playlists.previous)
      .then((response) => {
        setPlaylists(response.data.playlists);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-light text-center">
      <h3>featured playlists</h3>
      <div>
        {playlists.items &&
          playlists.items.map((item) => {
            return (
              <Card item={item} addbtn={true} addPlaylist={props.addPlaylist} />
            );
          })}

        <div className="text-center">
          <button
            className="m-5 btn btn-warning"
            onClick={() => prevPlayLists()}
          >
            {" "}
            {"<"}{" "}
          </button>
          <button
            className="m-5 btn btn-warning"
            onClick={() => nextPlayLists()}
          >
            {" "}
            {">"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Left;
