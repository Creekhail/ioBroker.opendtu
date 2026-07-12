![Logo](admin/opendtu.png)
# ioBroker.opendtu

[![License](https://img.shields.io/github/license/Creekhail/ioBroker.opendtu)](LICENSE)
[![Last commit](https://img.shields.io/github/last-commit/Creekhail/ioBroker.opendtu)](https://github.com/Creekhail/ioBroker.opendtu/commits/main)
![Base](https://img.shields.io/badge/base-official%20v1.0.1-blue)
![OpenDTU firmware](https://img.shields.io/badge/OpenDTU%20firmware-%3C%2024.2.12-orange)

> ⚠️ **Fork notice — legacy-firmware variant.**
> Standalone fork of [ioBroker.opendtu](https://github.com/iobroker-community-adapters/ioBroker.opendtu),
> maintained by [@Creekhail](https://github.com/Creekhail), based on the official **v1.0.1**.
>
> **Why:** Since OpenDTU firmware **v24.2.12** the live API changed (inverters must be queried per
> serial) and the official adapter **≥ 2.0.0** was rewritten for it. This fork keeps compatibility with
> **older OpenDTU firmware (< 24.2.12)** for setups that deliberately stay on a stable, frozen firmware.
> Adapter name stays `opendtu` (drop-in replacement).
>
> **Install:** `iobroker url https://github.com/Creekhail/ioBroker.opendtu#main`
> Maintenance scope & upstream cherry-pick policy: see [`MODERNIZATION_PLAN.md`](MODERNIZATION_PLAN.md).

## opendtu adapter for ioBroker

This adapter get the data points from the project [OpenDTU](https://github.com/tbnobody/OpenDTU) available in real time.  
In addition, the following data points can be used via the adapter to the power limitation of the OpenDTU can be controlled.

```
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_absolute
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_relative
- opendtu.0.xxxxxx.power_control.limit_persistent_absolute
- opendtu.0.xxxxxx.power_control.limit_persistent_relative  
```
For more information on the data points, see their description or click [here](https://github.com/tbnobody/OpenDTU/blob/master/docs/MQTT_Topics.md#inverter-limit-specific-topics).

## Configuration

1. Create a new instance of the adapter
2. Fill in Scheme *(default http)*, WebUi-Address and WebUi-port *(default 80)* of the [OpenDTU](https://github.com/tbnobody/OpenDTU) hardware 
3. Set the WebUi-Password **(this is mandatory, if it is incorrect no limit can be set!)**
4. Save the settings

## Changelog
<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release major -- -p iobroker license --all 0.9.8 -> 1.0.0
    npm run release minor -- -p iobroker license --all 0.9.8 -> 0.10.0
    npm run release patch -- -p iobroker license --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- -p iobroker license --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-07-12)

- (Creekhail) Standalone legacy-firmware fork: keeps compatibility with older OpenDTU firmware (< 24.2.12); adapter name stays `opendtu` (drop-in replacement)
- (Creekhail) Modernized runtime dependencies: @iobroker/adapter-core 3.4, axios 1.18, ws 8.21
- (Creekhail) Modernized dev tooling: eslint flat config + @iobroker/eslint-config + prettier, @iobroker/testing 5, TypeScript 5.9, @tsconfig/node20
- (Creekhail) CI on Node.js 20/22/24 (requires Node.js >= 20), codeql-action v3; removed stale-bot and dependabot auto-merge automation
- (Creekhail) No functional changes — adapter behavior and state IDs unchanged

### 1.0.1 (2023-10-29)

- (o0shojo0o) fixed `power_control.current_limit_absolute" has value "-1" less than min "0"`

### 1.0.0 (2023-10-01)

- (o0shojo0o) Increase to the first major release, as it has now reached a stable level. 
- (o0shojo0o) added yieldtotal Protection against incorrect zeroing when the OpenDTU restarts if the inverter is not accessible
- (o0shojo0o) added option `Set the states to 0 if the inverter is not accessible.` ([#97](https://github.com/o0shojo0o/ioBroker.opendtu/issues/97))

### 0.1.8 (2023-09-22)

- (o0shojo0o) added option `Protect self-set names from being overwritten by the adapter` ([#76](https://github.com/o0shojo0o/ioBroker.opendtu/issues/76))
- (o0shojo0o) allow multiple AdminTabs for multiple instances ([#88](https://github.com/o0shojo0o/ioBroker.opendtu/issues/88))
- (o0shojo0o) fixed password with special characters ([#35](https://github.com/o0shojo0o/ioBroker.opendtu/issues/35))
- (o0shojo0o) fixed incorrect handling of zeroing of `yield*` data points by OpenDTU ([#96](https://github.com/o0shojo0o/ioBroker.opendtu/issues/96))
- (o0shojo0o) remove zeroing of `yield*` data points by this adapter ([#96](https://github.com/o0shojo0o/ioBroker.opendtu/issues/96))

### 0.1.7 (2023-06-30)

- (o0shojo0o) workaround for incorrectly used button data point

### 0.1.6 (2023-06-30)

- (o0shojo0o) fixed power control (power_off)

### 0.1.5 (2023-05-15)

- (o0shojo0o) code optimizations

### 0.1.4 (2023-03-23)

- (o0shojo0o) fixed power control `on`, `off`, `restart`
- (o0shojo0o) support for password protected liveview
- (o0shojo0o) other small fixes

### 0.1.2 (2023-03-03)

- (o0shojo0o) fixed yield* values

### 0.1.1 (2023-02-24)

- (o0shojo0o) state rolls corrected
- (o0shojo0o) add DTU datapoint `rssi` and `ip`
- (o0shojo0o) repeated writing of the yieldtotal set to 00:01:00. (is necessary for e.g. sourceanalytix)

### 0.1.0 (2023-02-17)

- (o0shojo0o) initial release

## License
MIT License

Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
