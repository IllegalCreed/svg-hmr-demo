import MicroNumber from "@/components/MicroNumber.vue";
import MicroSchedule from "@/components/MicroSchedule.vue";
import MicroMail from "@/components/MicroMail.vue";
import { v4 as uuidv4 } from "uuid";
import { useMicroStore } from "@/stores/modules/microComp";

export const data = ref<microComp[]>([]);
export const isEdit = ref<boolean>(false);

watch(isEdit, async (value) => {
  if (!value) {
    ElMessage({
      message: "保存中，请等待",
      type: "warning",
    });
    await useCompDefine().save();
    ElMessage({
      message: "布局已保存",
      type: "success",
    });
  }
});

const compTypeMapping = new Map<string, any>();
// 之所以不能直接维护组件实例是因为组件初始化和销毁必须由Vue来做，不让我自己做，我只能把初始化工作交给component组件来做，然后再维护他返回的实例。
export const compIdMapping = new Map<
  string,
  { type: Component; unitId: string }
>();
export const compRefs = ref<Record<string, any>>({});
export const unitList = ref<string[]>([]);

export function useCompInstance() {
  const getType = (key: string) => {
    const component = compIdMapping.get(key);
    return component ? component.type : undefined;
  };

  const getUnitId = (key: string) => {
    const component = compIdMapping.get(key);
    return component ? component.unitId : undefined;
  };

  const getInstance = (key: string) => {
    return compRefs.value[key];
  };

  // 通过key找CompClass，然后通过工厂方法生成组件实例
  const add = (key: string, type: Component, unitId: string) => {
    compIdMapping.set(key, { type, unitId });
  };

  // 通过key找组件实例,然后从map中移除
  const remove = (key: string) => {
    compIdMapping.delete(key);
  };

  const save = (key: string) => {
    const instance = getInstance(key);
    return instance.save();
  };

  // 找到组件实例后通过调用他的load方法把数据注入
  const load = (key: string, data: object) => {
    const instance = getInstance(key);
    instance.load(data);
  };

  const clear = () => {
    compIdMapping.clear();
  };

  return { getType, getUnitId, add, remove, save, load, clear };
}

export function useCompDefine() {
  // 注册组件，暂时写死，自动注册机制再说，可能要用装饰器+IOC，麻烦
  const init = () => {
    unitList.value.length = 0;
    compTypeMapping.set("Number", {
      component: MicroNumber,
      w: 2,
      h: 4,
    });
    compTypeMapping.set("Schedule", {
      component: MicroSchedule,
      w: 4,
      h: 8,
    });
    compTypeMapping.set("Mail", {
      component: MicroMail,
      w: 4,
      h: 4,
    });
  };

  const add = async (key: string, unitId: string, payload?: any) => {
    if (unitList.value.find((item) => unitId === item)) {
      ElMessage({
        message: "请勿重复添加",
        type: "warning",
      });
      return false;
    }
    unitList.value.push(unitId);
    const { add: addInstance } = useCompInstance();
    const { component, w, h } = compTypeMapping.get(key);
    const id = uuidv4();
    addInstance(id, component, unitId);
    data.value.push({
      x: 0,
      y: 0,
      w,
      h,
      i: id,
      t: key,
    });
    await nextTick();
    payload && compRefs.value[id].load(payload);
  };

  // 遍历compInstanceMapping的组件实例，调用save，调用API保存数据
  const save = async () => {
    const { save: saveInstance } = useCompInstance();
    const { save: saveAction } = useMicroStore();
    data.value.forEach((item) => {
      const payload = saveInstance(item.i);
      item.p = payload;
    });
    await saveAction(JSON.stringify(data.value));
  };

  // 调用API获取数据，填充compInstanceMapping，调用useCompInstance.load组装组件数据
  const load = async () => {
    data.value.length = 0;
    const { load: loadAction } = useMicroStore();
    const res = await loadAction();
    const { add: addInstance, clear: clearInstance } = useCompInstance();
    clearInstance();

    res.forEach(async (item: microComp) => {
      let unitId = "";
      if (item.t === "Number") {
        unitId = item.p;
      } else {
        unitId = item.t;
      }
      if (!unitList.value.find((item) => unitId === item)) {
        unitList.value.push(unitId);
        const { component, w, h } = compTypeMapping.get(item.t);
        addInstance(item.i, component, unitId);
        data.value.push({
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          i: item.i,
          t: item.t,
        });
        await nextTick();
        compRefs.value[item.i].load(item.p);
      }
    });
  };

  const remove = (key: string) => {
    const { remove: removeInstance, getUnitId } = useCompInstance();

    const unitId = getUnitId(key);
    if (unitId) {
      const i = unitList.value.findIndex((item) => item === unitId);
      unitList.value.splice(i, 1);
    }

    const index = data.value.findIndex((item) => item.i === key);
    data.value.splice(index, 1);
    removeInstance(key);

    
  };

  return { init, add, remove, save, load };
}
