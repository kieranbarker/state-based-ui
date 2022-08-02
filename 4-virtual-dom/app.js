import { Fragment, h, render } from "https://unpkg.com/preact@latest?module";

import {
  useEffect,
  useState,
} from "https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module";

const app = h(App, {
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

  const virtualDOM = h(
    Fragment,
    null,
    h(Form, { onSubmit: addTodo }),
    todos.length < 1
      ? h("p", null, "There aren't any todos yet.")
      : h(
          "ul",
          null,
          todos.map((todo) => h("li", { key: todo.id }, todo.name))
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

  function onInput(event) {
    setName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (trimmedName) {
      props.onSubmit(trimmedName);
    }

    setName("");
  }

  return h(
    "form",
    { onSubmit },
    h(
      "p",
      null,
      h("label", { for: "new-todo" }, "What do you need to do?"),
      h("input", {
        id: "new-todo",
        type: "text",
        value: name,
        required: true,
        onInput,
      })
    ),
    h("p", null, h("button", { type: "submit" }, "Add todo"))
  );
}

render(app, document.getElementById("app"));
