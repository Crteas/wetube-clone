import express from "express"; //node_modules 에서 express찾고있어요!!

const PORT = 9000;

const app = express(); //Creates an Express application

//                  (request, response)
const handleHome = (req, res) => {
  return res.send("bye");
};

const handlelogin = (req, res) => {
  return res
    .status(200)
    .send("<a href ='https://expressjs.com/'>Login bro</a>");
};

const handleLove = (req, res) => {
  return res.send("Love");
};

//누가 home (/) 으로 get Request를 보내면 반응하는 callback
//addEventListener("click",handleCLick)과 느낌은 똑같음
//app.get(route,callback) get requset를 보내고있음!
app.get("/", handleHome);
app.get("/login", handlelogin);
app.get("/love", handleLove);

const handleListening = () =>
  console.log(`server listenting on port http://localhost:${PORT} 🚀`);

//서버가 리스닝하게 만들기
app.listen(PORT, handleListening);
