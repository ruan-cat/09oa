import { type Config } from "@ruan-cat/vercel-deploy-tool/src/config.ts";
import { domains } from "@ruan-cat/domains";

// 这里使用的是阮喵喵的vercel账号
export default <Config>{
	// 爱丽丝项目
	vercelProjetName: "small-alice-web-odse",
	vercelOrgId: "team_cUeGw4TtOCLp0bbuH8kA7BYH",
	vercelProjectId: "prj_vdrAvRthiSjkhotfPTXFSV5e1KQW",

	/**
	 * 警告 token时效警告
	 *
	 * 这是阮喵喵自己提供的token，用的是阮喵喵的token，有效期仅为大项目期间。
	 *
	 * token标识名：  01s-09oa-ruancat-vc-token
	 *
	 * 有效期：  December 13, 2024
	 */
	vercelToken: "7cdpINJqXMPCa8NY0V71kwhE",

	vercelJsonPath: "./vercel.reverse-proxy.json",

	deployTargets: [
		// oa预发布环境
		{
			type: "userCommands",
			targetCWD: "./",
			outputDirectory: "dist",
			url: domains["09oa"] as unknown as string[],
			userCommands: ["pnpm -C=./ build"],
		},
	],
};
