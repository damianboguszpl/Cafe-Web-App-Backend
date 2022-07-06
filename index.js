const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
const db = require('./db/models')

app.use(express.json());
app.use(cors());

// Routers
// const usersRouter = require('./routes/Users');
// app.use("/users", usersRouter);

// const rolesRouter = require('./routes/Roles');
// app.use("/roles", rolesRouter);

// const userRolesRouter = require('./routes/UserRoles');
// app.use("/userroles", userRolesRouter);

// const regionsRouter = require('./routes/Regions');
// app.use("/regions", regionsRouter);

// const populationsRouter = require('./routes/Populations');
// app.use("/populations", populationsRouter);

// const deathsRouter = require('./routes/Deaths');
// app.use("/deaths", deathsRouter);

// const deathscausesRouter = require('./routes/DeathCauses');
// app.use("/deathcauses", deathscausesRouter);

// const filesRouter = require('./routes/Files')
// app.use("/files", filesRouter);

db.sequelize.sync().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}!`))
})