import axios from 'axios';

const host = 'http://localhost:8089/api/products';

export const getProductList = async (page:number = 1, size:number = 10) => {

    const res = await axios.get(`${host}/list?page=${page}&size=${size}`)

    return res.data
}
