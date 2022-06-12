import "regenerator-runtime";
import "dotenv/config"; //env 파일을 쓰기위한 import!
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 9000;

const handleListening = () => {
  console.log(`✔  Server Start! http://localhost:${PORT} 🚀`);
};

//서버가 리스닝하게 만들기
//listen(포트, listen 시작하면 실행될 함수)
app.listen(PORT, handleListening);
