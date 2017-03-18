var todoList = {
	todo: [],
	addTodo: function(todoText) {
		this.todo.push({
			todoText: todoText,
			completed: false
		});
	},
	changeTodo: function(position, todoText) {
		this.todo[position].todoText = todoText;
	},
	deleteTodo: function(position) {
		this.todo.splice(position, 1);
	},
	toggleCompleted: function(position) {
		var todo = this.todo[position];
		//console.log(position);
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		var totalTodos = this.todo.length;
		var completedTodos = 0;
		for (var i = 0; i < totalTodos; i++) {
			if (this.todo[i].completed === true) {
				completedTodos++;
			}
		}
		if (completedTodos === totalTodos) {
			for (var j = 0; j < totalTodos; j++) {
				this.todo[j].completed = false;
			}
		} else {
			for (var k = 0; k < totalTodos; k++) {
				this.todo[k].completed = true;
			}
		}
	}
};


var handlers = {
	addTodo: function() {
		var addTodoTextInput = document.getElementById('addTodoTextInput');
		todoList.addTodo(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	},
	changeTodo: function() {
		var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
		var changeTodoTextInput = document.getElementById('changeTodoTextInput');
		todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value = '';
		changeTodoTextInput.value = '';
		view.displayTodos();
	},
	deleteTodo: function(position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleCompleted: function(position) {
		todoList.toggleCompleted(position);
		//console.log(position);
		view.displayTodos();
	},
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	}
};

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';
		for (var i = 0; i < todoList.todo.length; i++) {
			var todoLi = document.createElement('li');
			var todo = todoList.todo[i];

			todoLi.id = i;
			todoLi.appendChild(this.createCompletedCheckbox());
			todoLi.appendChild(document.createTextNode(todo.todoText));
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);

			//console.log(todo.completed);
		}
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.className = 'deleteButton';
		return deleteButton;
	},
	createCompletedCheckbox: function() {
		var completedCheckbox = document.createElement('input');	
		completedCheckbox.type = 'checkbox';
		completedCheckbox.className = 'completedCheckbox';
		return completedCheckbox;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector('ul');
		todosUl.addEventListener('click', function(e) {
			var target = e.target;
			if (target.className === 'deleteButton') {
				handlers.deleteTodo(parseInt(target.parentNode.id));
			} 
			
			//console.log(target);
		});


	}
};

view.setUpEventListeners();