<template>
<div class="wrapper">
  <div class="characters">
    <div class="character" v-for="character in characters" :key="character.id">
      <div class="info">
        <h1>{{character.name}}</h1>
        <h2>{{character.fandom}}</h2>
      </div>
      <div class="image">
        <img :src="'/images/characters/'+character.image">
      </div>
        <div v-if="character.inParty === 0">
            <button class="auto" v-on:click="addToTeam(character)">Add to Team</button>
        </div>
        <div v-else>
            <button class="auto, removeButton" v-on:click="removeFromTeam(character)">Remove From Team</button>
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'CharacterList',
  props: {
    characters: Array
  },
  methods: {
    addToTeam(character) {
        this.$root.$data.team.push(character);
        character.inParty = 1;
    },
    removeFromTeam(character) {
        this.$root.$data.team = this.$root.$data.team.filter(person => person !== character)
        character.inParty = 0;
    },
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.characters {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.character {
  margin: 10px;
  margin-top: 30px;
  width: 200px;
}

.character img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: contain;
}

.character .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.info {
  background: rgb(172, 168, 165);
  color: #000;
  height: 80px;
  font-family: 'Rock Salt', cursive;
}

.info h1 {
  font-size: 1.5em;
}

.info h2 {
  font-size: 1em;
}

button {
  height: 50px;
  background: #000;
  color: white;
  border: none;
}

.auto {
  margin-left: auto;
}

.removeButton {
    background: red;
}
</style>