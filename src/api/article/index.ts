import request from "@/axios";

export const getListAPI = (
  type: string,
  pageNum: number,
  pageSize: number
): Promise<any> => {
  const params = {
    typeArt: type,
    pageNum,
    pageSize,
  };
  return request.get({ url: "/article/list", params });
};
