const app = require("./app");
const port = 3000 | process.env.PORT;

app.listen(port, () => {
    console.log(`🚀 Server listening http://127.0.0.1:${port}/ 🚀`);
});