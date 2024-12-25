import { defineStore } from "pinia";
import { getListAPI } from "@/api/genuine";
import moment from "moment";

export const useGenuineStore = defineStore("genuine", () => {
  const getList = (pageNum: number, pageSize: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getListAPI(pageNum, pageSize)
        .then((res) => {
          for (let item of res.rows) {
          }
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return { getList };
});
