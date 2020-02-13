require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./configuration/logger");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Goofy API",
            description: "Goofy Turtle Inventory",
            contact: {
                name: "Sudhakar Singajogi"
            },
            servers: ["http://127.0.0.1:3000"]
        }
    },

    apis: ["./api/categories/categories.router.js", "./api/franchise/franchise.routers.js"]
};

const swaggerDocs = swaggerJsDocs(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

const franchiseRouter = require("./api/franchise/franchise.routers");
const categoriesRotuer = require("./api/categories/categories.router");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
    next();
});

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        });
    }
}

app.use(errHandler);
app.use("/api/franchise", franchiseRouter);
app.use("/api/category", categoriesRotuer);

app.get("/", (req, res) => {
    res.json({
        message: "This is the first rest API"
    });
});

app.listen(process.env.APP_PORT, () => {
    logger.info(`Server is up and running on port: ${process.env.APP_PORT}`);
});