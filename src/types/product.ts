
export interface IProduct {
    pno: number;
    pname: string;
    price: number;
    pdesc: string;
    delFlag: boolean;
    files: string[];
    uploadFileNames: string[];
}

export interface IPageRequestDTO {
    page: number;
    size: number;
}

export interface IPageResponse {
    dtoList: IProduct[];
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