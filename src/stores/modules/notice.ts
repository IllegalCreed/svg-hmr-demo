import { defineStore } from "pinia";
import { getListAPI } from "@/api/notice";
import moment from "moment";

export const useNoticeStore = defineStore("notice", () => {
  const getList = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getListAPI()
        .then((res) => {
          for (let item of res.rows) {
            item.content = item.context
          }
          resolve(res.rows);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return { getList };
});
