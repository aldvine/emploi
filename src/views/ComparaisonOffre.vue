<template>
    <div>

        <h2>Comparaison des offres par trimestre et région</h2>
        <div class="input-block">
            <label for="choixRegionOffres1">Choisir la première région : </label>
            <select if="choixRegionOffres1" label="Choix région 1" v-model="choixRegionOffres1">
                <option v-for="(d,index) in regionOffres" :key="index" :value="d">{{d}}</option>
            </select>
        </div>
        <div class="input-block">
            <label for="choixRegionOffres2">Choisir la deuxième région : </label>
            <select if="choixRegionOffres2" label="Choix région 2" v-model="choixRegionOffres2">
                <option v-for="(d,index) in regionOffres" :key="index" :value="d">{{d}}</option>
            </select>
        </div>
        <div class="input-block">
            <button @click="addData()">Ajouter les données</button>
        </div>
        <div class="input-block">
            <button @click="reset()">Remise à zéro</button>
        </div>
        <div  v-if="chartData.rows.length >0">
            <ve-histogram  :data="chartData" :settings="chartSettings"></ve-histogram>
        </div>
        <div v-else  class="graphique">
            Pas de données sélectionnée
        </div>

    </div>
</template>

<script>
// @ is an alias to /src
// on importe le composant helloWorld et on l'integre dans la vue HOME
import offres from "../assets/datas/offres_par_region.json";
import JSONPath from "jsonpath-plus";

export default {
  name: "comparaisoOffre",
  components: {},
  data() {
    return {
      offresJson: offres,
      choixRegionOffres1: null,
      choixRegionOffres2: null,
        chartSettings: {},
        chartData: {
            columns: ["dateRegion","offres1","offres2"],
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
    }
  },
  methods: {
    addData() {
        this.reset();

      // calcul des offres
      let totalOffres1 = 0;
      let totalOffres2 = 0;
      let year = 0;
      let counter = 1;
      let tabOffre1 = [];
      let tabOffre2 = [];
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
          totalOffres1 =
            totalOffres1 +
            Number(element[this.choixRegionOffres1].replace(",", "."));
          totalOffres2 =
            totalOffres2 +
            Number(element[this.choixRegionOffres2].replace(",", "."));
        } else {
          // dans le premier cas on l'ajoute pas dans la boucle.
          if (oldYear != 0) {
            // on multiplie par 1000 car c'est en millier

            tabOffre1[oldYear + "T" + oldQuarter] = Math.round(
              (totalOffres1 * 1000) / counter
            );
            tabOffre2[oldYear + "T" + oldQuarter] = Math.round(
              (totalOffres2 * 1000) / counter
            );
          }
          counter = 1;
          totalOffres1 = Number(
            element[this.choixRegionOffres1].replace(",", ".")
          );
          totalOffres2 = Number(
            element[this.choixRegionOffres2].replace(",", ".")
          );
        }
      });
      console.log("offre ", tabOffre1);

      // on ajoute d'abord les offres
      for (const key in tabOffre1) {
        this.chartData.rows.push({
            dateRegion : key,
            offres1: tabOffre1[key],
            offres2: tabOffre2[key]
        });
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
          columns: ["dateRegion","offres1","offres2"],
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
