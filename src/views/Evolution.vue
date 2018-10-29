<template>
    <div>

        <h2>Evolution des offres et demandeurs par trimestre et région</h2>
        <div class="input-block">
            <label for="offres">Choisir la région des offres: </label>
            <select class="custom-select" id="offres" v-model="choixRegionDemandeurs">
                <option v-for="(d,index) in regionDemandeurs" :key="index" :value="d">{{d}}</option>
            </select>
        </div>
        <div class="input-block">
            <label for="formations">Choisir la région des demandeurs: </label>
            <select class="custom-select" if="formations" v-model="choixRegionOffres">
                <option v-for="(d,index) in regionOffres" :key="index" :value="d">{{d}}</option>
            </select>
        </div>
        <div class="input-block">
            <button class="btn btn-primary" @click="addData()">Ajouter les données</button>
        </div>
        <div class="input-block">
            <button class="btn btn-info" @click="reset()">Remise à zéro</button>
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
        stack: { sell: ["offres", "demandeurs"] },
        area: true
      },
      chartData: {
        columns: ["date", "offres", "demandeurs"],
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
      this.reset();

      // calcul des offres
      let totalOffres = 0;
      let year = 0;
      let counter = 1;
      let tabOffre = [];
      let quarter = 0;

      this.offresJson.forEach(element => {
        let oldYear = year;
        let oldQuarter = quarter;
        let date = new Date(this.toDateUS(element.date));
        year = date.getFullYear();
        quarter = this.getQuarter(date);
        if (oldYear == year && oldQuarter == quarter) {
          counter++;
          // augmentation du total
          totalOffres =
            totalOffres +
            Number(element[this.choixRegionOffres].replace(",", "."));
        } else {
          // dans le premier cas on l'ajoute pas dans la boucle.
          if (oldYear != 0) {
            // on multiplie par 1000 car c'est en millier

            tabOffre[oldYear + "T" + oldQuarter] = Math.round(
              (totalOffres * 1000) / counter
            );
          }
          counter = 1;
          totalOffres = Number(
            element[this.choixRegionOffres].replace(",", ".")
          );
        }
      });
      console.log("offre ", tabOffre);
      // moyenne par an
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

      let totalDemandeurs = 0;
      let tabDemandeur = [];
      this.demandeursJson.forEach(element => {
        tabDemandeur[element.Periode] = Number(
          element[this.choixRegionDemandeurs].replace(/\s/g, "")
        );
      });
      console.log(tabDemandeur);

      // on ajoute d'abord les offres
      for (const key in tabOffre) {
        tabOffre[key];
        this.chartData.rows.push({
          date: key,
          offres: tabOffre[key],
          demandeurs: null
        });
      }

      for (const key in tabDemandeur) {
        let trouve = false;
        let i = 0;
        do {
          if (this.chartData.rows[i].date == key) {
            trouve = true;
            this.chartData.rows[i].demandeurs = tabDemandeur[key];
          }
          i++;
        } while (!trouve && i < this.chartData.rows.length);
      }
      console.log(this.chartData.rows);
    },
    getQuarter(d) {
      d = d || new Date(); // If no date supplied, use today
      var q = [1, 2, 3, 4];
      return q[Math.floor(d.getMonth() / 3)];
    },
    toDateUS(date) {
      date = date.split("/");
      return date[2] + "-" + date[1] + "-" + date[0];
    },
    reset() {
      this.chartData = {
        columns: ["date", "offres", "demandeurs"],
        rows: []
      };
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
