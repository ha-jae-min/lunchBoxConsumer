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