<template>
  <div style="">
    <a-menu background="red" v-model:selectedKeys="current" mode="horizontal" :items="items" :theme="theme"  style="height: 5vh;"/>
    <div style="display: flex;width: 100%;height: 94vh;">
      <div style="width: 18vw;padding: 2%;background-color: aliceblue;">
        <h3>项目选择区</h3>
        <a-tree
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
    checkable
    :tree-data="treeData"
  >
    <template #title="{ title, key }">
      <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
      <template v-else>{{ title }}</template>
    </template>
  </a-tree>
      </div>
      <div style="width: 80vw;margin-left: 10px;">
        <a-table :columns="columns" :data-source="data" bordered>
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
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
    </template>
  </a-table>
      </div>
    </div>
  </div>
  
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { HomeOutlined,DollarCircleOutlined,FieldTimeOutlined,ProjectOutlined,SettingOutlined,BookOutlined,PropertySafetyFilled,TeamOutlined,WhatsAppOutlined, ScheduleOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';

import type { MenuTheme } from 'ant-design-vue';
const theme = ref<MenuTheme>('dark');

const current = ref<string[]>(['shenchanlv']);
const items = ref<MenuProps['items']>([
  {
    key: 'home',
    icon: () => h(HomeOutlined),
    label: h('a', { href: '/', target: '_blank' }, '项目度量首页'),
    title: '项目度量首页',
  },
  {
    key: 'time',
    icon: () => h(FieldTimeOutlined),
    // label: '时间',
    label: h('a', { href: '/time', target: '_blank' }, '时间'),
    title: '时间',
  },
  {
    key: 'budget',
    icon: () => h(DollarCircleOutlined),
    // label: '预算',
    label: h('a', { href: '/budget', target: '_blank' }, '预算'),
    title: '预算',
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
// Table start
import { SmileOutlined, DownOutlined } from '@ant-design/icons-vue';
const columns = [
{
    name: '项目名',
    title: '项目名',
    dataIndex: 'name',
    key: '1',
  },  
{
    name: '任务完成率',
    title: '任务完成率',
    dataIndex: 'task_complete_rate',
    key: 'task_complete_rate',
  },
  {
    title: '工作小时效率',
    dataIndex: 'efficiency_per_hour',
    key: 'efficiency_per_hour',
  },
  {
    title: '缺陷修复速度',
    key: 'defect_fix_velocity',
    dataIndex: 'defect_fix_velocity',
  },
  {
    title: '生产率指数',
    key: 'pi',
    dataIndex: 'pi',
  },
  {
    title: '人天产出',
    key: 'opp',
    dataIndex: 'opp',
  },
  {
    title: '吞吐量（Throughput）',
    key: 'throughput',
    dataIndex: 'throughput',
  },
  {
    title: '周转时间（Lead Time)',
    key: 'lead_time',
    dataIndex: 'lead_time',
  },
  {
    title: '利用率（Utilization Rate)',
    key: 'ur',
    dataIndex: 'ur',
  },
  {
    title: '循环时间（Cycle Time）',
    key: 'cycle_time',
    dataIndex: 'cycle_time',
  },
];

const data = [
  {
    key: '1',
    name: '项目1',
    task_complete_rate: '90%',
    efficiency_per_hour:'`10行',
    defect_fix_velocity: '2/天',
    pi: '90%',
    opp: '100行/天',
    throughput:'1000行/天',
    lead_time: '10天',
    ur:'80%',
    cycle_time:'2天',
  },
  {
    key: '1',
    name: '项目2',
    task_complete_rate: '90%',
    efficiency_per_hour:'`10行',
    defect_fix_velocity: '2/天',
    pi: '90%',
    opp: '100行/天',
    throughput:'1000行/天',
    lead_time: '10天',
    ur:'80%',
    cycle_time:'2天',
  },
  {
    key: '1',
    name: '项目3',
    task_complete_rate: '90%',
    efficiency_per_hour:'`10行',
    defect_fix_velocity: '2/天',
    pi: '90%',
    opp: '100行/天',
    throughput:'1000行/天',
    lead_time: '10天',
    ur:'80%',
    cycle_time:'2天',
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
</script>


<style scoped>
</style>
