import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 장바구니에 담을 제품의 인터페이스 정의
export interface CartItem {
    pno: number;
    pname: string;
    quantity: number;
    totalPrice: number;
}

export interface CartState {
    products: CartItem[]; // 장바구니에 담긴 제품 목록
}

const initialState: CartState = {
    products: [], // 초기에는 빈 장바구니
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // 장바구니에 제품 추가 (동일 제품이 이미 있으면 수량 증가)
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingProduct = state.products.find(
                (item) => item.pno === action.payload.pno
            );

            if (existingProduct) {
                // 동일 제품이 이미 있으면 수량과 총 가격을 업데이트
                existingProduct.quantity += action.payload.quantity;
                existingProduct.totalPrice += action.payload.totalPrice;
            } else {
                // 동일 제품이 없으면 새로운 제품을 장바구니에 추가
                state.products.push(action.payload);
            }

            console.log("장바구니에 추가:", state.products);
        },

        // 장바구니에서 제품 삭제
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.products = state.products.filter(
                (item) => item.pno !== action.payload
            );

            console.log("장바구니에서 삭제:", state.products);
        },

        // 장바구니 초기화
        clearCart: (state) => {
            state.products = [];
            console.log("장바구니 초기화:", state.products);
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;