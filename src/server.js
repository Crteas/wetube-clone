import express from "express"; //node_modules 에서 express찾고있어요!!

const PORT = 9000;

const app = express(); //Creates an Express application

//Middleware
//Middleware가 response 할수도 있음
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

//                  (request, response)
const handleHome = (req, res) => {
  return res.send("bye");
};

//use --> global middleware을 만들어줌
app.use(logger);

//누가 home (/) 으로 get Request를 보내면 반응하는 callback
//addEventListener("click",handleCLick)과 느낌은 똑같음
//app.get(route,middleware,callback) get requset를 보내고있음!
app.get("/", handleHome);

const handleListening = () =>
  console.log(`server listenting on port http://localhost:${PORT} 🚀`);

//서버가 리스닝하게 만들기
app.listen(PORT, handleListening);
