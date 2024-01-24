// 網頁載入完檢查為預設瀏覽器
document.addEventListener('DOMContentLoaded', function () {
	try {
		var u = navigator.userAgent
		let isLineApp = /Line/.test(u);
		let isIOS = /iPad|iPhone|iPod/.test(u) && !window.MSStream;
		let isAndroid = /Android/.test(u);


		if (isLineApp) {
			window.location.href += "?openExternalBrowser=1"
		}
		else if (isIOS) {
			window.location.href = 'googlechromes://www.tovia.com/';
		}
		else if (isAndroid) {
			window.location.href = 'googlechromes://navigate?url=www.tovia.com/';
		}
		else {
			return;
		}
	} catch (e) {
		alert(e)
	}
});
