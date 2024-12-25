<template>
  <div class="number-container">
    <h1>{{ count }}</h1>
    <span>{{ type_format }}</span>
  </div>
</template>

<script setup lang="ts">
import { useMicroStore } from "@/stores/modules/microComp";
const { getSysNum: getSysNumAction } = useMicroStore();

defineExpose({ load, save });

const type = ref("");
const type_format = ref("");

watch(type, () => {
  switch (type.value) {
    case "OA_DB":
      type_format.value = "OA待办";
      break;
    case "OA_DY":
      type_format.value = "OA待阅";
      break;
    case "HT_DY":
      type_format.value = "合同待办";
      break;
    case "BX_DY":
      type_format.value = "报销待办";
      break;
    case "DA_DB":
      type_format.value = "档案待办";
      break;
  }
  if (type.value) {
    getCount();
  }
});

function load(payload: string) {
  type.value = payload;
}

function save() {
  return type.value;
}

const count = ref(0);
let timer: any = null;

async function getCount() {
  count.value = await getSysNumAction(type.value);
}

onMounted(() => {
  timer = setInterval(() => getCount(), 60000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.number-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
