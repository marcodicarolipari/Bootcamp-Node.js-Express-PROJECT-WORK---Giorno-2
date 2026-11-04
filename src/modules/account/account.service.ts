import { Account, AccountRepository, CreateAccountDto, UpdateAccountDto } from "./account.types";
import { randomUUID } from "crypto";

export class AccountService {
  constructor(private readonly repo: AccountRepository) {}

  async getAll(): Promise<Account[]> {
    return this.repo.findAll();
  }

  async getById(id: string): Promise<Account> {
    const account = await this.repo.findById(id);
    if (!account) {
      throw new Error(`Account with id '${id}' not found`);
    }
    return account;
  }

  async create(dto: CreateAccountDto): Promise<Account> {
    const account: Account = {
      id: randomUUID(),
      iban: dto.iban,
      balance: dto.balance,
      type: dto.type,
      status: "ACTIVE",
      ownerId: dto.ownerId,
      createdAt: new Date(),
    };
    return this.repo.save(account);
  }

  async update(id: string, dto: UpdateAccountDto): Promise<Account> {
    const account = await this.getById(id);

    if (dto.balance !== undefined) {
      account.balance = dto.balance;
    }

    if (dto.status !== undefined) {
      account.status = dto.status;
    }

    return this.repo.save(account);
  }

  async delete(id: string): Promise<void> {
    const account = await this.getById(id);
    const deleted = await this.repo.delete(account.id);
    if (!deleted) {
      throw new Error(`Failed to delete account with id '${id}'`);
    }
  }
}
