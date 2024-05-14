import { useLocalStorageState } from "ahooks";
import { getUserInfo } from "@/service/user";
import { useState } from "react";

export default function User() {
  const [token, _setToken] = useLocalStorageState("token", {});
  const [user, setUser] = useState();
  const setToken = async (t: string) => {
    console.log(t, "t");
    _setToken(t);
    const res = await getUserInfo();
    setUser(res.data);
  };

  return {
    setToken,
    user,
  };
}
