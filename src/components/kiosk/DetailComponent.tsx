import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetail } from '../../api/kioskAPI'; // getDetail API 사용
import { IProduct } from '../../types/product';
import LoadingComponent from '../LoadingComponent.tsx';
import useMobileCheck from '../../hooks/useMobileCheck';
// import { useDispatch } from 'react-redux'; // 리덕스 디스패치 추가 (추후 구현 예정)

const initialState: IProduct = {
    pno: 0,
    delFlag: false,
    pdesc: '',
    pname: '',
    price: 0,
    img: [],
    regDate: '',
    modDate: '',
    writer: '',
    uploadFileNames: []
};

const DetailComponent = () => {
    const { pno } = useParams<{ pno: string }>(); // URL 파라미터에서 제품 번호 받기
    const [product, setProduct] = useState<IProduct>(initialState);
    const [quantity, setQuantity] = useState<number>(1); // 제품 수량 관리
    const [loading, setLoading] = useState(true); // 로딩 상태
    const navigate = useNavigate();
    const queryString = window.location.search; // 검색어 파라미터 유지

    const { isMobile } = useMobileCheck(); // 모바일 체크
    const apiHost = isMobile
        ? 'http://192.168.45.155:8089/api/products' // 모바일용 서버 주소
        : 'http://localhost:8089/api/products'; // 로컬 서버 주소

    // const dispatch = useDispatch(); // Redux Dispatch (추후 구현 예정)

    const moveToListPage = (): void => {
        navigate({
            pathname: '/kiosk/list',  // 목록 페이지로 이동
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

        // Redux Toolkit으로 장바구니 상태 관리 (추후 구현)
        /*
        dispatch(addToCart({
            pno: product.pno,
            pname: product.pname,
            quantity,
            totalPrice: product.price * quantity,
        }));
        */

        console.log('장바구니에 추가됨:', cartItem);
        moveToListPage(); // 장바구니에 추가 후 목록 페이지로 이동
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
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
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                {product.uploadFileNames.map((fileName, index) => (
                                    <img
                                        key={index}
                                        src={`${apiHost}/view/${fileName}`}
                                        alt={product.pname}
                                        className="w-full h-auto object-cover rounded-lg shadow-sm"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">등록된 이미지가 없습니다.</p>
                        )}
                    </div>

                    {/* 제품 이름과 가격 */}
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">제품 이름</span>
                        <span className="text-sm font-semibold text-gray-700">{product.pname}</span>
                        <span className="text-sm font-semibold text-gray-700">가격: {product.price}원</span>
                    </div>

                    {/* 제품 설명 추가 */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-semibold text-gray-700">제품 설명</label>
                        <textarea
                            name="pdesc"
                            value={product.pdesc || ''}
                            readOnly
                            className="border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-700"
                        />
                    </div>

                    {/* 수량 선택 */}
                    <div className="flex items-center">
                        <button
                            onClick={() => handleQuantityChange(quantity - 1)}
                            className="w-8 h-8 bg-gray-300 text-lg font-bold rounded-lg"
                        >
                            -
                        </button>
                        <input
                            type="text"
                            value={quantity}
                            readOnly
                            className="w-16 mx-2 text-center border border-gray-300 rounded-lg p-2 bg-gray-100 text-gray-700"
                        />
                        <button
                            onClick={() => handleQuantityChange(quantity + 1)}
                            className="w-8 h-8 bg-gray-300 text-lg font-bold rounded-lg"
                        >
                            +
                        </button>
                    </div>

                    {/* 장바구니에 담기 버튼 */}
                    <div className="flex justify-between">
                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                        >
                            {product.price * quantity}원 장바구니에 담기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailComponent;
