
import {useAppSelector} from "../../hooks/rtk.ts";


function CartComponent() {
    // 장바구니 상태를 선택
    const cartItems = useAppSelector((state) => state.cart.products);

    return (
        <div>
            <h2>장바구니</h2>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어 있습니다.</p>
            ) : (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.pno}>
                            <p>상품명: {item.pname}</p>
                            <p>수량: {item.quantity}</p>
                            <p>총 가격: {item.totalPrice}원</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CartComponent;