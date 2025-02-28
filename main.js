const express = require("express");
const app = express();

app.use(express.json());

let users = [];

app.post("/users", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name: name,
    email: email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

app.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex].name = name;
  users[userIndex].email = email;

  res.status(200).json(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.status(200).json(deletedUser);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
