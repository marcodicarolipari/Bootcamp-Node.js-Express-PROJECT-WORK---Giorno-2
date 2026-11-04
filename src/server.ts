import { env } from "./config/env.js";
import { app } from "./app.js";

console.log("=== Environment ===");
console.log(env);

console.log("\n=== Dependency Wiring ===");
console.log("AccountService:", app.accountService);
console.log("AccountRepository:", app.repo);
console.log("\n✅ Composition root initialized successfully!\n");
