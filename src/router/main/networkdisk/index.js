import { iconPropType } from "element-plus/es/utils/index.mjs";
import path from "path";

// import {iii0} from '@/components/main/networkdisk/Alltask.vue'

export default [
	{
		path: "/networkdisk",
		component: () => import("@/views/main/networkdisk/NetworkDisk.vue"),
		redirect: "/networkdisk/alltask",
		children: [
			{
				path: "/networkdisk/alltask",
				component: () => import("@/components/main/networkdisk/Alltask.vue"),
			},
			{
				path: "/networkdisk/picture",
				component: () => import("@/components/main/networkdisk/Picture.vue"),
			},
			{
				path: "/networkdisk/video",
				component: () => import("@/components/main/networkdisk/Video.vue"),
			},
			{
				path: "/networkdisk/documentation",
				component: () => import("@/components/main/networkdisk/Documentation.vue"),
			},
			{
				path: "/networkdisk/music",
				component: () => import("@/components/main/networkdisk/Music.vue"),
			},
			{
				path: "/networkdisk/addiyional",
				component: () => import("@/components/main/networkdisk/Additional.vue"),
			},
			{
				path: "/networkdisk/share",
				component: () => import("@/components/main/networkdisk/Share.vue"),
				redirect: "/networkdisk/share/myshare",
				children: [
					{
						path: "/networkdisk/share/myshare",
						component: () => import("@/components/main/networkdisk/Myshare.vue"),
					},
					{
						path: "/networkdisk/share/othershare",
						component: () => import("@/components/main/networkdisk/Othershare.vue"),
					},
				],
			},
			{
				path: "/networkdisk/recycle",
				component: () => import("@/components/main/networkdisk/Recycle.vue"),
			},
		],
	},
];
