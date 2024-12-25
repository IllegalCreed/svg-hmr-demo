import { defineStore } from "pinia";
import { getAPI } from "@/api/easy";

export const useEasyStore = defineStore("easy", () => {
  const get = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getAPI()
        .then((res) => {
          for (let item of res.data) {
            item.title = item.systemName;
            item.id = item.systemId;
          }
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return { get };
});
