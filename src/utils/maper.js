export const maper = movies => {
  return movies.map(
    ({ id, title, backdrop_path: image, vote_count: vote }) => ({
      id,
      title,
      image,
      vote,
    })
  );
};
