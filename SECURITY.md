# Security Policy

This policy covers **the VoltageOS website only** — this repository and the site it
deploys. Issues in the ROM, kernel, firmware, or OTA infrastructure belong in the
relevant platform repositories of the VoltageOS organisation, not here.

## Supported versions

There are no releases. Only the currently deployed site is supported; fixes land on
the default branch and ship with the next deploy.

## Reporting a vulnerability

Open a private report through GitHub Security Advisories:

https://github.com/ZirgomHaidar/VoltageOS-Website/security/advisories/new

The project publishes no security email. Use the advisory form for anything
sensitive — do not disclose it in a public issue first. For non-sensitive findings
(a stale dependency, a missing header, a hardening suggestion) a public issue is
fine and usually faster.

## In scope

- The website: pages, client-side code, routing, forms, third-party embeds
- Build and deploy configuration in this repository
- This repository's dependency tree, including transitive packages

## Out of scope

- The VoltageOS ROM itself, and any device firmware
- The upstream OTA feed repositories this site reads from
- The websites and infrastructure of the download mirrors we link to
- Findings that require a compromised browser, extension, or client machine
- Automated scanner output with no demonstrated impact

## What to expect

This is a volunteer-maintained project, so there is no guaranteed response time.
Reports are read and triaged as maintainers are available. Expect an
acknowledgement within a few days and a status update once the report has been
assessed. Credit in the fix commit or advisory on request.
