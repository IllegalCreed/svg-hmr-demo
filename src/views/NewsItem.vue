<template>
  <div class="item-root-container">
    <span class="title">{{ data.title }}</span>
    <span class="time">{{ data.createTimeFormat }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["data"]);
</script>

<style scoped>
.item-root-container {
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px dashed var(--news-divider);
}

.title {
  flex: 1;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: none;
}

.title:hover {
  opacity: 0.5;
}

.time {
  font-size: 12px;
  color: var(--news-time);
  margin-left: 20px;
  cursor: pointer;
  user-select: none;
  font-family: 'Roboto Mono', monospace;
  font-feature-settings: "tnum";
}
</style>
