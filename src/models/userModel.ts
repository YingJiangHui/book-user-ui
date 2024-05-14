import { useLocalStorageState } from "ahooks";
import { getUserInfo } from "@/service/user";
import { useState } from "react";

export default function User() {
  const [token, _setToken] = useLocalStorageState("token", {
    serializer: (value: string) => value,
    deserializer: (value) => value
  });
  const [user, setUser] = useState();
  const setToken = async (t: string) => {
    _setToken(t);
    const res = await getUserInfo();
    setUser(res.data);
  };

  return {
    setToken,
    user,
  };
}
