<template>
  <div class="error-root">
    服务器异常，请联系管理员
    <el-button type="primary" @click="goHome" style="margin-top: 20px;">返回首页</el-button>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
function goHome() {
  router.push({
    name: "home",
  });
}
</script>

<style scoped>
.error-root{
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
