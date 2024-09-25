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
      <div ref="ganttContainer" :style="{ width: '100vw', height: '80vh' }"></div>
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
]);


//tabs
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
    title: '是否为参考项目',
    key: 'is_base',
    dataIndex: 'is_base',
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
    scen_test:'2020-03-16~2021-06-20',
    is_base:'是'
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
    scen_test:'2020-03-16~2021-06-20',
    is_base:'否'
  },
];
// Table end


//gant start
import { gantt } from 'dhtmlx-gantt';


// 引入 dhtmlxGantt 的样式
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

const ganttContainer = ref();

onMounted(() => {
  // 初始化 gantt 图

  // 配置 gantt 图
  gantt.init(ganttContainer.value);
  gantt.config.scale_unit = "day";
  gantt.i18n.setLocale("cn");
  gantt.config.grid_resize = true;
  gantt.config.grid_width = 300;

  // 禁用添加按钮和编辑功能
  gantt.config.show_add_task_button = false;

  gantt.config.readonly = true; // 禁用所有编辑功能
  gantt.parse({
			data: [
				{ id: 1, text: "Project #2", start_date: "01-04-2023", duration: 18, progress: 0.4, open: true },
				{ id: 2, text: "Task #1", start_date: "02-04-2023", duration: 8, progress: 0.6, parent: 1 },
				{ id: 3, text: "Task #2", start_date: "11-04-2023", duration: 8, progress: 0.6, parent: 1 }
			],
			links: [
				{id: 1, source: 1, target: 2, type: "1"},
				{id: 2, source: 2, target: 3, type: "0"}
			]
		});

  // 渲染 gantt 图

  gantt.render();
});
//gant end
</script>


<style scoped>
</style>
