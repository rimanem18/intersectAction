/**
 * author Rimane
 * license MIT
 * url https://github.com/rimanem18/intersectAction
 * 
 * @param {NodeList|HTMLCollection|HTMLElement|jQueryObject} elements 交差を監視したい要素
 * @param {Function} callback  交差時に実行したい関数
 * @param {IntersectionObserver Options} observerOptions IntersectionObserver のオプション
 */
function intersectAction(elements, callback, observerOptions) {
	'use strict';
	

	// 省略用
	const forEach = Array.prototype.forEach;
	const toString = Object.prototype.toString;

	// 型厳密チェック用
	function typeOf(obj) {
		if (window.jQuery !== undefined && obj instanceof jQuery) {
			return 'jquery';
		} else {
			return toString.call(obj).slice(8, -1).toLowerCase();
		}
	}

	// 引数の型を String 型で取得
	const elementsType = typeOf(elements);

	// option が指定されていなければ初期値を設定
	if (observerOptions === undefined || observerOptions === null) {
		observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0
		}
	}

	// observer をインスタンス化
	const observer = new IntersectionObserver(doIntersect, observerOptions);

	// 要素を監視する
	if (elementsType === 'jquery') {
		// jQuery オブジェクトなら DOM に変換して監視
		const doms = elements.get();
		forEach.call(doms, function (dom) {
			observer.observe(dom);
		})
	} else if(elementsType === 'nodelist' || elementsType === 'htmlcollection') {
		// nodelist かhtmlcollection ならforEach で回して全部監視
		forEach.call(elements, function (element) {
			observer.observe(element);
		});
	} else {
		// その他なら一つをそのまま監視
		observer.observe(elements);
	}
	console.log(elementsType);
	

	/**
	 * 交差したときに呼び出す関数
	 * @param entries
	 */
	function doIntersect(entries) {

		if (elementsType === 'jquery') {
			// jQuery オブジェクトが渡された場合は jQuery として振る舞う
			forEach.call(entries, function (entry) {
				callback(jQuery(entry.target), entry.isIntersecting, observer);
			})
		} else {
			// そうでない場合は vanilla として複数回処理
			forEach.call(entries, function (entry) {
				callback(entry.target, entry.isIntersecting, observer);
			})
		}
	}

};
