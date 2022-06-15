import React, { useState } from "react";
import ls from 'localstorage-slim'
import { lsSecret } from "@src/utility/Utils";

export default function TestApp() {
  const [password, setPassword] = useState("");
  const perfectPassword = "nimda!@#";
  const handleSubmit = () => {
    if (password === perfectPassword) {
      ls.set("testUser", "19992000tester123", {secret: lsSecret, encrypt: true});
      window.location.reload()
    } else {
      alert("Wrong Password!");
    }
  };
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Welcome! To Mobigift</h1>
      <br />
      <h3>Enter Password To Continue</h3>
      <br />
      <input
      style={{
        border: "2px solid #000000",
        width: "300px",
        height: "40px",
        fontSize: "24px"
      }}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
        value={password}
      />
      <br />
      <button
        style={{
          background: "#000000",
          width: "130px",
          height: "40px",
          color: "#ffffff",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
