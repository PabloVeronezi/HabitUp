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

  const habitItem = document.createElement("li");

  habitItem.textContent = habitName;

  habitList.appendChild(habitItem);

  form.reset();

  formError.hidden = true;

  habitAddInput.focus();
});

habitAddInput.addEventListener("input", () => {
  formError.hidden = true;
  habitAddInput.classList.remove("input-error");
});
