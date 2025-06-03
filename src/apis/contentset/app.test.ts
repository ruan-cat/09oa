import { it, describe, expect } from "vitest";
import { addColumn } from "./app";

describe("栏目管理接口测试", () => {
	it("新建栏目接口 - addColumn", async () => {
		const { execute, data, isLoading, isFinished } = addColumn({
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
		expect(isFinished.value).toBe(true);
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
});
