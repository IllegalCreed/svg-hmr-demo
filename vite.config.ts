import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import UnoCSS from "unocss/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
} from "unplugin-vue-components/resolvers";
import UnpluginSvgComponent from "unplugin-svg-component/vite";

Object.assign(
  process.env,
  loadEnv(process.env.NODE_ENV as string, process.cwd())
);
export default defineConfig({
  base: process.env.VITE_BASE_URL || "/",
  server: {
    port: 8010,
    proxy: {
      "/dev-api": {
        target: "http://10.105.31.35:9001",
        // target: "http://10.105.31.21:9091",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/dev-api/, ""),
      },
      "/cas-api": {
        target: "http://10.105.31.36:9000",
        // target: "http://10.105.31.21:9090",
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/cas-api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    VueDevTools(),
    UnoCSS(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "pinia", // 自定义导入
        {
          // 包导入
          axios: [
            // 默认别名导入
            ["default", "axios"], // import { default as axios } from 'axios',
          ],
          dayjs: [["default", "dayjs"]],
          "@vueuse/router": [
            ["useRouteHash", "useRouteHash"],
            ["useRouteParams", "useRouteParams"],
            ["useRouteQuery", "useRouteQuery"],
          ],
        },
      ],
      dts: true,
      eslintrc: {
        enabled: true,
      },
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    }),
    Components({
      dts: true,
      resolvers: [
        VueUseComponentsResolver(),
        IconsResolver(),
        ElementPlusResolver({ importStyle: "sass" }),
      ],
    }),
    Icons({
      compiler: "vue3",
    }),
    UnpluginSvgComponent({
      iconDir: [fileURLToPath(new URL("./src/icons", import.meta.url))],
      dts: true,
      prefix: "icon",
      vueVersion: 3,
      treeShaking: false,
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/styles/element/index.scss" as *;`,
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
