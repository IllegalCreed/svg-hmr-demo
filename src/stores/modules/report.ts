import { defineStore } from "pinia";
import { getJJAPI, getHGAPI } from "@/api/report";

export const useReportStore = defineStore("report", () => {
  const getJJ = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getJJAPI()
        .then((res) => {
          resolve(res.rows[0]?.context);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const getHG = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      getHGAPI()
        .then((res) => {
          resolve(res.rows[0]?.context);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return { getJJ, getHG };
});
