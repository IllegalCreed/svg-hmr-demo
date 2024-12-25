import request from "@/axios";

export const loginAPI = (loginForm: LoginForm): Promise<any> => {
  const data = {
    username: loginForm.account,
    password: loginForm.password,
    code: loginForm.code,
    uuid: loginForm.uuid,
  };
  return request.post(
    {
      url: "/login",
      data,
    },
    false
  );
};

export const loginWithSTAPI = (st: string): Promise<any> => {
  const params = {
    st: st,
  };
  return request.get(
    {
      url: "/login",
      params,
    },
    false
  );
};

export const logoutAPI = (): Promise<any> => {
  return request.post({ url: "/logout" });
};

export const getCodeAPI = (): Promise<any> => {
  return request.get({ url: "/captchaImage" });
};

export const getAPI = (): Promise<any> => {
  return request.get({ url: "/user/get" });
};

export const resetPwdAPI = (oldPwd: string, newPwd: string): Promise<void> => {
  const data = {
    oldPassword: oldPwd,
    newPassword: newPwd,
  };
  return request.post({
    url: "/user/resetPwd",
    data,
  });
};
