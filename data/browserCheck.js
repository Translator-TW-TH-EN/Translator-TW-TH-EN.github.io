// 檢查是什麼瀏覽器開啟
try {
	var u = navigator.userAgent
	let isLineApp = /Line/.test(u);
	let isIOS = /iPad|iPhone|iPod/.test(u) && !window.MSStream;
	let isAndroid = /Android/.test(u);


	if (isLineApp) {
		window.location.href += "?openExternalBrowser=1"
	}
	else if (isIOS) {
		window.location.href = 'googlechromes://translator-tw-th-en.github.io/order/';
	}
	else if (isAndroid) {
		window.location.href = 'googlechromes://navigate?url=translator-tw-th-en.github.io/order/';
	}
	else {
		return;
	}
} catch (e) {
	alert(e)
}
