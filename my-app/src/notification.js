import React from "react";
import "./Notification.css"; 

const Notification = ({ status, title, message }) => {
  let classes = "notification";

  if (status === "success") {
    classes += " success";
  } else if (status === "error") {
    classes += " error";
  } else if (status === "pending") {
    classes += " loading";
  }

  return (
    <div className={classes}>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
