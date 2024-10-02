import axios from "axios";
import { IPageResponse } from "../types/reservation.ts";

const host: string = 'http://localhost:8088/api/v1/todos';

export const getReservationList = async (page: number, size: number): Promise<IPageResponse> => {
    const res = await axios.get(`${host}/list?page=${page}&size=${size}`);
    return res.data;
}
