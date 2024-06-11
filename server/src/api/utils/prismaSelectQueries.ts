export const songSelectFields = {
  name: true,
  image: true,
  url: true,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
    },
  },
};

export const userSelectFields = {
  id: true,
  name: true,
  email: true,
  picture: true,
  songs: {
    select: {
      name: true,
      image: true,
      url: true,
    },
  },
};
