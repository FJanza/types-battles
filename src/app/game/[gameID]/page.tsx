import React from "react";

export default function index({params}: {params: {gameID: string}}) {
  return <div>Juego: {params.gameID}</div>;
}
