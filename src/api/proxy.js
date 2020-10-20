/*
 * @Author: zhuqingyu
 * @Date: 2020-08-29 11:04:39
 * @LastEditTime: 2020-10-13 19:36:16
 * @LastEditors: zhuqingyu
 */

const proxy = {
	public: 'localhost:3000',
	publicSocket: 'ws://localhost:3000'
};

export default new Proxy(proxy, {
	get(target, value) {
		const baseUrl = target[`${value}`];

		if (baseUrl) {
			return function (api) {
				let url = `${baseUrl}${api}`;

				// 带证书的 地址转换
				if (window.location.href.startsWith('https')) {
					if (!url.startsWith('https')) {
						url.replace('http', 'https');
					}
					if (!url.startsWith('wss')) {
						url.replace('ws', 'wss');
					}
				}
				if(!url.startsWith('http')) url = `http://${url}`
				return url;
			};
		} else {
			return (api) => {
				throw new Error(`${api}的代理没有找到！`);
			};
		}
	}
});