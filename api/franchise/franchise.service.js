const poll = require("../../configuration/dbConn");

module.exports = {
    create: (data, callback) => {
        poll.query(
            `
        insert into franchise_trans_registration(
            trans001_reg_code,  trans001_first_name, trans001_last_name,
            trans001_email_id, trans001_phone_number, trans001_password, trans001_pre_fish, trans001_post_fish,
            trans001_country, trans001_state, trans001_city, trans001_address, trans001_zipcode, trans001_entry_by, trans001_modified_by
        ) value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `, [
                data.reg_code,
                data.first_name,
                data.last_name,
                data.email_id,
                data.phone_number,
                data.password,
                data.salt,
                data.post_fish,
                data.country,
                data.state,
                data.city,
                data.address,
                data.zipcode,
                data.entry_by,
                data.modified_by
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                } else {
                    return callback(null, results);
                }
            }
        );
    },
    getUserByUserEmail: (email, callback) => {
        poll.query(
            `select * from franchise_trans_registration where trans001_email_id = ?`, [email],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    }
};