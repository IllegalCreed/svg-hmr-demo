<template>
  <div flex flex-col>
    <Header />
    <el-scrollbar>
      <div flex flex-col h-75 bg-red-5>
        顶部
      </div>
      <Footer />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import Header from '@/views/V2/Master/HeaderView.vue';
import Footer from '@/views/V2/Master/FooterView.vue';
</script>

<style scoped lang="scss"></style>