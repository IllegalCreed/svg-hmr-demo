<template>
  <div ref="scrollContainer" class="scroll-container" @mouseenter="pauseScrolling" @mouseleave="resumeScrolling">
    <div ref="scrollText" class="scroll-text" :style="{ transform: `translateX(${offset}px)` }">
      {{ messages }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNoticeStore } from "@/stores/modules/notice";

const { getList: getListAction } = useNoticeStore();

// 显示内容
const messages = ref<string[]>([]);

// 滚动偏移量
const offset = ref(0);
// 滚动速度
const speed = 1;

// 请求动画的 ID
let animationFrameId = 0;

// 获取并拼接公告内容
async function getList() {
  const res = await getListAction();
  messages.value = res.map((item: { content: string }) => item.content).join(' • ');
}

// 滚动容器和文本的 DOM 引用
const scrollContainer = ref<HTMLElement | null>(null);
const scrollText = ref<HTMLElement | null>(null);

function updatePosition() {
  animationFrameId = requestAnimationFrame(() => {
    // 如果元素还没有挂载，不执行
    if (!scrollText.value || !scrollContainer.value) return;

    if (scrollText.value && scrollContainer.value) {
      offset.value -= speed;
      const textWidth = scrollText.value.clientWidth;
      const containerWidth = scrollContainer.value.clientWidth;

      // 如果完全滚动出去，就从右侧重新进入
      if (offset.value <= -textWidth) {
        offset.value = containerWidth;
      }

      updatePosition();
    }
  })
}

// 暂停滚动
function pauseScrolling() {
  cancelAnimationFrame(animationFrameId);
}

// 恢复滚动
function resumeScrolling() {
  updatePosition();
}

// 组件挂载时获取公告列表并启动滚动
onMounted(async () => {
  await getList();
  resumeScrolling();
});

// 组件卸载时停止动画
onUnmounted(() => {
  pauseScrolling();
});
</script>

<style>
.scroll-container {
  @apply h-10 w-full overflow-hidden whitespace-nowrap bg-[var(--notice-background)];
}

.scroll-text {
  @apply inline-block will-change-transform text-base text-white leading-10;
}
</style>