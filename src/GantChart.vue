<template>
  <div class="gost-gantt-chart-qv-object"></div>
</template>

<script>
import paint from './methods/paint';
import 'jsgantt-improved/dist/jsgantt.css';

export default {
  name: "GanttChart",
  data() {
    return {
      chart: Object
    }
  },
  props: {
    tasks: {
      type: Array,
      default: () => []
    },
    relations: {
      type: Array,
      default: () => []
    }
  },
  mounted() {


  },
  watch:{
    relations (to, from){
      if (to)
        this.setupChart();
    }
  },
  methods: {
    setupChart() {
      this.chart = paint([this.$vnode.elm], { tasks: this.tasks, relations: this.relations });
    }
  }
}
</script>

<style src="./style.css"></style>
