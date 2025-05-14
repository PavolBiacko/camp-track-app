export type GroupAccount = {
  id: number;
  groupId: number;
  childId: string;
  accountBalance: number;
  createdAt: Date;
}

export type GroupAccountCreate = {
  groupId: number;
  childId: string;
}