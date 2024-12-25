<template>
  <div class="easy-root-container">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="easy-main-container">
      <EasyFuncItem
        v-for="item in funcList"
        :key="item.id"
        :data="item"
        :type="props.type"
      ></EasyFuncItem>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["type"]);

import { ref } from "vue";
import EasyFuncItem from "./EasyFuncItem.vue";
import { useEasyStore } from "@/stores/modules/easy";
import { useFastStore } from "@/stores/modules/fast";

const { get: getEasyAction } = useEasyStore();
const { get: getFastAction } = useFastStore();

const funcList = ref<any>([]);

onMounted(() => {
  getList();
});

async function getList() {
  if (props.type == "OA") {
    const res = await getFastAction();
    funcList.value = res;
  } else {
    const res = await getEasyAction();
    funcList.value = res;
  }
}
// if (props.type == 'OA') {
//     funcList.value = [
//         {
//             title: '请示',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '请假',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '报销',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '发文',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '用印',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '会议',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '纪要',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '合同',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '议题',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '协作',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '通讯录',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//     ]
// } else {
//     funcList.value = [
//         {
//             title: '火车预定',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '航班预订',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '酒店预订',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '天气预报',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '快递查询',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '违章查询',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '邮编区号',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '在线翻译',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '在线地图',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '社保查询',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//         {
//             title: '公积金',
//             icon: markRaw(MaterialSymbolsClinicalNotes)
//         },
//     ]
// }
</script>
<style scoped>
.easy-root-container {
  display: flex;
  flex-direction: column;
  background-color: var(--news-background);
  padding: 10px;
  min-height: 300px;
}

.header {
  position: relative;
  padding-left: 15px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
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

.easy-main-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 10px;
}
</style>
