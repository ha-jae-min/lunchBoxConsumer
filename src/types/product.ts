export interface IProduct {
    pno: number;
    delFlag: boolean;
    pdesc: string;
    pname: string;
    price: number;
    img: string[];
    regDate: string;
    modDate: string;
    writer:string;
    uploadFileNames: string[];  // 추가된 필드
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