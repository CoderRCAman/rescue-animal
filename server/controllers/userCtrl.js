const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const { google } = require("googleapis");
const { getAuthDetails } = require("../middleware/auth");

const { OAuth2 } = google.auth;
const client = new OAuth2(
  "223407826323-pcf12i097m2dbhqfdv9079nr23vjbkeg.apps.googleusercontent.com"
);

const userCtrl = {
  getUser: async (req, res) => {
    const userDetail = getAuthDetails(req);
    console.log(userDetail);
    try {
      const user = await Users.findById(userDetail.user_id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUsersAllInfor: async (req, res) => {
    try {
      const users = await Users.find().select("-password");

      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password,  } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();
      res.json({
        msg: "User created successfully.",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      // If login success , create access token and refresh token

      res.cookie("role", user.role, {
        httpOnly: true,
        
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });
      res.cookie("user_id", user._id, {
        httpOnly: true,

        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });
      res.cookie("isLoggedIn", true, {
        httpOnly: true,

        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res
        .status(200)
        .json({ status: true, role: user.role, user_id: user._id });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // googleLogin: async (req, res) => {
  //   try {
  //     const { tokenId } = req.body;
  //     const verify = await client.verifyIdToken({
  //       idToken: tokenId,
  //       audience:
  //         "223407826323-pcf12i097m2dbhqfdv9079nr23vjbkeg.apps.googleusercontent.com",
  //     });

  //     const { email_verified, email, name } = verify.payload;

  //     const password =
  //       email +
  //       "dasdasdasd>dasdas.daasdasdasdsdoovydnjadaya123sdqwd<>sdasdasdf";

  //     const passwordHash = await bcrypt.hash(password, 12);

  //     if (!email_verified)
  //       return res.status(400).json({ msg: "Email verification failed." });

  //     const user = await Users.findOne({ email: email });

  //     if (user) {
  //       const isMatch = await bcrypt.compare(password, user.password);
  //       if (!isMatch)
  //         return res.status(400).json({ msg: "Password is incorrect." });
  //       res.cookie("role", user.role, {
  //         httpOnly: true,

  //         maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  //       });
  //       res.cookie("user_id", user._id.toString(), {
  //         httpOnly: true,

  //         maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  //       });
  //       res.cookie("isLoggedIn", true, {
  //         httpOnly: true,

  //         maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  //       });

  //       return res
  //         .status(200)
  //         .json({ status: true, role: user.role, user_id: user._id });
  //     } else {
  //       const newUser = new Users({
  //         name,
  //         email,
  //         password: passwordHash,
  //       });

  //       await newUser.save(); 
  //       console.log(user._id)
  //       res.cookie("role", user.role, {
  //         httpOnly: true,

  //         maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  //       });
  //       res.cookie("user_id", user._id.toString(), {
  //         httpOnly: true,

  //         maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  //       });
  //       res.cookie("isLoggedIn", true, {
  //         httpOnly: true,

  //         maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
  //       });

  //       return res
  //         .status(200)
  //         .json({ status: true, role: user.role, user_id: user._id });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500);
  //   }
  // },
  logout: async (req, res) => {
    try {
      res.clearCookie("role");
      res.clearCookie("user_id");
      res.clearCookie("isLoggedIn");
      res.json({ msg: "Logout successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req,res) =>{
    const userDetail = getAuthDetails(req);
    try {
      const user = await Users.findById(userDetail.user_id); 
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const {name,avatar,address} =req.body
      await Users.findOneAndUpdate({_id:req.userDetail.user_id},{
        name,
        avatar,
        address
      })

     
    
      res.json({ msg: "Update Success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

  }
};

module.exports = userCtrl;
