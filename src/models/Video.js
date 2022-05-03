import mongoose from "mongoose";

//데이터의 틀!
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});

// mongoose.model("모델이름",스키마(Schema))
const movieModel = mongoose.model("Video", videoSchema);

//그리고 꺼내기!
export default movieModel;
