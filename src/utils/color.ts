import { useDark } from "@vueuse/core";
import { watch, watchEffect } from "vue";

export const isDark = useDark();
watch(isDark, () => {
  setThemeColor(getCssVar("--primary-color"));
});

export const setThemeColor = (primary: string) => {
  watchEffect(() => {
    setCssVar("--el-color-primary", primary);
    const mixColor: string = isDark.value ? "#000000" : "#ffffff";
    const lightList = [3, 5, 7, 8, 9];
    lightList.forEach((v) => {
      setCssVar(
        `--el-color-primary-light-${v}`,
        mix(mixColor, primary, v / 10)
      );
    });
    setCssVar(`--el-color-primary-dark-2`, mix(mixColor, primary, 0.2));
  });
};

/**
 * 混合两个颜色
 * @param color1 第一个颜色
 * @param color2 第二个颜色
 * @param weight 第一个颜色占比，值区间 0-1
 * @returns 混合后的新颜色
 */
const mix = (color1: string, color2: string, weight: number = 0.5): string => {
  let color = "#";
  for (let i = 0; i <= 2; i++) {
    const c1 = parseInt(color1.substring(1 + i * 2, 3 + i * 2), 16);
    const c2 = parseInt(color2.substring(1 + i * 2, 3 + i * 2), 16);
    const c = Math.round(c1 * weight + c2 * (1 - weight));
    color += c.toString(16).padStart(2, "0");
  }
  return color;
};

export const setCssVar = (
  prop: string,
  val: any,
  dom = document.documentElement
) => {
  dom.style.setProperty(prop, val);
};

export const getCssVar = (
  prop: string,
  dom = document.documentElement
): string => {
  return window.getComputedStyle(dom).getPropertyValue(prop).trim();
};

type T = string & ("a" | "b" | 1);
