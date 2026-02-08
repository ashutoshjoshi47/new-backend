import app from "./app.js";
import sequelize from "./config/db.js";

const start = async () => {

    try {

        await sequelize.authenticate();

        console.log("database connected");

        await sequelize.sync();

        console.log("tables created");

        app.listen(process.env.PORT, () => {
            console.log("server running");
        });
    } catch (err) {
        console.error(err);
    }
};

start();