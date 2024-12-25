import request from "@/axios";

export const getListAPI = (): Promise<any> => {
  const params = {
    type: "notice",
    pageNum: 1,
    pageSize: 100,
  };
  return request.get({ url: "/article/list", params });
};
