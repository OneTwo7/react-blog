export const getRecommended = (post, posts) => {
  let recommended = [];
  let postsLength = posts.length;

  // same category
  for (let i = 0; i < postsLength; i++) {
    if (posts[i].category === post.category) {
      recommended.push({
        type: 'category',
        post: posts.splice(i, 1)[0]
      });
      postsLength--;
      i--;
    }
  }

  // same tags
  let tags = post.tags;
  if (recommended.length < 3 && tags) {
    tags = post.tags.split(' ');
    let tagsLength = tags.length;
    for (let i = 0; i < tagsLength; i++) {
      if (recommended.length === 3) {
        break;
      }
      for (let j = 0; j < postsLength; j++) {
        if (posts[j].tags.includes(tags[i])) {
          recommended.push({
            type: 'tag',
            tag: tags[i],
            post: posts.splice(j, 1)[0]
          });
          postsLength--;
          j--;
          if (recommended.length === 3) {
            break;
          }
        }
      }
    }
  } else {
    recommended = recommended.slice(0, 3);
  }

  return recommended;
};
