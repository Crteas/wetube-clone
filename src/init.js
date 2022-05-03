import "./db";
import "./models/Video";
import app from "./server";

const PORT = 9000;

const handleListening = () => {
  console.log(`✔  Server Start! http://localhost:${PORT} 🚀`);
};

//서버가 리스닝하게 만들기
//listen(포트, listen 시작하면 실행될 함수)
app.listen(PORT, handleListening);
