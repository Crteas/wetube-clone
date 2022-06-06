import User from "../models/User";
import Video from "../models/Video";
import fetch from "node-fetch";
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
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login!" });
};

export const postLogin = async (req, res) => {
  const pageTitle = "Login!";
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
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

export const startGithubLogin = (req, res) => {
  //그냥 URL 있어보이게 만든것
  const baseUrl = `https://github.com/login/oauth/authorize`;
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  //URLSearchParams는 Object를 Url형식으로 합쳐준다!
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};

//깃허브에 들어갔다온 유저가 받아오는것들
export const finishGithubLogin = async (req, res) => {
  //URL 있어보이게 만들기!!
  const baseUrl = "https://github.com/login/oauth/access_token";
  //process.env.{KEY}
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  //받은 CODE를 access_token으로 바꾸기!
  const tokenRequest = await //nodeJS에서 fetch를 쓰려면 node-fetch를 써야함
  (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  //access_token을 가지고 GithubAPI를 이용해서 user의 정보를 가져오기!
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    //access_token은 github API URL을 fetch하는데 사용됨.
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    console.log(userData);
    //이메일받기
    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    //emailData.find를 하면 Obj이 반환됨.
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    //이 이메일을 가진 유저가 없다면!
    if (!user) {
      //만들기!
      try {
        user = await User.create({
          avatarUrl: userData.avatar_url,
          name: userData.name ? userData.name : "Unknown",
          email: emailObj.email,
          username: userData.login,
          password: "",
          location: userData.location ? userData.location : "",
          socialOnly: true,
        });
      } catch (error) {
        console.log(error);
        return res.redirect("/login");
      }
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
  } else {
    return res.redirect("/login");
  }
};

export const startKakaoLogin = (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const config = {
    client_id: process.env.KA_CLIENT,
    redirect_uri: "http://localhost:9000/users/kakao/finish",
    response_type: "code",
    client_secret: process.env.KA_SECRET,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  console.log(finalUrl);
  return res.redirect(finalUrl);
};

export const finishKakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const config = {
    client_id: process.env.KA_CLIENT,
    client_secret: process.env.KA_SECRET, //finish쪽도 시크릿키 필요함!
    redirect_uri: "http://localhost:9000/users/kakao/finish",
    grant_type: "authorization_code",
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://kapi.kakao.com";
    const userData = await (
      await fetch(`${apiUrl}/v2/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    console.log(userData);

    try {
      let user = await User.findOne({ email: userData.kakao_account.email });

      if (!user) {
        user = await User.create({
          name: userData.kakao_account.profile.nickname,
          email: userData.kakao_account.email,
          username: userData.kakao_account.profile.nickname,
          password: "",
          socialOnly: true,
        });
      }
      req.session.loggedIn = true;
      req.session.user = user;
    } catch (error) {
      console.log(error);
    }

    return res.redirect("/");
  }
};

export const getEdit = (req, res) => {
  res.render("edit-profile", {
    pageTitle: "Edit Profile!",
  });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl, username: sessionUsername, email: sessionEmail },
    },
    body: { name, email, username, location },
    file,
  } = req;
  const existsEmail = await User.findOne({ email });
  const existsUsername = await User.findOne({ username });

  if (existsEmail && existsEmail.email !== sessionEmail) {
    return res.render("edit-profile", {
      pageTitle: "Edit Profile!",
      errorMessage: "Email already exists!",
    });
  }

  if (existsUsername && existsUsername.username !== sessionUsername) {
    return res.render("edit-profile", {
      pageTitle: "Edit Profile!",
      errorMessage: "Username already exists!",
    });
  }

  const updateuser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updateuser;
  res.redirect("edit");
};
export const remove = (req, res) => res.send("remove User!");
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const getChangePassword = (req, res) => {
  return res.render("users/change-password", {
    pageTitle: "Change Password!",
  });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPw, newPw, newPWconfirm },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPw, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password!",
      errorMessage: "Old Password 가 일치하지 않습니다.",
    });
  }

  if (newPw !== newPWconfirm) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password!",
      errorMessage: "비밀번호가 일치하지 않습니다.",
    });
  }
  user.password = newPw;
  await user.save();
  req.session.destroy();
  return res.redirect("/login");
};

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");
  console.log(user);
  if (!user) {
    return res.status(404).render("404", { pageTitle: "User Not Found" });
  }
  return res.render("users/profile", {
    pageTitle: `${user.name}의 Profile`,
    user,
  });
};
