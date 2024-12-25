<template>
  <div class="genuine-root-container">
    <HeaderView></HeaderView>
    <div class="genuine-main-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>正版化软件</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="genuine-list-container">
        <GenuineItem v-for="item in genuineList" :data="item"></GenuineItem>

        <el-pagination
          style="margin-top: 50px; align-self: flex-end"
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderView from "./HeaderView.vue";
import GenuineItem from "./GenuineItem.vue";

import { useGenuineStore } from "../stores/modules/genuine";
const { getList: getListAction } = useGenuineStore();
import { usePager } from "@/composables/listpage";
const { pageNum, pageSize, total } = usePager(getList);

const genuineList = ref([]);

async function getList() {
  const res = await getListAction(pageNum.value, pageSize.value);
  genuineList.value = res.rows;
  total.value = res.total;
}
</script>

<style scoped>
.genuine-root-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.genuine-main-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
}

.genuine-list-container {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 800px;
  margin-top: 50px;
  background-color: var(--news-background);
  padding: 60px 100px;
}
</style>
