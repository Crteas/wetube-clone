export const trending = (req, res) => res.render("home");
export const see = (req, res) => {
  //req.params는 parameter?
  return res.render("watch");
};
export const edit = (req, res) => {
  return res.render("edit");
};
export const search = (req, res) => res.send("Search Video!");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video!");
