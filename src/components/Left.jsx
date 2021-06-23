import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

// const url="https://api.spotify.com/v1/browse/featured-playlists";
const accessToken =
  "BQD7gQuYvx9B5ZvpvWZngzVtUp3veVBqNd6STMsw9CT71U0NgizZ3Or5UCLzRY2gSmlsrZp7BDiCvc4hNpw-ZrnTKr2rAENW8JjA9IjRJEcyQ68yF-VtdvXzctWf_o_wslbGdymfGVsdcUHitBiQuIUAl9ksJYA";
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
    <div className="pane text-left py-3">
      <h3 className="px-4">featured playlists</h3>
      <div>
        {playlists.items ? (
          playlists.items.map((item, index) => {
            return (
              <Card
                item={item}
                addbtn={true}
                addPlaylist={props.addPlaylist}
                key={index}
              />
            );
          })
        ) : (
          <div className="bg-light p-4 m-3">
            <h3 className="text-danger">
              Please update access token to see featured playlists!
            </h3>
          </div>
        )}

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
      </div>
    </div>
  );
}

export default Left;
