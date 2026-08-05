import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const appPath = resolve(root, "assets", "app.js");
const app = (() => {
  try {
    return readFileSync(appPath, "utf8");
  } catch {
    return "";
  }
})();

test("loads the maintainable state-driven prototype", () => {
  assert.match(html, /assets\/app\.js/);
  assert.doesNotMatch(html, /index-DHUyY8lx\.js/);
  assert.ok(app.length > 1000, "assets/app.js should contain the prototype application");
});

test("defines three synthetic cases and the three CMS roles", () => {
  for (const token of [
    "APP-2026-04418",
    "APP-2026-04419",
    "APP-2026-04421",
    "clinic",
    "nurse",
    "doctor",
  ]) {
    assert.ok(app.includes(token), `missing ${token}`);
  }
  assert.doesNotMatch(app, /Underwriter Console|Underwriting workspace/);
});

test("contains the confirmed case-state actions", () => {
  for (const label of [
    "Send to nurse worklist",
    "Resolve requirements",
    "Attach lab results",
    "Handover with pending evidence",
    "Request nurse follow-up",
    "Review, e-sign & submit",
  ]) {
    assert.ok(app.includes(label), `missing action: ${label}`);
  }
});

test("removes detached action palettes and doctor admin utilities", () => {
  for (const banned of [
    "Clinic admin action palette",
    "Clinic admin actions",
    "Doctor actions",
  ]) {
    assert.ok(!app.includes(banned), `detached action remains: ${banned}`);
  }
});

test("ships the 04 Aug 2026 frontend enhancements", () => {
  for (const label of [
    "Doctor Name",
    "View agent details",
    "Schedule / reschedule appointment",
    "Upload supporting documents",
    "View calendar",
    "View pending lab results",
    "Doctor availability",
    "Generate Underwriting Report",
    "View Patient Record",
    "View Pending Tasks",
    "Edit applicant details",
    "Last 7 days",
  ]) {
    assert.ok(app.includes(label), `missing enhancement: ${label}`);
  }
});

test("keeps signing guarded by evidence readiness", () => {
  assert.match(app, /canSignReport/);
  assert.match(app, /missingEvidence\.length\s*===\s*0/);
  assert.match(app, /report sign-off remains blocked/i);
});

test("does not present direct D04 navigation as sign-ready before doctor steps", () => {
  assert.match(app, /reportReady/);
  assert.ok(app.includes("Prior steps required"));
  assert.ok(app.includes("Complete the examination and refresh the report draft before sign-off."));
});

test("keeps Persona and Journey as analysis layers", () => {
  for (const token of [
    "open-persona",
    "select-journey",
    "open-scenario-detail",
    "enter-demo",
    "journeyActions",
    "persona-detail",
    "journey-lanes",
  ]) {
    assert.ok(app.includes(token), `missing ${token}`);
  }
  assert.doesNotMatch(app, /data-action="open-role"/);
});

test("removes the two hero summary counters", () => {
  for (const removed of [
    "studio-hero__facts",
    "Three CMS roles",
    "Three case states",
    "三個 CMS 角色",
    "三種個案狀態",
  ]) {
    assert.ok(!app.includes(removed), `hero summary remains: ${removed}`);
  }
});

test("defines all Persona detail fields and eight Journey triggers", () => {
  for (const label of [
    "Current State",
    "Pain Point",
    "Future Role",
    "Data / Role Boundary",
    "Trigger condition",
  ]) {
    assert.ok(app.includes(label), `missing ${label}`);
  }
  for (const stage of ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08"]) {
    assert.ok(app.includes(stage), `missing ${stage}`);
  }
});

test("ships bilingual labels and avoids ambiguous color-only statuses", () => {
  assert.ok(app.includes("繁體中文"));
  assert.ok(app.includes("下一步"));
  assert.ok(app.includes("Blocking reason"));
  assert.ok(app.includes("阻礙原因"));
  assert.doesNotMatch(app, /[—–]/);
});
