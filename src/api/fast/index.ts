import request from "@/axios";

export const getAPI = (): Promise<any> => {
  return request.get({ url: "/user/myQuick" });
};