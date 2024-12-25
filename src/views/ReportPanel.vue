<template>
    <div class="report-root-container">
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="main">
        <slot name="main"></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .report-root-container {
    display: flex;
    flex-direction: column;
    background-color: var(--news-background);
    padding: 10px;
  }
  
  .header {
    position: relative;
    padding-left: 15px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid var(--news-divider);
  }
  
  .header::before {
    content: "";
    position: absolute;
    background-color: var(--primary-color);
    height: 28px;
    top: 0;
    left: 0;
    width: 5px;
  }
  
  .main {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    white-space: pre-wrap;
  }
  </style>
  