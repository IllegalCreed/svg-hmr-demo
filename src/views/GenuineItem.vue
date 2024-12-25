<template>
    <div class="item-root-container">
        <span class="title">{{ data.title }}</span>
    </div>
</template>

<script setup lang='ts'>
const props = defineProps(['data'])
</script>

<style scoped>
.item-root-container {
    display: flex;
    flex-direction: row;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px dashed var(--news-divider);
    overflow: hidden;
    flex-shrink: 0; 
}

.title {
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
}

.title:hover{
    opacity: .5;
}
</style>
