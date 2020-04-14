<template>
<div class="wrapper">
  <div class="teams">
    <div class="team" v-for="team in teams" :key="team._id">
      <div class="info">
        <h1>{{team.teamName}}</h1>
      </div>
      <div class="image">
        <img :src="team.photoPath" />
      </div>
      <div class="actions">
        <button v-on:click="[loadTeam(team),showModal('loadedTeam')]">Load Team</button>
        <button class="removeButton" v-on:click="deleteTeam(team)">Delete Team</button>
      </div>
    </div>
  </div>
  <modal name="loadedTeam">
    <div class="messageBox">
      <h2>Your Team has been Loaded!</h2>
      <p></p>
      <p>You can now view, assemble, fight with, <br>and/or update your loaded team!</p>
        <button @click="hideModal('loadedTeam')">Close</button>
    </div>
  </modal>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TeamList',
   props: {
    teams: Array
  },
  methods: {
    loadTeam(team) {
        for(var i = 0; i < this.$root.$data.team.length; i++) {
            this.$root.$data.team[i].inParty = 0;   
        }
        this.$root.$data.team = team.characters;
    },
    showModal(modalName) {
        this.$modal.show(modalName);
    },
    hideModal(modalName) {
        this.$modal.hide(modalName);
    },
    async deleteTeam(team) {
        try {
          await axios.delete("/api/teams/" + team._id);
          this.getTeams();
          return true;
        } catch (error) {
          console.log(error);
        }
    },
    async getTeams() {
        try {
        let response = await axios.get("/api/teams");
        this.teams = response.data;
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
}

.teams {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.team {
  margin: 10px;
  margin-top: 30px;
  width: 200px;
}

.team img {
  border: 2px solid #333;
  height: 250px;
  width: 200px;
  object-fit: contain;
}

.team .image {
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

.actions {
    display: flex;
    justify-content: space-between;
}

.messageBox {
    padding: 40px;
    text-align: center;
}

.messageBox p {
    font-size: 1.2em;
}

.messageBox button {
    margin-top: 20px;
}
</style>