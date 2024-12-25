<template>
  <div
    class="subPanel-root-container"
    :style="{ 'background-color': primatyColorOpacity }"
  >
    <div class="header">业务系统入口</div>

    <div class="subPanel-item-container">
      <SubWebItem
        v-for="item in subList"
        :key="item.id"
        :data="item"
      ></SubWebItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { getCssVar, isDark } from "@/utils/color";
import SubWebItem from "./SubWebItem.vue";
import { useSubSystemStore } from "@/stores/modules/subsystem";

const { get: getAction } = useSubSystemStore();

const primatyColor = ref(getCssVar("--primary-color"));
watch(
  isDark,
  () => {
    primatyColor.value = getCssVar("--primary-color");
  },
  { flush: "post" }
);
const primatyColorOpacity = computed(() => {
  return primatyColor.value + "80";
});

onMounted(() => {
  getList();
});

async function getList() {
  const res = await getAction();
  subList.value = res;
}

const subList = ref<any>([]);
// sebList.value = [
//   {
//     url: "",
//     title: "OA系统",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "浪潮ERP",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "档案管理",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "合同管理",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "资金管理",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "网上报销",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "建设协同",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "人力资源",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "商业系统",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "规划管理",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "安全管理",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "工程管理",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "三重一大",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "数字档案馆",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "企业大数据",
//     icon: markRaw(RiHomeOfficeFill),
//   },
//   {
//     url: "",
//     title: "网络会议室",
//     icon: markRaw(RiHomeOfficeFill),
//   },
// ];
</script>

<style scoped>
.subPanel-root-container {
  display: flex;
  flex-direction: column;
  min-height: 300px;
  background-image: url("../assets/header-background.png");
  background-repeat: no-repeat;
  background-position: 100% 100%;
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
  color: var(--color-text-light);
  border-bottom: 1px solid var(--news-divider);
}

.header::before {
  content: "";
  position: absolute;
  background-color: var(--color-text-light);
  height: 28px;
  top: 0;
  left: 0;
  width: 5px;
}

.subPanel-item-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
