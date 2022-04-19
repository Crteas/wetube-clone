import express from "express"; //node_modules 에서 express찾고있어요!!
import morgan from "morgan"; //External Middleware!

const PORT = 9000;

const app = express(); //Creates an Express application
const logger = morgan("dev"); //morgan!!
app.use(logger);

//Make Router

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch");
videoRouter.get("/watch", handleWatchVideo);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit");
userRouter.get("/edit", handleEditUser);

const pruRouter = express.Router();
const handlePru = (req, res) => res.send("PRU IS GOOD");
pruRouter.get("/pru", handlePru);

//누가 "/"로 시작하는 url에 접근하면 videoRouter에 있는 컨트롤러를 찾게하는것
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/hero", pruRouter);

const handleListening = () => {
  console.log(`Server Start! http://localhost:${PORT} 🚀`);
};

//서버가 리스닝하게 만들기
//listen(포트, listen 시작하면 실행될 함수)
app.listen(PORT, handleListening);
