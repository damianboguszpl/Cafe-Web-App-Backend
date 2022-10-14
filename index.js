const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
const db = require('./db/models')

require('dotenv').config();

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(session({
//     key: "userId",
//     secret: "nb294fg294bg2nfmD#@d32d@#D32d",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 60*60*24 // 24hours,
//     },
// }));


// Routers

const categoriesRouter = require('./routes/Categories');
app.use("/categories", categoriesRouter);

const couponsRouter = require('./routes/Coupons');
app.use("/coupons", couponsRouter);

const orderDetailsRouter = require('./routes/OrderDetails');
app.use("/orderdetails", orderDetailsRouter);

const orderHeadersRouter = require('./routes/OrderHeaders');
app.use("/orderheaders", orderHeadersRouter);

const orderStatusesRouter = require('./routes/OrderStatuses');
app.use("/orderstatuses", orderStatusesRouter);

const paymentsRouter = require('./routes/Payments');
app.use("/payments", paymentsRouter);

const productsRouter = require('./routes/Products');
app.use("/products", productsRouter);

const productStatusesRouter = require('./routes/ProdutStatuses');
app.use("/productstatuses", productStatusesRouter);

const reservationsRouter = require('./routes/Reservations');
app.use("/reservations", reservationsRouter);

const reviewsRouter = require('./routes/Reviews');
app.use("/reviews", reviewsRouter);

const rolesRouter = require('./routes/Roles');
app.use("/roles", rolesRouter);

const schedulesRouter = require('./routes/Schedules');
app.use("/schedules", schedulesRouter);

const specialOffersRouter = require('./routes/SpecialOffers');
app.use("/specialoffers", specialOffersRouter);

const tablesRouter = require('./routes/Tables');
app.use("/tables", tablesRouter);

const tableStatusesRouter = require('./routes/TableStatuses');
app.use("/tablestatuses", tableStatusesRouter);

const userCouponsRouter = require('./routes/UserCoupons');
app.use("/usercoupons", userCouponsRouter);

const usersRouter = require('./routes/Users');
app.use("/users", usersRouter);

app.use("/refresh", require('./routes/refresh')); // krótsza postać
app.use("/logout", require('./routes/logout'));

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}!`))
})