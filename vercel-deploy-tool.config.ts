import { defineConfig } from "@ruan-cat/vercel-deploy-tool";
import { domains } from "@ruan-cat/domains";

export default defineConfig({
	vercelProjectName: process.env.VERCEL_PROJECT_NAME || "small-alice-web-odse",
	vercelOrgId: process.env.VERCEL_ORG_ID || "team_cUeGw4TtOCLp0bbuH8kA7BYH",
	vercelProjectId: process.env.VERCEL_PROJECT_ID || "prj_vdrAvRthiSjkhotfPTXFSV5e1KQW",
	vercelToken: process.env.VERCEL_TOKEN || "",
	vercelJsonPath: "./vercel.reverse-proxy.json",
	deployTargets: [
		{
			type: "userCommands",
			targetCWD: "./",
			outputDirectory: "dist",
			url: domains["09oa"] as unknown as string[],
			userCommands: ["pnpm -C=./ build"],
			watchPaths: [
				".env",
				".env.production",
				"index.html",
				"package.json",
				"public/**",
				"src/**",
				"tsconfig.app.json",
				"tsconfig.json",
				"tsconfig.node.json",
				"types/**",
				"vercel-deploy-tool.config.ts",
				"vercel.reverse-proxy.json",
				"vite.config.ts",
			],
		},
	],
});
