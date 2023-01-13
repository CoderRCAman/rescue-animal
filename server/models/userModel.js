const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please enter your name!"], 
      default: '',
      trim: true,
    },
    email: {
      type: String,
      // required: [true, "Please enter your email!"],
      trim: true,
      default: '',

    },
    password: {
      type: String,
      // required: [true, "Please enter your password!"], 
      default: ''
      // required: true
    },
    role: {
      type: String,
      default: 'user',
    },
    address: {
      type: String,
      default: '',
    },
    
    isSubscribed: {
      type: Boolean,
      default: false
    },
    subcriptionOptions: {
      //holding users endpoints 
      type: {},
      default: {}
    },
    avatar: {
      type: {},
      default: {
        download_url:
          "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
        file_name: "",
      },
    },
  },
  {
    timestamps: true,
  },

);

module.exports = mongoose.model("Users", userSchema);
