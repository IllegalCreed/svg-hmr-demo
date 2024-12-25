import request from "@/axios/casAxios";
import moment from "moment";

export const heartbeatAPI = (ut: string): Promise<any> => {
  const params = {
    ut: ut,
    date:moment().valueOf(),
  };
  return request.get(
    {
      url: "/cas/heartbeat",
      params,
    },
    false
  );
};