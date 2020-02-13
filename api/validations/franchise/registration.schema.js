const joi = require("@hapi/joi");

const schema = {
    franchiseRegistration: joi.object({
        reg_code: joi.string().required(),
        first_name: joi.string().required(),
        last_name: joi.string().required(),
        email_id: joi
            .string()
            .email()
            .message("Enter proper email Id")
            .required(),
        phone_number: joi
            .number()
            .min(1000000000)
            .message("Phone number min of 10 digits")
            .max(9999999999)
            .message("Invalid phone number")
            .required(),
        password: joi
            .string()
            .min(6)
            .message("Password must of min 6 characters")
            .pattern(new RegExp("^[a-zA-Z0-9]{6}$")),
        pre_fish: joi.string().required(),
        post_fish: joi.string().required(),
        country: joi
            .number()
            .min(1)
            .message("Country is not valid one")
            .max(200)
            .message("Country is not valid one")
            .required(),
        state: joi
            .number()
            .min(1)
            .message("State is not valid one")
            .required(),
        city: joi
            .number()
            .min(1)
            .message("City is not valid one")
            .required(),
        address: joi.string().required(),
        zipcode: joi.number().required(),
        entry_by: joi.number().required(),
        modified_by: joi.number().required()
    })
};

module.exports = schema;