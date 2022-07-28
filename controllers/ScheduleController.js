const { Schedule } = require("../db/models")

module.exports = {
    // create new Schedule
    create: async (req,res) => {
        const schedule = req.body;
        await Schedule.create(schedule);
        res.json(schedule);
    },
    // update Schedule
    update: async (req,res) => {
        const id = req.params.id;
        const updated = await Schedule.update(
            { 
                monday: req.body.monday,
                tuesday: req.body.tuesday,
                wednesday: req.body.wednesday,
                thursday: req.body.thursday,
                friday: req.body.friday,
                saturday: req.body.saturday,
                sunday: req.body.sunday,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
                UserId: req.body.UserId
            }, 
            {
            where: {
                id: id
            }
            });

        res.json("Updated successfully.");
    },
    // delete Schedule
    delete: async (req,res) => {
        const id = req.params.id;
        await Schedule.destroy({
            where: {
                id: id
            }
        })
        res.json("Deleted successfully.");
    },
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
    },
    // get Schedule by UserId
    getByUserId: async (req, res) => {
        const userid = req.params.userid
        const schedule = await Reservation.findOne({ where: { UserId: userid } });
        res.json(schedule);
    },
}