<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <section id="todo" class="todo-app">
      <header>
        <div>
          <input
            class="new-todo"
            v-model="newTodo"
            v-on:keyup.enter="addTodo"
            type="text"
            placeholder="What needs to be done?"
            autofocus
          />
        </div>
      </header>
      <div>
        <label></label>
        <ul>
          <li>
            <div class="view" v-for="(item, index) in todoFilter" :key="index">
              <input class="toggle mg-top" type="checkbox" v-model="item.completed" />
              <p
                class="text-todo"
                v-if="!item.editting"
                @dblclick="editTodo(item)"
                :class="{completed: item.completed}"
              >{{ item.name }}</p>
              <input
                v-else
                class="edit mg-top"
                type="text"
                v-model="item.name"
                @blur="doneEdit(item)"
                @keyup.enter="doneEdit(item)"
                @keyup.esc="cancelEdit(item)"
                v-focus
              />
              <button class="destroy" @click="removeTodo(index)"></button>
            </div>
          </li>
        </ul>
      </div>
      <footer class="footer">
        <div class="todo-count">
          <p>
            <input
              class="todo-checkbox"
              type="checkbox"
              :checked="!this.remaining"
              @change="checkAllRemaining"
            />
            Check All
          </p>
        </div>
        <div>
          <ul class="filters">
            <li class="list-item">
              <a class="item-step" :class="{ active: filter == 'all'}" @click="filter = 'all'">All</a>
            </li>
            <li class="list-item">
              <a
                class="item-step"
                :class="{ active: filter == 'active'}"
                @click="filter = 'active'"
              >Active</a>
            </li>
            <li class="list-item">
              <a
                class="item-step"
                :class="{ active: filter == 'completed'}"
                @click="filter = 'completed'"
              >Completed</a>
            </li>
          </ul>
        </div>
        <p>{{ remaining }} item left</p>
      </footer>
      <router-view />
    </section>
  </div>
</template>
<script>
const keyStorage = "todo-storage";
export default {
  name: "todoList",
  data() {
    return {
      title: "TODOS",
      newTodo: "",
      todos: [],
      beforeEditCache: "",
      filter: "all"
    };
  },
  watch: {
    todos: {
      handler: function(todos) {
        localStorage.setItem(keyStorage, JSON.stringify(todos));
      },
      deep: true
    }
  },

  //render quality checkbox
  computed: {
    remaining() {
      return this.todos.filter(item => !item.completed).length;
    },
    anyremaining() {
      return this.remaining != 0;
    },
    todoFilter() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(item => !item.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter(item => item.completed);
      }
      return this.todos;
    }
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem(keyStorage) || "[]");
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        name: this.newTodo,
        completed: false,
        id: this.todos.length,
        editting: false
      });
      localStorage.setItem(keyStorage, JSON.stringify(this.todos));
      this.newTodo = "";
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
      localStorage.setItem(keyStorage, JSON.stringify(this.todos));
    },
    cancelEdit(item) {
      item.name = this.beforeEditCache;
      item.editting = false;
    },
    editTodo(item) {
      // this.editedTodo = item;
      this.beforeEditCache = item.name;
      item.editting = true;
    },
    doneEdit(item, index) {
      if (item.name.trim() == "") {
        item.name = this.beforeEditCache;
      }
      item.editting = false;
      localStorage.setItem(keyStorage, JSON.stringify(this.todos));
    },
    checkAllRemaining() {
      this.todos.forEach(item => (item.completed = event.target.checked));
    },
    removeAllTodo() {
      this.todos.filters.splice(index);
    }
  }
  // props: {
  //   message: String
  // }
};
</script>
<style scoped>
.container {
  width: 100%;
  max-width: 50%;
  margin: 0 auto;
}
.todo-app {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.new-todo {
  width: 100%;
  padding: 16px 16px 16px 60px;
  border: none;
  font-size: 20px;
  font-style: italic;

  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.new-todo:focus {
  outline: none;
}
.view {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid #f5f5f5;
}
h1 {
  position: absolute;
  left: 0;
  top: 20px;
  width: 100%;
  font-size: 80px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
}
a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}
ul li {
  list-style: none;
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.text-todo {
  margin-top: 15px;
}
.active {
  border: 0.5px solid #cc9a9a;
  padding: 1px 7px;
  border-radius: 5px;
}
.destroy {
  /* display: none;
  position: absolute; */
  background-color: white;
  border: none;
  font-size: 30px;
  color: rgba(175, 47, 47, 0.2);
  font-weight: 100;
  margin-bottom: 11px;
  cursor: pointer;
}
.destroy:hover {
  color: #cc9a9a;
}
.destroy::after {
  content: "x";
}
.destroy:focus {
  outline: none;
}
.footer,
.filters {
  display: flex;
  justify-content: space-between;
}
.footer {
  border-top: 0.5px solid #f5f5f5;
  padding: 15px;
}
.list-item {
  margin-right: 15px;
  cursor: pointer;
}
.item-step:hover {
  border: 0.5px solid rgba(175, 47, 47, 0.2);
  padding: 1px 7px;
  border-radius: 5px;
}
.mg-top {
  margin-top: 20px;
}
</style>