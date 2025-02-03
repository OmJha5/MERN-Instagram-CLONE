import multer from "multer";

import {storage} from "../utils/cloudConfig.js"
export const singleUpload = multer({storage}).single("profilePhoto");