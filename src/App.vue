<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { getCssVar, setThemeColor } from "@/utils/color";

// 设置主题色 位置 assets/base.css
setThemeColor(getCssVar("--primary-color"));

// import { ut, token } from "@/utils/token";
// import { useCasStore } from "@/stores/modules/cas";
// const { heartbeat } = useCasStore();

// let worker: Worker | null = null;

// onMounted(() => {
//   // 创建 Web Worker
//   worker = new Worker(new URL("./worker.js", import.meta.url));

//   // 监听来自 Web Worker 的消息
//   worker.onmessage = function (e: MessageEvent) {
//     if (e.data.type === "heartbeat") {
//       heartbeat(e.data.value);
//     }
//   };

//   // 启动 Web Worker 定时任务
//   if (ut.value && token.value) {
//     worker.postMessage({ type: "start", interval: 15000, utValue: ut.value });
//   }

//   // 监听 ut 变化
//   watch(ut, (newValue) => {
//     if (worker) {
//       worker.postMessage({ type: "stop" });

//       if (newValue) {
//         worker.postMessage({
//           type: "start",
//           interval: 15000,
//           utValue: newValue,
//         });
//       }
//     }
//   });
// });

// onUnmounted(() => {
//   if (worker) {
//     worker.terminate();
//   }
// });

// import { useAccountStore } from "@/stores/modules/account";
// const { loginWithST: loginWithSTAction } = useAccountStore();
// const router = useRouter();
// router.beforeEach((to, from, next) => {
//   const ticket = to.query.ticket as string;
//   const userticket = to.query.userticket as string;
//   if (ticket) {
//     loginWithSTAction(ticket)
//       .then(() => {
//         router.push({
//           name: "home",
//         });
//         ut.value = userticket;
//       })
//       .catch(() => {
//         token.value = "";
//         ut.value = "";
//         next({
//           name: "error",
//         });
//       });
//   } else {
//     next();
//   }
// });
</script>

<style scoped></style>
