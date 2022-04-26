const pru = {
  username: "pru",
  loggedIn: false,
};

export const trending = (req, res) => {
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 100, 1000];
  return res.render("home", { pageTitle: "home", videos });
};
export const see = (req, res) => {
  //req.params는 parameter?
  return res.render("watch", { pageTitle: "watch" });
};
export const edit = (req, res) => {
  return res.render("edit", { pageTitle: "edit" });
};
export const search = (req, res) => res.send("Search Video!");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video!");
