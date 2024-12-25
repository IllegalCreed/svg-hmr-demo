<template>
  <div class="schedule-container">
    <div>
      <span style="display: block; margin-bottom: 20px">本日日程</span>
      <el-timeline style="max-width: 600px">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          :color="activity.color"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
    </div>
    <div class="schedule-legend">
      <div class="schedule-legend-item">
        <div
          class="schedule-circle"
          :style="{
            'background-color': '#65a30d',
          }"
        ></div>
        重复事件
      </div>
      <div class="schedule-legend-item">
        <div
          class="schedule-circle"
          :style="{
            'background-color': '#ea580c',
          }"
        ></div>
        紧急事件
      </div>
      <div class="schedule-legend-item">
        <div
          class="schedule-circle"
          :style="{
            'background-color': '#2563eb',
          }"
        ></div>
        普通事件
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineExpose({ load, save });
import { ElTimeline, ElTimelineItem } from "element-plus";
import { useMicroStore } from "@/stores/modules/microComp";
const { getTodo: getTodoAction } = useMicroStore();

function load() {}

function save() {}

const activities = ref<Schedule[]>([]);

async function getTodo() {
  activities.value = await getTodoAction();
}

onMounted(() => {
  getTodo();
});
</script>

<style scoped>
.schedule-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: scroll;
  padding: 20px;
}

.schedule-legend {
  display: flex;
  flex-direction: row;
  align-self: center;
  gap: 20px;
}

.schedule-legend-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.schedule-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
