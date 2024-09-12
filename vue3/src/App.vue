<template>
  <div style="">
    <a-menu background="red" v-model:selectedKeys="current" mode="horizontal" :items="items" :theme="theme"  style="height: 5vh;"/>
    <div style="display: flex;width: 100%;height: 94vh;">
      <div style="width: 20vw;background-color: aliceblue;">
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
      <div style="width: 80vw;">
        <a-table :columns="columns" :data-source="data">
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

const current = ref<string[]>(['mail']);
const items = ref<MenuProps['items']>([
  {
    key: 'app',
    icon: () => h(HomeOutlined),
    label: '项目度量首页',
    title: '项目度量首页',
  },
  {
    key: 'time',
    icon: () => h(FieldTimeOutlined),
    label: '时间',
    title: '时间',
  },
  {
    key: 'budget',
    icon: () => h(DollarCircleOutlined),
    label: '预算',
    title: '预算',
  },
  {
    key: 'qualityfiy',
    icon: () => h(PropertySafetyFilled),
    label: '质量',
    title: '质量',
  },
  {
    key: 'touzi',
    icon: () => h(BookOutlined),
    label: '投资回报率（ROI）',
    title: '投资回报率（ROI）',
  },
  {
    key: 'shenchanlv',
    icon: () => h(ProjectOutlined),
    label: '生产率',
    title: '生产率',
  },
  {
    key: 'manyidu1',
    icon: () => h(WhatsAppOutlined),
    label: '客户满意度',
    title: '客户满意度',
  },
  {
    key: 'manyidu2',
    icon: () => h(TeamOutlined),
    label: '员工满意度',
    title: '员工满意度',
  },
  {
    key: 'zhannue',
    icon: () => h(ScheduleOutlined),
    label: '与战略业务目标的一致性',
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
    key: 'name',
  },
  {
    title: '时间（进度绩效指数SPI）',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '预算（成本执行指数CPI）',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '代码质量',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: '投资回报率(ROI = (净利润 / 投资成本) × 100%)',
    key: 'roi',
    dataIndex: 'roi',
  },
  {
    title: '项目生产率(实际产出 / 计划产出)',
    key: 'produce',
    dataIndex: 'produce',
  },
  {
    title: '客户满意度（(非常满意/客户总数)）',
    key: 'manyi',
    dataIndex: 'manyi',
  },
];

const data = [
  {
    key: '1',
    name: '项目1',
    age: 1,
    address: 2,
    tags: ['缺陷率（0.5%）', '修复率(98%)'],
    roi: '20%',
    produce:'20%',
    manyi:'80%'
  },
  {
    key: '2',
    name: '项目2',
    age: 0.9,
    address: 1.5,
    tags: ['缺陷率（0.2%）', '修复率(95%)'],
    roi: '30%',
    produce:'20%',
    manyi:'80%'
  },
  {
    key: '3',
    name: '项目3',
    age: 0.8,
    address: 1.0,
    tags: ['缺陷率（0.7%）', '修复率(90%)'],
    roi: '40%',
    produce:'20%',
    manyi:'80%'
  },
];
// Table end

//Tree start
import {watch } from 'vue';
import type { TreeProps } from 'ant-design-vue';

const treeData: TreeProps['treeData'] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
          { title: 'leaf', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ key: '0-0-1-0', title: 'sss' }],
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
