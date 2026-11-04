import { InMemoryAccountRepository } from "./modules/account/account.repository";
import { AccountService } from "./modules/account/account.service";

// ===== COMPOSITION ROOT =====
// Istanziazione manuale delle dipendenze
const repo = new InMemoryAccountRepository();
const accountService = new AccountService(repo);

// Esporta l'app object con le dipendenze
export const app = {
  accountService,
  repo,
};
