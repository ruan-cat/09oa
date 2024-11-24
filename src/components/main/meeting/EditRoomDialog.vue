<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { putRoomModifyApi, postRoomAddApi } from "@/apis/meeting";
import { ElMention, ElMessage } from "element-plus";

const formLabelWidth = "250px";

const roomForm = ref({
	name: "",
	location: "",
	floor: 1,
	capacity: 1,
	housenumber: "",
	extnumber: 1,
	device: "",
	status: "",
});
const rules = {
	name: [{ required: true, message: "请输入会议室名称", trigger: "blur" }],
	// location: [{ required: true, message: "请选择位置", trigger: "blur" }],
	floor: [{ required: true, message: "请选择楼层", trigger: "blur" }],
	capacity: [{ required: true, message: "请输入容纳人数", trigger: "blur" }],
	housenumber: [{ required: true, message: "请输入门牌号", trigger: "blur" }],
	extnumber: [{ required: true, message: "请输入分机号", trigger: "blur" }],
	device: [{ required: false, message: "请选择设备", trigger: "blur" }],
	status: [{ required: true, message: "请选择状态", trigger: "blur" }],
};

const dialogVisible = ref(false);
const formRef = ref();
const emit = defineEmits(["editSuccess"]);

const onSubmit = async () => {
	await formRef.value.validate();
	const isEdit = roomForm.value.id;
	if (isEdit) {
		await putRoomModifyApi(
			roomForm.value,
			() => {
				ElMessage.success("编辑成功");
			},
			() => {
				ElMessage.error("编辑失败");
			},
		);
	} else {
		await postRoomAddApi(
			roomForm.value,
			() => {
				ElMessage.success("添加成功");
			},
			() => {
				ElMessage.error("添加失败");
			},
		);
	}
	dialogVisible.value = false;
};

const open = (room) => {
	dialogVisible.value = true;
	if (room) {
		roomForm.value = { ...room };
	}
};
defineExpose({
	open,
});

//会议室位置
const locations = ref([]);
const locationParams = {
	pageIndex: 1,
	pageSize: 10,
};
const getLocation = async () => {
	await getLocationApi(
		locationParams,
		(data) => {
			locations.value = data.rows;
		},
		(error) => {
			ElMessage.error("获取会议位置信息失败");
		},
	);
};
getLocation();
</script>

<template>
	<el-dialog v-model="dialogVisible" :close-on-click-modal="false" title="编辑会议室" width="800" :show-close="false">
		<el-form ref="formRef" :model="roomForm" :rules="rules">
			<el-form-item label="会议室名称" prop="name" :label-width="formLabelWidth">
				<el-input v-model="roomForm.name" autocomplete="off" />
			</el-form-item>
			<el-form-item label="会议室位置" prop="location" :label-width="formLabelWidth">
				<el-select v-model="roomForm.location" placeholder="请选择会议室位置">
					<el-option v-for="item in locations" :key="item.id" :label="item.name" :value="item.name" />
				</el-select>
			</el-form-item>
			<el-form-item label="会议室楼层" prop="floor" :label-width="formLabelWidth">
				<el-input v-model="roomForm.floor" autocomplete="off" />
			</el-form-item>
			<el-form-item label="容纳人数" prop="capacity" :label-width="formLabelWidth">
				<el-input v-model="roomForm.capacity" autocomplete="off" />
			</el-form-item>
			<el-form-item label="会议室门牌" prop="housenumber" :label-width="formLabelWidth">
				<el-input v-model="roomForm.housenumber" autocomplete="off" />
			</el-form-item>
			<el-form-item label="分机号" prop="extnumber" :label-width="formLabelWidth">
				<el-input v-model="roomForm.extnumber" autocomplete="off" />
			</el-form-item>
			<el-form-item label="会议室设备" prop="device" :label-width="formLabelWidth">
				<el-checkbox-group v-model="roomForm.device">
					<el-checkbox label="投影仪" value="projector" />
					<el-checkbox label="白板" value="whiteboard" />
					<el-checkbox label="电视" value="TV" />
					<el-checkbox label="视频会议" value="videoconferencing" />
					<el-checkbox label="摄像头" value="camera" />
					<el-checkbox label="网络" value="Internet" />
					<el-checkbox label="电话会议" value="phoneconferencing" />
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="会议室状态" prop="status" :label-width="formLabelWidth">
				<el-radio-group v-model="roomForm.status">
					<el-radio :value="'able'">可用</el-radio>
					<el-radio :value="'unable'">停用</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<template #footer>
			<div>
				<el-button @click="dialogVisible = false">关闭</el-button>
				<el-button type="primary" @click="onSubmit">保存</el-button>
			</div>
		</template>
	</el-dialog>
</template>
