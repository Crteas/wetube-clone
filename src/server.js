import express from "express"; //node_modules 에서 express찾고있어요!!
import morgan from "morgan"; //External Middleware!

const PORT = 9000;

const app = express(); //Creates an Express application
const logger = morgan("combined"); //morgan!!

const homeController = (req, res) => {
  res.send("hi");
};
const loginController = (req, res) => {
  res.send("login!");
};

app.use(logger);

app.get("/", homeController);
app.get("/login", loginController);

const handleListening = () => {
  console.log(`Server Start! http://localhost:${PORT} 🚀`);
};

//서버가 리스닝하게 만들기
//listen(포트, listen 시작하면 실행될 함수)
app.listen(PORT, handleListening);
