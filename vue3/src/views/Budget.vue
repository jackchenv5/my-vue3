<template>
  <div ref="chartRef"  :style="{ width: '600px', height: '400px' }"></div>
</template>
<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
const chartRef = ref();




onMounted(()=>{
        // 指定图表的配置项和数据
    var option = {
            title: {
                text: '直角坐标系中的参考线示例'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: ['A', 'B', 'C', 'D', 'E']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '示例数据',
                type: 'bar',
                data: [10, 52, 200, 334, 390],
                markLine: {
                symbol: 'none',
                lineStyle: {
                    color: '#333',
                    width: 2
                },
                label: {
                    normal: {
                        position: 'end',
                        formatter: '{b}: {c}'
                    }
                },
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' },
                    { type: 'average', name: '平均值' },
                    {
                      yAxis: 150
                    },
                ]
            }
            }],
        };
  const chart = echarts.init(chartRef.value);
  chart.setOption(option);
})
</script>