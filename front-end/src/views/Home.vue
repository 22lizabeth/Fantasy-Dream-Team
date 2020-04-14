<template>
<div>
  <div class="wrapper">
    <h1>Prepare Your Fantasy Dream Team!</h1>
    <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
    <router-link to="/filter">
        <button class="filter-button">Filter by Category</button>
    </router-link>
  </div>
  <CharacterList :characters="characters" />
</div>
</template>

<script>
  import CharacterList from "../components/CharacterList.vue"
  export default {
    name: 'Home',
    components: {
      CharacterList
    },
    data() {
      return {
        searchText: '',
      }
    },
    computed: {
      characters() {
        return this.$root.$data.characters.filter(character => character.name.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
      },
    },
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 30px;
  }

  .wrapper h1 {
    font-size: 4em;
    padding-bottom: 30px;
  }

  .search {
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 20%;
    font-family:'Courier New', Courier, monospace;
  }

  form {
    display: table;
    width: 100%;
  }

  i {
    display: table-cell;
    padding-left: 10px;
    width: 1px;
  }

  input {
    display: table-cell;
    font-size: 20px;
    border: none !important;
    box-shadow: none !important;
    width: 100%;
    height: 40px;
  }
</style>
