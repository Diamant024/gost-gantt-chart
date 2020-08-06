<template>
  <div class="gantt-chart"></div>
</template>

<script>
import paint from './methods/paint';

export default {
  name: "GanttChart",
  data() {
    return {
      chart: Object
    }
  },
  mounted() {

    const chart = paint(this.$vnode.elm);

  },
}
</script>

<style src="./style.css"></style>