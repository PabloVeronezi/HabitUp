const form = document.querySelector("#register-form");
const habitAddInput = document.querySelector("#add-habit");
const habitList = document.querySelector(".habits ul");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const habitName = habitAddInput.value.trim();

  if (habitName === "") {
    return;
  }

  const habitItem = document.createElement("li");

  habitItem.textContent = habitName;

  habitList.appendChild(habitItem);

  form.reset();

  habitAddInput.focus();
});
