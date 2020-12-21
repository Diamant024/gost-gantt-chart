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
  mounted() {

    const chart = paint([this.$vnode.elm], { baseURL: 'http://10.110.5.37' });

  },
}
</script>

<style src="./style.css"></style>