/**
 * 
 * @param NodeList elements 
 * @param Function callback 
 * @param Dictionary observerOpsions
 */
function intersectAction(elements, callback, observerOptions) {

	// UA 取得
	const userAgent = window.navigator.userAgent.toLowerCase();

	// IE の場合は IntersectionObserver が使えないので
	// そのまま実行してリターン
	if (userAgent.indexOf('msie') != -1 ||
		userAgent.indexOf('trident') != -1) {
		Array.prototype.forEach.call(elements, function (element) {
			callback(element);
			return;
		})
	}

	// option が指定されていなければ初期値を設定
	if (observerOptions === undefined) {
		observerOptions = {
			root: null,
			rootMargin: '-30%',
			threshold: 0
		}
	}
	
	const observer = new IntersectionObserver(doIntersect, observerOptions);

	// それぞれの element を監視する
	elements.forEach(function (element) {
		observer.observe(element);
	});

	/**
	 * 交差したときに呼び出す関数
	 * @param entries
	 */
	function doIntersect(entries) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				// 交差したら実行
				callback(entry.target);
			}
		});
	}

}