<template>
  <div id="hello" class="hello">
    <h1>{{ title }}</h1>
    <a :href="links">youtube</a>
    <p v-html="testHTML"></p>
    <router-link to="/hello">Hello</router-link>
    <button @click="showPost">click</button>
    <Hello />
    <button v-on:click="counter += 1">Add 1</button>
    <p>gia tri: {{ counter }}</p>
    <div v-bind:class="{ active: isActive }"></div>
    <ul v-for="i in arr" :key="i">
      <li> {{ i.name }}</li>
    </ul>
    <li v-for="n in eventNumber" :key="n">{{ n }}</li>
    <div>
      <span v-for="n in 10" :key="n">{{ n }} </span>
    </div>
    
  </div>
</template>

<script>
  import Hello from '@/components/hello.vue'
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'Dien thoai sam sung',
      links: 'https://www.youtube.com/',
      testHTML: '<a href="asdfsadfasd.....asdfsadfasd">get password </a>',
      counter: 0,
      isActive: false,
      userProfile: {
        name: 'sieu nhan'
      },
      numbers: [1, 2, 3, 4, 5],
      arr: [
        {
          id: 1,
          name:'hel',
        },
        {
          id: 2,
          name:'sieu',
        },
        {
          id: 3,
          name:'nhan',
        }
      ]
    }
  },
  components : {
    Hello
  },
  // computed: {
  //   eventNumber: function() {
  //     return this.numbers.filters(function (number) {
  //     return number % 2 === 0
  //     })
  //   } 
  // },
  methods: {
    showPost: function() {
      this.title = 'content has just changed';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
