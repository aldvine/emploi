<template>
    <div>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap justify-center>
                <v-flex xs12 md10 lg8>
                    <h2>Affichage de la part de consommation et de production</h2>
                    <Chart />
                </v-flex>
            </v-layout>
        </v-container>

    </div>
</template>

<script>
// @ is an alias to /src
// on importe le composant helloWorld et on l'integre dans la vue HOME
import Chart from "@/components/Chart.vue";

export default {
  name: "statistique",
  components: {
    Chart
  },
  data() {
    return {};
  }
};
</script>
