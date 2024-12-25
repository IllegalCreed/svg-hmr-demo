import { defineStore } from "pinia";
import { getListAPI } from "@/api/article";
import moment from "moment";

export const useArticleStore = defineStore("article", () => {
  const getList = (
    type: string,
    pageNum: number,
    pageSize: number
  ): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getListAPI(type, pageNum, pageSize)
        .then((res) => {
          for (let item of res.rows) {
            item.createTimeFormat = moment(item.createTime).format(
              "YYYY-MM-DD"
            );
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
