<template>
    <div>

        <h2>Recherche d'offre par profil</h2>

        <div class="input-block">
            <label for="choixDiplome">Indiquer vos dernier diplômes ou fomations : </label>
            <select class="custom-select" v-model="diplome">
                <option :key="diplome" v-for="diplome in diplomes" v-bind:value="diplome">
                    {{ diplome }}
                </option>
            </select>
        </div>
        <div class="input-block">
            <label for="choixDiplome">Indiquer vos expériences</label>
            <select class="custom-select" v-model="diplome">
                <option :key="exp" v-for="exp in expe" v-bind:value="exp">
                    {{ exp }}
                </option>
            </select>
        </div>

        <div class="input-block">
            <label for="choixVille">Choisir une zone de recherche : </label>
            <select  class="custom-select" v-model="region">
                <option>Nantes</option>
            </select>
        </div>

        <div class="input-block">
            <label for="nbExperience">Combien d'année d'experience avez vous : </label>
            <input v-model="nbExperience" placeholder="Nombre d'année d'experience">
        </div>

        <div class="input-block">
            <button class="btn btn-primary" @click="addData()">Recherche offre</button>
        </div>

        <span>Offre(s) :</span><br>
        <div v-for="offre in offres" v-bind:value="offre">
            <span>{{ offre }}</span><br>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// on importe le composant helloWorld et on l'integre dans la vue HOME

export default {
  name: "profil",
  components: {},
  data() {
    return {
        offres: [],
        diplomes: [
            "DUT Informatique",
            "BTS Informatique",
            "Master MIAGE",
            "ASCA - Formation Management"
        ],
        expe: [
            "Développeur",
            "Serveur",
            "Manager",
            "Cuisinier"
        ]
    };
  },
  computed: {
  },
  methods: {
    addData() {
        this.reset();
        console.log(this.diplome);
        if(this.diplome == "ASCA - Formation Management"){
            this.offres = [
                "Comptable - CANTIN IMMOBILIER(Nantes)",
                "Secrétaire Comptable - AIMR(Orvault)",
                "Comptable - TROUILLARD(Nantes)",
                "Assistant Comptable et Administratif - MGC(Nantes)"
            ];
        } else if(this.diplome == "DUT Informatique" || this.diplome == "BTS Informatique"){
            this.offres = [
                "Développeur Informatique - BREIDIC(Nantes)",
                "Développeur Full-Stack - WOODBRASS(Saint Herblain)",
                "Développeur Informatique - ADSEARCH(Nantes)"
            ];
        } else {
            this.offres = [
                "Ingénieur d'études JAVA/J2EE - CAT-AMANIA(Nantes)",
                "Développeur .Net - TALENTSOFT(La Chapelle sur Erdre)",
                "Développeur JAVA - CEGID(Saint Herblain)",
                "Consultant SIRH expert métier - MANPOWER(Nantes)"
            ];
        }
    },
    reset() {
      this.offres = [];
    }
  }
};
</script>
<style scoped lang="css">
.input-block {
  display: block;
  padding: 5px;
}
.input-block label {
  display: block;
}
.input-block select {
  max-width: 200px;
  text-align: center;
}
.graphique {
  padding: 5px;
  border: 2px solid black;
}
</style>
