// 網頁載入完檢查是否cookie有登入電話
document.addEventListener('DOMContentLoaded', function () {
	// 檢查當前頁面是否是 login 頁面
	if (window.location.href.indexOf("login") !== -1) {
		// 如果是 login 頁面，直接 return 中斷執行
		return;
	}
	// 檢查是否有存有 phone 的 cookie
	var phoneCookie = getCookie("phone");

	// 如果 phoneCookie 為空，表示沒有相應的 cookie
	if (!phoneCookie) {
		// 強制跳轉到 login 頁面
		window.location.href = "/login";
	} else {
		document.querySelector('header').textContent = "登入帳號 Phone：" + phoneCookie;
	}
});
