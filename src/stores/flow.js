import { defineStore } from "pinia";
import { apiGetFlowDataApi, apiPutFlowDataApi } from "@/apis/process/flow";

export const flow = defineStore("flow", {
	state: () => ({
		flowHistoryData: [],
		flowNodeData: [],
		// 缓存数据
		staging: shallowRef(null),
	}),
	getters: {},
	actions: {
		submitHistoryJson(data) {
			try {
				this.flowHistoryData = [];
				console.log("Pinia : is data type : ", typeof data);
				console.log("Pinia : is data value : ", data);
				for (let index = 0; index < data.nodes.length; index++) {
					this.flowHistoryData.push(data.nodes[index].text.value);
				}
			} catch (error) {
				console.log("Pinia : is submitHistoryJson's err : ", error);
				console.log("Pinia : is flowHistoryData's err : ", this.flowHistoryData);
			}
			console.log("Pinia : flowHistoryData is : ", this.flowHistoryData);
		},
		// api func
		// 获取节点数据
		async getNodeData(url) {
			try {
				this.flowNodeData = [];
				console.log("1111111");

				const node_data = await apiGetFlowDataApi(url);
				console.log("Pinia : is node data value :", node_data);
			} catch (error) {
				console.log("Pinia : get node data err : ", error);
			}
		},
	},
});

const jet = {
	nodes: [
		{
			id: "Event_530e9ac",
			type: "bpmn:startEvent",
			x: 312,
			y: 126,
			properties: { width: 36, height: 36 },
			text: { x: 312, y: 166, value: "开始" },
		},
		{
			id: "Activity_902fb2d",
			type: "bpmn:userTask",
			x: 352,
			y: 243,
			properties: { width: 100, height: 80 },
			text: { x: 352, y: 243, value: "用户任务" },
		},
		{
			id: "Activity_a7ee482",
			type: "bpmn:userTask",
			x: 397,
			y: 402,
			properties: { width: 100, height: 80 },
			text: { x: 397, y: 402, value: "用户任务" },
		},
		{
			id: "Event_031ae4f",
			type: "bpmn:endEvent",
			x: 306,
			y: 545,
			properties: { width: 36, height: 36 },
			text: { x: 306, y: 585, value: "结束" },
		},
	],
	edges: [],
};
