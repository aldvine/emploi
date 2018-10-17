
<script>
import {Pie} from "vue-chartjs";

// ceci est composant
export default {
  extends: Pie,
  props: ['chartData', 'options'],
  
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.chartData, this.options);
  },
  watch:{
    chartData(){
        this.renderChart(this.chartData, this.options);

    }
  }
  
};
</script>
