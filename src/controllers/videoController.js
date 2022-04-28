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
export const edit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: "edit", video });
};
export const search = (req, res) => res.send("Search Video!");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video!");
