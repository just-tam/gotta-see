var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;

  // Get number of completed todos.
    //FOR LOOP TECHNIQUE
  //  for (var i = 0; i < totalTodos; i++) {
  //    if (this.todos[i].completed === true) {
  //     completedTodos++;
  //    }
  //  }

   this.todos.forEach(function(todo) {
     if (todo.completed === true) {
       completedTodos++;
     }
   });

    // Case 1: If everything’s true, make everything false.
      //FOR LOOP TECHNIQUE
    //if (completedTodos === totalTodos) {
      //for (var i = 0; i < totalTodos; i++) {
      //  this.todos[i].completed = false;
      // }

      //FOREACH TECHNIQUE
    // this.todos.forEach(function(todo) {
     //    todo.completed = false;
     //  });

    // Case 2: Otherwise, make everything true.
      //FOR LOOP TECHNIQUE
    // } else {
      //for (var i = 0; i < totalTodos; i++) {
      //  this.todos[i].completed = true;
      //}

      //FOREACH TECHNIQUE
    // this.todos.forEach(function(todo) {
      //     todo.completed = true;
      //  });
      // }

    this.todos.forEach(function(todo) {
      // Case 1: If everything’s true, make everything false.
      if (completedTodos === totalTodos) {
        todo.completed = false;
      }
      // Case 2: Otherwise, make everything true.
      else {
        todo.completed = true;
      }
    });

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
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },

  addOnEnter: function() {
  if (event.keyCode == 13 || event.which == 13){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  }
  },

  changeOnEnter: function() {
  if (event.keyCode == 13 || event.which == 13){
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  }
  },

  toggleOnEnter: function() {
  if (event.keyCode == 13 || event.which == 13){
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  }
  }

};





var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul.itemList'); //select <ul> element and store in variable
    todosUl.innerHTML = ''; // access the <ul> element and set content to empty

//    for (var i = 0; i < todoList.todos.length; i++) { //create a loop that goes through every todo in todoList
//      var todoLi = document.createElement('li'); //create <li> element and store in variable
//      var todo = todoList.todos[i]; // store each individual todo found from the loop
//      var todoTextWithCompletion = ''; //create empty variable
//
//      if (todo.completed === true) {  //create if statement to check whether a todo item is completed or not and create conditions on what to display
//        todoTextWithCompletion = '(x) ' + todo.todoText + ' ';
//      } else {
//        todoTextWithCompletion = '( ) ' + todo.todoText + ' ';
//      }
//
//      todoLi.id = i;
//      todoLi.textContent = todoTextWithCompletion; //access the <li> text and make it the same as todoTextWithCompletion
//      todoLi.appendChild(this.createDeleteButton()); //add delete button to the end of each <li> element
//      todosUl.appendChild(todoLi); //add each <li> to the <ul> element
//    }

    todoList.todos.forEach(function(todo, position){
        var todoLi = document.createElement('li'); //create <li> element and store in variable

        var todoTextWithCompletion = ''; //create empty variable

        if (todo.completed === true) {  //create if statement to check whether a todo item is completed or not and create conditions on what to display
          todoTextWithCompletion = '(x) ' + todo.todoText + ' ';
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText + ' ';
        }

        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion; //access the <li> text and make it the same as todoTextWithCompletion
        todoLi.className = 'animated slideInUp';
		    todoLi.appendChild(this.createDeleteButton()); //add delete button to the end of each <li> element
        todosUl.appendChild(todoLi); //add each <li> to the <ul> element
    }, this);

  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    //deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton trashIcon fas fa-trash-alt';
    return deleteButton;
  },

  setUpEventListeners: function() {
    var todosUl = document.querySelector('ul.itemList');

      todosUl.addEventListener('click', function (event) {

      var elementClicked = event.target; //get element that was clicked on

      if (elementClicked.className === 'deleteButton trashIcon fas fa-trash-alt') {  //check if element clicked is a delete button
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
   });
  }
};

view.setUpEventListeners();

//
//
// SEARCH FORM API section
//
//

document.getElementById("searchForm").addEventListener("submit", function(event){
  event.preventDefault();
  let searchText = document.getElementById("searchText").value;
  getMovies(searchText);
  function resetForm() {
  document.getElementById("searchForm").reset();
  }
  resetForm();
});

function getMovies(searchText) {
//Get movie and tv show title from TMDB
    fetch("https://api.themoviedb.org/3/search/multi?api_key=2b4f894eefbd06f502e13a966aff5aa9&language=en-US&query=" + searchText).then(function(response) {
      response.text().then(function(text) {
       var data = JSON.parse(text);
       let movie = data.results;
       let allTitles = movie.length;


       for (var i = 0; i < allTitles; i++) {
       let title = movie[i].title;
       let name = movie[i].name;

       let movieDataList = document.getElementById('movieData');
       let selectMovieData = document.getElementById('selectMovie');
       //movieTitleUL.innerHTML = '';
       let movieDataItems = document.createElement('option');
       movieDataItems.value = title || name;
       movieDataItems.textContent = title || name;
       movieDataList.appendChild(selectMovieData);
       selectMovieData.appendChild(movieDataItems);
       movieDataList.style.display = 'block';
        delete movie;

       selectMovieData.onchange = function(){

         let movieTitleUL = document.querySelector('ul.itemList'); //select <ul> element and store in variable
         let movieTitleLi = document.createElement('li');
         //movieTitleLi.textContent = selectedMovie;
         movieTitleUL.appendChild(movieTitleLi);
         movieTitleLi.textContent = this.value;
         let trashIcon = document.createElement('button');
         trashIcon.className = 'deleteButton trashIcon fas fa-trash-alt';
         movieTitleLi.appendChild(trashIcon);
         //movieDataItems.value = '';
         movieDataList.style.display = 'none';


       }

       }

     });
    }
  );
};
//let searchTxt = document.querySelector("searchTxt");
searchText = '';
