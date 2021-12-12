import styles from "../styles/Home.module.css";
import React, { useState } from "react";

import axios from "axios";

export default function Home() {
  const [comment, setComment] = useState("");
  const [isToxic, setIsToxic] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const url = "https://iml-tox-det.herokuapp.com/predict/";

    setLoading(true);
    const resp = axios({
      method: "POST",
      url: url,
      data: {
        comment: comment,
      },
    })
      .then((resp) => {
        setIsToxic(resp.data.is_toxic);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.heading}>Toxicity Detector</h1>

        <form className={styles.form}>
          <input
            className={styles.inp}
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button
            className={styles.button}
            type="submit"
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            submit
          </button>
        </form>

        {comment.length > 0 ? (
          loading ? (
            <div className={styles.div}></div>
          ) : isToxic ? (
            <p>Toxic</p>
          ) : (
            <p>Not Toxic</p>
          )
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
