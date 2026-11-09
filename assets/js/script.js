const form = document.querySelector("#register-form");
const habitAddInput = document.querySelector("#add-habit");
const habitList = document.querySelector(".habits ul");
const formError = document.querySelector(".form-error");

const editIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-pencil preview-icon"
    aria-hidden="true"
  >
    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
  </svg>
`;

const saveIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-save preview-icon"
    aria-hidden="true"
  >
    <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
    <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
    <path d="M7 3v4a1 1 0 0 0 1 1h7" />
  </svg>
`;

const removeIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-trash preview-icon"
    aria-hidden="true"
  >
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
`;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const habitName = habitAddInput.value.trim();

  if (habitName === "") {
    formError.textContent = "Digite um hábito válido";
    formError.hidden = false;
    habitAddInput.focus();
    habitAddInput.classList.add("input-error");
    return;
  }

  const formattedHabitName =
    habitName.charAt(0).toUpperCase() + habitName.slice(1).toLowerCase();

  const habitItem = createNewHabit(formattedHabitName);

  habitList.appendChild(habitItem);

  form.reset();

  formError.hidden = true;

  habitAddInput.focus();
});

habitAddInput.addEventListener("input", () => {
  formError.hidden = true;
  habitAddInput.classList.remove("input-error");
});

habitList.addEventListener("click", (event) => {
  const habitItem = event.target.closest("li");
  const editButton = event.target.closest(".edit-btn");

  if (!habitItem) {
    return;
  }

  if (event.target.closest(".edit-btn")) {
    if (habitItem.classList.contains("editing")) {
      const editHabitInput = habitItem.querySelector("input");
      const editedHabitName = editHabitInput.value.trim();

      if (editedHabitName === "") {
        editHabitInput.focus();
        return;
      }

      const formattedHabitName =
        editedHabitName.charAt(0).toUpperCase() +
        editedHabitName.slice(1).toLowerCase();

      const habitText = document.createElement("span");
      habitText.textContent = formattedHabitName;
      habitText.classList.add("habit-text");

      editHabitInput.replaceWith(habitText);
      habitItem.classList.remove("editing");
      editButton.innerHTML = editIcon;
      editButton.setAttribute("aria-label", "Editar hábito");
    } else {
      const editableHabit = habitItem.querySelector("span");
      const editHabitInput = document.createElement("input");

      editHabitInput.value = editableHabit.textContent;
      editableHabit.replaceWith(editHabitInput);

      habitItem.classList.add("editing");
      editButton.innerHTML = saveIcon;
      editButton.setAttribute("aria-label", "Salvar hábito");

      editHabitInput.focus();
      editHabitInput.select();
    }
    return;
  }

  if (event.target.closest(".remove-btn")) {
    habitItem.remove();
    return;
  }

  if (event.target.closest(".habit-text")) {
    habitItem.classList.toggle("completed");
  }
});

habitList.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") {
    return;
  }

  const editHabitInput = event.target.closest("input");

  if (!editHabitInput) {
    return;
  }

  const habitItem = editHabitInput.closest("li");

  if (!habitItem.classList.contains("editing")) {
    return;
  }

  const editButton = habitItem.querySelector(".edit-btn");
  editButton.click();
});

const createNewHabit = (habitName) => {
  const habitItem = document.createElement("li");
  const habitText = document.createElement("span");
  const habitActions = document.createElement("div");
  const removeButton = document.createElement("button");
  const editButton = document.createElement("button");

  habitActions.classList.add("habit-actions");

  habitText.textContent = habitName;
  habitText.classList.add("habit-text");

  removeButton.type = "button";
  removeButton.innerHTML = removeIcon;
  removeButton.setAttribute("aria-label", "Remover hábito");
  removeButton.classList.add("remove-btn");

  editButton.type = "button";
  editButton.innerHTML = editIcon;
  editButton.setAttribute("aria-label", "Editar hábito");
  editButton.classList.add("edit-btn");

  habitActions.appendChild(editButton);
  habitActions.appendChild(removeButton);
  habitItem.appendChild(habitText);
  habitItem.appendChild(habitActions);

  return habitItem;
};
