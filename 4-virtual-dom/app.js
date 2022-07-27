"use strict";

const container = document.querySelector("#app");
const root = ReactDOM.createRoot(container);

const app = React.createElement(App, {
  todos: [
    {
      id: "e3a803e7-8925-4fd0-9257-bce37b07739f",
      name: "Walk the dogs",
    },
    {
      id: "cc0d1616-6121-4e3d-8253-92d563fe4bbe",
      name: "Work out",
    },
    {
      id: "de037c1e-d48d-4069-ab7b-06b209c7220e",
      name: "Buy groceries",
    },
  ],
});

function App(props) {
  const [todos, setTodos] = React.useState(props.todos);

  const listItems = todos.map((todo) =>
    React.createElement("li", { key: todo.id }, todo.name)
  );

  const virtualDOM = React.createElement(
    React.Fragment,
    null,
    React.createElement(Form, { onSubmit: addTodo }),
    todos.length < 1
      ? React.createElement("p", null, "There aren't any todos yet.")
      : React.createElement("ul", null, listItems)
  );

  function addTodo(name) {
    const newToDo = { id: window.crypto.randomUUID(), name };
    setTodos([...todos, newToDo]);
  }

  React.useEffect(() => {
    console.log(virtualDOM);
  }, [virtualDOM]);

  return virtualDOM;
}

function Form(props) {
  const [name, setName] = React.useState("");

  const label = React.createElement(
    "label",
    { htmlFor: "new-todo" },
    "What do you need to do?"
  );

  const input = React.createElement("input", {
    id: "new-todo",
    type: "text",
    value: name,
    required: true,
    onChange,
  });

  const button = React.createElement("button", { type: "submit" }, "Add todo");

  function onChange(event) {
    setName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    props.onSubmit(name);
    setName("");
  }

  return React.createElement(
    "form",
    { onSubmit },
    React.createElement("p", null, label, input),
    React.createElement("p", null, button)
  );
}

root.render(React.createElement(React.StrictMode, null, app));
