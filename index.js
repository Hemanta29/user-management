const app = require("./app");
const config = require("./config");
app.listen(config._PORT, () => {
  console.log(`User management is running on port ${config._PORT}`);
})
