"use strict";

const form = document.querySelector("form");
const input = form.elements["new-todo"];

const app = document.querySelector("#app");

const data = {
  todos: ["Walk the dogs", "Work out", "Buy groceries"],
};

function template(props) {
  if (props.todos.length < 1) {
    return "<p>There aren't any todos yet.</p>";
  }

  const listItems = props.todos.map(function (task) {
    return `<li>${task}</li>`;
  });

  return `<ul>${listItems.join("")}</ul>`;
}

function handleSubmit(event) {
  event.preventDefault();

  data.todos.push(input.value);
  app.innerHTML = template(data);

  input.value = "";
}

app.innerHTML = template(data);
form.addEventListener("submit", handleSubmit);
