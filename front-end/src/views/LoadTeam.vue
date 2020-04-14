<template>
<div class=wrapper>
  <h1>Load an Existing Dream Team:</h1>
  <div class="search">
      <form class="pure-form">
        <i class="fas fa-search"></i><input v-model="searchText" />
      </form>
    </div>
    <TeamList :teams="teams" />
</div>
</template>

<script>
  import TeamList from "../components/TeamList.vue";
  import axios from 'axios';
  export default {
    name: 'LoadTeam',
    components: {
      TeamList
    },
    data() {
      return {
        searchText: '',
        dbTeams: [],
      }
    },
    created() {
      this.getTeams();
    },
    computed: {
      teams() {
        return Object.values(this.dbTeams).filter(team => team.teamName.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
      }
    },
    methods: {
        async getTeams() {
            try {
            let response = await axios.get("/api/teams");
            this.dbTeams = response.data;
            } catch (error) {
            console.log(error);
            }
        },
    }
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