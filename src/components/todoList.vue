<template>
  <div class="container">
    <section id="todo">
      <h1>{{ title }}</h1>
      <header>
        <input
          v-model="newTodo"
          v-on:keyup.enter="addTodo"
          type="text"
          placeholder="What needs to be done?"
          autofocus
        />
      </header>
      <div>
        <label></label>
        <ul>
          <li>
            <div class="view" v-for="(item, index) in todoFilter" :key="index">
              <input class="toggle" type="checkbox" v-model="item.completed" />
              <p
                v-if="!item.editting"
                @dblclick="editTodo(item)"
                :class="{completed: item.completed}"
              >{{ item.name }}</p>
              <input
                v-else
                class="edit"
                type="text"
                v-model="item.name"
                @blur="doneEdit(item)"
                @keyup.enter="doneEdit(item)"
                @keyup.esc="cancelEdit(item)"
                v-focus
              />
              <button class="destroy" @click="removeTodo(index)">x</button>
            </div>
          </li>
        </ul>
      </div>
      <footer>
        <div>
          <div>
            <p>
              <input type="checkbox" :checked="!this.remaining" @change="checkAllRemaining" />Check all
            </p>
          </div>
          <div>{{ remaining }} item left</div>
        </div>
        <div>
          <ul>
            <li>
              <button :class="{ active: filter == 'all'}" @click="filter = 'all'">All</button>
            </li>
            <li>
              <button :class="{ active: filter == 'active'}" @click="filter = 'active'">Active</button>
            </li>
            <li>
              <button
                :class="{ active: filter == 'completed'}"
                @click="filter = 'completed'"
              >Completed</button>
            </li>
          </ul>
        </div>
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
    }
  }
  // props: {
  //   message: String
  // }
};
</script>
<style scoped>
.view {
  display: flex;
  justify-content: center;
}
.completed {
  text-decoration: line-through;
  color: grey;
}
.active {
  background-color: green;
}
</style>