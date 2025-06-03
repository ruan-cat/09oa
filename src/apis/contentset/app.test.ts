import { it, describe, expect } from "vitest";
import { addColumn, updateColumnInfo, queryColumnByCondition } from "./app";

describe("栏目管理接口测试", () => {
	it("新建栏目接口 - addColumn", async () => {
		const { execute, data } = addColumn({
			onSuccess(data) {
				console.log("新建栏目成功", data);
				expect(data).toBeDefined();
			},
			onError(error) {
				console.error("新建栏目失败", error);
			},
			onFinish() {
				console.log("新建栏目请求完成");
			},
		});

		// 创建测试文件
		const testFile = new File(["test content"], "test.txt", {
			type: "text/plain",
		});

		// 执行接口请求
		await execute({
			data: {
				xappName: "测试栏目",
				xappAlias: "test-column",
				xappType: "展示栏目",
				xdescription: "这是一个测试栏目",
				xappMemo: "测试栏目备忘录",
				xallPeopleView: true,
				xallPeoplePublish: false,
				xanonymousAble: false,
				xsendNotify: true,
				xshowAllDocuments: false,
				xdocumentType: "信息",
				xappInfoSeq: "1",
				xdistributeFactor: 1,
				xcreatorPerson: "testUser",
				xcreatorIdentity: "admin",
				xcreatorUnitName: "测试部门",
				xcreatorTopUnitName: "测试公司",
				file: testFile,
			},
		});

		console.log("新建栏目响应数据:", data.value);
	});

	it("新建栏目接口 - 仅必填参数", async () => {
		const { execute, data } = addColumn({
			onSuccess(data) {
				console.log("仅必填参数新建栏目成功", data);
			},
		});

		// 只传递基本必要参数
		await execute({
			data: {
				xappName: "简单测试栏目",
				xappType: "信息栏目",
			},
		});

		console.log("简单新建栏目响应:", data.value);
	});

	it("更新栏目基础信息接口 - updateColumnInfo", async () => {
		const { execute, data } = updateColumnInfo({
			onSuccess(data) {
				console.log("更新栏目基础信息成功", data);
				expect(data).toBeDefined();
			},
			onError(error) {
				console.error("更新栏目基础信息失败", error);
			},
			onFinish() {
				console.log("更新栏目基础信息请求完成");
			},
		});

		// 创建测试文件
		const testFile = new File(["updated content"], "update.txt", {
			type: "text/plain",
		});

		// 执行接口请求
		await execute({
			data: {
				xid: "test-column-id",
				xappName: "更新后的栏目名称",
				xappAlias: "updated-column",
				xappType: "测试",
				xdescription: "用于测试的栏目",
				xappInfoSeq: "02",
				xappIcon: "icon-test",
				readForm: ["form1", "form2"],
				writeForm: ["editForm1", "editForm2"],
				file: testFile,
			},
		});

		console.log("更新栏目基础信息响应数据:", data.value);
	});

	it("更新栏目基础信息接口 - 仅必填参数", async () => {
		const { execute, data } = updateColumnInfo({
			onSuccess(data) {
				console.log("仅必填参数更新栏目成功", data);
			},
		});

		// 只传递基本必要参数
		await execute({
			data: {
				xid: "simple-update-id",
				xappName: "简单更新栏目",
			},
		});

		console.log("简单更新栏目响应:", data.value);
	});

	it("根据条件查询栏目接口 - queryColumnByCondition", async () => {
		const { execute, data } = queryColumnByCondition({
			onSuccess(data) {
				console.log("查询栏目成功", data);
				expect(data).toBeDefined();
			},
			onError(error) {
				console.error("查询栏目失败", error);
			},
			onFinish() {
				console.log("查询栏目请求完成");
			},
		});

		// 执行接口请求 - 完整参数查询
		await execute({
			data: {
				pageIndex: 1,
				pageSize: 10,
				xappAlias: "test-alias",
				xappName: "测试栏目",
				xappType: "新闻",
				xdescription: "测试栏目描述",
			},
		});

		console.log("查询栏目响应数据:", data.value);
	});

	it("根据条件查询栏目接口 - 仅分页参数", async () => {
		const { execute, data } = queryColumnByCondition({
			onSuccess(data) {
				console.log("分页查询栏目成功", data);
			},
		});

		// 只传递分页参数
		await execute({
			data: {
				pageIndex: 1,
				pageSize: 20,
			},
		});

		console.log("分页查询栏目响应:", data.value);
	});

	it("根据条件查询栏目接口 - 按栏目名称查询", async () => {
		const { execute, data } = queryColumnByCondition({
			onSuccess(data) {
				console.log("按名称查询栏目成功", data);
			},
		});

		console.log("data", data.value?.data);

		// 按栏目名称查询
		await execute({
			data: {
				xappName: "新闻栏目",
				pageIndex: 1,
				pageSize: 5,
			},
		});

		console.log("按名称查询栏目响应:", data.value);
	});
});
