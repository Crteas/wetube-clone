const pru = {
  username: "pru",
  loggedIn: false,
};

let videos = [
  {
    title: "first",
    rating: 3,
    comment: 9999,
    createdAt: "2 mins ago",
    views: 108534,
    id: 1,
  },
  {
    title: "second",
    rating: 2,
    comment: 2354,
    createdAt: "2 mins ago",
    views: 12548,
    id: 2,
  },
  {
    title: "third",
    rating: 4,
    comment: 9874,
    createdAt: "2 mins ago",
    views: 4582,
    id: 3,
  },
];
export const trending = (req, res) => {
  return res.render("home", { pageTitle: "home", videos });
};
export const watch = (req, res) => {
  //const id = req.params.id; 와 똑같음.
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video!" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comment: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
