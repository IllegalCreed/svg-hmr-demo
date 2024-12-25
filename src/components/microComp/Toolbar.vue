<template>
  <div class="toolbar-container">
    <el-tooltip
      class="box-item"
      effect="dark"
      content="灵活布局开关，关闭时自动保存"
      placement="top-start"
    >
      <div class="toolbar-container">
        <i-icon-park-solid-more-app
          class="icon-color"
          style="margin-right: 10px; font-size: 25px"
        ></i-icon-park-solid-more-app>
        <el-switch
          v-model="isEdit"
          :style="{
            '--el-switch-on-color': '#13ce66',
            '--el-switch-off-color': isDark ? '#950b0f' : '#d00d14',
          }"
        />
      </div>
    </el-tooltip>
    <div class="toolbar-container" v-show="isEdit">
      <el-button
        type="primary"
        style="margin-left: 20px"
        @click="addNumber('OA_DB')"
      >
        <el-icon style="margin-right: 5px"
          ><i-fluent-number-symbol-square-24-filled
        /></el-icon>
        OA待办
      </el-button>
      <el-button type="primary" @click="addNumber('OA_DY')">
        <el-icon style="margin-right: 5px"
          ><i-fluent-number-symbol-square-24-filled
        /></el-icon>
        OA待阅
      </el-button>
      <el-divider direction="vertical" />
      <el-button type="primary" @click="addNumber('HT_DY')">
        <el-icon style="margin-right: 5px"
          ><i-fluent-number-symbol-square-24-filled
        /></el-icon>
        合同待办
      </el-button>
      <el-button type="primary" @click="addNumber('BX_DY')">
        <el-icon style="margin-right: 5px"
          ><i-fluent-number-symbol-square-24-filled
        /></el-icon>
        报销待办
      </el-button>
      <el-divider direction="vertical" />
      <el-button type="primary" @click="addNumber('DA_DB')">
        <el-icon style="margin-right: 5px"
          ><i-fluent-number-symbol-square-24-filled
        /></el-icon>
        档案待办
      </el-button>
      <el-divider direction="vertical" />
      <el-button type="primary" @click="addSchedule">
        <el-icon style="margin-right: 5px"><i-uis-schedule /></el-icon>
        日程
      </el-button>
      <el-button type="primary" @click="addMail">
        <el-icon style="margin-right: 5px"><i-material-symbols-mail /></el-icon>
        邮件
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isDark } from "@/utils/color";
import { useCompDefine, isEdit } from "@/composables/microComp";

const { add } = useCompDefine();

function addNumber(type: string) {
  add("Number", type, type);
}

function addSchedule() {
  add("Schedule", "Schedule");
}

function addMail() {
  add("Mail", "Mail");
}
</script>

<style>
.toolbar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.icon-color {
  color: var(--primary-color);
}
</style>
