<template>
<div class=wrapper>
  <h1>Current Dream Team:</h1>
  <CharacterList :characters="characters" />
  <div v-if="this.$root.$data.team.length > 0">
    <button class="modalButton" @click="showModal('saveTeamModal')">Save Your Dream Team</button>
  </div>
  <div v-else>
    <h4>Go to 'Prepare' to add people to your team! <br>Or update/load an existing team!</h4>
  </div>
  <p></p>
  <button class="modalButton" @click="showModal('updateTeamModal')">Update an Existing Dream Team</button>
  <modal name="saveTeamModal">
    <div class="saveBox">
      <h2>Save Your Dream Team</h2>
      <div class="saveForm">
        <h3>Name Your Team:</h3>
        <input v-model="teamName" placeholder="Team Name">
        <p></p>
        <h3>Upload a Team Logo:</h3>
        <input type="file" name="logo" @change="fileChanged">
        <button @click="saveTeam" @before-close="beforeClose">Save Team</button>
      </div>
    </div>
  </modal>
  <modal name="updateTeamModal">
    <div class="updateBox">
      <h2>Update Your Dream Team</h2>
      <div class="update">
        <div class="edit">
          <div class="form">
            <input v-model="findName" placeholder="Search">
            <div class="suggestions" v-if="suggestions.length > 0">
              <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.teamName}}</div>
            </div>
          </div>
        </div>
        <div class ="rightStuff">
          <div class="upload" v-if="findTeam">
              <input v-model="findTeam.teamName">
              <p></p>
              <img :src="findTeam.photoPath" />
          </div>
          <div class="actions" v-if="findTeam">
            <button @click="[updateTeam(), hideModal('updateTeamModal')]">Update Team</button>
            <button @click="deleteTeam()">Delete Team</button>
          </div>
        </div>
      </div>
    </div>
  </modal>
  <modal name="savedTeam">
    <div class="messageBox">
      <h2>Your Team has been Saved!</h2>
      <p></p>
        <button @click="hideModal('savedTeam')" @before-close="beforeClose">Close</button>
    </div>
  </modal>
</div>
</template>

<script>
  import CharacterList from "../components/CharacterList.vue";
  import axios from 'axios';
  export default {
    name: 'ViewTeam',
    data() {
      return {
        teamName: "",
        file: null,
        newTeam: null,
        findName: "",
        teams: [],
        findTeam: null,
      }
    },
    created() {
      this.getDBTeams();
    },
    components: {
      CharacterList
    },
    computed: {
      characters() {
         return this.$root.$data.team;
      },
      suggestions() {
        let teams = this.teams.filter(team => team.teamName.toLowerCase().startsWith(this.findName.toLowerCase()));
        return teams.sort((a, b) => a.teamName > b.teamName);
      }
    },
    methods: {
      showModal(modalName) {
        this.teamName = "";
        this.$modal.show(modalName);
      },
      hideModal(modalName) {
        this.$modal.hide(modalName);
      },
      fileChanged(event) {
        this.file = event.target.files[0]
      },
      selectItem(team) {
        this.findName = "";
        this.findTeam = team;
      },
      beforeClose (event) {
        console.log(event)
        // If modal was open less then 5000 ms - prevent closing it
        if (this.time + this.duration < Date.now()) {
          event.stop()
        }
      },
      async saveTeam() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          await axios.post('/api/teams', {
              teamName: this.teamName,
              photoPath: r1.data.photoPath,
              characters: this.$root.$data.team,
            //}).then(function(result) {
              //this.newTeam = result.data;
              //this.hideModal('saveTeamModal');
            });
          this.showModal('savedTeam');
        } catch(error) {
          console.log(error);
        }
      },
      async getDBTeams() {
        try {
          let response = await axios.get("/api/teams");
          this.teams = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async deleteTeam() {
        try {
          await axios.delete("/api/teams/" + this.findTeam._id);
          this.findTeam = null;
          this.getDBTeams();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async updateTeam() {
        try {
          await axios.put("/api/teams/" + this.findTeam._id, {
            teamName: this.findTeam.teamName,
            photoPath: this.findTeam.photoPath,
            characters: this.$root.$data.team,
          });
          this.findTeam = null;
          this.getDBTeams();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    }
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

    .modalButton {
      font-size: 1.5em;
    }

    .edit {
      display: flex!important;
    }
    
    .form {
      margin-right: 50px!important;
    }

    .suggestions {
      width: 200px;
      border: 1px solid #ccc;
    }

    .suggestion {
      min-height: 20px;
    }

    .suggestion:hover {
      background-color: #5BDEFF;
      color: #fff;
    }

    .upload img {
      width: 100px;
      height: 100px;
      object-fit: contain;
    }

    .upload {
      text-align: center;
      padding-bottom: 10px;
    }

    .updateBox h2 {
      text-align: center;
    }

    .updateBox {
      padding: 10px;
      padding-left: 20px;
      text-align: center;
    }

    .update {
      display:flex;
      padding-top: 20px;
    }

    .rightStuff {
      display: flex;
      flex-direction: column;
    }

    .actions {
      display: flex;
      justify-content: space-between;
    }

    .saveBox {
      padding: 10px;
    }

    .saveBox h2 {
      text-align: center;
    }

    .saveBox h3 {
      font-size: 1.5em;
    }

    .saveForm {
      display: flex;
      flex-direction: column;
      padding-top: 10px;
    }

    .saveForm button {
      margin-top: 30px;
    }

    h4 {
      color: red;
      font-size: 2em;
    }

    .messageBox {
    padding: 40px;
    text-align: center;
    }

    .messageBox button {
        margin-top: 20px;
    }
</style>