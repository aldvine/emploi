<template>
    <div id="app">

        <nav id="nav" v-if="!egg" class="navbar navbar-expand-lg navbar-light bg-light">
            <span class="navbar-brand" href="#"><router-link class="nav-link" to="/">Emploi</router-link></span>

            <div class="flex-column nav ">
                <ul class="navbar-nav ">
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/">Accueil</router-link>
                    </li>
                    <li class="nav-item ">
                        <router-link class="nav-link" to="/Domaines">Domaines</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/ComparaisonOffre">Comparaison des offres</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/ComparaisonDemande">Comparaison des demandes</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/Evolution">Evolution</router-link>
                    </li>
                </ul>
            </div>

            <img style="margin-left:20px;opacity:0.4" @click="doEgg()" height="20px" width="15px" src="./assets/click.png" alt="easter egg">

        </nav>
        <router-view v-if="!egg" style="margin:10px;" />
        <div v-if="egg" @click="doEgg()">
            <h1>Vous avez découvert un easter egg</h1> <br>
            <img style="margin:auto; " src="./assets/egg.gif" alt="easter egg">
            <button class="btn btn-danger">Clique moi</button>
        </div>
    </div>
</template>

<script>
// ceci est composant
export default {
  name: "app",

  // les donnees du composants
  data() {
    return {
      egg: false
    };
  },
  methods: {
    doEgg() {
      console.log("eed");
      this.egg = !this.egg;
    }
  }
};
</script>
<style>
.router-link-exact-active{
    background:rgba(125, 125, 125, 0.2);
    
}
</style>


