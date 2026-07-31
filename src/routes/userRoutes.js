import { Router } from "express";
// import { celebrate } from "celebrate";
import {authenticate} from "../middleware/authenticate.js";
import { updateUserAvatar } from "../controllers/userController.js";
import { uploadSingle } from "../middleware/multer.js";

const router = Router();

router.patch("/users/me/avatar",
  authenticate,
  uploadSingle.single("photo"),
  updateUserAvatar
);


export default router;

