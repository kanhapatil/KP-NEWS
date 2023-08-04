import React from 'react';
import { SpinnerDiamond } from 'spinners-react';
import "../styles/home.css";

const Loader = () => {
  return (
    <div id='spinner'>
      <SpinnerDiamond
        size={90}
        thickness={169}
        speed={131}
        color="rgba(153, 51, 255, 1)"
        secondaryColor="rgba(0, 255, 255, 1)"
      />
    </div>
  );
};

export default Loader;
