<template>
<div class=wrapper>
  <h1>Assemble Your Team!</h1>
  <h2><em>Only our top four team members can join in the fight! <br>Select the best of your dream team to fight for you!</em></h2>
  <div class="container">
        <div class="row">
            <div class="col-sm">
                <h1>Slot 1</h1>
                <div v-if="this.$root.$data.fightTeam.length >= 1" class="characterCol">
                    <div class="info">
                        <h1>{{this.$root.$data.fightTeam[0].name}}</h1>
                        <h2>{{this.$root.$data.fightTeam[0].fandom}}</h2>
                    </div>
                    <div class="image">
                        <img :src="'/images/characters/'+this.$root.$data.fightTeam[0].image">
                    </div>
                    <button class="auto removeButton" v-on:click="removeFromFightTeam(0)">Remove</button>
                </div>
                <div v-else class="box">
                    <p>(Open)</p>
                </div>
            </div>
            <div class="col-sm">
                <h1>Slot 2</h1>
                <div v-if="this.$root.$data.fightTeam.length >= 2" class="characterCol">
                    <div class="info">
                        <h1>{{this.$root.$data.fightTeam[1].name}}</h1>
                        <h2>{{this.$root.$data.fightTeam[1].fandom}}</h2>
                    </div>
                    <div class="image">
                        <img :src="'/images/characters/'+this.$root.$data.fightTeam[1].image">
                    </div>
                    <button class="auto removeButton" v-on:click="removeFromFightTeam(1)">Remove</button>
                </div>
                <div v-else class="box">
                    <p>(Open)</p>
                </div>
            </div>
            <div class="col-sm">
                <h1>Slot 3</h1>
                <div v-if="this.$root.$data.fightTeam.length >= 3" class="characterCol">
                    <div class="info">
                        <h1>{{this.$root.$data.fightTeam[2].name}}</h1>
                        <h2>{{this.$root.$data.fightTeam[2].fandom}}</h2>
                    </div>
                    <div class="image">
                        <img :src="'/images/characters/'+this.$root.$data.fightTeam[2].image">
                    </div>
                    <button class="auto removeButton" v-on:click="removeFromFightTeam(2)">Remove</button>
                </div>
                <div v-else class="box">
                    <p>(Open)</p>
                </div>
            </div>
            <div class="col-sm">
                <h1>Slot 4</h1>
                <div v-if="this.$root.$data.fightTeam.length >= 4" class="characterCol">
                    <div class="info">
                        <h1>{{this.$root.$data.fightTeam[3].name}}</h1>
                        <h2>{{this.$root.$data.fightTeam[3].fandom}}</h2>
                    </div>
                    <div class="image">
                        <img :src="'/images/characters/'+this.$root.$data.fightTeam[3].image">
                    </div>
                    <button class="auto removeButton" v-on:click="removeFromFightTeam(3)">Remove</button>
                </div>
                <div v-else class="box">
                    <p>(Open)</p>
                </div>
            </div>
        </div>
    </div>
    <div class="characterWrapper">
        <div class="characters">
            <div class="character" v-for="character in characters" :key="character.id">
                <div class="info">
                    <h1>{{character.name}}</h1>
                    <h2>{{character.fandom}}</h2>
                </div>
                <div class="image">
                    <img :src="'/images/characters/'+character.image">
                </div>
                    <button class="auto" v-on:click="addToFightTeam(character)">Add to Fight Team</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'Assemble',
    computed: {
      characters() {
        return this.$root.$data.team.filter(character => !this.$root.$data.fightTeam.includes(character));
      }
    },
    methods: {
        addToFightTeam(character) {
            if(this.$root.$data.fightTeam.length < 4) {
                this.$root.$data.fightTeam.push(character);
            }
        },
        removeFromFightTeam(index) {
            this.$root.$data.fightTeam = this.$root.$data.fightTeam.filter(person => person !== this.$root.$data.fightTeam[index]);
        }
    },
  }
</script>

<style scoped>
    .box {
        height: 300px;
        width: 210px;
        border: 5px solid black;
        font-size: 2em;
        color:red;
    }
    
    .characterWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .characters {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .characterCol {
        width: 200px;
    }

    .character {
        margin: 10px;
        margin-top: 50px;
        width: 200px;
    }

    .character img,
    .characterCol img {
        border: 2px solid #333;
        height: 250px;
        width: 200px;
        object-fit: contain;
    }

    .character .image,
    .characterCol .image {
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

    .col-sm h1{
        width: 200px!important;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 20px;
    }
</style>
