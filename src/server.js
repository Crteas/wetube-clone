import express from "express"; //node_modules 에서 express찾고있어요!!
import morgan from "morgan"; //External Middleware!
import session from "express-session"; //Session import!
import MongoStore from "connect-mongo"; //세션을 저장하기위해서!

//import Router
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import heroRouter from "./routers/heroRouter";
import rootRouter from "./routers/rootRouter";

//import middleware
import { localsMiddleware } from "./middlewares";

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

app.use(
  session({
    secret: process.env.COOKIE_SECRET, //session hijack을 방지하기위한것. cookie에 sign하기위한 String
    resave: false,
    saveUninitialized: false, //세션에 변동이 있을때 저장하게하기
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);
//누가 "/"로 시작하는 url에 들어가면 express 는 globalRouter에 들어가서 url의 마지막 주소를 찾음.
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/hero", heroRouter);

export default app;
