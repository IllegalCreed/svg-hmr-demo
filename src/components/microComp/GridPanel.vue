<template>
  <GridLayout
    :class="[isEdit ? 'layout-edit' : null]"
    v-model:layout="data"
    :margin="[20, 20]"
    :col-num="6"
    :row-height="30"
    :is-draggable="isEdit"
    :is-resizable="isEdit"
  >
    <GridItem
      v-for="item in data"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      drag-allow-from=".item-header"
    >
      <div class="item-header">
        <!-- <span class="text">{{ item.i }}</span> -->
        <span v-show="isEdit" class="remove" @click="removeItem(item.i)"
          >x</span
        >
      </div>
      <div class="item-container">
        <component
          :is="getType(item.i)"
          :ref="setComponentRef(item.i)"
        ></component>
      </div>
    </GridItem>
  </GridLayout>
</template>

<script setup lang="ts">
import { GridLayout, GridItem } from "grid-layout-plus";
import {
  compRefs,
  useCompDefine,
  useCompInstance,
  isEdit,
  data,
} from "@/composables/microComp";
const { init, remove, load } = useCompDefine();
const { getType } = useCompInstance();

const setComponentRef = (key: string) => {
  return (instance: any) => {
    if (instance) {
      compRefs.value[key] = instance;
    } else {
      delete compRefs.value[key];
    }
  };
};

function removeItem(id: string) {
  remove(id);
}

onMounted(() => {
  init();
  load();
});
</script>

<style scoped>
.item-header {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #333;
  height: 30px;
  cursor: pointer;
}

.item-container {
  flex: 1;
  overflow: hidden;
}

.vgl-layout {
  background-color: var(--layout-background);
  min-width: 600px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

.layout-edit::before {
  position: absolute;
  width: calc(100% - 5px);
  height: calc(100% - 5px);
  margin: 5px;
  content: "";
  background-image: linear-gradient(
      to right,
      var(--layout-line) 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, var(--layout-line) 1px, transparent 1px);
  background-repeat: repeat;
  background-size: calc(calc(100% - 5px) / 12) 40px;
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
  background-color: var(--layout-item-background);
  border-radius: 10px;
  box-shadow: 0 0 10px var(--shadow-color);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

:deep(.vgl-item__resizer) {
  right: 2px;
  bottom: 2px;
}

:deep(.vgl-item--static) {
  background-color: #cce;
}

.text {
  width: 100%;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.remove {
  position: absolute;
  top: 2px;
  right: 10px;
  cursor: pointer;
}
</style>
