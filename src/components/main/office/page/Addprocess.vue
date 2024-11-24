<script setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import jsonData from "../test/categories.json";
import { Back, Search } from "@element-plus/icons-vue";

const input = ref("");
const activeIndex = ref("1-1");
const activeName = ref("all");
const categories = ref(jsonData);

const filteredCategories = computed(() => {
	// 获取小写的输入值，方便进行不区分大小写的过滤
	const query = input.value.toLowerCase();

	// 遍历所有分类并过滤其中的 items
	return categories.value
		.map((category) => {
			// 过滤该分类下的 items
			const filteredItems = category.items.filter((item) => item.name.toLowerCase().includes(query));

			// 如果过滤后的 items 不为空，返回该分类和过滤后的 items
			if (filteredItems.length > 0) {
				return {
					...category,
					items: filteredItems,
				};
			}

			// 如果该分类的 items 全部被过滤掉，返回 null
			return null;
		})
		.filter((category) => category !== null); // 过滤掉为 null 的分类
});

const router = useRouter();
const goBack = () => {
	router.push("/office/todo");
};

const handleSelect = (key, keyPath) => {
	activeIndex.value = key;
};
</script>

<template>
	<div>
		<el-row :gutter="10">
			<el-col :span="4">
				<el-card class="card-container">
					<el-button @click="goBack" link style="margin: 20px">
						<el-icon size="18px"><Back /></el-icon>
						<el-link>返回</el-link>
					</el-button>
					<el-tabs v-model="activeName" type="border-card" stretch>
						<el-input
							v-model="input"
							style="margin-block-end: 10px"
							placeholder="搜索可启动的流程"
							clearable
							:prefix-icon="Search"
						/>

						<el-tab-pane label="全部" name="all">
							<el-scrollbar height="400px">
								<el-menu :default-active="activeIndex" @select="handleSelect">
									<template v-for="(category, categoryIndex) in filteredCategories" :key="categoryIndex">
										<el-menu-item
											v-for="(item, itemIndex) in category.items"
											:key="itemIndex"
											:index="`${categoryIndex + 1}-${itemIndex + 1}`"
											style="border-block-end: 1px solid #eee"
										>
											{{ item.name }}
										</el-menu-item>
									</template>
								</el-menu>
							</el-scrollbar>
						</el-tab-pane>

						<el-tab-pane label="按分类" name="class">
							<el-menu :default-active="activeIndex" @select="handleSelect" unique-opened>
								<el-sub-menu
									v-for="(category, index) in filteredCategories"
									:key="index"
									:index="(index + 1).toString()"
								>
									<template #title>
										<el-text size="large" style="font-weight: bold">
											{{ (index + 1).toString() }} {{ category.category }}
										</el-text>
									</template>

									<el-menu-item
										v-for="(item, subIndex) in category.items"
										:key="subIndex"
										:index="`${index + 1}-${subIndex + 1}`"
										style="border-block-end: 1px solid #eee"
									>
										{{ item.name }}
									</el-menu-item>
								</el-sub-menu>
							</el-menu>
						</el-tab-pane>
					</el-tabs>
				</el-card>
			</el-col>
			<el-col :span="20">
				<el-card class="card-container" style="display: flex"> </el-card>
			</el-col>
		</el-row>
	</div>
</template>

<style></style>
