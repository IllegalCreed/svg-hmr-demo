import request from "@/axios";

export const getListAPI = (pageNum: number, pageSize: number): Promise<any> => {
  const params = {
    type: "soft",
    pageNum,
    pageSize,
  };
  return request.get({ url: "/article/list", params });
};
