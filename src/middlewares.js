//res.local은 template와 express가 서로 공유가능한 비어있는 obj! 템플릿과 서버가 data를 주고 받을수있다.

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Metube";
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};
