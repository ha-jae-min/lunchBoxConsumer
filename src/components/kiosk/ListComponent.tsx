import { IProduct } from "../../types/product.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import useList from "../../hooks/useList.ts";
import { useState, useEffect, useRef } from "react";
import {useAppSelector} from "../../hooks/rtk.ts";

function ListComponent() {
    const {
        isMobile, loading, pageResponse, lastElementRef, moveToCartPage,
        moveToRead, handleCategorySelect
    } = useList();

    const cartItems = useAppSelector((state) => state.cart.products); // 장바구니 상태 가져오기

    // 장바구니에 담긴 총 금액 계산
    const totalCartPrice = cartItems.reduce(
        (total, item) => total + item.totalPrice,
        0
    );

    console.log("왜 3번 나옴?")
    console.log("cartItems: " + cartItems.length)

    const categories = ["전체", "맥", "피카츄", "라이츄", "숟가락", "젓가락"];

    // URL에서 keyword를 즉시 가져와 초기 상태로 설정
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get("keyword") || "전체";  // keyword가 없으면 "전체"
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

    // 카테고리 버튼들의 ref 설정
    const categoryRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    // 카테고리 변경 시 스크롤 위치 조정
    useEffect(() => {
        if (categoryRefs.current[selectedCategory]) {
            categoryRefs.current[selectedCategory]?.scrollIntoView({
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [selectedCategory]);


    const listLI = pageResponse.dtoList.map((product: IProduct, index) => {
        const { pno, pname, pdesc, price, uploadFileNames } = product;

        const thumbnailUrl = uploadFileNames.length > 0
            ? isMobile
                ? `http://192.168.0.2:8091/api/products/view/s_${uploadFileNames[0]}`
                : `http://localhost:8091/api/products/view/s_${uploadFileNames[0]}`
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
            {/* 카테고리 선택 바 */}
            <div className="overflow-x-auto mb-6">
                <div className="flex space-x-4 whitespace-nowrap">
                    {categories.map((category) => (
                        <button
                            key={category}
                            ref={(el) => categoryRefs.current[category] = el} // 각 버튼에 ref 연결
                            className={`px-6 py-2 whitespace-nowrap rounded-full border transition duration-200
                            ${selectedCategory === category
                                ? "bg-orange-500 text-white border-orange-500"
                                : "bg-white text-gray-700 border-gray-300"}`}
                            onClick={() => {
                                setSelectedCategory(category);
                                handleCategorySelect(category);
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="text-xl font-bold mb-4">Product List</div>

            <ul className="divide-y divide-gray-200">{listLI}</ul>

            {loading && <LoadingComponent/>}

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
                </div>
            )}
        </div>
    );
}

export default ListComponent;
