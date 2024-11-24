/**
 * PpCTaskcompletedDTO
 */
export interface PpCTaskcompletedDTO {
	xactivity?: string;
	xactivityAlias?: string;
	xactivityDescription?: string;
	xactivityName?: string;
	xactivityToken?: string;
	xactivityType?: string;
	xapplication?: string;
	xapplicationAlias?: string;
	xapplicationName?: string;
	xcompleted?: boolean;
	xcompletedTime?: Date;
	xcompletedTimeMonth?: string;
	xcreateTime?: Date;
	xcreatorIdentity?: string;
	xcreatorPerson?: string;
	xcreatorUnit?: string;
	xdistinguishedName?: string;
	xduration?: number;
	xempowerFromIdentity?: string;
	xexpired?: boolean;
	xid?: string;
	xidentity?: string;
	xjob?: string;
	xjoinInquire?: boolean;
	xlabel?: string;
	xlatest?: boolean;
	xopinion?: string;
	xperson?: string;
	xprocess?: string;
	xprocessAlias?: string;
	xprocessingType?: string;
	xprocessName?: string;
	xproperties?: { [key: string]: any };
	xrouteAlias?: string;
	xrouteName?: string;
	xserial?: string;
	xstartTime?: Date;
	xstartTimeMonth?: string;
	xtask?: string;
	xtitle?: string;
	xunit?: string;
	xupdateTime?: Date;
	xviewTime?: Date;
	xwork?: string;
	[property: string]: any;
}
