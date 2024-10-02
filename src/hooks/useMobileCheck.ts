
function useMobileCheck() {

    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

    return {isMobile}
}

export default useMobileCheck;