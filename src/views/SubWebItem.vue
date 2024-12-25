<template>
  <div class="subitem-root-container" @click="go()">
    <SvgIcon :name="data.icon" class="sub-item-icon" />
    <span class="sub-item-title">{{ data.title }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["data"]);

function go() {
  
  // const loading = ElLoading.service({
  //   lock: true,
  //   text: "Loading",
  //   background: "rgba(0, 0, 0, 0.7)",
  // });
  // setTimeout(() => {
  //   loading.close();
  // }, 2000);
  openNewTab(props.data.url);
}

function openNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
</script>
<style scoped>
.subitem-root-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid var(--com-gray);
  border-radius: 4px;
  background-color: var(--layout-item-background);
  width: 200px;
  height: 60px;
  padding: 0 15px;
  margin: 10px 20px;
  cursor: pointer;
  user-select: none;
}

.subitem-root-container:hover {
  opacity: 0.8;
  border: 1px solid var(--primary-color);
  box-shadow: 0 0 10px var(--primary-color);
}

.sub-item-title {
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 3px;
  margin-left: 10px;
}

.sub-item-icon {
  width: 40px !important;
  height: 40px !important;
  color: var(--primary-color);
}
</style>
