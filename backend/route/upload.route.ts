import express from "express";
import {upload, multipleUpload} from "../middleware/upload";
import { uploadFile,uploadFiles } from "../controller/upload.controller";

const router = express.Router();


router.post("/singleupload", upload.single("file"), uploadFile);

router.post("/multipleUpload", multipleUpload, uploadFiles);

export default router;
