import {request} from "@@/exports";

export const getUsers = ()=>request("/api/users",{
    params:{id:1},
})