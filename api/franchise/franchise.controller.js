const { create, getUserByUserEmail } = require("./franchise.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const mailer = require("nodemailer");

const { sign } = require("jsonwebtoken");
const logger = require("../../configuration/logger");
require("dotenv");

module.exports = {
    createFranchise: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        body.salt = salt;

        //call create service
        create(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection problem"
                });
            } else {
                //send an email to the franchise

                const transporter = mailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.GMAILUSER,
                        pass: process.env.GMAILPWD
                    }
                });

                //create message body
                let htmlTemplate = ` $template = '<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#dedede">
                <tr>
                    <td align="center" valign="top">
                        <table width="650" border="0" cellspacing="0" cellpadding="0" class="mobile-shell">
                            <tr>
                                <td class="td container" style="width:650px; min-width:650px; font-size:0pt; line-height:0pt; margin:0; font-weight:normal; padding:55px 0px;">
                                    <!-- Header -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom:1px solid #e4e4e4;">
                                        <tr>
                                            <td style="">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="p30-15" style="padding: 25px 30px 25px 30px;" bgcolor="#ffffff">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <th class="column-top" width="245" style="font-size:16pt; line-height:24pt; padding:0; margin:0; font-weight:normal; vertical-align:middle;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="img m-center" style="font-family:\'Noto Sans\', Arial,sans-serif; font-size:16pt; line-height:24pt; text-align:left;color:#007bff;">Goofy Turtle Franchise</td>
                                                                            </tr>
                                                                        </table>
                                                                    </th>
                                                                    <th class="column-empty" width="1" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal; vertical-align:top;"></th>
                                                                    <th class="column" style="font-size:0pt; line-height:0pt; padding:0; margin:0; font-weight:normal;">
                                                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-header" style="color:#999999; font-family:\'Noto Sans\', Arial,sans-serif; font-size:12px; line-height:16px; text-align:right; text-transform:uppercase;"><a href="#" target="_blank" class="link2" style="color:#999999; text-decoration:none;"><span class="link2" style="color:#999999; text-decoration:none;">&nbsp;</span></a></td>
                                                                            </tr>
                                                                        </table>
                                                                    </th>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                        <tr>
                                            <td style="">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                                    <tr>
                                                        <td class="p30-15" style="padding: 30px;">
                                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                <tr>
                                                                    <td class="h3 pb20" style="color:#114490; font-family:\'Noto Sans\', Arial,sans-serif; font-size:24px; line-height:32px; text-align:left; padding-bottom:20px;">Thanks for registering at Goofy Turtle Franchise.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text pb20" style="color:#777777; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">Hi <b> ${body.first_name}</b>,</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text pb20" style="color:#777777; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;">Thank you for creating your account at Goofy Turtle Franchise. Your account details are as follows:</td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                                <td class="text-button" style="background:#848484; color:#ffffff; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:18px; padding:10px 20px; text-align:left; width:75px;">Login Id:</td>
                                                                                <td class="text-button" style="background:#007bff; color:#ffffff; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:18px; padding:10px 20px; text-align:center;"><span class="link-white" style="color:#ffffff; text-decoration:none;">${body.email_id}</span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left" style="line-height:18px;">
                                                                        &nbsp;
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td align="left">
                                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                                            <tr>
                                                                            <td class="text-button" style="background:#848484; color:#ffffff; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:18px; padding:10px 20px; text-align:left; width:75px;">Password:</td>
                                                                                <td class="text-button" style="background:#007bff; color:#ffffff; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:18px; padding:10px 20px; text-align:center;"><span class="link-white" style="color:#ffffff; text-decoration:none;">${body.password}</span></td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text pb20" style="color:#777777; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:20px;padding-top:20px;">To sign in to your account, please <a href="" target="_blank">click here</a>.</td>
                                                                </tr>
                                                                <tr>
                                                                    <td class="text pb20" style="color:#777777; font-family:\'Noto Sans\', Arial,sans-serif; font-size:14px; line-height:26px; text-align:left; padding-bottom:10px;"><b>Thanks</b>,<br /><i>Team GTInventory</i>.</td>
                                                                </tr>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- Footer -->
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-top:1px dashed #c9c9c9;">
                                        <tr>
                                            <td class="p30-15" style="padding: 30px;" bgcolor="#ffffff">
                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                    <tr>
                                                        <td class="text-footer1 pb10" style="color:#999999; font-family:\'Noto Sans\', Arial,sans-serif; font-size:16px; line-height:20px; text-align:center; padding-bottom:10px;">Goofy Turtle Franchise</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="text-footer2 pb10" style="color:#999999; font-family:\'Noto Sans\', Arial,sans-serif; font-size:12px; line-height:26px; text-align:center; padding-bottom:10px;">Kundhan Bagh, Begumpet, Hyderbad - 500016</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    <!-- END Footer -->
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>';`;

                let messageBody = {
                    from: process.env.GMAILUSER,
                    to: "george@mailinator.com",
                    subject: "Franchise Registration Success",
                    html: htmlTemplate
                };

                transporter.sendMail(messageBody, (err, emailResult) => {
                    if (err) {
                        console.log(err.message);
                        logger.error(err.message);
                        return false;
                    } else {
                        logger.info(emailResult);
                    }
                    transporter.close();
                });

                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }
        });
    },
    loginFranchise: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                res.status(200).json({
                    success: 0,
                    message: "Invalid credentials"
                });
            }

            //if (compareSync(body.password, results.trans001_password)) {
                if(true) {
                 results.trans001_password = undefined;
                const jsonWebToken = sign({ result: results.trans001_email_id },
                    process.env.JWTENCRYKEY, {
                        expiresIn: process.env.JWT_TOKEN_EXPIRY
                    }
                );
                return res.status(200).json({
                    success: 1,
                    message: "login successfully",
                    token: jsonWebToken
                });
            } else {
                res.status(200).json({
                    success: 0,
                    message: "Invalid credentialsss"
                });
            }
        });
    }
};