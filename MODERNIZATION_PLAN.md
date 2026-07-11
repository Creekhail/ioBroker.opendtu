# iobroker.opendtu — runtime-compat Fork (Baseline v1.0.1)

**Zweck:** Diesen Adapter lauffähig halten, **ohne die OpenDTU-Geräte-Firmware zu ändern**.

**Warum ein Fork?** Die produktive OpenDTU-Firmware (OpenDTU-Fusion v2, git `736c6c3`, Config 0.1.25, ESP-IDF v4.4.4) ist **älter als v24.2.12** und liefert die **alte Live-API/Websocket-Struktur** (alle Inverter auf einmal). Der offizielle Adapter **≥ 2.0.0 / 3.x** wurde auf die **neue Per-Serial-API (Firmware ≥ 24.2.12)** umgestellt (Issue #129) und ist damit **inkompatibel** zu dieser eingefrorenen Firmware. Version **1.0.1** ist die letzte Version, die zur alten Struktur passt.

**Repo:** `github.com/Creekhail/ioBroker.opendtu` (eigenständiger Fork, selbst verwaltet). **Trunk-Branch: `main`** (abgeleitet vom Tag `v1.0.1`). `upstream` = `iobroker-community-adapters/ioBroker.opendtu` (nur Referenz/Cherry-Pick, **nicht mergen** — zielt auf die neue Firmware-API). Adaptername bleibt `opendtu` (Drop-in).

---

## 🔒 NICHT anfassen (Firmware-Kompatibilitätsschicht)
Änderungen hier brechen die Kompatibilität zur eingefrorenen Firmware **und** verschieben die ioBroker-State-IDs (die in `sql.0` per Alias-ID abgesichert sind — siehe iobroker-skripte-Doku).
- `lib/websocketController.js` — WebSocket-Client + Parsing der **alten** OpenDTU-Livedata-Struktur.
- `lib/dataController.js` — erzeugt die States aus den Livedata (alte Feldzuordnung).
- `lib/stateDefinition.js` — definiert den Objektbaum (`ac.phase_1.*`, `dc.input_N.*`, `power_control.*`, `total.*`). Diese IDs müssen stabil bleiben (Alias-Logging in der DB hängt daran).

## ✅ Erlaubt zu modernisieren (nur Runtime, reaktiv)
Nur nötig, **wenn 1.0.1 auf einem künftigen js-controller/Node tatsächlich bricht**:
- `package.json` → `dependencies` bumpen: `@iobroker/adapter-core`, `axios`, `node-schedule`, `ws` (alle pures JS, keine nativen Module → risikoarm).
- `package.json` → `engines.node` und `io-package.json` → `common.dependencies` (js-controller, aktuell `>=3.3.22`) / `common.globalDependencies` (admin, aktuell `>=5.1.13`) hochsetzen.
- `main.js` → veraltete js-controller-API-Aufrufe ersetzen (die konkrete Deprecation, die dann bricht).
- Tooling: eslint / typescript / `@iobroker/testing` (nur Dev, unkritisch).

## Warum das risikoarm ist
- Nur **3 Laufzeit-Deps + adapter-core**, alle **reines JS** → keine nativen Rebuilds bei neuem Node.
- Admin bereits `jsonConfig` (kein materialize-Umbau nötig).
- adapter-core bereits v3.

## Trigger & Vorgehen (reaktiv)
1. **Nichts tun**, solange 1.0.1 im produktiven ioBroker läuft (aktuell js-controller 7.2.2 / Node 24 — läuft).
2. Bricht es nach einem künftigen Update: Fehler/Stacktrace reproduzieren → **minimalen** Runtime-Fix anwenden (nur die brechende Stelle).
3. **Testen gegen das echte Gerät** (OpenDTU unter `192.168.20.145`): States füllen sich? Speziell prüfen: `ac.phase_1.power`, `dc.input_1..4.power`, `ac.phase_1.{yieldday,yieldtotal,efficiency,power_dc}`, `total.yield*`, `power_control.current_limit_*`.
4. Die 12 in `sql.0` geloggten/alias-geschützten Werte müssen weiter aktualisiert werden.

## Von Upstream profitieren (selektiv cherry-picken, NICHT mergen)
`origin` = eigenes Repo (selbst verwaltet), `upstream` = iobroker-community-adapters (Referenz). **Niemals `upstream/main` mergen** — das zieht den Neue-Firmware-Websocket-Code rein und bricht die alte Firmware. Stattdessen einzeln übernehmen:
```
git fetch upstream
git log --oneline upstream/main
git cherry-pick <sha>
```
Übernehmbar: Dependency-Bumps (`axios`/`ws`/`node-schedule`/`@iobroker/adapter-core`), Security-Fixes, `main.js`-Lifecycle, `lib/tools.js`, allgemeine Bugfixes. **Nicht übernehmen:** Änderungen an `lib/websocketController.js` / `lib/stateDefinition.js` / `lib/dataController.js` (= neue Firmware-API + ID-Struktur).

## Installation des Forks (falls nötig)
Adapter-Name in `io-package.json`/`package.json` bleibt `opendtu` → Drop-in-Ersatz (keine State-ID-Migration). Installation per `iobroker url https://<eigenes-repo>#main` oder lokalem Tarball. **Vorher ioBroker-Backup.** Andere Betroffene beziehen die Version ebenfalls per Git-URL aus dem eigenen Repo (kein npm/keine offizielle Liste nötig).

---
_Baseline erfasst 2026-07-11. Solange die OpenDTU-Firmware eingefroren bleibt, ist 1.0.1 (bzw. dieser Fork) der einzige passende Adapter._
