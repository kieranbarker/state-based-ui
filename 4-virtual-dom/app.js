import {
  Fragment,
  createElement,
  render,
} from "https://unpkg.com/preact@latest?module";

import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const app = createElement(App, {
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
  const [todos, setTodos] = useState(props.todos);

  const virtualDOM = createElement(
    Fragment,
    null,
    createElement(Form, { onSubmit: addTodo }),
    todos.length < 1
      ? createElement("p", null, "There aren't any todos yet.")
      : createElement(
          "ul",
          null,
          todos.map((todo) => createElement("li", { key: todo.id }, todo.name))
        )
  );

  function addTodo(name) {
    const newToDo = { id: window.crypto.randomUUID(), name };
    setTodos([...todos, newToDo]);
  }

  useEffect(() => {
    console.log(virtualDOM);
  }, [virtualDOM]);

  return virtualDOM;
}

function Form(props) {
  const [name, setName] = useState("");

  const label = createElement(
    "label",
    { for: "new-todo" },
    "What do you need to do?"
  );

  const input = createElement("input", {
    id: "new-todo",
    type: "text",
    value: name,
    required: true,
    onInput,
  });

  const button = createElement("button", { type: "submit" }, "Add todo");

  function onInput(event) {
    setName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    if (name.trim()) props.onSubmit(name);
    setName("");
  }

  return createElement(
    "form",
    { onSubmit },
    createElement("p", null, label, input),
    createElement("p", null, button)
  );
}

render(app, document.getElementById("app"));
