import Video, { formatHashtags } from "../models/Video";

/*
callback

console.log("start")
Video.find({}, (error, videos) => {
    return res.render("home", { pageTitle: "home", videos });
});
console.log("finished")
*/

//async await
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  //return보다는 res.render이 중요함.. return은 안전장치
  return res.render("home", { pageTitle: "home", videos });
};
export const watch = async (req, res) => {
  //const id = req.params.id; 와 똑같음.
  const { id } = req.params;
  const video = await Video.findById(id);
  if (video) {
    return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
  }
  return res.status(404).render("404", { pageTitle: "VIDEO NOT FOUND" });
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "VIDEO NOT FOUND" });
  }
  return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });

  if (!video) {
    return res.status(404).render("404", { pageTitle: "VIDEO NOT FOUND" });
  }

  //findByIdAndUpadte(바꿀데이터의 아이디,바꿀것들)
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video!" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  //NEW video document
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
      meta: {
        views: 0,
        rating: 0,
      },
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video!",
      errorMessage: error._message,
    });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        //REGEXP 쓰는방법!
        $regex: new RegExp(`${keyword}$`, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "SEARCH", videos });
};
