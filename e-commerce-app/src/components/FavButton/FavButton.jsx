import React from "react";

const FavButton = () => {
  return (
    <button
      className={`${classes.favButton} ${isFavorited ? classes.active : ""}`}
      onClick={toggleClick}
    >
      Fav
    </button>
  );
};

export default FavButton;
