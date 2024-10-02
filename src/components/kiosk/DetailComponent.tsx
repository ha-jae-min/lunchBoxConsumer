import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail } from '../../api/kioskAPI'; // getDetail API 사용
import { IProduct } from '../../types/product';
import LoadingComponent from '../LoadingComponent.tsx';

const initialState: IProduct = {
    pno: 0,
    pname: '',
    price: 0,
    pdesc: '',
    delFlag: false,
    files: [],
    uploadFileNames: []
};

const DetailComponent = () => {
    const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 제품 번호 받기
    const [product, setProduct] = useState<IProduct>(initialState);
    const [quantity, setQuantity] = useState<number>(1); // 제품 수량 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();
    const queryString = window.location.search; // 검색어 파라미터 유지

    const moveToList = (): void => {
        navigate({
            pathname: '/kiosk/list',
            search: queryString,
        });
    };

    const moveToReservationPage = (): void => {
        navigate({
            pathname: '/reservation',
            search: queryString,
        });
    };

    const handleAddToCart = (): void => {
        const cartItem = {
            pno: product.pno,
            pname: product.pname,
            quantity,
            totalPrice: product.price * quantity,
        };
        // 장바구니 로직을 여기에 추가할 수 있습니다 (API 사용시 주석 해제)
        // localStorage.setItem('cart', JSON.stringify(cartItem));
        console.log('장바구니에 추가됨:', cartItem);
        moveToList(); // 장바구니에 추가 후 목록 페이지로 이동
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, Number(event.target.value)); // 수량 최소 1 이상 유지
        setQuantity(newQuantity);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getDetail(Number(pno)); // API 호출하여 제품 정보 가져오기
                setProduct(data);
            } catch (error) {
                console.error('제품 정보를 가져오는데 실패했습니다:', error);
            } finally {
                setLoading(false); // 로딩 완료
            }
        };

        fetchProduct();
    }, [pno]);

    return (
        <div className="flex flex-col space-y-6 w-full max-w-lg mx-auto bg-white shadow-lg p-4 sm:p-6 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-500 mb-4">제품 상세 정보</h2>

            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    {/* 제품 이미지 */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-gray-700">제품 이미지</label>
                        {product.uploadFileNames && product.uploadFileNames.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {product.uploadFileNames.map((fileName, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:8089/api/products/view/${fileName}`}
                                        alt={product.pname}
                                        className="w-full h-auto object-cover"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">등록된 이미지가 없습니다.</p>
                        )}
                    </div>

                    {/* 제품 이름 */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-gray-700">제품 이름</label>
                        <input
                            type="text"
                            name="pname"
                            value={product.pname || ''}
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                        />
                    </div>

                    {/* 제품 설명 */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-gray-700">제품 설명</label>
                        <textarea
                            name="pdesc"
                            value={product.pdesc || ''}
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                        />
                    </div>

                    {/* 제품 가격 */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-gray-700">가격</label>
                        <input
                            type="text"
                            name="price"
                            value={product.price || ''}
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                        />
                    </div>

                    {/* 수량 선택 */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-gray-700">수량</label>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="border border-gray-300 rounded-lg p-3 text-gray-700"
                        />
                    </div>

                    {/* 총 가격 표시 */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-gray-700">총 가격</label>
                        <input
                            type="text"
                            name="totalPrice"
                            value={product.price * quantity || ''}
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                        />
                    </div>

                    {/* 버튼들 */}
                    <div className="flex flex-col space-y-4 mt-4">
                        <button
                            onClick={moveToList}
                            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                        >
                            목록
                        </button>
                        <button
                            onClick={moveToReservationPage}
                            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                        >
                            예약 페이지
                        </button>
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            장바구니에 담기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailComponent;
