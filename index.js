const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
const db = require('./db/models')
const swaggerOptions = require('./config/swagger_options')

require('dotenv').config();

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001/api-info"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// swagger
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerSpecs = swaggerJsdoc(swaggerOptions)
app.use('/api-info', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// Routers
const usersRouter = require('./routes/Users');
app.use("/users", usersRouter);

const authRouter = require("./routes/Auth");
app.use("/auth", authRouter);

const rolesRouter = require('./routes/Roles');
app.use("/roles", rolesRouter);

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

const productStatusesRouter = require('./routes/ProductStatuses');
app.use("/productstatuses", productStatusesRouter);

const reservationsRouter = require('./routes/Reservations');
app.use("/reservations", reservationsRouter);

const reservationStatusesRouter = require('./routes/ReservationStatuses');
app.use("/reservationstatuses", reservationStatusesRouter);

const specialOffersRouter = require('./routes/SpecialOffers');
app.use("/specialoffers", specialOffersRouter);

const tablesRouter = require('./routes/Tables');
app.use("/tables", tablesRouter);

const tableStatusesRouter = require('./routes/TableStatuses');
app.use("/tablestatuses", tableStatusesRouter);

const userCouponsRouter = require('./routes/UserCoupons');
app.use("/usercoupons", userCouponsRouter);

const userCouponStatusesRouter = require('./routes/UserCouponStatuses');
app.use("/usercouponstatuses", userCouponStatusesRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}!`))
})