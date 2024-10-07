import axios from 'axios';
import {IProduct} from "../types/product.ts";
import useMobileCheck from "../hooks/useMobileCheck.ts";

const {isMobile} = useMobileCheck()

const apiHost = isMobile
    ? 'http://192.168.0.2:8091/api/products' // 모바일에서 접근할 서버 IP
    : 'http://localhost:8091/api/products';  // 컴퓨터에서 접근할 로컬 서버

export const getProductList = async (
    page: number = 1,
    size: number = 10,
    keyword: string = ""
) => {

    if( page <= 0){
        page = 1
    }
    // 검색 파라미터가 있을 때 URL 동적으로 생성
    const queryParams = `page=${page}&size=${size}&keyword=${encodeURIComponent(keyword)}`;
    const res = await axios.get(`${apiHost}/list?${queryParams}`);

    return res.data;
};

export const getDetail = async (pno: number) : Promise<IProduct>  => {
    const res = await axios.get(`${apiHost}/${pno}`);

    return res.data;
};