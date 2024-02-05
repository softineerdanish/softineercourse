import express from "express";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getCourseLectures,
} from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizedAdmin, isAuthenticated ,authorizedSubscribers } from "../middlewares/auth.js";

const router = express.Router();

//Get All Courses without lectures
router.route("/courses").get(getAllCourses);

//create new course only admin
router.route("/createcourse").post(isAuthenticated ,authorizedAdmin, singleUpload, createCourse);

//Add lecture, Delete Course  , Get Course Details,
router
  .route("/course/:id")
  .get(isAuthenticated,authorizedSubscribers,getCourseLectures)
  .post(isAuthenticated,authorizedAdmin,singleUpload, addLectures)
  .delete(isAuthenticated,authorizedAdmin,deleteCourse);

// Delete lecture
router.route("/lecture").delete(isAuthenticated ,authorizedAdmin, deleteLecture);



export default router;
