import { useEffect, useState, useRef, useCallback } from "react";
import { IProduct, IPageResponse } from "../../types/product.ts";
import { getProductList } from "../../api/kioskAPI.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import useMobileCheck from "../../hooks/useMobileCheck.ts";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/rtk.ts";

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

function ListComponent() {
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const navigate = useNavigate();
    const cartItems = useAppSelector((state) => state.cart.products); // 장바구니 상태 가져오기

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

    // 장바구니에 담긴 총 금액 계산
    const totalCartPrice = cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
    );

    useEffect(() => {
        setLoading(true);
        getProductList(page, size).then((data) => {
            setPageResponse((prevData) => ({
                ...data,
                dtoList: [...prevData.dtoList, ...data.dtoList], // 기존 데이터에 추가
            }));
            setLoading(false);
            if (data.dtoList.length < size) {
                setHasMore(false); // 더 이상 데이터가 없을 경우
            }
        });
    }, [page]);

    const { isMobile } = useMobileCheck();

    // 조회 페이지 이동
    const moveToRead = (pno: number) => {
        navigate(`/kiosk/detail/${pno}`);
    };

    // 장바구니 페이지로 이동
    const moveToCartPage = () => {
        navigate("/kiosk/cart"); // 장바구니 페이지 경로로 이동
    };

    const listLI = pageResponse.dtoList.map((product: IProduct, index) => {
        const { pno, pname, pdesc, price, uploadFileNames } = product;

        // 모바일과 데스크탑에 맞는 URL로 처리
        const thumbnailUrl = uploadFileNames.length > 0
            ? isMobile
                ? `http://192.168.45.155:8089/api/products/view/s_${uploadFileNames[0]}`
                : `http://localhost:8089/api/products/view/s_${uploadFileNames[0]}`
            : null;

        return (
            <li
                key={pno}
                onClick={() => moveToRead(pno)}
                ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
                className="flex items-center space-x-4 p-4 border border-gray-300 rounded-xl mb-4 shadow-lg"
                style={{ boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)' }}
            >
                {thumbnailUrl && (
                    <img src={thumbnailUrl} alt={pname} className="w-24 h-24 object-cover rounded-md"/>
                )}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {pno}. {pname}
                    </h3>
                    <p className="text-sm text-gray-600">{pdesc}</p>
                    <p className="text-md font-medium text-gray-900">{price}원</p>
                </div>
            </li>
        );
    });

    return (
        <div className="container mx-auto py-6">
            <div className="text-xl font-bold mb-4">Product List</div>

            <ul className="divide-y divide-gray-200">{listLI}</ul>

            {loading && <LoadingComponent />}

            {/* 장바구니 총 금액 및 버튼 */}
            {cartItems.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4 items-center">
                    <div className="w-full flex justify-between items-center">
                        <span className="text-lg font-semibold">총 금액: {totalCartPrice}원</span>
                        <button
                            onClick={moveToCartPage}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            장바구니 가기
                        </button>
                    </div>

                    {/* 빈 버튼 */}
                    <button
                        className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                        disabled
                    >
                        빈 버튼
                    </button>
                </div>
            )}
        </div>
    );

}

export default ListComponent;
