<template>
  <div class="mail-container">
    <span class="mail-new">您有{{ count }}封新邮件</span>
    <div class="mail-main">
      <el-button type="primary" size="large" class="mail-item">收件箱</el-button>
      <el-button type="primary" size="large" class="mail-item">写邮件</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMicroStore } from "@/stores/modules/microComp";
const { getSysNum: getSysNumAction } = useMicroStore();
defineExpose({ load, save });

function load() {}

function save() {}

const count = ref(0);
let timer: any = null;

async function getCount() {
  count.value = await getSysNumAction("Mail");
}

onMounted(() => {
  getCount();
  timer = setInterval(() => getCount(), 60000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.mail-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.mail-new {
  font-size: 16px;
}

.mail-main {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}

.mail-item{
  margin-top: 10px;
  margin-left: 20px;
}
</style>
