import { IReservation } from "../../types/reservation.ts";
import useReservation from "../../hooks/useReservation.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import { useEffect } from "react";

function ReservationListComponent() {
    const { loading, pageResponse, moveToRead, fetchMore } = useReservation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                fetchMore();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchMore]);

    const listLI = pageResponse.content.map((reservation: IReservation) => {
        const { mno, title, dueDate } = reservation;

        // title을 도시락 종류, 수량, 총가격으로 변환
        const [lunchboxType, quantity, totalPrice] = title.split(" - ");

        return (
            <li
                key={mno}
                onClick={() => moveToRead(mno)}
                className="flex justify-between items-center p-4 mb-2 bg-white rounded-lg shadow-md hover:bg-orange-100 transition cursor-pointer border border-gray-200"
                style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} // 더 부드러운 그림자 효과
            >
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">예약번호: {mno}</span>
                    <span className="font-bold text-lg text-gray-900">{lunchboxType} x{quantity}</span>
                </div>
                <div className="text-gray-600 text-sm text-right">
                    <span className="block mb-1">총 가격: <span className="font-medium">{totalPrice}원</span></span>
                    <span>예약일: {dueDate}</span>
                </div>
            </li>
        );
    });

    return (
        <div className="container mx-auto px-4 py-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl">
            {loading && <LoadingComponent />}
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">도시락 예약 내역</h2>

            <ul className="divide-y divide-gray-200 space-y-4">
                {listLI}
            </ul>
        </div>
    );
}

export default ReservationListComponent;
