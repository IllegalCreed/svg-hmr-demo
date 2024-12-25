import { defineStore } from "pinia";
import { heartbeatAPI } from "@/api/cas";

export const useCasStore = defineStore("cas", () => {
  const heartbeat = (ut: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      heartbeatAPI(ut)
        .then((res: any) => {
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  };

  return { heartbeat };
});
