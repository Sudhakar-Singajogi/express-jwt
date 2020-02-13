const {
    productCategories,
    createCategory
} = require("./categories.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
    validateAddCategory
} = require("../validations/category/createCategory.validations");

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: "./upload/categoryImages",
    filename: (req, file, cb) => {
        return cb(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        );
    }
});

let fileFilter = function(req, file, cb) {
    var allowedMimes = ["image/jpeg", "image/pjpeg", "image/png"];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only jpg, png image files are allowed."));
        cb(null, false);
        return cb({ success: 0, message: "Allowed only .png, .jpg, .jpeg" });
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 200000000
    },
    fileFilter: fileFilter
});

/**
 * @swagger
 * /api/category/productCategories:
 *  get:
 *    description: get categories
 *    responses:
 *      '200':
 *        description: List of categories
 */
router.get("/productCategories", productCategories);
router.get("/productCategories/:active", productCategories);

var uploadCateg = upload.single("category_banner_img");

/**
 * @swagger
 * /api/category/addCategory:
 *   post:
 *      description: add a new category
 *      response:
 *        '200':
 *          description: new category added successfully
 *
 */
router.post(
    "/addCategory",
    checkToken,
    upload.single("category_banner_img"),
    validateAddCategory,
    createCategory
);

module.exports = router;