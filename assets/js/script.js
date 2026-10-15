const form = document.querySelector("#register-form");
const habitAddInput = document.querySelector("#add-habit");
const habitList = document.querySelector(".habits ul");
const formError = document.querySelector(".form-error");

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

  const newHabit = createNewHabit(formattedHabitName);

  habitList.appendChild(newHabit);

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

  if (!habitItem) {
    return;
  }

  if (event.target.closest(".edit-btn")) {
    const editableHabit = habitItem.querySelector("span");
    const editHabitInput = document.createElement("input");

    editHabitInput.value = editableHabit.textContent;
    editableHabit.replaceWith(editHabitInput);

    habitItem.classList.add("editing");

    editHabitInput.focus();
    editHabitInput.select();

    return;
  }

  if (event.target.closest(".remove-btn")) {
    habitItem.remove();
    return;
  }

  habitItem.classList.toggle("completed");
});

const createNewHabit = (habitName) => {
  const habitItem = document.createElement("li");
  const habitActions = document.createElement("div");
  const habitText = document.createElement("span");
  const editBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  habitText.textContent = habitName;

  editBtn.type = "button";
  editBtn.setAttribute("aria-label", "Editar hábito");
  editBtn.innerHTML = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"                  
                >
                  <path
                    d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                  />
                  <path d="m15 5 4 4" />
                </svg>`;
  editBtn.classList.add("edit-btn");

  removeBtn.type = "button";
  removeBtn.setAttribute("aria-label", "Remover hábito");
  removeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
  removeBtn.classList.add("remove-btn");

  habitActions.classList.add("habit-actions");
  habitActions.appendChild(editBtn);
  habitActions.appendChild(removeBtn);

  habitItem.appendChild(habitText);
  habitItem.appendChild(habitActions);

  return habitItem;
};
