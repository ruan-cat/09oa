export const download = async () => {
	try {
		// 请求/下载文件
		const res = await fetch("../模版.xls");
		// 处理文件
		const blob = await res.blob();
		// 新的URL对象表示指定的File对象或Blob对象
		const url = URL.createObjectURL(blob);
		const alink = document.createElement("a");
		// 添加a标签
		alink.href = url;
		// 添加文件名
		alink.download = "input_person.xls";
		// 模拟点击
		alink.click();
		// 释放内存
		URL.revokeObjectURL(url);
	} catch (err) {
		console.log(err);
	}
};
