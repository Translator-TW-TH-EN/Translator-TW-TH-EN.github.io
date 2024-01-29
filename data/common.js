// google Apps Script 傳送訊息
async function sendRequest(status, phone = NaN, data = {}, isDebug = true) {
	if (!status) {
		alert("向google apps script寄送請求時\n有效參數不足");
		return;
	}

	const url = googleAppsScriptUrl;
	try {
		const sendData = { status: status, phone: phone, data: data };
		// 將資料轉換成查詢字串
		const queryString = new URLSearchParams(sendData).toString();

		const response = await fetch(`${url}?${queryString}`);
		const responseData = await response.json();
		console.log("Data sent:", sendData);
		console.log("Response:", responseData);
		if (responseData.status === 'ok') { return responseData; }
		else { alert("向google apps script寄送請求時\n回傳值非ok"); }
	} catch (error) {
		// 忽略 "TypeError: Failed to fetch" 錯誤
		if (!isDebug && error instanceof TypeError && error.message === "Failed to fetch") { return; }
		alert("向google apps script寄送請求時\n發生錯誤\n" + error);
	}
}

// 自己的 flex2html (處理 原flex2html 錯誤) 目前沒用到!!!!!!!!
function my_flexToHtml(flex2htmlElementName, flexJsonList) {
	flexJsonMessage = {
		type: "flex",
		altText: "Flex Message",
		contents: {
			type: "carousel",
			contents: [...flexJsonList]
		}
	}

	if (!document.getElementById(flex2htmlElementName)) {
		alert("未找到產生 flexJson 的元素")
	}
	document.getElementById(flex2htmlElementName).innerHTML = "";
	flex2html(flex2htmlElementName, flexJsonMessage);

	// 將 LySlider 關閉下方捲動軸
	var wrongLySliderElements = document.querySelectorAll(".LySlider");
	wrongLySliderElements.forEach(function (element) {
		element.style.webkitOverflowScrolling = "auto";
		// element.style.overflowX = "visible";
		element.style.overflow = "hidden";
	});

	// 將 chatbox 上方空白縮短
	var wrongChatboxElements = document.querySelectorAll(".chatbox");
	wrongChatboxElements.forEach(function (element) {
		element.style.paddingTop = "20px";
	});
}

// 取得指定名稱的 cookie 值
function getCookie(name) {
	var cookies = document.cookie.split("; ");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].split("=");
		if (cookie[0] === name) {
			return cookie[1];
		}
	}
	return null;
}

// 這是一個用來解析 URL 查詢參數(urlQueryParams)的簡單函數
function getUrlQueryParametersByName(name) {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(window.location.href);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 輸入切割分散的timeArray，整理並合併後回傳
function combineFixOrderTime(timeArrays) {
	// 映射為包含起始和結束時間的物件陣列
	var timeRanges = timeArrays.map(function (timeArray) {
		var [startTime, endTime] = timeArray.split("~");
		return { startTime, endTime };
	});
	// 按照起始時間排序
	timeRanges.sort((a, b) => a.startTime.localeCompare(b.startTime));
	// 建立陣列存儲分組後的時間段
	var groupedTimePeriods = [];
	// 遍歷排序後的時間段，進行分組
	timeRanges.forEach(function (range, index) {
		if (index === 0) {
			groupedTimePeriods.push(range);
		} else {
			if (range.startTime > groupedTimePeriods[groupedTimePeriods.length - 1].endTime) {
				groupedTimePeriods.push(range);
			} else {
				groupedTimePeriods[groupedTimePeriods.length - 1].endTime = range.endTime;
			}
		}
	});
	// 將合併後的時間段陣列轉換為格式化的字串陣列
	var groupedTimePeriods = groupedTimePeriods.map(({ startTime, endTime }) => `${startTime}~${endTime}`);
	// 輸出分組後的時間段陣列
	return groupedTimePeriods;
}
