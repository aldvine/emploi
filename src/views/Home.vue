<template>
  <div class="home">
    <presentation />
  </div>
</template>

<script>
// @ is an alias to /src

// on importe le composant helloWorld et on l'integre dans la vue HOME
import Presentation from '@/components/Presentation.vue'

export default {
  name: 'home',
  components: {
    Presentation
  }
}
</script>
