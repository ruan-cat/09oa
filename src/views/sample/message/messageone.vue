<template>
	<el-col :span="8">
		<span class="demonstration">click to trigger</span>
		<el-dropdown trigger="click" @click="user_fetchMessages">
			<!-- 这里的click是为了测试用的 -->
			<span class="el-dropdown-link">
				消息<el-icon class="el-icon--right"><arrow-down /></el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu slot="dropdown">
					<pre class="messages">
            <el-dropdown-item v-for="msg in user_messages" :key="msg.id">
              <div class="dcontent" >
                {{ msg.content.length > 50 ? msg.content.substring(0, 45) + '...' : msg.content }}
              </div>
            </el-dropdown-item>
            
          </pre>
				</el-dropdown-menu>
				<!-- 这里暂时糙点，后面再美化吧 -->
				<div class="sfooter">
					<div class="footer">
						<button @click="user_fetchMessages">刷新</button>
					</div>
					<div class="footer" @click="user_messageReadAll">
						<button>清除</button>
					</div>
				</div>
			</template>
		</el-dropdown>
	</el-col>
</template>

<script setup>
import { ArrowDown, Check, CircleCheck, CirclePlus, CirclePlusFilled, Plus } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useMessagesStore } from "@/stores/notice";
// 解构store，定义函数
const messagesStore = useMessagesStore();
// const { messages , fetchMessages, messageRead,messageReadAll } = messagesStore;
// 从pinia中拿取数据，并响应式追踪
const user_messages = computed(() => messagesStore.messages);

// 将通知消息标为已读
function user_messageRead(messageId) {
	messagesStore.messageRead(messageId);
}
// 更新通知消息
function user_fetchMessages() {
	messagesStore.fetchMessages();
}
// 将所有消息标为已读
function user_messageReadAll() {
	messagesStore.fetchMessages();
}
</script>

<style scoped>
.block-col-2 .demonstration {
	display: block;
	color: var(--el-text-color-secondary);
	font-size: 14px;
	margin-bottom: 20px;
}

.block-col-2 .el-dropdown-link {
	display: flex;
	align-items: center;
}
.el-dropdown-menu {
	width: 340px;
	height: 600px;
	white-space: pre-wrap;
}
.el-dropdown-item,
.dcontent {
	max-width: 300px;
	height: 100px;
	white-space: pre-line;
}
.footer {
	width: 40%;
}
.sfooter {
	display: flex;
}
</style>
