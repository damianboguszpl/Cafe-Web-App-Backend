const { Schedule } = require("../db/models")

module.exports = {
    // get all Schedules
    getAll: async (req, res) => {
        const schedules = await Schedule.findAll();
        res.json(schedules);
    },
    // get Schedule /w specific id
    getById: async (req, res) => {
        const id = req.params.id
        const schedule = await Schedule.findByPk(id);
        res.json(schedule);
    }
}