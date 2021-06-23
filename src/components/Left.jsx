import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

// const url="https://api.spotify.com/v1/browse/featured-playlists";
const accessToken =
  "BQBWRtFgwQd4voF_sSb-q_cRMU7IGUkWwrzTurKgXTM_AKSEN0pOW7pr9SxYF28_2yEkx4JvCtFcUazD8JdnunnYrzv1GI-GR2wzRdznEcVlPOtSNfO1YxRdHayhHBx5HLfWh7ysLNOzzilDxzZrvS3tT1NJnIA";

const authAxios = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

function Left() {
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
    <div className="bg-light text-center py-5">
      <h3>featured playlists</h3>
      <div>
        {playlists.items &&
          playlists.items.map((item) => {
            return <Card item={item} addbtn={true} />;
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
