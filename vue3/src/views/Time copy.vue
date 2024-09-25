<template>
  <div style="">
    <a-menu background="red" v-model:selectedKeys="current" mode="horizontal" :items="items" :theme="theme"  style="height: 5vh;"/>
    <div style="display: flex;flex-direction: column;width: 100%;height: 94vh;">
        <div style="margin-top: 10px;">
          <a-form :model="formState"  layout="inline">
            <a-form-item label="业务类型">
              <a-select ref="select" style="width: 200px" >
                <a-select-option value="主干版本">主干版本</a-select-option>
                <a-select-option value="单点需求定制">单点需求定制</a-select-option>
                <a-select-option value="战略合作" >战略合作</a-select-option>
                <a-select-option value="技术预研">技术预研</a-select-option>
                <a-select-option value="技术预研">新品研发</a-select-option>
                <a-select-option value="技术预研">特性项目</a-select-option>
                <a-select-option value="技术预研">老品改进</a-select-option>
                <a-select-option value="技术预研">重大入围</a-select-option>
                <a-select-option value="技术预研">其它</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="产品类别">
              <a-select ref="select" style="width: 200px" >
                <a-select-option value="主干版本">TAP</a-select-option>
                <a-select-option value="单点需求定制">交换机</a-select-option>
                <a-select-option value="安全产品" >安全产品</a-select-option>
                <a-select-option value="平台版本">平台版本</a-select-option>
                <a-select-option value="应用软件">应用软件</a-select-option>
                <a-select-option value="无线产品">无线产品</a-select-option>
                <a-select-option value="硬件定制">硬件定制</a-select-option>
                <a-select-option value="网卡">网卡</a-select-option>
                <a-select-option value="通信融合">通信融合</a-select-option>
                <a-select-option value="解决方案">解决方案</a-select-option>
                <a-select-option value="路由器">路由器</a-select-option>
                <a-select-option value="其它">其它</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
  <a-tabs v-model:activeKey="activeKey" size="large" type="card" style="margin-top: 10px;">
    <a-tab-pane key="1">
      <template #tab>
        <span>
          <TableOutlined />
          数据表
        </span>
      </template>

        <a-table :columns="columns" :data-source="data" bordered :row-selection="rowSelection">
          <template #headerCell="{ column }">
            <template v-if="column.key === 'name'">
              <span>
                <smile-outlined />
                项目名
              </span>
            </template>
          </template>

          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'name'">
              <a v-if="record.name === '基准指标'" style="color: red;">{{ record.name }}</a>
              <a v-else >{{ record.name }}</a>
            </template>
            <template v-if="column.key === 'age'">
              <span v-if="record.age > 1" style="color: red;">{{ record.age }}</span>
            </template>
            <template v-if="column.key === 'address'">
              <span v-if="record.address > 1" style="color: red;">{{ record.address }}</span>
            </template>
            <template v-else-if="column.key === 'is_base'">
              <span>
                <!-- <a-tag> -->
                  <span v-if="record.is_base === '是'" style="color: red;font-size: 16px;"><CheckCircleOutlined/></span>
                  <span v-else style="color: gainsboro;font-size: 16px;"><CloseCircleOutlined/></span>
                <!-- </a-tag> -->
              </span>
            </template>
            <template v-else-if="column.key === 'action'">
        <span>
          <a>标记为参考项目</a>
          <a-divider type="vertical" />
          <a>取消标记</a>
        </span>
      </template>
          </template>
        </a-table>
    </a-tab-pane>
    <a-tab-pane key="2"  force-render>
      <template #tab>
        <span>
          <PieChartOutlined />
          甘特图
        </span>
      </template>
      <!-- <div ref="chartRef" style="height: 80vh;width: 100%;"></div> -->
      <div ref="chartRef" :style="{ width: '100vw', height: '80vh' }"></div>
    </a-tab-pane>
  </a-tabs>

      </div>
    </div>
  
</template>
<script lang="ts" setup>
import { h, ref,watch,onMounted,nextTick } from 'vue';
import { CloseCircleOutlined,CheckCircleOutlined,PieChartOutlined,TableOutlined,HomeOutlined,DollarCircleOutlined,FieldTimeOutlined,ProjectOutlined,SettingOutlined,BookOutlined,PropertySafetyFilled,TeamOutlined,WhatsAppOutlined, ScheduleOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';

import type { MenuTheme } from 'ant-design-vue';
const theme = ref<MenuTheme>('dark');

const current = ref<string[]>(['time']);
const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(HomeOutlined),
    label: h('a', { href: '/', target: '_blank' }, '周期及计划达成率'),
    title: '周期及计划达成率',
  },
  {
    key: 'time',
    icon: () => h(FieldTimeOutlined),
    // label: '时间',
    label: h('a', { href: '/time', target: '_blank' }, '软件周期'),
    title: '软件周期',
  },
  {
    key: '硬件周期',
    icon: () => h(DollarCircleOutlined),
    // label: '预算',
    label: h('a', { href: '/budget', target: '_blank' }, '硬件周期'),
    title: '硬件周期',
  },
  {
    key: 'quality',
    icon: () => h(PropertySafetyFilled),
    // label: '质量',
    label: h('a', { href: '/quality', target: '_blank' }, '质量'),
    title: '质量',
  },
  {
    key: 'tzz',
    icon: () => h(BookOutlined),
    // label: '投资回报率（ROI）',
    label: h('a', { href: '/tzz', target: '_blank' }, '投资回报率（ROI）'),
    title: '投资回报率（ROI）',
  },
  {
    key: 'shenchanlv',
    icon: () => h(ProjectOutlined),
    // label: '生产率',
    label: h('a', { href: '/shenchanlv', target: '_blank' }, '生产率'),
    title: '生产率',
  },
  {
    key: 'manyidu1',
    icon: () => h(WhatsAppOutlined),
    // label: '客户满意度',
    label: h('a', { href: '/manyidu1', target: '_blank' }, '客户满意度'),
    title: '客户满意度',
  },
  {
    key: 'manyidu2',
    icon: () => h(TeamOutlined),
    // label: '员工满意度',
    label: h('a', { href: '/manyidu2', target: '_blank' }, '员工满意度'),
    title: '员工满意度',
  },
  {
    key: 'zhannue',
    icon: () => h(ScheduleOutlined),
    // label: '与战略业务目标的一致性',
    label: h('a', { href: '/zhannue', target: '_blank' }, '与战略业务目标的一致性'),
    title: '与战略业务目标的一致性',
  },
  {
    key: 'shezhi',
    icon: () => h(SettingOutlined),
    label: '设置',
    title: '设置',
  },
]);

import * as echarts from 'echarts';

//tabs
//echarts start
const chartRef = ref();
onMounted(() => {
  // 确保 DOM 元素已渲染
  // const chartRef = ref(null);
  // let chartInstance = echarts.init(document.getElementById('main'));
  nextTick(() => {
    let chartInstance = echarts.init(chartRef.value);
    const cycleData = [
      ['2022-01-01',  80, 5,90,'项目1'],
      ['2022-02-01',  90,   0,100,'项目2'],
      ['2022-02-01',  100, 7,85,'项目3'],
      ['2022-03-01',  105, 10,85,'项目4'],
      ['2022-04-01',  90, 14,85,'项目5'],
      ['2022-05-01',  108, 8,86,'项目6'],
      ['2022-06-01',  110, 12,87,'项目7'],
      ['2022-07-01',  102, 6,80,'项目8'],
      ['2022-08-01',  94, 7,88,'项目9'],
      ['2022-09-01',  118, 20,88,'项目10'],
      ['2022-10-01',  120, 12,50,'项目11'],
      ['2022-11-01',  120, 12,50,'项目12'],
      ['2022-12-01',  120, 12,50,'项目13'],
    ];


    const schemaProject = [
      { name: 'date', index: 0, text: '日期' },
      { name: 'cycle', index: 1, text: '项目周期' },
      { name: 'delay', index: 2, text: '延迟天数' },
      { name: 'rate', index: 3, text: 'TR5达成率' },
      { name: 'project', index: 4, text: '项目名' },
    ];

    const itemStyle = {
      opacity: 0.8,
      shadowBlur: 10,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      shadowColor: 'rgba(0,0,0,0.3)'
    };

    const option = {
      color: ['#dd4444', '#fec42c', '#80F1BE'],
    legend: {
        top: 10,
        data: ['实际项目周期', '延迟天数', 'TR5达成率'],
        textStyle: {
          fontSize: 16
        }
      },
      grid: {
        left: '10%',
        right: '15%',
        top: '18%',
        bottom: '10%'
      },
      tooltip: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        formatter: function (param: any) {
          var value = param.value;
          if(!value[1]) return ''
          // prettier-ignore
          return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
            + value[4] + '发布时间: ' + value[0] 
            + '</div>'
            + schemaProject[1].text + '：' + value[1] + '<br>'
            + schemaProject[2].text + '：' + value[2] + '<br>'
            + schemaProject[3].text + '：' + value[3] + '<br>'
        }
      },
      xAxis: {
        type: 'time',
        name: '日期',
        nameGap: 16,
        axisLabel: {
                    formatter: function (value) {
                        return echarts.format.formatTime('yyyy-MM-dd', value);
                    }
                },
        nameTextStyle: {
          fontSize: 16
        },
        // max: 31,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: '项目周期',
        nameLocation: 'end',
        nameGap: 20,
        nameTextStyle: {
          fontSize: 16
        },
        splitLine: {
          show: false
        }
      },
      visualMap: [
        {
          left: 'right',
          top: '5%',
          dimension: 1,
          min: 50,
          max: 200,
          itemWidth: 30,
          itemHeight: 120,
          calculable: true,
          precision: 0.1,
          text: ['圆形大小：项目周期'],
          textGap: 30,
          inRange: {
            symbolSize: [10, 70]
          },
          outOfRange: {
            symbolSize: [10, 70],
            color: ['rgba(255,255,255,0.4)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#eee']
            }
          }
        },
        {
          left: 'right',
          top: '40%',
          dimension: 3,
          min: 0,
          max: 100,
          itemHeight: 120,
          text: ['明暗变化：项目达成率'],
          textGap: 30,
          inRange: {
            colorLightness: [0.9, 0.5]
          },
          outOfRange: {
            color: ['rgba(255,255,255,0.4)']
          },
          controller: {
            inRange: {
              color: ['#c23531']
            },
            outOfRange: {
              color: ['#999']
            }
          }
        },
        {
            left: 'right',
            bottom: '5%',
            dimension: 2,
            min: 0,
            max: 20,
            itemHeight: 80,
            text: ['色彩渐变：延迟天数'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['yellow', 'red'] // 渐变颜色
            }
        },
      ],
      series: [
        {
          name: '实际项目周期',
          type: 'scatter',
          itemStyle: itemStyle,
          markLine: {
            symbol: 'none', // 不显示标记点
            lineStyle: {
                color: 'green', // 默认直线颜色
                width: 1 // 直线宽度
            },
            label: {
                normal: {
                    position: 'end',
                    formatter: '{b}: {c}'
                }
            },
            data: [
                { type: 'max', name: '最大值', color:'red' }, // 最大值线
                { type: 'min', name: '最小值' }, // 最小值线
                { type: 'average', name: '平均值' } // 平均线
            ]
        },
          data: cycleData
        },
        {
          name: '延迟天数',
          type: 'scatter',
          itemStyle: itemStyle,
          data: cycleData,
          encode: { // 使用encode来指定数据列与坐标轴的关系
          x: 0, // 第2个元素作为X轴的值
          y: 2, // 第4个元素（索引为3）作为Y轴的值
          tooltip: [0, 1, 2, 3, 4] // 可选，用于定义tooltip中显示哪些字段
        }
        },
        {
          name: 'TR5达成率',
          type: 'scatter',
          itemStyle: itemStyle,
          data: cycleData,
          encode: { // 使用encode来指定数据列与坐标轴的关系
          x: 0, // 第2个元素作为X轴的值
          y: 3, // 第4个元素（索引为3）作为Y轴的值
          tooltip: [0, 1, 2, 3, 4] // 可选，用于定义tooltip中显示哪些字段
        }
        }
      ]
    };

  // 绘制图表
    chartInstance.setOption(option);
  })


})
const activeKey = ref('1');
//tabs end


// Table start
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const columns = [
  {
    name: 'ID',
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    name: '项目名',
    title: '项目名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '创建年份',
    dataIndex: 'create_year',
    key: 'create_year',
  },
  {
    title: '发布年份',
    dataIndex: 'publish_year',
    key: 'publish_year',
  },
  {
    title: '需求',
    key: 'need',
    dataIndex: 'need',
  },
  {
    title: '总体方案及计划',
    key: 'schedule',
    dataIndex: 'schedule',
  },
  {
    title: '设计及编码',
    key: 'code',
    dataIndex: 'code',
  },
  {
    title: '集成调试',
    key: 'debug',
    dataIndex: 'debug',
  },
  {
    title: '集成测试',
    key: 'test',
    dataIndex: 'test',
  },
  {
    title: '系统测试',
    key: 'sys_test',
    dataIndex: 'sys_test',
  },
  {
    title: '场景测试',
    key: 'scen_test',
    dataIndex: 'scen_test',
  },
  {
    title: 'Action',
    key: 'action',
  },
];

const data = [
  {
    key: '0',
    id:1,
    name: '项目1',
    create_year:'2020年',
    publish_year:'2021年',
    need:'2020-11-20~2020-11-30',
    schedule: '2020-11-31~2020-12-15',
    code: '2020-12-16~2021-02-20',
    debug: '2020-01-16~2021-03-20',
    test: '2020-02-16~2021-04-20',
    sys_test:'2020-03-16~2021-05-20',
    scen_test:'2020-03-16~2021-06-20'
  },
  {
    key: '1',
    id:2,
    name: '项目2',
    create_year:'2020年',
    publish_year:'2021年',
    need:'2020-11-20~2020-11-30',
    schedule: '2020-11-31~2020-12-15',
    code: '2020-12-16~2021-02-20',
    debug: '2020-01-16~2021-03-20',
    test: '2020-02-16~2021-04-20',
    sys_test:'2020-03-16~2021-05-20',
    scen_test:'2020-03-16~2021-06-20'
  },
];
// Table end

//Tree start
import {watch } from 'vue';
import type { TreeProps } from 'ant-design-vue';

const treeData: TreeProps['treeData'] = [
  {
    title: '全部项目',
    key: '0-0',
    children: [
      {
        title: '在研',
        key: '0-0-0',
        children: [
          { title: '交换机', 
            key: '0-0-0-0',
            children: [
          { title: '项目1', key: '0-0-0-0-0'},
          { title: '项目2', key: '0-0-0-0-1' },
          { title: '项目3', key: '0-0-0-0-2' },
          { title: '项目4', key: '0-0-0-0-3' },
        ]},
          { title: '路由器', key: '0-0-0-1' },
          { title: '安全产品', key: '0-0-0-2' },
          { title: '通信融合', key: '0-0-0-3' },
        ],
      },
      {
        title: '结项',
        key: '0-0-1',
      },
      {
        title: '终止',
        key: '0-0-1',
      },
    ],
  },
];

const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const selectedKeys = ref<string[]>(['0-0-0', '0-0-1']);
const checkedKeys = ref<string[]>(['0-0-0', '0-0-1']);
watch(expandedKeys, () => {
  console.log('expandedKeys', expandedKeys);
});
watch(selectedKeys, () => {
  console.log('selectedKeys', selectedKeys);
});
watch(checkedKeys, () => {
  console.log('checkedKeys', checkedKeys);
});
//Tree end

// form start
import { reactive, toRaw } from 'vue';
import type { UnwrapRef } from 'vue';

interface FormState {
  name: string;
  delivery: boolean;
  type: string[];
  resource: string;
  desc: string;
}
const formState: UnwrapRef<FormState> = reactive({
  name: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});
const onSubmit = () => {
  console.log('submit!', toRaw(formState));
};
const labelCol = { style: { width: '120px' } };
const wrapperCol = { span: 20 };

// form end

</script>


<style scoped>
</style>
