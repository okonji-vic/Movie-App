import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ErrorComponent.module.css";

const ErrorComponent = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Oops, something went wrong!</h1>
      <p className={styles.message}>We couldn’t process your request. Please try again.</p>
      <button className={styles.button} onClick={() => navigate("/")}>
        Refresh Page
      </button>
    </div>
  );
};

export default ErrorComponent;
