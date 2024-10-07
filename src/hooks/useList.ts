import { IPageResponse } from "../types/product.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "./rtk.ts";
import useMobileCheck from "./useMobileCheck.ts";
import { getProductList } from "../api/kioskAPI.ts";

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

const useList = () => {
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [keyword, setKeyword] = useState<string>("");

    const navigate = useNavigate();
    const cartItems = useAppSelector((state) => state.cart.products); // 장바구니 상태 가져오기
    const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리스트링을 위한 훅

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
        getProductList(page, size, keyword).then((data) => {
            setPageResponse((prevData) => ({
                ...data,
                dtoList: page === 1 ? data.dtoList : [...prevData.dtoList, ...data.dtoList], // 첫 페이지일 경우 새로 설정, 그 외 추가
            }));
            setLoading(false);
            if (data.dtoList.length < size) {
                setHasMore(false); // 더 이상 데이터가 없을 경우
            } else {
                setHasMore(true);
            }
        });

        // URL 쿼리스트링 업데이트
        const query = {
            page: String(page),
            ...(keyword ? { keyword } : {}),
        };
        setSearchParams(query);

    }, [page, keyword]);

    // 카테고리 선택 시 호출되는 함수
    const handleCategorySelect = (category: string) => {

        console.log(searchParams)

        setPage(1);  // 페이지 초기화
        setPageResponse(initialState);  // 이전 검색 결과 초기화

        if (category === "전체") {
            setKeyword(""); // "전체" 선택 시 키워드를 빈 문자열로 설정
            setSearchParams({ page: '1' }); // 쿼리스트링에서 keyword 제거
        } else {
            setKeyword(category);  // 선택한 카테고리를 키워드로 설정
            setSearchParams({ page: '1', keyword: category }); // URL에 page와 keyword 반영
        }
    };

    const { isMobile } = useMobileCheck();

    // 조회 페이지 이동
    const moveToRead = (pno: number) => {
        const query = `page=${page}` + (keyword ? `&keyword=${keyword}` : "");
        navigate(`/kiosk/detail/${pno}?${query}`);
    };

    // 장바구니 페이지로 이동
    const moveToCartPage = () => {
        navigate("/kiosk/cart"); // 장바구니 페이지 경로로 이동
    };

    return {
        loading, pageResponse, isMobile, cartItems, totalCartPrice,
        moveToRead, moveToCartPage, lastElementRef, handleCategorySelect,};
};

export default useList;