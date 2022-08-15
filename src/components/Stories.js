import React, { useEffect, useState } from "react";
import Story from "./Story";
import { imgArray } from "../assets/img";
import {
  getAuthorDataByIDs,
  getStoriesByIDs,
  getTopStories,
} from "../services/stories-service";

const Stories = () => {
  // states
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //helper functions
  const pick10RandomIDS = (allStoriesIds) => {
    const IDs = allStoriesIds.sort(() => 0.5 - Math.random()).slice(0, 10);
    return IDs;
  };
  const getTransformedStory = (story, index) => {
    const modifiedStory = {
      id: story.id,
      title: story.title,
      url: story.url ? story.url : "",
      date: new Date(story.time * 1000).toLocaleString(),
      score: story.score,
      author_id: story.by,
      karma: 0,
      imageUrl: imgArray[index++],
    };
    return modifiedStory;
  };

  // update state functions
  const handleUpdateStory = (author, index) => {
    setStories((prevState) => {
      if (prevState) {
        const newState = prevState.map((obj) => {
          if (obj.author_id === author.id) {
            return { ...obj, karma: author.karma };
          }
          return obj;
        });
        return newState;
      }
    });
  };

  // fetch and transform data functions
  useEffect(() => {
    getTopStories().then((ids) => {
      setIsLoading(true);
      getStoriesByIDs(pick10RandomIDS(ids)).then((items) => {
        const modItems = items.map((item, index) => {
          return getTransformedStory(item, index);
        });
        setStories(modItems);
      });
    });
  }, []);

  useEffect(() => {
    const authorIDsArray = stories.map((story) => {
      return story.author_id;
    });
    getAuthorDataByIDs(authorIDsArray)
      .then((authorsDataArray) => {
        authorsDataArray.map((authorData) => {
          const author = {
            id: authorData.id,
            karma: authorData.karma,
          };
          handleUpdateStory(author);
        });
      })
      .then(() => {
          setIsLoading(false);
        }, 5000);
  }, [stories, setStories]);

  return (
    <>
      {stories
        .sort((a, b) => a.score - b.score)
        .map((story) => {
          return <Story story={story} key={story.id} isLoading={isLoading} />;
        })}
    </>
  );
};

export default Stories;
