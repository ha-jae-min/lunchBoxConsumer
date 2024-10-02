export interface IReservation {
    mno?: number;
    title: string;
    customer: string;
    dueDate: string;
}

export interface IPageResponse {
    content: IReservation[];
    totalElements: number;
    number: number;
    first: boolean;
    last: boolean;
    size: number;
    totalPages: number;
}
