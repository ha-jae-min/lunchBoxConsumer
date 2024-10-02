import { useEffect, useState, useRef, useCallback } from "react";
import { IProduct, IPageResponse } from "../../types/product.ts";
import { getProductList } from "../../api/kioskAPI.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import useMobileCheck from "../../hooks/useMobileCheck.ts";
import {useNavigate} from "react-router-dom";

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

    const {isMobile} = useMobileCheck()

    // 조회 페이지 이동
    const moveToRead = (pno: number) => {
        navigate(`/kiosk/detail/${pno}`);
    };

    const listLI = pageResponse.dtoList.map((product: IProduct, index) => {
        const { pno, pname, pdesc, price, uploadFileNames } = product;

        // 모바일과 데스크탑에 맞는 URL로 처리
        const thumbnailUrl = uploadFileNames.length > 0
            ? isMobile
                ? `http://:8089/api/products/view/s_${uploadFileNames[0]}`
                : `http://localhost:8089/api/products/view/s_${uploadFileNames[0]}`
            : null;

        return (
            <li
                key={pno}
                onClick={() => moveToRead(pno)}
                ref={index === pageResponse.dtoList.length - 1 ? lastElementRef : null}
                className="flex items-center space-x-4 p-4 border border-gray-300 rounded-xl mb-4 shadow-lg"
                style={{boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)'}
            }
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

            {loading && <LoadingComponent/>}
        </div>
    );
}

export default ListComponent;