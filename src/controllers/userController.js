import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "JOIN!" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const exist = await User.exists({ $or: [{ username }, { email }] });
  if (exist) {
    return res.status(400).render("join", {
      pageTitle: "JOIN!",
      errorMessage: "이 username/email 은 이미 사용중입니다",
    });
  }

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "JOIN!",
      errorMessage: "비밀번호가 맞지않습니다.",
    });
  }
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    res.redirect("/login");
  } catch (error) {
    res.status(400).render("join", {
      pageTitle: "JOIN",
      errorMessage: error._message,
    });
  }
};
export const edit = (req, res) => res.send("User Edit");
export const remove = (req, res) => res.send("remove User!");
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login!" });
};
export const postLogin = async (req, res) => {
  const pageTitle = "Login!";
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "계정이 존재하지않습니다.",
    });
  }
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const logout = (req, res) => res.send("LogOut!");
export const see = (req, res) => res.send("See User!");
