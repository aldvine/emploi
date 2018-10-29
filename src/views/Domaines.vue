<template>
    <div>
        <div>
            <h2>Les offres d'emplois par domaine et les entrées en formations par domaine</h2>
            <div class="input-block"> 
                <label for="offres">Secteur d'offres: </label>
                <select class="custom-select" id="offres" label="Secteur offres d'emploi" v-model="choixSecteurOffre">
                    <option v-for="(secteur,index) in secteurOffres" :key="index" :value="secteur">{{secteur}}</option>
                </select>
            </div>
            <div class="input-block">
                <label for="formations">Secteur de formations: </label>
                <select class="custom-select" if="formations" :items="secteurFormations" label="Secteur formations" v-model="choixSecteurFormation">
                    <option v-for="(secteur,index) in secteurFormations" :key="index" :value="secteur">{{secteur}}</option>
                </select>
            </div>
            <div class="input-block">
                <button class="btn btn-primary" @click="addData()">Ajouter les données</button>
            </div>
            <div class="input-block">
                <button class="btn btn-info" @click="reset()">Remise à zéro</button>
            </div>
            <div  v-if="chartData.rows.length >0">
                <ve-histogram  :data="chartData" :settings="chartSettings"></ve-histogram>
            </div>
            <div v-else  class="graphique">
                Pas de données sélectionnée
            </div>

        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// on importe le composant helloWorld et on l'integre dans la vue HOME
import formation_par_secteur from "../assets/datas/entrees_en_formation_par_secteur_et_region_2016.json";
import offres_par_secteur from "../assets/datas/offres_par_secteur.json";
import JSONPath from "jsonpath-plus";

export default {
  name: "domaines",
  components: {
  },
  data() {
      
    return {
      formationsJson: formation_par_secteur,
      offresJson: offres_par_secteur,
      choixSecteurFormation: null,
      choixSecteurOffre: null,
      chartSettings: {},
       chartData: {
        columns: ["secteurs", "offres", "formations"],
        rows: []
      }
    };
  },
  computed: {
    secteurOffres() {
      // var result = JSONPath({json: this.offresJson, path: "$.fields"});
      let secteur = [];
      for (const key in this.offresJson) {
        if (this.offresJson.hasOwnProperty(key)) {
          const element = this.offresJson[key];
          secteur.push(this.offresJson[key].secteur);
        }
      }
      return secteur;
    },
    secteurFormations() {
      // var result = JSONPath({json: this.offresJson, path: "$.fields"});
      let secteur = [];
      for (const key in this.formationsJson) {
        if (this.formationsJson.hasOwnProperty(key)) {
          const element = this.formationsJson[key];
          secteur.push(this.formationsJson[key].secteur);
        }
      }
      return secteur;
    }
  },
  methods: {
    addData() {
      this.chartSettings = {};
     

      let secteur =
        "offre: " +
        this.choixSecteurOffre +
        "/ Formation : " +
        this.choixSecteurFormation;

      // calcul des offres du secteur en 2016
      let total_offre = 0;
      this.offresJson.forEach(element => {
        if (element.secteur == this.choixSecteurOffre) {
          for (const key in element) {
            if (element.hasOwnProperty(key)) {
              if (key.indexOf("2016") != -1) {
                if (typeof element[key] == "number") {
                  total_offre += element[key];
                } else {
                  total_offre += Number(element[key].split(" ").join(""));
                }
              }
            }
          }
        }
      });

      // on multiplie par 1000 car c'est en millier
      total_offre = total_offre * 1000;

      //calcul des formations dans ce secteur
      let total_formation = 0;
      this.formationsJson.forEach(element => {
        if (element.secteur == this.choixSecteurFormation) {
          if (typeof element.Total == "number") {
            total_formation += element.Total;
          } else {
            total_formation += Number(element.Total.split(" ").join(""));
          }
        }
      });
      this.chartData.rows.push({
        secteurs: secteur,
        offres: total_offre,
        formations: total_formation
      });
    },
    reset(){
        this.chartData= {
        columns: ["secteurs", "offres", "formations"],
        rows: []
      }
    }
  }
};
</script>
<style scoped lang="css">
.input-block{
    display:block;
    padding:5px;


}
.input-block label{
    display:block;
}
.input-block select{
    max-width: 200px;
    text-align:center;
}
.graphique{
    padding:5px;
    border:2px solid black;
}
</style>
