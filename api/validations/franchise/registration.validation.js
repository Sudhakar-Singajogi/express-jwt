const { franchiseRegistration } = require("./registration.schema");

module.exports = {
    addFranchiseValidation: async(req, res, next) => {
        const value = await franchiseRegistration.validate(req.body);
        if (value.error) {
            res.json({
                success: 0,
                message: value.error.details[0].message
            });
        } else {
            next();
        }
    }
};