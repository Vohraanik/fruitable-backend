require('dotenv').config();
const YAML = require('yamljs');
const express = require("express");
const app = express();
const route = require("./routes/api/v1/index");
const connectdb = require("./db/mongoosedb");
var cors = require('cors');
var cookieParser = require('cookie-parser');
const googleLoginProvider = require("./utils/provider");
const passport = require("passport");
const connectChat = require("./utils/scoketIo");
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./src/api.yaml'); 



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(session({
    secret:process.env.REFRESHTOKEN,
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: true }  
}));
app.use(cors(
    {
        // origin: process.env.SCOKETIO_URL,
        origin: 'https://fruitablee.vercel.app',
        credentials: true

    }
));

app.use(cookieParser());
app.use(require('express-session')({ secret: process.env.REFRESHTOKEN, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/api/v1", route);

connectdb();
googleLoginProvider();
connectChat();

app.listen(8080, () => {
    console.log("server started at port 8080");
});
