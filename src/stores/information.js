// stores/messageStore.ts
import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
	state: () => ({
		unreadMessages: [], // 存储未读消息
	}),
	actions: {
		setUnreadMessages(messages) {
			this.unreadMessages = messages; // 设置未读消息
		},
	},
});
