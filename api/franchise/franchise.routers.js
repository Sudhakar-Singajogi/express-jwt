//const { createFranchise, loginFranchise } = require("./franchise.controller");
const franchise = require("./franchise.controller");
const router = require("express").Router();

const { checkToken } = require("../../auth/token_validation");

const {
    addFranchiseValidation
} = require("../validations/franchise/registration.validation");



router.post("/login", franchise.loginFranchise);
router.post("/", checkToken, addFranchiseValidation, franchise.createFranchise);

module.exports = router;