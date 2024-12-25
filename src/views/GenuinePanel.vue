<template>
  <div class="genuine-root-container">
    <div class="header">
      正版化软件
      <el-button type="primary" link @click="more">更多</el-button>
    </div>
    <div class="main">
      <GenuineItem v-for="item in genuinewList" :data="item"></GenuineItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

import { ref } from "vue";
import GenuineItem from "./GenuineItem.vue";

import { useGenuineStore } from "../stores/modules/genuine";
const { getList: getListAction } = useGenuineStore();
const genuinewList = ref<Array<any>>([]);

onMounted(async () => {
  const res = await getListAction(1, 10);
  genuinewList.value = res.rows;
});

function more() {
  router.push({
    name: "genuine",
  });
}
</script>

<style scoped>
.genuine-root-container {
  display: flex;
  flex-direction: column;
  background-color: var(--news-background);
  padding: 10px;
}

.header {
  position: relative;
  padding-left: 15px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--news-divider);
}

.header::before {
  content: "";
  position: absolute;
  background-color: var(--primary-color);
  height: 28px;
  top: 0;
  left: 0;
  width: 5px;
}

.main {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
