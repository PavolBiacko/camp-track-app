export type GroupBasic = {
  id: number;
  number: number;
}

export type Group = {
  id: number;
  number: number;
  name: string;
  sessionId: number;
  leaderId: string;
  createdAt: Date;
}

export type GroupCore = {
  number: number;
  name?: string | null;
  sessionId: number;
  leaderId?: string | null;
}

export type GroupFormInputsCore = {
  number: string;
  name?: string | null;
  sessionId: string | null;
  leaderId?: string | null;
}

export type GroupCreate = GroupCore;

export type GroupUpdate = Partial<GroupCore>;

export type GroupCreateFormInputs = GroupFormInputsCore;

export type GroupUpdateFormInputs = Partial<GroupFormInputsCore>;