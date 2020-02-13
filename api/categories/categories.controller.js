const {
    getcategoriesforproducts,
    createCategory
} = require("./categories.services");
const logger = require("../../configuration/logger");

module.exports = {
    productCategories: (req, res) => {
        getcategoriesforproducts(req.params.active, (err, result) => {
            if (err) {
                res.status(500).json({
                    success: 0,
                    message: "Database connection problem"
                });
            } else {
                if (result.length > 0) {
                    res.status(200).json({
                        success: 1,
                        data: result
                    });
                } else {
                    res.status(200).json({
                        success: 0,
                        message: "Record not found"
                    });
                }
            }
        });
    },
    createCategory: (req, res) => {
        const body = {
            fields: req.body,
            file: req.file
        };
        createCategory(body, (err, results) => {
            if (err) {
                logger.error("Failed with database connection");
            } else {
                res.status(200).json({
                    success: 1,
                    message: "Category created successfully"
                });
            }
        });
    }
};