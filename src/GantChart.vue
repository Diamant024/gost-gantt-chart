<template>
  <div style="display: contents;">
    <div class="gost-gantt-chart-qv-object"></div>
  </div>
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
      this.chart = paint([this.$vnode.elm], { data: { tasks: this.tasks, relations: this.relations } });
    }
  }
}
</script>

<style src="./style.css"></style>
