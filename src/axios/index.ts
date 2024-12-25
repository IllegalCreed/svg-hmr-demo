import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
} from "axios";

import axios, { AxiosError } from "axios";
import { token, reset, ut } from "@/utils/token";
import { ElLoading, ElMessage, ElMessageBox } from "element-plus";
import { saveAs } from "file-saver";

export const PATH_URL = import.meta.env.VITE_APP_BASE_API;
const abortControllerMap: Map<string, AbortController> = new Map();

const axiosInstance: AxiosInstance = axios.create({
  timeout: 60000,
  baseURL: PATH_URL,
});

// 中断逻辑
axiosInstance.interceptors.request.use((res: InternalAxiosRequestConfig) => {
  const controller = new AbortController();
  const url = res.url || "";
  res.signal = controller.signal;
  abortControllerMap.set(url, controller);
  return res;
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const url = res.config.url || "";
    abortControllerMap.delete(url);
    // 这里不能做任何处理，否则后面的 interceptors 拿不到完整的上下文了
    return res;
  },
  (error: AxiosError) => {
    // console.log("err： " + error); // for debug
    return Promise.reject(error);
  }
);

// 数据转换逻辑
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

let isReloginShow = false;
const relogin = () => {
  // if (!isReloginShow) {
  //   token.value = '';
  //   ut.value = '';
  //   isReloginShow = true;
  //   ElMessageBox.confirm(
  //     "登录状态已过期，您可以继续留在该页面，或者重新登录",
  //     "系统提示",
  //     {
  //       confirmButtonText: "重新登录",
  //       cancelButtonText: "取消",
  //       type: "warning",
  //     }
  //   )
  //     .then(() => {
  //       isReloginShow = false;
  //       reset();
  //     })
  //     .catch(() => {
  //       isReloginShow = false;
  //     });
  // }
  reset();
  return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const code = response.data.code || 200;

    // 二进制数据则直接返回
    if (
      response.request.responseType === "blob" ||
      response.request.responseType === "arraybuffer"
    ) {
      return response.data;
    }

    if (code === 401) {
      return relogin();
    } else if (!/^2\d{2}$/.test(code)) {
      // 如果不是2开头的三位数
      // console.log(response);
      // ElMessage({ message: response.data.msg, type: "error" });
      return Promise.reject(new Error(response.data.msg));
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    // console.log("err" + error);
    if (error.response.status === 403) {
      return relogin();
    }

    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    // ElMessage({ message: message, type: "error", duration: 5 * 1000 });
    return Promise.reject(error);
  }
);

const request = (config: AxiosRequestConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

const mixConfig = (option: any, hasToken: boolean): any => {
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    ...option.headers,
  };
  if (hasToken) {
    headers.Authorization = token.value;
  }

  return { ...option, headers };
};

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

let downloadLoadingInstance: any;
const saveFile = (data: any, filename: string) => {
  const isBlob = data.type !== "application/json";
  if (isBlob) {
    const blob = new Blob([data]);
    saveAs(blob, filename);
  } else {
    const errMsg = data.msg || "系统未知错误，请反馈给管理员";
    ElMessage.error(errMsg);
  }
};

const download = (url: string, params: any, filename: string, config: any) => {
  downloadLoadingInstance = ElLoading.service({
    text: "正在下载数据，请稍候",
    background: "rgba(0, 0, 0, 0.7)",
  });
  return axiosInstance
    .post(url, params, {
      transformRequest: [
        (params) => {
          return tansParams(params);
        },
      ],
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token.value,
      },
      responseType: "blob",
      ...config,
    })
    .then((data: any) => {
      saveFile(data, filename);
    })
    .catch((r) => {
      console.error(r);
      ElMessage.error("下载文件出现错误，请联系管理员！");
    })
    .finally(() => {
      downloadLoadingInstance.close();
    });
};

const downloadWthoutParams = (url: string, filename: string, config: any) => {
  downloadLoadingInstance = ElLoading.service({
    text: "正在下载数据，请稍候",
    background: "rgba(0, 0, 0, 0.7)",
  });
  return axiosInstance
    .get(url, {
      responseType: "blob",
      ...config,
    })
    .then((data: any) => {
      saveFile(data, filename);
    })
    .catch((r) => {
      console.error(r);
      ElMessage.error("下载文件出现错误，请联系管理员！");
    })
    .finally(() => {
      downloadLoadingInstance.close();
    });
};

export default {
  get: (option: any, hasToken: boolean = true) => {
    return request({ method: "get", ...mixConfig(option, hasToken) });
  },
  post: (option: any, hasToken: boolean = true) => {
    return request({ method: "post", ...mixConfig(option, hasToken) });
  },
  delete: (option: any, hasToken: boolean = true) => {
    return request({ method: "delete", ...mixConfig(option, hasToken) });
  },
  put: (option: any, hasToken: boolean = true) => {
    return request({ method: "put", ...mixConfig(option, hasToken) });
  },
  cancelRequest: (url: string | string[]) => {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      abortControllerMap.get(_url)?.abort();
      abortControllerMap.delete(_url);
    }
  },
  cancelAllRequest: () => {
    for (const [_, controller] of abortControllerMap) {
      controller.abort();
    }
    abortControllerMap.clear();
  },
  download,
  downloadWthoutParams,
};
