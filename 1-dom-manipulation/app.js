"use strict";

const form = document.querySelector("form");
const input = form.elements["new-todo"];

const ul = document.querySelector("ul");

function handleSubmit(event) {
  event.preventDefault();

  const li = document.createElement("li");
  li.textContent = input.value;

  ul.append(li);
  input.value = "";
}

form.addEventListener("submit", handleSubmit);
