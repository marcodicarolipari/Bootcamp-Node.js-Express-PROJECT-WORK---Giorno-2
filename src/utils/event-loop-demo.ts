/*
 * Event Loop Demo - Node.js Task Queue Priority
 * 
 * Output osservato: 1, 5, 3, 4, 2
 * 
 * Spiegazione dell'ordine di esecuzione in Node.js:
 * 
 * PHASE 1 - Call Stack (Codice Sincrono)
 * ========================================
 * ✅ OUTPUT: 1, 5
 * - console.log("1")     → 1
 * - console.log("5")     → 5
 * Il codice sincrono è SEMPRE eseguito per primo.
 * Call Stack si svuota completamente prima di controllare le code asincrone.
 * 
 * PHASE 2 - Microtask Queue (priorità ALTA)
 * ==========================================
 * ✅ OUTPUT: 3
 * - Promise.resolve().then(() => console.log("3"))
 * Le Promise (microtask) vengono eseguite DOPO il Call Stack ma
 * PRIMA di nextTick e macrotask, quando il libuv event loop
 * controlla il check phase.
 * 
 * PHASE 3 - nextTick Queue
 * ========================
 * ✅ OUTPUT: 4
 * - process.nextTick(() => console.log("4"))
 * nextTick viene eseguito DOPO le microtask nel check phase di libuv.
 * La priorità varia a seconda della fase del libuv event loop.
 * 
 * PHASE 4 - Macrotask Queue (priorità BASSA)
 * ===========================================
 * ✅ OUTPUT: 2
 * - setTimeout(() => console.log("2"), 0)
 * setTimeout è un macrotask (Timers phase in libuv).
 * Viene eseguito DOPO tutte le microtask e il check phase,
 * anche con delay 0ms.
 * 
 * ORDINE EFFETTIVO DI PRIORITÀ (dall'alto al basso):
 * 1. Call Stack (codice sincrono)
 * 2. Microtask Queue (Promise, async/await, queueMicrotask)
 * 3. nextTick Queue (process.nextTick)
 * 4. Macrotask Queue (setTimeout, setInterval, setImmediate)
 * 
 * NOTA: libuv event loop Node.js:
 * - Timers → I/O callbacks → Check → Close callbacks
 * - Tra ogni fase vengono controllate microtask E nextTick
 * - L'ordine esatto dipende dalla fase corrente
 */

console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
process.nextTick(() => console.log("4"));
console.log("5");
