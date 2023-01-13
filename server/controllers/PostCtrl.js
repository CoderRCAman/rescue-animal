const { IncomingForm } = require("formidable");
const cloudinary = require("cloudinary");
const _ = require("lodash");
const PostModel = require("../models/postModel");
const { getAuthDetails } = require("../middleware/auth");
cloudinary.config({
  cloud_name: "bikrant",
  api_key: "128327745214283",
  api_secret: "-a0X5CTlBIJzjlUtHfdxR6ommB4",
});

const Post = async (req, res) => {
  const form = new IncomingForm({
    maxFileSize: 5 * 1024 * 1024,
    multiples: true,
    allowEmptyFiles: true,
  });
  const authDetails = getAuthDetails(req);
  console.log(authDetails);
  try {
    form.parse(req, async (err, fields, files) => {
      console.log("hskf");
      if (err) console.log(err);
      const uploadedPics = [];

      if (!_.isEmpty(files)) {
        for (let i = 0; i < files.file.length; ++i) {
          const file = files.file[i];
          await cloudinary.v2.uploader.upload(
            file.filepath,
            { folder: "minor" },
            async (err, result) => {
              if (err) console.log(err);
              const info = {
                public_id: result.public_id,
                download_url: result.secure_url,
              };

              uploadedPics.push(info);
            }
          );
        }
      }
      const { type, description } = fields;
      const newPost = new PostModel({
        description,
        images: uploadedPics,
        type,
        user_info: authDetails.user_id,
      }); 
      await newPost.save() ;
    });
    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "ISE" });
  }
};

module.exports = { Post };
