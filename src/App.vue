<template>
    <div id="app" style="margin:10px;">
        <div id="nav" v-if="!egg">
            <router-link to="/">Accueil</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/Domaines">Domaines</router-link> |
            <router-link to="/ComparaisonOffre">Comparaison des offres</router-link> |
            <router-link to="/ComparaisonDemande">Comparaison des demandes</router-link> |
            <router-link to="/Evolution">Evolution</router-link>
         
            <img style="margin-left:20px;opacity:0.4"  @click="doEgg()" height="20px" width="15px" src="./assets/click.png" alt="easter egg">
        </div>
        <router-view v-if="!egg" />
        <div v-if="egg" @click="doEgg()">
            <h1 >Vous avez découvert un easter egg</h1> <br>
          <img  style="margin:auto; "  src="./assets/egg.gif" alt="easter egg">
          <button class="btn btn-danger">Clique moi</button> 
        </div>
    </div>
</template>

<script>
// ceci est composant
export default {
  name:'app',

  // les donnees du composants
  data() {
    return {
        egg:false
    };
  },
  methods: {
      doEgg() {
          console.log("eed");
          this.egg= !this.egg;
      }
  }
};
</script>

