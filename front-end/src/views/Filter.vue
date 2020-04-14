<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <a @click="select('Anime')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Anime</a>
                <img src="/images/characters/luffy.jpg" style="object-position: 0 35%">
            </div>
            <div class="col-sm">
                <a @click="select('Movies')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Movies</a>
                <img src="/images/characters/merida.png" style="object-position: 0 30%">
            </div>
            <div class="col-sm">
                <a @click="select('Books')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Books</a>
                <img src="/images/characters/kvothe.jpg" style="object-position: 0 20%">
            </div>
            <div class="col-sm">
                <a @click="select('Video Games')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Video Games</a>
                <img src="/images/characters/malfurion.png" style="object-position: 0 35%">
            </div>
            <div class="col-sm">
                <a @click="select('Villains')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Villains</a>
                <img src="/images/characters/sylvanas.png" style="object-position: 0 25%">
            </div>
        </div>
        <div class="row">
            <div class="col-sm">
                <a @click="select('TV Series')" href="#" role="button" class="btn btn-primary btn-lg btn-block">TV Series</a>
                <img src="/images/characters/jonSnow.png" style="object-position: 0 20%">
            </div>
            <div class="col-sm">
                <a @click="select('Disney')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Disney</a>
                <img src="/images/characters/elsa.jpg" style="object-position: 0 35%">
            </div>
            <div class="col-sm">
                <a @click="select('Dreamworks')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Dreamworks</a>
                <img src="/images/characters/hiccup.png" style="object-position: 0 30%">
            </div>
            <div class="col-sm">
                <a @click="select('Pokemon')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Pokemon</a>
                <img src="/images/characters/umbreon.png" style="object-position: 0 58%">
            </div>
            <div class="col-sm">
                <a @click="select('Protagonists')" href="#" role="button" class="btn btn-primary btn-lg btn-block">Protagonists</a>
                <img src="/images/characters/harryPotter.png" style="object-position: 0 25%">
            </div>
        </div>
    </div>
  <CharacterList :characters="characters" />
</div>
</template>

<script>
import CharacterList from "../components/CharacterList.vue"
export default {
  name: 'Filter',
  components: {
    CharacterList
  },
  data() {
    return {
      category: '',
    }
  },
  computed: {
    characters() {
      return this.$root.$data.characters.filter(character => character.category.some(category => category === this.category));
    }
  },
  methods: {
    select(category) {
      this.category = category;
    }
  }
}
</script>

<style scoped>
    .btn-primary,
    .btn-primary:visited,
    .btn-primary:link:visited,
    .btn-primary:link {
        font-size: 1.5em;
        background-color: rgb(163, 171, 175);
        border-color: #0000;
    }

    .btn-primary:hover,
    .btn-primary:visited:hover,
    .btn-primary:visited:active,
    .btn-primary:active,
    .btn-primary:visited:focus,
    .btn-primary:focus {
        background-color: rgb(191, 203, 209);
        border-color: #0000;
    }

    .container {
        padding-top: 40px;
    }

    .col-sm {
        padding-top: 15px!important;
        padding-bottom: 15px!important;
    }

    .col-sm img {
        height: 60px;
        width: 300px;
        max-width: 100%;
        object-fit: cover;
    }
</style>