import React from "react";
import { useParams } from "react-router-dom";

function Module() {
  const param = useParams();

  console.log(param);

  return <></>;
}

export default Module;
