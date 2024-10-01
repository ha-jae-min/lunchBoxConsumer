import React from "react";
import { Link } from "react-router-dom";

function BasicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* 고정된 헤더 */}
            <header className="bg-blue-600 fixed w-full z-10 shadow-md">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* 로고 */}
                    <div className="text-3xl font-extrabold text-white tracking-wide">
                        MyLogo
                    </div>


                    {/* 로그인 버튼 */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link to="/login" className="text-white hover:underline">
                            로그인
                        </Link>
                    </div>

                    {/* 모바일 메뉴 버튼 */}
                    <div className="md:hidden">
                        <button type="button" className="text-white focus:outline-none">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* 메인 콘텐츠 및 사이드바 */}
            <div className="flex pt-24 min-h-screen bg-gray-100">
                {/* 사이드바 */}
                <aside className="w-64 bg-gray-800 text-white fixed h-full shadow-lg">
                    <nav className="flex flex-col p-4">
                        <Link
                            to="/admin/dashboard"
                            className="py-2 px-4 hover:bg-gray-700 rounded mb-2"
                        >
                            대시보드
                        </Link>
                        <Link
                            to="/admin/products"
                            className="py-2 px-4 hover:bg-gray-700 rounded mb-2"
                        >
                            상품 관리
                        </Link>
                        <Link
                            to="/admin/orders"
                            className="py-2 px-4 hover:bg-gray-700 rounded mb-2"
                        >
                            주문 관리
                        </Link>
                        <Link
                            to="/admin/users"
                            className="py-2 px-4 hover:bg-gray-700 rounded mb-2"
                        >
                            사용자 관리
                        </Link>
                        <Link
                            to="/admin/settings"
                            className="py-2 px-4 hover:bg-gray-700 rounded"
                        >
                            설정
                        </Link>
                    </nav>
                </aside>

                {/* 메인 콘텐츠 */}
                <main className="flex-1 ml-64 p-8 bg-white rounded-lg shadow-lg">
                    {children}
                </main>
            </div>
        </>
    );
}

export default BasicLayout;
