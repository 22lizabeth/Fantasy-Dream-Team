<template>
<div id="app">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <img class="navbar-brand logo" src="/images/chibi-fight.png">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/" class="nav-link">
            <p>Prepare</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/assemble" class="nav-link">
            <p>Assemble</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/fight" class="nav-link">
            <p>Fight</p>
          </router-link>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
         <li class="nav-item">
          <router-link to="/LoadTeam" class="nav-link">
            <p>Load Team</p>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/ViewTeam" class="nav-link">
            <p>View Team</p>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
  <nav class="navbar fixed-bottom navbar-light bg-light" style="justify-content: center">
    <a class="navbar-brand" href="https://github.com/22lizabeth/Fantasy-Dream-Team"><img src="/images/github-logo.png" height=25></a>
  </nav>
</div>
</template>

<style>
#app {
  font-family: 'Special Elite', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 60px;
}

li {
  padding-right: 10px;
  padding-left: 10px;
}

.nav-link {
  font-size: 1.2em;
}

.logo {
  height: 70px;
  object-fit: contain!important;
}

.router-link-exact-active {
   text-decoration: bold;
   background: rgb(212, 209, 209);
}

</style>
