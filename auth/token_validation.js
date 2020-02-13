const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (!token) {
            return res.status(200).json({
                success: 0,
                message: "Access Denied ! unauthorized user"
            });
        } else {
            //remove the bearer(with a space) from the token
            actualToken = token.slice(7);
            verify(actualToken, process.env.JWTENCRYKEY, (err, decode) => {
                if (err) {
                    res.status(200).json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    console.log(decode);
                    next();
                }
            });
        }
    }
};