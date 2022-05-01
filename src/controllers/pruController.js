export const helloPru = (req, res) => res.send("Pru!!");

export const herolist = (req, res) => {
  return res.render("pru", { pageTitle: "Pru" });
};
export const postHeroList = (req, res) => {
  console.log(req.body);
  return res.end();
};

export const finalfantazy = (req, res) => res.send("ff14!");

export const chats = (req, res) => res.send("chats");
