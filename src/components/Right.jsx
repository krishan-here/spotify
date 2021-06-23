import React, { useState } from "react";
import axios from "axios";
import Card from "./Card";
import Modal from "react-modal";

// const url ="https://api.spotify.com/v1/users/{user_id}/playlists";

const accessToken =
  "BQBWRtFgwQd4voF_sSb-q_cRMU7IGUkWwrzTurKgXTM_AKSEN0pOW7pr9SxYF28_2yEkx4JvCtFcUazD8JdnunnYrzv1GI-GR2wzRdznEcVlPOtSNfO1YxRdHayhHBx5HLfWh7ysLNOzzilDxzZrvS3tT1NJnIA";

const authAxios = axios.create({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

function Right() {
  const [userId, setUserId] = useState(null);
  const [localPlaylists, setLocalPlaylists] = useState([]);
  const [createPlaylist, setCreatePlaylist] = useState(false);
  const handleChange = (event) => {
    setUserId(event.target.value);
  };
  const showPlaylist = (event) => {
    event.preventDefault();
    let url =
      "https://api.spotify.com/v1/users/" +
      userId +
      "/playlists?limit=4&offset=5";
    authAxios
      .get(url)
      .then((response) => {
        setLocalPlaylists(response.data);
      })
      .catch((err) => console.log(err));
  };

  const createNewPlaylist = (event) => {
    event.preventDefault();
    const newPlay = {
      name: event.target.title.value,
      description: event.target.description.value,
    };
    let url = "https://api.spotify.com/v1/users/" + userId + "/playlists";
    authAxios
      .post(url, newPlay)
      .then(() => console.log("created.."))
      .catch((err) => console.log(err));
  };

  const newPlaylist = (
    <form onSubmit={createNewPlaylist}>
      <div className="d-flex justify-content-between">
        <h3>Create Playlist</h3>
        <button
          type="button"
          class="close"
          aria-label="Close"
          onClick={() => setCreatePlaylist(false)}
        >
          <h1 aria-hidden="true">&times;</h1>
        </button>
      </div>
      {/* <div className="form-group">
        <label for="img">Select image:</label>
        <input type="file" id="img" name="img" accept="image/*" />
      </div> */}
      <div className="form-group">
        <label for="title">title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label for="description">description</label>
        <input
          type="text"
          name="description"
          id="description"
          className="form-control"
        />
      </div>
      <button className="btn btn-success">Create</button>
    </form>
  );

  const modalStyle = {
    content: {
      width: "500px",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#f8f9fa",
      boxShadow: "0px 1px 11px 1px #6c6868",
    },
  };

  const nextPlayLists = () => {
    authAxios
      .get(localPlaylists.next)
      .then((response) => {
        setLocalPlaylists(response.data);
      })
      .catch((err) => console.log(err));
  };
  const prevPlayLists = () => {
    authAxios
      .get(localPlaylists.previous)
      .then((response) => {
        setLocalPlaylists(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="text-center bg-light">
      <form onSubmit={showPlaylist} className="m-3">
        <label for="user">Enter user id </label>
        <input
          type="text"
          name="user"
          value={userId}
          onChange={handleChange}
          id="user"
          className="m-2 form-control w-50 d-inline-block"
        />
        <button className="btn btn-warning m-2">go</button>
      </form>

      <div className="d-flex justify-content-between px-5">
        <h3>Local playlists</h3>
        <button
          className="btn btn-outline-primary"
          onClick={() => setCreatePlaylist(true)}
        >
          Create new playlist
        </button>
      </div>

      {createPlaylist && (
        <Modal
          isOpen="true"
          onRequestClose={() => setCreatePlaylist(false)}
          style={modalStyle}
        >
          {newPlaylist}
        </Modal>
      )}

      <div className="bg-light row">
        {localPlaylists.items &&
          localPlaylists.items.map((item) => {
            return (
              <div className="col-6">
                <Card item={item} addbtn={false} />
              </div>
            );
          })}
      </div>
      <div className="text-center">
        <button
          className="mx-5 btn btn-warning"
          onClick={() => prevPlayLists()}
        >
          {" "}
          {"<"}{" "}
        </button>
        <button
          className="mx-5 btn btn-warning"
          onClick={() => nextPlayLists()}
        >
          {" "}
          {">"}{" "}
        </button>
      </div>
    </div>
  );
}

export default Right;
