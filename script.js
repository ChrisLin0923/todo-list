document.addEventListener("DOMContentLoaded", () => {
	const todoList = document.getElementById("todo-list");
	const search = document.getElementById("search");
	const addButton = document.getElementById("add-item");
	const addTodoButton = document.getElementById("add-todo");

	// let todos = JSON.parse(localStorage.getItem("todos")) || [];

	let todos = JSON.parse(localStorage.getItem("todos")) || [
		{ description: "Buy groceries", dueDate: "2024-07-05" },
		{ description: "Attend meeting", dueDate: "2024-07-10" },
		{ description: "Workout session", dueDate: "2024-07-02" },
	];
	displayTodos(todos);
	function displayTodos(items) {
		todoList.innerHTML = "";
		items.forEach((item, index) => {
			const div = document.createElement("div");
			const text = document.createElement("span");
			text.textContent = item.description;
			console.log(item.description);

			const date = document.createElement("div");
			date.textContent = `Due Date: ${item.dueDate}`;

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

			const buttonContainer = document.createElement("div");
			buttonContainer.appendChild(editButton);
			buttonContainer.appendChild(deleteButton);

			div.appendChild(text);
			div.appendChild(date);
			div.appendChild(buttonContainer);

			// Add the fade-in class for the add animation
			div.classList.add("fade-in");

			todoList.appendChild(div);
		});
	}

	function editItem(index) {
		const newTodoDescription = prompt(
			"Edit your todo:",
			todos[index].description
		);
		if (newTodoDescription != null && newTodoDescription.trim() !== "") {
			todos[index].description = newTodoDescription.trim();
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

	function saveTodos() {
		localStorage.setItem("todos", JSON.stringify(todos));
	}

	search.addEventListener("input", () => {
		const searchText = search.value.toLowerCase();
		const filteredTodos = todos.filter((todo) =>
			todo.description.toLowerCase().includes(searchText)
		);
		displayTodos(filteredTodos);
	});

	addButton.addEventListener("click", () => {
		modal.classList.add("show");
		modal.classList.remove("hide");
	});

	addTodoButton.addEventListener("click", addTodo);

	displayTodos(todos);

	// Get the modal
	var modal = document.getElementById("myModal");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.classList.add("hide");
		modal.classList.remove("show");
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.classList.add("hide");
			modal.classList.remove("show");
		}
	};

	function addTodo() {
		console.log("Add To-Do function called"); // Debugging log

		// Get the to-do description from the user
		let description = document.getElementById("description").value;
		if (description.trim() === "") {
			alert("Description cannot be empty.");
			return;
		}

		// Get the due date from the user
		let dueDate = document.getElementById("due-date").value;
		if (dueDate.trim() === "") {
			alert("Due date cannot be empty.");
			return;
		}

		// Create a new list item
		let newToDo = {
			description: description,
			dueDate: dueDate,
		};

		todos.push(newToDo);
		saveTodos();
		displayTodos(todos);

		// Clear the input fields
		document.getElementById("description").value = "";
		document.getElementById("due-date").value = "";

		// Close the modal

		modal.classList.add("hide");
		modal.classList.remove("show");
	}
});
