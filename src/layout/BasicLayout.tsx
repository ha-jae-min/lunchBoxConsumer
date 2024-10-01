import React from 'react';

function BasicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-orange-50">
            {/* 상단 고정 헤더 */}
            <header className="bg-white shadow-md fixed top-0 w-full z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-orange-600">도시락 예약 서비스</h1>
                    <nav className="hidden md:flex space-x-6">
                        <a href="/" className="text-gray-700 hover:text-orange-600 transition duration-200">홈</a>
                        <a href="/orders" className="text-gray-700 hover:text-orange-600 transition duration-200">예약 내역</a>
                        <a href="/profile" className="text-gray-700 hover:text-orange-600 transition duration-200">내 정보</a>
                    </nav>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="flex-grow container mx-auto pt-16 px-4">
                {children} {/* 나중에 상품 리스트나 다른 콘텐츠를 여기에 넣을 수 있습니다. */}
            </main>

            {/* 하단 고정 네비게이션 (모바일용) */}
            <footer className="bg-white fixed bottom-0 left-0 right-0 md:hidden shadow-md">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <a href="/" className="text-gray-700 hover:text-orange-600 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a1 1 0 00-.866.5L4 9.062V18a1 1 0 001 1h4a1 1 0 001-1v-5h2v5a1 1 0 001-1V9.062L10.866 2.5A1 1 0 0010 2z" />
                        </svg>
                        <span className="text-xs">홈</span>
                    </a>
                    <a href="/orders" className="text-gray-700 hover:text-orange-600 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M16 5a3 3 0 10-6 0 3 3 0 006 0zm-3 6a5.978 5.978 0 00-4.285 1.77A6.004 6.004 0 008 18h8a6.004 6.004 0 00-4.285-5.23A5.978 5.978 0 0013 11z" />
                        </svg>
                        <span className="text-xs">예약 내역</span>
                    </a>
                    <a href="/profile" className="text-gray-700 hover:text-orange-600 flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a1 1 0 00-1 1v4.586l-1.707-1.707a1 1 0 00-1.414 1.414L9.586 10l-2.707 2.707a1 1 0 001.414 1.414L10 11.414V16a1 1 0 002 0v-4.586l1.707 1.707a1 1 0 001.414-1.414L12.414 10l2.707-2.707a1 1 0 00-1.414-1.414L10 7.586V3a1 1 0 00-1-1z" />
                        </svg>
                        <span className="text-xs">내 정보</span>
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default BasicLayout;
