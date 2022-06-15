import React from "react";
import Avatar from "@components/avatar";
import { splitForName } from "../../utility/Utils";

export default function ProfileName(props) {
  const { name } = props;
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary",
    ],
    color = states[stateNum];
  return (
    <Avatar
      initials
      color={color}
      className="text-uppercase"
      content={splitForName(name)}
      contentStyles={{
        borderRadius: 0,
        fontSize: "calc(18px)",
        width: "100%",
        height: "100%",
      }}
      style={{
        height: "40px",
        width: "40px",
      }}
    />
  );
}
