fetch('../data/loader.html').then(response => response.text())
.then(html => document.body.innerHTML += html)
.catch(error => console.error('加載 loader.html 出錯：', error));
