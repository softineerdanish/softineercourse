import express from "express";
import {
  logout,
  login,
  register,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgetPassword,
  resetPassword,
  addToPlayList,
  removeFromPlayList,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile,
} from "../controllers/userController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//To Register a new User
router.route("/register").post(singleUpload,register);

//Login
router.route("/login").post(login);

//Logout
router.route("/logout").get(logout);

//Get my Profile
router.route("/me").get(isAuthenticated, getMyProfile);

//delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

//Change PASSWORD
router.route("/changepassword").put(isAuthenticated, changePassword);

//Update Profile updateProfile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

//Update Profile Picture
router
  .route("/updateprofilepicture")
  .put(isAuthenticated,
    singleUpload,
     updateProfilePicture);

//ForgetPassword
router.route("/forgetpassword").post(forgetPassword);

//ResetPassword
router.route("/resetpassword/:token").put(resetPassword);

//Add To Playlist
router.route("/addtoplaylist").post(isAuthenticated ,addToPlayList );

//Remove From PlayList
router.route("/removefromplaylist").delete(isAuthenticated ,removeFromPlayList );


//Admin Routes

router.route("/admin/users").get(isAuthenticated ,authorizedAdmin,getAllUsers );

router.route("/admin/user/:id").put(isAuthenticated ,authorizedAdmin,updateUserRole )
.delete(isAuthenticated,authorizedAdmin,deleteUser);


export default router;
