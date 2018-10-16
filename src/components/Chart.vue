<template>
    <div>
        <input type="date" name="choixDate" v-model="choixDate">
        <v-btn @click="getDataFromDay()"> Charger les données
        </v-btn>
        <v-layout row wrap justify-center>
            <v-flex xs12 sm8 lg7 xl6>
                <v-card class="pa-3">

                    <Pie :data="data" />
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Pie from "@/components/Pie.vue";
import data_enedis from "../assets/datas/enedis_bilan_demi_heure.json";
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
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      }
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
      this.data = {
        labels: [],
        datasets: [
          {
            label: "test",
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
          }
        ]
      };
        
      this.jsonEnedis.forEach(element => {
        let dateElement = new Date(element.fields.horodate);

        if (
          dateElement.getDate() == dateChoisi.getDate() &&
          dateElement.getMonth() == dateChoisi.getMonth() &&
          dateElement.getFullYear() == dateChoisi.getFullYear()
        ) {
          for (const key in element.fields) {
            if (element.fields.hasOwnProperty(key)) {
              let field = element.fields[key];
              this.data.labels.push("test");
              this.data.datasets[0].data.push(field);
            }
          }
        }
      });
    },
    traitementEnedis() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- scoped  ça permet de limiter le css à ce composant-->
<style scoped lang="stylus">
</style>
