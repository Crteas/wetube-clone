import express from "express";
import {
  watch,
  getEdit,
  upload,
  deleteVideo,
  postEdit,
} from "../controllers/videoController";

const videoRouter = express.Router();

// /:id(파라미터) ":" -->> 얘를 넣는것이 중요함
// 이렇게하는 이유는 express한테 이게 변수라는걸 알려주기 위해서임
// /:id를 위에 두면 upload를 파라미터로 착각함.
//(\\d+)는 정규식! \d+는 뒤에 숫자만 받겠다!
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
/* videoRouter.get("/:id(\\d+)/edit", getEdit);
videoRouter.post("/:id(\\d+)/edit", postEdit); */

export default videoRouter;
