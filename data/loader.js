// 獲取腳本標籤上的 loading-on 屬性值（如果存在）
var isLoaderEnabled = document.currentScript.getAttribute('loading-on') === 'true';

// true:直接有loading畫面，反之則要手動打開
if (isLoaderEnabled) {
    fetch('../data/loader.html').then(response => response.text())
        .then(html => {
            document.body.innerHTML += html;
            document.querySelector('.loader').style.display = 'flex'; // 顯示 loader
        })
        .catch(error => console.error('加載 loader.html 出錯：', error));
} else {
    fetch('../data/loader.html').then(response => response.text())
        .then(html => document.body.innerHTML += html)
        .catch(error => console.error('加載 loader.html 出錯：', error));
}
