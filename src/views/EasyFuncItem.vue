<template>
  <div class="easy-item-root-container" @click="go">
    <SvgIcon :name="data.icon" class="easy-item-icon" />
    <span class="easy-item-title">{{ data.title }}</span>
  </div>
</template>
<script setup lang="ts">
const props = defineProps(["data", "type"]);

function go() {
  // if (props.type === "OA") {
  //   const loading = ElLoading.service({
  //     lock: true,
  //     text: "Loading",
  //     background: "rgba(0, 0, 0, 0.7)",
  //   });
  //   setTimeout(() => {
  //     loading.close();
  //   }, 2000);
  // } 
    openNewTab(props.data.url);
}

function openNewTab(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}
</script>
<style scoped>
.easy-item-root-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 20px;
  cursor: pointer;
  min-width: 72px;
}

.easy-item-root-container:hover {
  opacity: 0.8;
}

.easy-item-title {
  font-size: 18px;
  margin-top: 10px;
}

.easy-item-icon {
  width: 50px !important;
  height: 50px !important;
  color: var(--primary-color);
}
</style>
