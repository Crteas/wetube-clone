import express from "express"; //node_modules 에서 express찾고있어요!!

const PORT = 9000;

const app = express(); //Creates an Express application

//누가 home (/) 으로 get Request를 보내면 반응하는 callback
//addEventListener("click",handleCLick)과 느낌은 똑같음
//app.get(route,callback) get requset를 보내고있음!
app.get("/", () => console.log("someone try to go home."));

const handleListening = () =>
  console.log(`server listenting on port http://localhost:${PORT} 🚀`);

//서버가 리스닝하게 만들기
app.listen(PORT, handleListening);
