import express from "express";
import { see, edit, upload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

// /:id(파라미터) ":" -->> 얘를 넣는것이 중요함
// 이렇게하는 이유는 express한테 이게 변수라는걸 알려주기 위해서임
// /:id를 위에 두면 upload를 파라미터로 착각함.
videoRouter.get("/upload", upload);
//(\\d+)는 정규식! \d+는 뒤에 숫자만 받겠다!
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);

export default videoRouter;
