import express from "express";
import {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getSingleProduct
} from "../controllers/productController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/").get(protect, authorizeRoles("admin","seller"), getProducts);

router
  .route("/create")
  .post(
    protect,
    authorizeRoles("admin"),
    upload.single("image"),
    createProduct
  );

router
  .route("/:id")
  .get(protect, authorizeRoles("admin","seller"), getSingleProduct)
  .delete(protect, authorizeRoles("admin"), deleteProduct)
  .put(protect, authorizeRoles("admin"),upload.single("image"), updateProduct);

export default router;
