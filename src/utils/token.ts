import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import router from "@/router";

export const token: RemovableRef<string> = useLocalStorage("token", "");
export const ut: RemovableRef<string> = useLocalStorage("userTicket", "");

export const CAS_URL = import.meta.env.VITE_APP_CAS_URL;
export const PROTALS_URL = import.meta.env.VITE_APP_PROTALS_URL;
export const SERVICE_ID = import.meta.env.VITE_APP_SERVICE_ID;

export const reset = () => {
  token.value = "";
  ut.value = "";
  const redirect = encodeURIComponent(PROTALS_URL);
  window.location.href = `${CAS_URL}/?service=${SERVICE_ID}&redirect=${redirect}`;
};

export const CASlogout = () => {
  token.value = "";
  ut.value = "";
  const redirect = encodeURIComponent(PROTALS_URL);
  window.location.href = `${CAS_URL}/logout?behavior=login&service=${SERVICE_ID}&redirect=${redirect}`;
};
