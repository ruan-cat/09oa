/**
 * 公共方法
 * 添加子级节点
 * @param {Object} node 当前节点对象
 */
function addChildNode(node, form) {
	// 创建新节点数据
	const newNodeData = {
		xname: form.xname,
		children: [],
	};

	// 将新节点添加到指定节点的子节点列表中
	node.push(newNodeData);
}

function addMenuChildNode(node, form) {
	// 创建新节点数据
	const newNodeData = {
		menu_name: form.menu_name,
		menu_type: form.menu_type,
		is_button: form.is_button,
		permission: form.permission,
		status: form.status,
		link_url: form.link_url,
		level: form.level,
		remark: form.remark,
		children: [],
	};

	node.push(newNodeData);
}

/**
 * 公共方法
 * 删除子级节点
 * @param {Object} node 当前节点对象
 */

function removeChildNode(node) {
	// 找到当前节点的id
	const id = node.id;
	// 获取当前节点的父节点
	const parentNode = node.parent.childNodes;
	// 找到要删除的节点在父节点中的索引
	const index = parentNode.findIndex((item) => item.id === id);
	parentNode.splice(index, 1);
}

/**
 * 公共方法
 * 清除表单数据
 * @return {object} form
 */
function clearForm() {
	return {
		xname: "",
		xunique: "",
		xtypeList: "",
		xshortName: "",
		xdescription: "",
		xcontrollerList: [],
		xsuperior: "",
		xorderNumber: "",
	};
}

function clearMenu() {
	return {
		menu_name: "",
		menu_type: "",
		is_button: false,
		permission: "",
		status: false,
		link_url: "",
		level: "",
		remark: "",
		creator_id: "",
		updater_id: "",
	};
}

/**
 * 公共方法
 * 根据一个number数组，从一个对象数组中筛选出对应的对象
 * @return {Array} 对应的object数组
 * @param userList
 * @param userKeys
 */
function FilterUser(userList, userKeys) {
	return userList.filter((item) => userKeys.includes(item.key));
}

export { addChildNode, removeChildNode, clearForm, FilterUser, clearMenu, addMenuChildNode };
