export type CampSessionBasic = {
  id: number;
}

export type CampSession = {
  id: number;
  beginDate: Date;
  endDate: Date;
  createdAt: Date;
}

export type CampSessionCore = {
  beginDate: string;
  endDate: string;
}

export type CampSessionCreate = CampSessionCore;

export type CampSessionUpdate = Partial<CampSessionCore>;

export type CampSessionCoreWithDates = {
  beginDate?: Date;
  endDate?: Date;
}