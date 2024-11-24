// 用户消息通知状态管理
import { defineStore } from "pinia";
import { read } from "xlsx";
import Request from "@/apis/request";

export const useMessagesStore = defineStore("messages", {
	state: () => ({
		messages: [
			{
				id: 1,
				title: "titleMessage 1",
				read: false,
				content:
					"目前市面上有许许多多的云笔记产品，所谓云笔记，主要的作用就是记录个人的备忘需求，比如每天的日程安排、突如其来的灵感、生活笔记等等，只需要一个账号，就可以多平台通用。除了日常生活之外，职场工作中也常有需要进行记录的事情，O2OA云笔记提供了一个给员工记录工作笔记、在线协同编辑文档、白板演示的工具，该功能可以将记录下来的文档信息件实时同步到云端，用户随时在多个设备上进行查看、编辑与分享，支持在“云”上做笔记、管理文档、编写脑图信息。这样可以帮助整体工作团队实现资料共享、协同编辑、实时沟通等，极大提高工作效率。",
			},
			{
				id: 2,
				title: "titleMessage 2",
				read: false,
				content:
					"在企业日常工作中，遇到一些需要商议的项目工作，就需要召集会议，一场有效的会议，完全可以成为项目甚至企业发展的“点睛之笔”，但是实际上，无效的会议占大多数，成了最浪费时间的企业管理方式之一。\n造成这种现象主要的原因有5个：\n1、会议没有明确的主题\n2、会议没有明确的行动计划\n3、没有明确会议负责人和主持人\n4、会议时间长，内容多而杂乱\n5、会议结束后没有进行有效的跟踪反馈",
			},
			// 初始消息列表
		],
	}),
	actions: {
		fetchMessages() {
			// 这是异步获取消息的函数
			// 这里应该用socket获取数据，现用本地测试替代
			// 这里的id应该为唯一量，后端的活（确信(´･ω･`)
			let newMessages = [
				{ id: 3, title: "New Message 1", read: false, content: "New con1" },
				{ id: 4, title: "New Message 2", read: false, content: "New con2" },
			];
			this.messages = newMessages.concat(this.messages);
			console.log(this.messages);
		},
		messageRead(messageId) {
			// 清除单个通知
			const index = this.messages.findIndex((m) => m.id === messageId);
			if (index !== -1) {
				this.messages[index].read = true;
			}
		},
		messageReadAll() {
			// 清除所有
			for (const element of this.messages) {
				element.read = true;
			}
		},
	},
});
