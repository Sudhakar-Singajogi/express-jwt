const joi = require("@hapi/joi");

const schema = {
    createCategory: joi.object({
        parentId: joi.number().required(),
        categoryName: joi.string().required(),
        shortName: joi.string().required(),
        bannerImageMessage: joi.string().required(),
        messageSiteLink: joi.string().required(),
        entryBy: joi.number().required(),
        modifiedBy: joi.number().required()
    })
};

module.exports = schema;