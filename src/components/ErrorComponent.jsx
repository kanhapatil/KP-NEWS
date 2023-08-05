import React from "react";
import "../styles/home.css";

const ErrorComponent = ({ message }) => {
  return (
    <div id="errormsg">
      <h1>⛔{message}</h1>
      <p>There was an error while fetching the news data.</p>
      <p>Please check your internet connection or try again later.</p>
    </div>
  );
};

export default ErrorComponent;
