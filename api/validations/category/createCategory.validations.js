const { createCategory } = require("./create.schema");

module.exports = {
    validateAddCategory: async(req, res, next) => {
        const value = await createCategory.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            const {
                parentCategoryExists
            } = require("../../categories/categories.services");

            if (parseInt(req.body.parentId) > 0) {
                parentCategoryExists(req.body.parentId, response => {
                    if (response) {
                        res.json({
                            success: 0,
                            message: "No parent category exists"
                        });
                    }
                });
            }
            next();
        }
    }
};