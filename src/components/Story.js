import React from "react";
import styles from "./Story.module.scss";

const Story = ({ story, isLoading }) => {
  const loadingClass = isLoading ? styles.loading : "";

  return (
    <div className={styles.card}>
      <div className={styles["img-score-area"]}>
        <div className={styles["story-score-wrap"]}>
          <div className={`${styles["story-score-text"]} ${loadingClass}`}>
            {!isLoading && <h5>Story score</h5>}
          </div>
          <div className={`${styles["story-score-number"]} ${loadingClass}`}>
            {!isLoading && <span>{story.score}</span>}
          </div>
        </div>
        <div className={`${styles["story-img"]} ${loadingClass}`}>
          {!isLoading && (
            <img src={story.imageUrl} alt="" width="100%" height="100%" />
          )}
        </div>
      </div>
      <div className={styles["content-area"]}>
        <div className={styles.top}>
          <div className={`${styles["headline-wrap"]} ${loadingClass}`}>
            {!isLoading && <h3 className={styles.headline}>{story.title}</h3>}
          </div>
          <div className={`${styles["author-wrap"]} ${loadingClass}`}>
            {!isLoading && (
              <h4 className={styles.author}>
                by {story.author_id} ({story.karma} karma points)
              </h4>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={`${styles["date-wrap"]} ${loadingClass}`}>
            {!isLoading && <h5 className={styles.date}>{story.date}</h5>}
          </div>
          <div className={`${styles["btn-wrap"]} ${loadingClass}`}>
            {!isLoading && (
              <button
                className={styles.button}
                onClick={() => window.open(story.url, "_blank")}
              >
                <span className={styles.link}>Read article</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
