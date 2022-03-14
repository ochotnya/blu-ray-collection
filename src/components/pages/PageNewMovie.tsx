import React from "react";
import AddMovie from "../AddMovie";
import NavigationBar from "../NavigationBar";

function NewMovie() {
  return (
    <>
      <NavigationBar />
      <div className="d-flex justify-content-center">
        <AddMovie />
      </div>
    </>
  );
}

export default NewMovie;
