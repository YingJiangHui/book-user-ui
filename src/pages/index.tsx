import yayJpg from '../assets/yay.jpg';
import {useRequest} from "@@/plugin-request";
import { request } from '@umijs/max';
import {getBooks} from "@/service/book";

export default function HomePage() {
    useRequest(getBooks)
  return (
    <div>
      <h2>Yay! Welcome to umi2!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
