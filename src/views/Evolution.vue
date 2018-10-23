<template>
    <div>

        <h2>Les offres d'emplois par domaine et les entrées en formations par domaine</h2>
        <div class="input-block">
            <label for="offres">Choisir la région des offres: </label>
            <select id="offres" v-model="choixRegionDemandeurs">
                <option v-for="(d,index) in regionDemandeurs" :key="index" :value="d">{{d}}</option>
            </select>
        </div>
        <div class="input-block">
            <label for="formations">Choisir la région des demandeurs: </label>
            <select if="formations" v-model="choixRegionOffres">
                <option v-for="(d,index) in regionOffres" :key="index" :value="d">{{d}}</option>
            </select>
        </div>
        <div class="input-block">
            <button @click="addData()">Ajouter les données</button>
        </div>
        <div class="input-block">
            <button @click="reset()">Remise à zéro</button>
        </div>
        <div class="graphique">
            <ve-line v-if="chartData" :data="chartData" :settings="chartSettings"></ve-line>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
// on importe le composant helloWorld et on l'integre dans la vue HOME
import demandeurs from "../assets/datas/demandeurs_par_region.json";
import offres from "../assets/datas/offres_par_region.json";
import JSONPath from "jsonpath-plus";

export default {
  name: "evolution",
  components: {},
  data() {
    return {
      demandeursJson: demandeurs,
      offresJson: offres,
      choixRegionDemandeurs: null,
      choixRegionOffres: null,
      chartSettings: {
        area: true
      },
      chartData: {
        columns: ["date", "demandeurs", "offres"],
        rows: []
      }
    };
  },
  computed: {
    regionOffres() {
      // var result = JSONPath({json: this.offresJson, path: "$.fields"});
      let d = [];
      for (const key in this.offresJson[0]) {
        if (key != "date") {
          d.push(key);
        }
      }
      return d;
    },
    regionDemandeurs() {
      // var result = JSONPath({json: this.offresJson, path: "$.fields"});
      let d = [];
      for (const key in this.demandeursJson[0]) {
        if (key != "Periode") {
          d.push(key);
        }
      }
      return d;
    }
  },
  methods: {
    addData() {
      this.chartSettings = {};

      // calcul des offres
      let total = 0;
      let year = 0;
      let counterYear = 1;
      let tabOffre = [];
      this.offresJson.forEach(element => {
        let oldYear = year;
        year = new Date(element.date).getFullYear();
        if (oldYear == year) {
          counterYear++;
          // augmentation du total
          total =
            total + Number(element[this.choixRegionOffres].replace(",", "."));
        } else {
          tabOffre.push({
            annee: oldYear,
            moyenne_mois: Math.round((total * 1000) / counterYear)
          });
          counterYear = 1;
          total = Number(element[this.choixRegionOffres].replace(",", "."));
        }
      });

      // moyenne par mois 
    //   this.offresJson.forEach(element => {
    //     let oldYear = year;
    //     year = new Date(element.date).getFullYear();
    //     if (oldYear == year) {
    //       counterYear++;
    //       // augmentation du total
    //       total =
    //         total + Number(element[this.choixRegionOffres].replace(",", "."));
    //     } else {
    //       tabOffre.push({
    //         annee: oldYear,
    //         moyenne_mois: Math.round((total * 1000) / counterYear)
    //       });
    //       counterYear = 1;
    //       total = Number(element[this.choixRegionOffres].replace(",", "."));
    //     }
    //   });

      console.log(tabOffre);
      // on multiplie par 1000 car c'est en millier

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
    getQuarter(d) {
      var q = [4, 1, 2, 3];
      return q[Math.floor(d.getMonth() / 3)];
    },
    reset() {
      this.chartData = {
        columns: ["secteurs", "offres", "formations"],
        rows: []
      };
    }
  }
};
</script>
<style lang="css">
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
