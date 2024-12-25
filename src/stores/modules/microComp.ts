import { defineStore } from "pinia";
import { saveAPI, loadAPI, getSysNumAPI, getTodoAPI } from "@/api/micro";

export const useMicroStore = defineStore("micro", () => {
  const load = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      loadAPI()
        .then((res: any) => {
          resolve(JSON.parse(res.data.config));
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const save = (data: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      saveAPI(data)
        .then(() => {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const getSysNum = (type: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getSysNumAPI(type)
        .then((res: any) => {
          resolve(res.data.count);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  const getTodo = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getTodoAPI()
        .then((res: any) => {
          resolve(res.data);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  return { load, save, getSysNum, getTodo };
});
