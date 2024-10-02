import axios from "axios";
import { IPageResponse } from "../types/reservation.ts";

// const host: string = 'http://localhost:8088/api/v1/todos';
const host: string = 'http://localhost:8089/api/todo';

export const getReservationList = async ( page?:number, size?:number): Promise<IPageResponse> => {
    const pageValue:number = page || 1
    const sizeValue:number = size || 10

    const res = await axios.get(`${host}/list?page=${pageValue}&size=${sizeValue}`)
    return res.data
}
