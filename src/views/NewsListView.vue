<template>
  <div class="news-root-container">
    <HeaderView></HeaderView>
    <div class="news-main-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ typeFormat }}</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="news-list-container">
        <NewsItem v-for="item in newsList" :data="item"></NewsItem>

        <el-pagination
          style="margin-top: 50px; align-self: center"
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
import NewsItem from "./NewsItem.vue";

const route = useRoute();
const type = ref("");
onMounted(() => {
  type.value = route.params.type as string;
});
const typeFormat = computed(() => {
  let result = "";
  switch (type.value) {
    case "1":
      result = "党务公开";
      break;
    case "2":
      result = "企业信息";
      break;
    case "3":
      result = "通知公告";
      break;
    case "4":
      result = "曝光台";
      break;
    case "5":
      result = "信息化专栏";
      break;
    default:
      result = "未知";
  }

  return result;
});

import { useArticleStore } from "../stores/modules/article";
const { getList: getListAction } = useArticleStore();
import { usePager } from "@/composables/listpage";
const { pageNum, pageSize, total } = usePager(getList);

const newsList = ref([]);
async function getList() {
  const res = await getListAction(type.value, pageNum.value, pageSize.value);
  newsList.value = res.rows;
  total.value = res.total;
}
</script>

<style scoped>
.news-root-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
}

.news-main-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  flex: 1;
}

.news-list-container {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 800px;
  margin-top: 50px;
  background-color: var(--news-background);
  padding: 60px 100px;
}
</style>
