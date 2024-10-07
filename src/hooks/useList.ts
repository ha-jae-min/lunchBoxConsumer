import { IPageResponse } from "../types/product.ts";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
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

const getNumber = (obj) => {

    if(!obj ) {
        return 1
    }

    if(Number.isNaN(obj)) {
        return 1;
    }

    try {
        return parseInt(obj)
    }catch(err) {
        return 1
    }

}

const useList = () => {
    const [page, setPage] = useState<number>(1);
    const [size] = useState<number>(10);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageResponse, setPageResponse] = useState<IPageResponse>(initialState);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [keyword, setKeyword] = useState<string>("");
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams(); // URL 쿼리스트링 훅


    const browserPage:number = getNumber(searchParams.get("page"))

    useEffect(() => {

        const currentKeyword = searchParams.get("keyword");

        // 페이지가 변경되었을 때만 설정
        if (browserPage !== page) {
            setPage(browserPage); // 페이지 설정
        }

        if (currentKeyword) {
            setKeyword(currentKeyword);
        }

    }, [browserPage, page]);


    // 스크롤 감지 Ref
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useCallback(
        (node: HTMLElement | null) => {
            if (loading || pageResponse.dtoList.length === 0 || !hasMore) return; // 데이터가 없으면 옵저버 실행 안 함
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {

                    // 페이지 증가 및 URL 쿼리스트링 업데이트
                    setSearchParams({ page: String(page + 1), ...(keyword ? { keyword } : {}) });
                }
            });

            if (node) observer.current.observe(node);
        },
        [hasMore, loading, pageResponse.dtoList.length]
    );



    useEffect(() => {

        setLoading(true);

        getProductList(browserPage, size, keyword).then((data) => {
            setPageResponse((prevData) => ({
                ...data,
                dtoList: browserPage === 1 ? data.dtoList : [...prevData.dtoList, ...data.dtoList],
            }));
            setLoading(false);
            if (data.dtoList.length < size) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }
        });
    }, [browserPage, keyword]);

    // 카테고리 선택 시 호출되는 함수
    const handleCategorySelect = (category: string) => {
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
        navigate({pathname: `/kiosk/detail/${pno}`, search: `${location.search}`});
    };

    // 장바구니 페이지로 이동
    const moveToCartPage = () => {
        navigate("/kiosk/cart");
    };

    return {
        loading, pageResponse, isMobile,
        moveToRead, moveToCartPage, lastElementRef, handleCategorySelect,
    };
};

export default useList;
