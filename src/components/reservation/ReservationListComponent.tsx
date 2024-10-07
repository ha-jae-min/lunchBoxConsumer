import { useEffect, useState, useRef, useCallback } from "react";
import { IReservation, IPageResponse } from "../../types/reservation.ts";
import { getReservationList } from "../../api/reservationAPI.ts"; // API 함수 import
import LoadingComponent from "../LoadingComponent.tsx";
import { useNavigate } from "react-router-dom";

const initialState: IPageResponse = {
    dtoList: [],
    pageNumList: [],
    pageRequestDTO: {
        page: 1,
        size: 10,
    },
    prev: false,
    next: false,
    totalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    current: 1,
};

function ReservationListComponent() {
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const navigate = useNavigate();

    // 스크롤 감지 Ref
    const observer = useRef<IntersectionObserver | null>(null);

    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        const fetchReservations = async () => {
            setLoading(true);
            try {
                const data = await getReservationList(page, size);
                setPageResponse((prevData) => ({
                    ...data,
                    dtoList: [...prevData.dtoList, ...data.dtoList], // 기존 데이터에 추가
                }));
                if (data.dtoList.length < size) {
                    setHasMore(false); // 더 이상 데이터가 없을 경우
                }
            } catch (error) {
                console.error("Error fetching reservations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [page]);

    const moveToRead = (mno: number) => {
        navigate(`/reservation/detail/${mno}`);
    };

    const listLI = pageResponse.dtoList.map((reservation: IReservation, index) => {
        const { mno, title, dueDate } = reservation;
        const [lunchboxType, quantity, totalPrice] = title.split(" - ");

        return (
            <li
                key={index}
                onClick={() => moveToRead(Number(mno))}
                ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
                className="flex items-center space-x-4 p-4 border border-gray-300 rounded-xl mb-4 shadow-lg"
                style={{ boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)' }}
            >
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        메뉴: {lunchboxType} | 수량: {quantity}개 | 총 가격: {totalPrice}원
                    </h3>
                    <p className="text-md font-medium text-gray-900">예약일: {dueDate}</p>
                </div>
            </li>
        );
    });

    return (
        <div className="container mx-auto py-6">
            <div className="text-xl font-bold mb-4">Reservation List</div>
            <ul className="divide-y divide-gray-200">{listLI}</ul>
            {loading && <LoadingComponent />}
        </div>
    );
}

export default ReservationListComponent;
