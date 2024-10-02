import axios from 'axios';
import {IProduct} from "../types/product.ts";
import useMobileCheck from "../hooks/useMobileCheck.ts";

const {isMobile} = useMobileCheck()

const apiHost = isMobile
    ? 'http://:8089/api/products' // 모바일에서 접근할 서버 IP
    : 'http://localhost:8089/api/products';  // 컴퓨터에서 접근할 로컬 서버

export const getProductList = async (page:number = 1, size:number = 10) => {
    const res = await axios.get(`${apiHost}/list?page=${page}&size=${size}`)

    return res.data
}

export const getDetail = async (pno: number) : Promise<IProduct>  => {
    const res = await axios.get(`${apiHost}/${pno}`);

    return res.data;
};