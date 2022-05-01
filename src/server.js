import "./db";
import express from "express"; //node_modules 에서 express찾고있어요!!
import morgan from "morgan"; //External Middleware!
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import heroRouter from "./routers/heroRouter";

const PORT = 9000;

const app = express(); //Creates an Express application
const logger = morgan("dev"); //morgan!!

//express 설정(set)
//View engine 설정하기. (express) 뷰 엔진을 퍼그로.
app.set("view engine", "pug");
//process.cwd() -> 노드가 시작하는 파일기준
app.set("views", process.cwd() + "/src/views");
app.use(logger);

//express.urlencoded post의 form안에있는 value들을 이해할 수 있도록 함.
app.use(express.urlencoded({ extended: true }));

//누가 "/"로 시작하는 url에 들어가면 express 는 globalRouter에 들어가서 url의 마지막 주소를 찾음.
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/hero", heroRouter);

const handleListening = () => {
  console.log(`✔  Server Start! http://localhost:${PORT} 🚀`);
};

//서버가 리스닝하게 만들기
//listen(포트, listen 시작하면 실행될 함수)
app.listen(PORT, handleListening);
