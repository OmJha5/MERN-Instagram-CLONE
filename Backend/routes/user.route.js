import express from "express";
import { editProfile, followOrUnfollow, getProfile, getSuggestedUsers, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated , singleUpload , editProfile);
router.route('/suggested').get(isAuthenticated, getSuggestedUsers);
router.route('/followorunfollow/:id').get(isAuthenticated, followOrUnfollow);

export default router;