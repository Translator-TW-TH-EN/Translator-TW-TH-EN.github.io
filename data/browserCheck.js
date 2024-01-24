// 網頁載入完檢查為預設瀏覽器
document.addEventListener('DOMContentLoaded', function () {
	var u = navigator.userAgent
	let isLineApp = u.indexOf("Line") > -1 ? true : false;
	let isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
	let isAndroid = /Android/.test(userAgent);

	try {
		if (isLineApp) {
			window.location.href += "?openExternalBrowser=1"
		}
		else if (isIOS) {
			window.location.href = "googlechrome://www.example.com" + window.location.href
		}
		else if (isAndroid) {
			window.location.href = "googlechrome://navigate?url=" + window.location.href
		}
		else {
			return;
		}
	} catch (e) {
		alert(e)
	}
});
