const { v4: uuidv4 } = require("uuid");

let todos = [
  {
    id: "722b5176-216a-4eb5-8afd-77000a0a232e",
    description: "Task 1",
    completed: false,
    createdAt: "2020-10-07T13:38:03.821Z",
  },
  {
    id: "6e1550d4-e389-49e5-a2da-a2a787ffefde",
    description: "Task 2",
    completed: true,
    createdAt: "2020-10-07T13:38:03.821Z",
  },
  {
    id: "c511eb46-50d9-4234-8248-7405604bda9a",
    description: "Task 3",
    completed: false,
    createdAt: "2020-10-07T13:38:03.821Z",
  },
];

const find = () => Promise.resolve([...todos]);
const findById = (id) =>
  new Promise((resolve) => {
    const todo = todos.find((t) => t.id == id);

    return resolve(todo);
  });
const create = (todo) =>
  new Promise((resolve) => {
    todo.id = uuidv4();
    todo.createdAt = new Date();
    todo.completed = false;
    todos.push(todo);

    return resolve({ ...todo });
  });
const remove = (id) =>
  new Promise((resolve) => {
    const oldLength = todos.length;
    todos = todos.filter((t) => t.id != id);
    const length = todos.length;

    const deleted = length < oldLength;
    return resolve(deleted);
  });
const update = (todo, id) =>
  new Promise((resolve) => {
    const index = todos.findIndex((t) => t.id == id);
    if (index == -1) {
      return resolve(null);
    }
    todos[index] = { ...todos[index], ...todo, id };

    return resolve({ ...todos[index] });
  });

module.exports = {
  find,
  findById,
  create,
  remove,
  update,
};
