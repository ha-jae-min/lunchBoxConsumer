import { IProduct } from "../../types/product.ts";
import LoadingComponent from "../LoadingComponent.tsx";
import useList from "../../hooks/useList.ts";
import { useState } from "react";

function ListComponent() {
    const { isMobile, loading, pageResponse, lastElementRef, moveToCartPage,
        totalCartPrice, cartItems, moveToRead, handleCategorySelect } = useList();  // handleCategorySelect 제거

    // 카테고리 목록 정의
    const categories = ["전체", "맥", "피카츄", "라이츄", "숟가락", "젓가락"];
    const [selectedCategory, setSelectedCategory] = useState<string>("전체");

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
                <div
                    className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex flex-col space-y-4 items-center">
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
