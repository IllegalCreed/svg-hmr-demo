<script setup lang="ts">
import HeaderView from "./HeaderView.vue";
import FooterView from "./FooterView.vue";
import Toolbar from "../components/microComp/Toolbar.vue";
import GridPanel from "../components/microComp/GridPanel.vue";
import EasyFuncPanel from "./EasyFuncPanel.vue";
import NewsView from "./NewsView.vue";
import SubWebPanel from "./SubWebPanel.vue";
import GenuinePanel from "./GenuinePanel.vue";
import ReportPanel from "./ReportPanel.vue";
import { useReportStore } from "@/stores/modules/report";
import { token } from "@/utils/token";
import { useAccountStore } from "@/stores/modules/account";

const {
  getUser: getUserAction,
} = useAccountStore();
const { getJJ: getJJAction, getHG: getHGAction } = useReportStore();

const reportDialog = ref({
  title: "",
  content: "",
});

const jjjc = ref("");
const hg = ref("");

onMounted(() => {
  getJJAction().then((res) => {
    jjjc.value = res;
  });
  getHGAction().then((res) => {
    hg.value = res;
  });
});

function openJJJC() {
  reportDialog.value.title = "纪检监察信访举报";
  //   reportDialog.value.content = `
  // 一、举报电话：84378646
  // 二、举报邮箱：jijianjiancha@bj-big.com
  // 三、通信地址：北京市通州区运河东大街6号北京城市副中心投资建设集团有限公司2号楼101纪委综合室 邮政编码：101117
  // 四、来访接待场所：北京城市副中心投资建设集团总部7号楼101室
  //   `;
  dialogReportVisible.value = true;
  getJJAction().then((res) => {
    reportDialog.value.content = res;
    dialogReportVisible.value = true;
  });
}

function openHG() {
  reportDialog.value.title = "合规举报";
  //   reportDialog.value.content = `
  // 一、举报电话：010-84378687
  // 二、举报邮箱：heguijb@bj-big.com
  // 三、通信地址：北京市通州区运河东大街临6号
  // 四、邮编：101117
  //   `;
  dialogReportVisible.value = true;
  getHGAction().then((res) => {
    reportDialog.value.content = res;
    dialogReportVisible.value = true;
  });
}

const dialogReportVisible = ref(false);
</script>

<template>
  <div class="home-root-container">
    <HeaderView style="z-index: 3"> </HeaderView>
    <el-scrollbar class="home-scroll-container">
      <div class="inner-header" style="z-index: 2">
        <span class="slogan1">集“投资、融资、开发、建设、经营”于一体的</span>
        <span class="slogan2">城市综合运营商</span>
        <img
          style="position: absolute; bottom: 0; left: 80px"
          src="../assets/header-background.png"
          width="600"
        />

        <div class="link-bar">
          <a href="https://www.bj-big.com/" class="link">去官网 -></a>
        </div>

        <!-- <div class="link-bar">
          <span style="align-self: flex-start;font-size: 16px;">友情链接</span>
          <div style="flex: 1;"></div>
          <div class="link-bar-row">
            <div class="link-bar-column">
              <a href="https://www.bj-big.com/" class="link">去官网 -></a>
              <a href="https://avatar.bookan.com.cn/" class="link">数字档案馆 -></a>
            </div>
            <div class="link-bar-column">
              <a href="https://www.bj-big.com/" class="link">企业大数据 -></a>
              <a href="https://www.bj-big.com/" class="link">网络会议室 -></a>
            </div>
          </div>
        </div> -->
      </div>

      <NoticeBar style="position: sticky; top: 0px; z-index: 1"></NoticeBar>
      <span style="display: block; text-align: center;font-size: 30px;margin:10px">严禁传输、处理国家秘密和工作秘密</span>

      <Toolbar v-if="token" style="margin: 15px; margin-bottom: 0"></Toolbar>

      <div class="home-main-container">
        <div
          class="home-column-container"
          style="width: 600px; min-width: 600px"
        >
          <GridPanel v-if="token" style="margin-top: 15px"></GridPanel>
          <EasyFuncPanel v-if="token" style="margin-top: 15px" type="OA">
            <template #header> 快捷入口 </template>
          </EasyFuncPanel>
          <EasyFuncPanel style="margin-top: 15px" type="web">
            <template #header> 便捷功能 </template>
          </EasyFuncPanel>

          <div class="home-news-row" style="margin-top: 15px">
            <ReportPanel class="news-view">
              <template #header> 纪检监察信访举报 </template>
              <template #main> {{ jjjc }} </template>
            </ReportPanel>
          </div>
            <div v-if="!token" class="home-news-row" style="margin-top: 15px">
            <ReportPanel class="news-view">
              <template #header> 合规举报 </template>
              <template #main> {{ hg }} </template>
            </ReportPanel>
          </div>
        </div>

        <div class="home-column-container" style="flex: 1;margin-left: 15px;">
          <div class="home-news-row" style="margin-top: 15px">
            <NewsView class="news-view" type="1">
              <template #header> 党务公开 </template>
            </NewsView>
            <NewsView class="news-view" type="2" style="margin-left: 15px;">
              <template #header> 企业新闻 </template>
            </NewsView>
          </div>

          <SubWebPanel
            v-if="token"
            style="margin-top: 20px;"
          ></SubWebPanel>

          <div class="home-news-row" style="margin-top: 15px">
            <NewsView class="news-view" type="3">
              <template #header> 通知公告 </template>
            </NewsView>
            <NewsView class="news-view" type="4" style="margin-left: 15px;">
              <template #header> 曝光台 </template>
            </NewsView>
          </div>

          <div class="home-news-row" style="margin-top: 15px">
            <NewsView class="news-view" type="5">
              <template #header> 信息化专栏 </template>
            </NewsView>
            <GenuinePanel class="news-view" style="margin-left: 15px;"> </GenuinePanel>
          </div>

          <div v-if="token" class="home-news-row" style="margin-top: 15px">
            <ReportPanel class="news-view">
              <template #header> 合规举报 </template>
              <template #main> {{ hg }} </template>
            </ReportPanel>
          </div>
        </div>
      </div>

      <span style="display: block; text-align: center;font-size: 30px;margin:10px">严禁传输、处理国家秘密和工作秘密</span>

      <div style="height: 200px"></div>
    </el-scrollbar>

    <!-- <div class="sider-panel">
      <div class="sider-txt" style="flex: 3" @click="openJJJC">
        纪检监察信访举报
      </div>
      <div
        style="
          height: 1px;
          background-color: var(--color-text-light);
          width: 100%;
        "
      ></div>
      <div class="sider-txt" style="flex: 2" @click="openHG">合规举报</div>
    </div> -->
    <!-- <FooterView></FooterView> -->
  </div>

  <el-dialog
    v-model="dialogReportVisible"
    :title="reportDialog.title"
    width="600"
  >
    <div class="dialog-content">
      {{ reportDialog.content }}
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogReportVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogReportVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.home-root-container {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
  height: 100%;
}

.home-scroll-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
}

.home-scroll-container:deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}

.home-scroll-container:deep(.el-scrollbar__bar.is-horizontal) {
  height: 0 !important;
}

.icon-color {
  color: var(--primary-color);
}

.home-main-container {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 0 15px 15px 15px;
}

.home-column-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.home-news-row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
}

.news-view {
  flex: 1 1 50%;
  height: 300px;
  min-width: 0;
  width: 0;
}

.comp-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.inner-header {
  user-select: none;
  transition: all 0.2s !important;
  position: relative;
  height: 120px;
  background-color: var(--primary-color);
  color: var(--color-text-light);
}

.slogan1 {
  position: absolute;
  bottom: 80px;
  left: 120px;
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  letter-spacing: 0.15em;
}

.slogan2 {
  position: absolute;
  bottom: 30px;
  left: 720px;
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  letter-spacing: 0.15em;
}

.link-bar {
  right: 10px;
  bottom: 10px;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.1);
  width: 100px;
  height: 30px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  font-size: 14px;
}

.link-bar-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.link-bar-column {
  display: flex;
  flex-direction: column;
}

.sider-panel {
  position: fixed;
  right: 0;
  bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 140px;
  background-color: var(--primary-color);
  box-shadow: 0 0 10px var(--shadow-color);
  border-radius: 10px 0 0 10px;
}

.sider-txt {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-text-light);
  cursor: pointer;
  user-select: none;
}

.dialog-content {
  margin: 20px 50px;
  white-space: pre-wrap;
}
</style>
