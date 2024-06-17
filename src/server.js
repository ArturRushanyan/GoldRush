const config = require("./config");

const startServer = async (app) => {
    try {
        app.listen(config.port, () => {
            console.log(`Server is up on port: ${config.port}`);
        });
    } catch (error) {
        console.log("Server is not running:", error);
    }
}




module.exports = startServer;