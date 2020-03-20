<template>
<div class=wrapper>
  <h1>Time To Fight!</h1>
  <h2><em>Test the strength of your dream team versus a random team of opponents!</em></h2>
    <div class="errorMessage" v-if="this.$root.$data.fightTeam.length < 4">
        <h1>You don't have a full fight team assembled! <br> Go to the 'Assemble' page to assemble your fight team!</h1>
    </div>
    <div v-else>
        <div v-if="this.$root.$data.enemyTeam.length === 0">
            <button v-on:click="generateTeam()">Generate Enemy Team!</button>
        </div>
        <div v-else class="container">
            <div class=buttons>
                <button v-on:click="newTeam()">Generate New Team!</button>
                <button v-on:click="fight()">Fight!</button>
            </div>
            <div class="teamLayout">
                <div class="row">
                    <div class="col-sm">
                        <h1>Enemy Team</h1>
                    </div>
                    <div class="col-sm" v-for="enemy in this.$root.$data.enemyTeam" :key="enemy.id">
                        <div class="characterCol">
                            <div class="info">
                                <h1>{{enemy.name}}</h1>
                                <h2>{{enemy.fandom}}</h2>
                            </div>
                            <div class="image">
                                <img v-if="enemy.dead === true" class="overlay" src="/images/redX.png">
                                <img :src="'/images/characters/'+enemy.image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h1 class="vs">VS.</h1>
        <div class="container">
            <div class="teamLayout">
                <div class="row">
                    <div class="col-sm">
                        <h1>Your Team</h1>
                    </div>
                    <div class="col-sm" v-for="fighter in this.$root.$data.fightTeam" :key="fighter.id">
                        <div class="characterCol">
                            <div class="info">
                                <h1>{{fighter.name}}</h1>
                                <h2>{{fighter.fandom}}</h2>
                            </div>
                            <div class="image">
                                <img v-if="fighter.dead === true" class="overlay" src="/images/redX.png">
                                <img :src="'/images/characters/'+fighter.image">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="this.$root.$data.fightLog.length > 0" class="log">
            <form>
                <div class="form-group">
                    <h1>Fight Log:</h1>
                    <textarea class="form-control" rows="10" v-model="showFightLog"></textarea>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'Fight',
    props: {
        enemyTeam: Array
    },
    computed: {
        showFightLog() {
            return this.$root.$data.fightLog;
        }
    },
    methods: {
          generateTeam() {
              this.$root.$data.fightLog = "";
              var randomNum = Math.floor(Math.random() * (+8 - +0)) + +0; 
              var character = this.$root.$data.characters[randomNum];
              //this.$root.$data.enemyTeam.push(character);
              for(var i = 0; i < 4; i++) {
                //randomNum = Math.floor(Math.random() * (+4 - +0)) + +0; 
                //character = this.$root.$data.characters[randomNum];
                while(this.$root.$data.enemyTeam.some(enemy => enemy === character) || this.$root.$data.fightTeam.some(fighter => fighter === character)) {
                    randomNum = Math.floor(Math.random() * (+8 - +0)) + +0; 
                    character = this.$root.$data.characters[randomNum];
                }
                this.$root.$data.enemyTeam.push(character);
              }
          },
          newTeam() {
              this.reviveEveryone();
              this.$root.$data.enemyTeam =[];
              this.generateTeam();
          },
          fight() {
              let fight = true;
              var damage = 0;
              let currEnemy = this.$root.$data.enemyTeam[0];
              var enemyIndex = 0;
              var enemyHP = currEnemy.hp;
              let currFighter = this.$root.$data.fightTeam[0];
              var fighterIndex = 0;
              var fighterHP = currFighter.hp;
              while(fight) {
                  //Fighter's Turn
                  this.$root.$data.fightLog += currFighter.name;
                  this.$root.$data.fightLog += " attacks ";
                  this.$root.$data.fightLog += currEnemy.name;
                  this.$root.$data.fightLog += " for ";
                  damage = currFighter.attack - currEnemy.defense;
                  if(damage < 0) {
                      damage = 0;
                  }
                  this.$root.$data.fightLog += damage;
                  this.$root.$data.fightLog += " damage! \n";
                  this.$root.$data.fightLog += currEnemy.name;
                  enemyHP -= damage;
                  if(enemyHP <= 0) {
                      //Enemy Died
                      this.$root.$data.fightLog += " died. Your fighter has defeated an enemy!";
                      currEnemy.dead = true;
                      enemyIndex += 1;
                      //Last Enemy Died
                      if(enemyIndex > 3) {
                          this.$root.$data.fightLog += "\nAll enemies are now defeated. Your team has won! Congratulations!";
                          fight=false;
                          break;
                      }
                      //Next Enemy
                      else {
                          currEnemy = this.$root.$data.enemyTeam[enemyIndex];
                          enemyHP = currEnemy.hp;
                      }
                  }
                  //Enemy took Damage
                  else {
                       this.$root.$data.fightLog += "'s hp is now ";
                       this.$root.$data.fightLog += enemyHP;
                  }

                  //Enemy's Turn
                  this.$root.$data.fightLog += "\n";
                  this.$root.$data.fightLog += currEnemy.name;
                  this.$root.$data.fightLog += " attacks ";
                  this.$root.$data.fightLog += currFighter.name;
                  this.$root.$data.fightLog += " for ";
                  damage = currEnemy.attack - currFighter.defense;
                  if(damage < 0) {
                      damage = 0;
                  }
                  this.$root.$data.fightLog += damage;
                  this.$root.$data.fightLog += " damage! \n";
                  this.$root.$data.fightLog += currFighter.name;
                  fighterHP -= damage;
                  if(fighterHP <= 0) {
                      //Fighter died
                      this.$root.$data.fightLog += " died. Your fighter was defeated by an enemy!!";
                      currFighter.dead = true;
                      fighterIndex += 1;
                      //Last fighter died
                      if(fighterIndex > 3) {
                          this.$root.$data.fightLog += "\nAll of your fighters have been defeated. You have lost to the enemy. Sad day.";
                          fight=false;
                          break;
                      }
                      //Next fighter
                      else {
                          currFighter = this.$root.$data.fightTeam[fighterIndex];
                          fighterHP = currFighter.hp;
                          this.$root.$data.fightLog += "\n";
                      }
                  }
                  //Fighter took damage
                  else {
                       this.$root.$data.fightLog += "'s hp is now ";
                       this.$root.$data.fightLog += fighterHP;
                       this.$root.$data.fightLog += "\n";
                  }
              }
          },
          reviveEveryone() {
              for(var i = 0; i < 4; i++) {
                  this.$root.$data.enemyTeam[i].dead = false;
                  this.$root.$data.fightTeam[i].dead = false;
              }
          }
      }
  }
</script>

<style scoped>
    .buttons {
        display: flex;
        justify-content: space-between;
    }

    .characterCol {
        width: 200px;
    }

    .characterCol img {
        border: 2px solid #333;
        height: 250px;
        width: 200px;
        object-fit: contain;
    }

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
        margin: 20px;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 20px;
    }

    .errorMessage {
        margin: 50px;
        color: red;
    }

    .vs {
        padding-top: 40px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        width: 30%;
        margin-left: 37%;
        margin-right: 33%;
        padding-top: 30px;
        padding-bottom: 50px;
    }

    
    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .teamLabel {
        display: table-cell;
    }

    .teamLabel h1 {
        vertical-align: middle;
    }

    .teamLayout {
        padding-right: 6%;
    }

    .overlay {
        position: absolute; 
        width: 100%; 
        height: 100%; 
    }
</style>
