import request from "@/axios";

export const saveAPI = (datastring: string): Promise<void> => {
  const data = {
    data: datastring,
  };
  return request.post({ url: "/micro/save", data });
};

export const loadAPI = (): Promise<any> => {
  return request.get({ url: "/micro/get" });
};

export const getSysNumAPI = (type: string): Promise<any> => {
  const params = {
    type,
  };
  return request.get({ url: "/micro/getSysNum", params });
};

export const getTodoAPI = (): Promise<any> => {
  return request.get({ url: "/micro/getTodo" });
};
