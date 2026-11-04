export type AccountType = "CHECKING" | "SAVINGS" | "BUSINESS";
export type AccountStatus = "ACTIVE" | "BLOCKED" | "CLOSED";

export interface Account {
  id: string;
  iban: string;
  balance: number;
  type: AccountType;
  status: AccountStatus;
  ownerId: string;
  createdAt: Date;
}

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
  save(account: Account): Promise<Account>;
  delete(id: string): Promise<boolean>;
}

export interface CreateAccountDto {
  iban: string;
  balance: number;
  type: AccountType;
  ownerId: string;
}

export interface UpdateAccountDto {
  balance?: number;
  status?: AccountStatus;
}
