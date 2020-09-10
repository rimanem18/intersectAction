# intersectAction
特定の要素と交差したら引数に渡された処理が実行されます。  

## 使い方
第1引数に交差を監視したい要素、第2引数に関数を渡します。  

もしも fadeInUp というクラスが付与された要素に交差したタイミングで isShow というクラスを付与したい場合は、以下のように記述します。  

	const fadeInUpAll = document.querySelectorAll('.fadeInUp');
	intersectAction(fadeInUpAll, function (element, isIntersecting) {
		if(isIntersecting){
			element.classList.add('isShow');
		}
	})

交差していないときに isShow というクラスを除去したい場合は、else 文を追加することで実現できます。

	const fadeInUpAll = document.querySelectorAll('.fadeInUp');
	intersectAction(fadeInUpAll, function (element, isIntersecting) {
		if(isIntersecting){
			element.classList.add('isShow');
		} else {
			element.classList.remove('isShow);
		}
	})

IntersectionObserver のオプションを使いたい場合は、第3引数に連想配列にして指定してください。  
IntersectionObserver のオプションはこのページから確認できます。
https://developer.mozilla.org/ja/docs/Web/API/Intersection_Observer_API

	const observerOptions = {
		root: null,
		rootMargin: '-30%',
		threshold: 0
	}
	const fadeInUpAll = document.querySelectorAll('.fadeInUp');
		intersectAction(fadeInUpAll, function (element, isIntersecting) {
		if(isIntersecting){
			element.classList.add('isShow');
		}
	}, observerOptions)

この関数は Vanilla JS のためのものですが、jQuery にも対応しています。  
jQuery を第1引数として渡した場合、jQuery としての振る舞いをおこないます。  

	const fadeInUpAll = $('.fadeInUp');
	intersectAction(fadeInUpAll, function (element, isIntersecting) {
		if (isIntersecting) {
			element.addClass('isShow');
		}
	})


## 注意
IntersectionObserver を使用しているため、IE などでは動作しません。IE などで実行するには Polyfill を読み込む必要があります。  
https://github.com/w3c/IntersectionObserver/tree/master/polyfill
