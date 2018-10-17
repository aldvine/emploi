<template>
  <div>
    <input type="date" name="choixDate" v-model="choixDate">
    <v-btn @click="getDataFromDay()"> Charger les données
    </v-btn>
    <v-layout row wrap justify-center>
      <v-flex xs12  xl6 v-if="chartData">
        <v-card class="pa-3">
          <!-- <Pie :chartData="chartData" /> -->
          <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>

        </v-card>
      </v-flex>
      <v-flex xs12  xl6>
        <v-card class="pa-3" v-if="chartData">
          <!-- <Pie :chartData="chartData" /> -->
          <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>

        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Pie from "@/components/Pie.vue";
import data_enedis from "../assets/datas/enedis_bilan_demi_heure.json";
import JSONPath from "jsonpath-plus";
// ceci est composant
export default {
  name: "Chart",
  components: {
    Pie
  },
  mounted() {},
  props: {},

  // les donnees du composants
  data() {
    return {
      choixDate: "",
      jsonEnedis: data_enedis,
      // chartData: {
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      //   datasets: [
      //     {
      //       label: "# of Votes",
      //       data: [12, 19, 3, 5, 2, 3],
      //       backgroundColor: [
      //         "rgba(255, 99, 132, 0.2)",
      //         "rgba(54, 162, 235, 0.2)",
      //         "rgba(255, 206, 86, 0.2)",
      //         "rgba(75, 192, 192, 0.2)",
      //         "rgba(153, 102, 255, 0.2)",
      //         "rgba(255, 159, 64, 0.2)"
      //       ],
      //       borderColor: [
      //         "rgba(255,99,132,1)",
      //         "rgba(54, 162, 235, 1)",
      //         "rgba(255, 206, 86, 1)",
      //         "rgba(75, 192, 192, 1)",
      //         "rgba(153, 102, 255, 1)",
      //         "rgba(255, 159, 64, 1)"
      //       ],
      //       borderWidth: 1
      //     }
      //   ]
      // },
      chartSettings : {
        roseType: 'radius'
      },
      chartData: null
    };
  },
  watch: {
    // lorsque l'o detecte un changement de valeur sur la proprieter choixDate on effectue des actions
    choixDate() {
      console.log("changement de date");
    }
  },
  computed: {},
  methods: {
    getDataFromDay() {
      console.log("debut du traitement");
      let dateChoisi = new Date(this.choixDate);

      // *******************
      // this.chartData = {
      //   labels: [],
      //   datasets: [
      //     {
      //       label: "test",
      //       data: [],
      //       backgroundColor: [],
      //       borderColor: [],
      //       borderWidth: 1
      //     }
      //   ]
      // };

      //  moyenne sur une année

      // this.jsonEnedis.forEach(element => {
      //   // var result = JSONPath({json: element, path: "$.fields"});

      //   let dateElement = new Date(element.fields.horodate);
      //   // si c'est la meme date que celle selectionné
      //   if (
      //     dateElement.getDate() == dateChoisi.getDate() &&
      //     dateElement.getMonth() == dateChoisi.getMonth() &&
      //     dateElement.getFullYear() == dateChoisi.getFullYear()
      //   ) {
      //     for (const key in element.fields) {
      //       if (element.fields.hasOwnProperty(key)) {
      //         if (typeof element.fields[key] == "number") {
      //           if (this.chartData.datasets[0].data[key]) {
      //             this.chartData.datasets[0].data[key] += element.fields[key];
      //           } else {
      //             this.chartData.datasets[0].data[key] = element.fields[key];
      //           }
      //         }
      //       }
      //     }
      //   }
      // });
      // *********************

      this.chartData = {
        columns: ["label", "power"],
        rows: []
      };
      var tab = [];
      this.jsonEnedis.forEach(element => {
        // var result = JSONPath({json: element, path: "$.fields"});

        let dateElement = new Date(element.fields.horodate);
        // si c'est la meme date que celle selectionné
        if (
          dateElement.getDate() == dateChoisi.getDate() &&
          dateElement.getMonth() == dateChoisi.getMonth() &&
          dateElement.getFullYear() == dateChoisi.getFullYear()
        ) {
          for (const key in element.fields) {
            if (element.fields.hasOwnProperty(key)) {
              if (typeof element.fields[key] == "number") {
                if (tab[key]) {
                  tab[key] += element.fields[key];
                } else {
                  tab[key] = element.fields[key];
                }
              }
            }
          }
        }
      });
      for (const key in tab) {
        this.chartData.rows.push({ label: key, power: tab[key] });
      }

    },
    traitementEnedis() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped  ça permet de limiter le css à ce composant-->
<style scoped lang="stylus">
</style>
