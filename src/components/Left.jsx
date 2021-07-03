import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

// const url="https://api.spotify.com/v1/browse/featured-playlists";
const accessToken =
  "BQChnRGKDrZwtCOQIt28GtLSK0tgVePC5Z3vU7VsFyCbZ5I1tPsP_XMi1pCuaU2mIYRViYw_DSulFFSrtEAgrX5TB6mkdiIXFGg1ez0SvTvZOIeR-NbWKBr-IkoaW9IVKSTqniM_0tAXtqUo-MnUD9geA44zKAk";
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

        {playlists.items && (
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
    </div>
  );
}

export default Left;
