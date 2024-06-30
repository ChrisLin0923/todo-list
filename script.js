document.addEventListener("DOMContentLoaded", () => {
	const todoList = document.getElementById("todo-list");
	const search = document.getElementById("search");
	const add = document.getElementById("add-item");
	const date = document.getElementsByClassName("date");

	let todos = JSON.parse(localStorage.getItem("todos")) || [];

	function displayTodos(items) {
		todoList.innerHTML = "";
		items.forEach((item, index) => {
			const div = document.createElement("div");
			const text = document.createElement("span");
			text.textContent = item;

			const date = document.createElement("div");
			const currentDate = new Date();
			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
			const day = String(currentDate.getDate()).padStart(2, "0");

			// Combine into a readable format
			const formattedDate = `${year}-${month}-${day}`;
			date.textContent = "Date added: " + formattedDate;
			date.className = "date";

			const editButton = document.createElement("button");
			editButton.textContent = "Edit";
			editButton.className = "edit-button";
			editButton.addEventListener("click", () => editItem(index));

			const deleteButton = document.createElement("button");
			deleteButton.textContent = "Delete";
			deleteButton.className = "delete-button";
			deleteButton.addEventListener("click", () =>
				deleteItem(index, div)
			);

			div.appendChild(text);
			div.appendChild(date);
			div.appendChild(editButton);
			div.appendChild(deleteButton);

			// Add the fade-in class for the add animation
			div.classList.add("fade-in");

			todoList.appendChild(div);
		});
	}

	function editItem(index) {
		const newTodo = prompt("Edit your todo:", todos[index]);
		if (newTodo != null && newTodo.trim() !== "") {
			todos[index] = newTodo.trim();
			saveTodos();
			displayTodos(todos);
		}
	}

	function deleteItem(index, element) {
		element.classList.add("fade-out");
		element.addEventListener("animationend", () => {
			todos.splice(index, 1);
			saveTodos();
			displayTodos(todos);
		});
	}

	function addItem() {
		const newTodo = prompt("Add your todo:");
		if (newTodo != null && newTodo.trim() !== "") {
			todos.push(newTodo.trim());
			saveTodos();
			displayTodos(todos);
		}
	}

	function saveTodos() {
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	search.addEventListener("input", () => {
		const searchText = search.value.toLowerCase();
		const filteredTodos = todos.filter((todo) =>
			todo.toLowerCase().includes(searchText)
		);
		displayTodos(filteredTodos);
	});

	add.addEventListener("click", addItem);

	displayTodos(todos);
});
