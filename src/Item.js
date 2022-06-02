import React, { useEffect, useState } from "react";
import "./App.css";
import { headers } from "./headers";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
function Item(props) {
  const [UserData, setUserData] = useState(null);
  const { name, mode } = props;
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://api.github.com/users/${name}`, {
        headers: headers,
      });
      const parsedRes = await res.json();
      setUserData(parsedRes);
    };
    fetchData();
  }, [name]);

  return (
    <>
      {UserData && (
        <div className="item">
          <div style={{ display: "flex" }}>
            <img
              src={UserData.avatar_url}
              className="avatar"
              alt="user avatar"
            />
            <div className="header">
              <div>
                <strong>{UserData.name}</strong>
                <div>
                  <a href={UserData.html_url} target="_blank" rel="noreferrer">
                    <b>@{UserData.login}</b>
                  </a>
                </div>
              </div>
              <div>
                Joined{" "}
                {new Date(UserData.created_at)
                  .toDateString()
                  .split(" ")
                  .slice(1)
                  .join(" ")}
              </div>
            </div>
          </div>
          <div className="content">
            <div style={{ wordBreak: "break-all", width: "90%" }}>
              {UserData.bio
                ? UserData.bio.substr(0, 200)
                : "This profile has no bio"}
            </div>
            <div
              className="box"
              style={{ backgroundColor: mode ? "#80808012" : "rgb(0, 30, 60)" }}
            >
              <div>
                <h4>Repos</h4>
                <div style={{ marginBottom: "10px" }}>
                  {UserData.public_repos}
                </div>
              </div>
              <div>
                <h4>Followers</h4>
                <div style={{ marginBottom: "10px" }}>{UserData.followers}</div>
              </div>
              <div>
                <h4>Following</h4>
                <div style={{ marginBottom: "10px" }}>{UserData.following}</div>
              </div>
            </div>
            <div className="Box">
              <div className="box2">
                <div style={{ display: "flex" }}>
                  <GitHubIcon />
                  <a href={UserData.html_url} target="_blank" rel="noreferrer">
                    {UserData.html_url}
                  </a>
                </div>
                <div style={{ display: "flex" }}>
                  <EmailIcon />{" "}
                  {UserData.email ? UserData.email : "Not Available"}
                </div>
              </div>
              <div className="box2">
                <div style={{ display: "flex" }}>
                  <LocationOnIcon />{" "}
                  {UserData.location ? UserData.location : "Not Available"}
                </div>
                <div style={{ display: "flex" }}>
                  <TwitterIcon />{" "}
                  {UserData.twitter_username
                    ? UserData.twitter_username
                    : "Not Available"}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Item;
