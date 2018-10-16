
<script>
import {Pie} from "vue-chartjs";

// ceci est composant
export default {
  extends: Pie,
  props: ['data', 'options'],
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, this.options);
  }
};
</script>
