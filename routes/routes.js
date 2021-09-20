const UsersController = require("../controllers/users_controller");


module.exports = (app) => {
  app.get("/api/user", UsersController.getAllUser);
  app.get("/api/user/:id", UsersController.getUserById);
  app.post("/api/user", UsersController.createUser);
  app.put("/api/user/:id", UsersController.editUser);
  app.delete("/api/user/:id", UsersController.deleteUser);
}
