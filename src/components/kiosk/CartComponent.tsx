
import {useAppSelector, useAppDispatch} from "../../hooks/rtk.ts";
import {removeFromCart} from "../../slices/cartSlice.ts";

function CartComponent() {

    // 장바구니 상태
    const cartItems = useAppSelector((state) => state.cart.products);
    const dispatch = useAppDispatch();

    // 삭제 버튼 클릭 핸들러
    const handleRemove = (pno: number) => {
        dispatch(removeFromCart(pno));
    };

    return (
        <div className="container mx-auto py-6">
            <h2 className="text-2xl font-bold mb-4">장바구니</h2>
            {cartItems.length === 0 ? (
                <p className="text-center text-lg">장바구니가 비어 있습니다.</p>
            ) : (
                <ul className="divide-y divide-gray-200 border rounded-lg shadow-md">
                    {cartItems.map((item) => (
                        <li key={item.pno} className="flex items-center justify-between p-4">
                            <div className="flex-grow"> {/* 이 div에 flex-grow 클래스 추가 */}
                                <h3 className="text-lg font-semibold">{item.pname}</h3>
                                <p className="text-sm text-gray-600">수량: {item.quantity}</p>
                                <p className="text-md font-medium">총 가격: {item.totalPrice}원</p>
                            </div>
                            <button
                                className="ml-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                                onClick={() => handleRemove(item.pno)}
                            >
                                삭제
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CartComponent;