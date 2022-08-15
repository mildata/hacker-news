const URLS = {
  topStories: "https://hacker-news.firebaseio.com/v0/topstories.json",
  story: `https://hacker-news.firebaseio.com/v0/item/id.json`,
  author: `https://hacker-news.firebaseio.com/v0/user/id/.json`,
};

export async function getTopStories() {
  const response = await fetch(URLS.topStories);
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

export function getStoriesByIDs(ids) {
  const storyUrlPromiseArray = ids.map((id) => {
    return fetch(URLS.story.replace("id", id));
  });
  return Promise.all(storyUrlPromiseArray).then((responseArray) => {
    return Promise.all(
      responseArray.map((response) => {
        return response.json();
      })
    ).catch(err=>{console.log(err.message)});;
  }).catch(err=>{console.log(err.message)});;
}

export function getAuthorDataByIDs(ids) {
  const storyUrlPromiseArray = ids.map((id) => {
    return fetch(URLS.author.replace("id", id));
  });
  return Promise.all(storyUrlPromiseArray)
    .then((responseArray) => {
      return Promise.all(
        responseArray.map((response) => {
          return response.json();
        })
      ).catch((err) => {
        console.log(err.message);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}
