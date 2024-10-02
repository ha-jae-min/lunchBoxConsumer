export interface IReservation {
    mno?: number;
    title: string;
    customer: string;
    dueDate: string;
}

export interface IPageRequestDTO {
    page: number;
    size: number;
}

export interface IPageResponse {
    dtoList: IReservation[];
    pageNumList: number[];
    pageRequestDTO: IPageRequestDTO;
    prev: boolean;
    next: boolean;
    totalCount: number;
    prevPage: number;
    nextPage: number;
    totalPage: number;
    current: number;
}