<template>
    <div>

        <h2>Comparaison des demandes par trimestre et région</h2>
        <div class="input-block">
            <label for="choixRegionDemandes1">Choisir la première région : </label>
            <select class="custom-select" if="choixRegionDemandes1" label="Choix région 1" v-model="choixRegionDemandes1">
                <option v-for="(d,index) in regionDemandes" :key="index" :value="d">{{d}}</option>
            </select>
        </div>
        <div class="input-block">
            <label for="choixRegionDemandes2">Choisir la deuxième région : </label>
            <select class="custom-select" if="choixRegionDemandes2" label="Choix région 2" v-model="choixRegionDemandes2">
                <option v-for="(d,index) in regionDemandes" :key="index" :value="d">{{d}}</option>
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
</template>

<script>
// @ is an alias to /src
// on importe le composant helloWorld et on l'integre dans la vue HOME
import demandeurs from "../assets/datas/demandeurs_par_region.json";
import JSONPath from "jsonpath-plus";

export default {
  name: "comparaisonDemande",
  components: {},
  data() {
    return {
      demandesJson: demandeurs,
      choixRegionDemandes1: null,
      choixRegionDemandes2: null,
        chartSettings: {},
        chartData: {
            columns: ["dateRegion","demandes1","demandes2"],
            rows: []
        }
    };
  },
  computed: {
    regionDemandes() {
      // var result = JSONPath({json: this.offresJson, path: "$.fields"});
      let d = [];
      for (const key in this.demandesJson[0]) {
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

      // calcul des demandes
      let tabDemande1 = [];
      let tabDemande2 = [];

      this.demandesJson.forEach(element => {
          if(element['Periode'] >= "2015T1"){
            tabDemande1[element['Periode']] = Number(element[this.choixRegionDemandes1].split(" ").join(""));
            tabDemande2[element['Periode']] = Number(element[this.choixRegionDemandes2].split(" ").join(""));
          }
      });

      // on ajoute d'abord les offres
      for (const key in tabDemande1) {
        this.chartData.rows.push({
            dateRegion : key,
            demandes1: tabDemande1[key].toString(),
            demandes2: tabDemande2[key].toString()
        });
      }
    },
    reset() {
      this.chartData = {
          columns: ["dateRegion","demandes1","demandes2"],
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
