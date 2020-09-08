# intersectAction
特定の要素と交差したら引数に渡された処理が実行されます。  

## 使い方
第1引数に交差を監視したい要素、第2引数に関数を渡します。  

もしも fadeInUp というクラスが付与された要素に交差したタイミングで isShow というクラスを付与したい場合は、以下のように記述します。  

	const fadeInUpAll = document.querySelectorAll('.fadeInUp');
	intersectAction(fadeInUpAll, function (element) {
		element.classList.add('isShow');
	})

IntersectionObserver のオプションを使いたい場合は、第3引数に連想配列にして指定してください。  
デフォルトでは root: null, rootMargin: -30%, threshold: 0 になっています。  

	const observerOptions = {
		root: null,
		rootMargin: "-30%",
		threshold: 0
	}

	const fadeInUpAll = document.querySelectorAll('.fadeInUp');
	intersectAction(fadeInUpAll, function (element) {
		element.classList.add('isShow');
	})

## 注意
IntersectionObserver を使用しているため、IE などでは動作しません。IE などで実行するには Polyfill を読み込む必要があります。  
https://github.com/w3c/IntersectionObserver/tree/master/polyfill
