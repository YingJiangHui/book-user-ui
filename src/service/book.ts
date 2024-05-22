import {request} from "@umijs/max";

export const getBooks = ()=>request("/api/books",{
    params:{id:1}
})

