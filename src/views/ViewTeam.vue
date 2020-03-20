<template>
<div class=wrapper>
  <h1>Current Dream Team:</h1>
  <CharacterList :characters="characters" />
</div>
</template>

<script>
  import CharacterList from "../components/CharacterList.vue"
  export default {
    name: 'ViewTeam',
    components: {
      CharacterList
    },
    computed: {
      characters() {
         return this.$root.$data.team;
      }
    },
  }
</script>

<style scoped>
    .wrapper {
        padding-top: 20px;
        padding-bottom: 60px;
    }
    .wrapper h1 {
        font-size: 3em;
    }
</style>