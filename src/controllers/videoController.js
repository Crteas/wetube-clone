const pru = {
  username: "pru",
  loggedIn: false,
};

export const trending = (req, res) => {
  const videos = [
    {
      title: "1",
      rating: 3,
      comment: 9999,
      createdAt: "2 mins ago",
      views: 108534,
      id: 1,
    },
    {
      title: "2",
      rating: 2,
      comment: 2354,
      createdAt: "2 mins ago",
      views: 12548,
      id: 1,
    },
    {
      title: "3",
      rating: 4,
      comment: 9874,
      createdAt: "2 mins ago",
      views: 4582,
      id: 1,
    },
  ];
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
