// 網頁載入完檢查為預設瀏覽器
document.addEventListener('DOMContentLoaded', function () {
	var u = navigator.userAgent
	let isLineApp = u.indexOf("Line") > -1 ? true : false;
	let isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
	let isAndroid = /Android/.test(userAgent);

	try {
		if (isLineApp) {
			window.location.href += "?openExternalBrowser=1"
			alert("isLineApp")
		}
		else if (isIOS) {
			window.location.href = "googlechrome://www.example.com" + window.location.href
			alert("isIOS")
		}
		else if (isAndroid) {
			window.location.href = "googlechrome://navigate?url=" + window.location.href
			alert("isAndroid")
		}
		else {
			alert("not anyone")
			return;
		}
	} catch (e) {
		alert(e)
	}
});
