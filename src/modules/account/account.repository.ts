import { Account, AccountRepository } from "./account.types";

export class InMemoryAccountRepository implements AccountRepository {
  private accounts: Map<string, Account> = new Map();

  async findById(id: string): Promise<Account | null> {
    const account = this.accounts.get(id);
    return account || null;
  }

  async findAll(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }

  async save(account: Account): Promise<Account> {
    this.accounts.set(account.id, account);
    return account;
  }

  async delete(id: string): Promise<boolean> {
    return this.accounts.delete(id);
  }
}
