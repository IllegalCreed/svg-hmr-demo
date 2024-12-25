import request from "@/axios";

export const getJJAPI = (): Promise<any> => {
  const params = {
    type: "jijian",
  };
  return request.get({ url: "/article/list", params });
};

export const getHGAPI = (): Promise<any> => {
  const params = {
    type: "hegui",
  };
  return request.get({ url: "/article/list", params });
};
