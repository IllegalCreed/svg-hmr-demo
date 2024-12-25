<template>
  <div class="news-root-container">
    <div class="header">
      <slot name="header"></slot>
      <el-button type="primary" link @click="more">更多</el-button>
    </div>
    <div class="main">
      <NewsItem v-for="item in newsList" :data="item"></NewsItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticleStore } from "../stores/modules/article";
const { getList: getListAction } = useArticleStore();

import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps(["type"]);

import { ref } from "vue";
import NewsItem from "./NewsItem.vue";

const newsList = ref<Array<any>>([]);

onMounted(async () => {
  const res = await getListAction(props.type, 1, 10);
  newsList.value = res.rows;
});

function more() {
  router.push({
    name: "news",
    params: {
      type: props.type,
    },
  });
}
</script>

<style scoped>
.news-root-container {
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
