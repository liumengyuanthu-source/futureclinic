# Persona and Journey Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore read-only Persona detail interaction and an eight-stage, role-specific Journey analysis layer without weakening the state-driven Clinic Admin, Nurse and Doctor demo.

**Architecture:** Extend the existing vanilla JavaScript state and renderer in `assets/app.js`. Keep one application entry point, add a selected Journey stage and modal types to shared state, and render Persona, Journey and Scenario analysis as read-only overlays. Add only scoped CSS overrides in `assets/prototype-v2.css` and extend the existing Node contract tests.

**Tech Stack:** Static HTML, vanilla JavaScript, CSS Grid, Node built-in test runner, local in-app browser QA.

## Global Constraints

- Local HTML prototype only. Do not deploy.
- Leave Git changes uncommitted unless the user explicitly requests a commit.
- Persona cards open read-only detail modals and never enter a workspace.
- Journey stage selection updates trigger and role actions, and filters Scenarios.
- Only Open Demo and Scenario Enter Demo may enter the operational workspace.
- Preserve the current Case A, B and C state model.
- English and Traditional Chinese must cover all new content.
- Applicant, Financial Adviser and PHKL review remain outside clickable CMS role workspaces.
- Use synthetic or clearly marked illustrative data only.
- Do not use em dash or en dash characters in visible copy.

---

### Task 1: Lock the interaction contract with failing tests

**Files:**
- Modify: `tests/prototype-contract.test.mjs`

**Interfaces:**
- Consumes: source strings from `index.html` and `assets/app.js`.
- Produces: contract checks for `open-persona`, `select-journey`, `open-scenario-detail`, `enter-demo`, `journeyActions`, `persona-detail` and `journey-lanes`.

- [ ] **Step 1: Add failing Persona and Journey contract tests**

```js
test("keeps Persona and Journey as analysis layers", () => {
  for (const token of [
    "open-persona",
    "select-journey",
    "open-scenario-detail",
    "enter-demo",
    "journeyActions",
    "persona-detail",
    "journey-lanes",
  ]) assert.ok(app.includes(token), `missing ${token}`);
  assert.doesNotMatch(app, /data-action="open-role"/);
});

test("defines all Persona detail fields and eight Journey triggers", () => {
  for (const label of ["Current State", "Pain Point", "Future Role", "Data / Role Boundary", "Trigger condition"]) {
    assert.ok(app.includes(label), `missing ${label}`);
  }
  for (const stage of ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08"]) {
    assert.ok(app.includes(stage), `missing ${stage}`);
  }
});
```

- [ ] **Step 2: Run the tests and confirm the new tests fail**

Run: `node --test tests/prototype-contract.test.mjs`

Expected: existing tests pass; new Persona/Journey tests fail because the restored interactions do not exist yet.

### Task 2: Restore the Persona read-only detail layer

**Files:**
- Modify: `assets/app.js:215-245`
- Modify: `assets/app.js:321-351`
- Modify: `assets/app.js:573-592`
- Modify: `assets/app.js:609-683`
- Modify: `assets/prototype-v2.css`

**Interfaces:**
- Consumes: `personas`, `contextRoles`, shared `state.modal`, existing `renderModal()` and `button()` helpers.
- Produces: `data-action="open-persona"`, modal type `persona`, and read-only `.persona-detail` content.

- [ ] **Step 1: Expand each core Persona record**

Add bilingual `objective`, `currentState`, `painPoint`, `futureRole` and `boundary` fields using the approved design specification.

- [ ] **Step 2: Convert core Persona cards to informational triggers**

Render each card with:

```html
<button type="button" class="persona-card" data-action="open-persona" data-persona="doctor">
```

Keep the image, name and concise objective. Remove direct role/workspace navigation.

- [ ] **Step 3: Add a read-only Persona modal**

`renderModal()` must render these sections in order:

```text
Objective
Current State
Pain Point
Future Role
Data / Role Boundary
```

Supporting roles use their treatment and boundary only. No inputs, editable fields or workspace CTA appear in this modal.

- [ ] **Step 4: Add Persona modal styling**

Use `.persona-detail`, `.persona-detail__visual`, `.persona-detail__content` and `.persona-detail__boundary`. Preserve the white page, muted teal accent and existing radius system. Collapse to one column below 760px.

- [ ] **Step 5: Run contract tests**

Run: `node --test tests/prototype-contract.test.mjs`

Expected: Persona-specific assertions pass. Journey-specific assertions may still fail.

### Task 3: Restore Journey selection, responsibility panel and swimlane

**Files:**
- Modify: `assets/app.js:246-320`
- Modify: `assets/app.js:321-351`
- Modify: `assets/app.js:573-592`
- Modify: `assets/app.js:609-683`
- Modify: `assets/prototype-v2.css`

**Interfaces:**
- Consumes: `journey`, `scenarios`, `personas`, `state.selectedJourney`.
- Produces: `journeyActions`, `renderJourney()`, `data-action="select-journey"`, and `data-action="open-scenario-detail"`.

- [ ] **Step 1: Extend stage and Scenario data**

Each Journey stage receives bilingual `trigger` and role actions:

```js
const journeyActions = {
  J03: {
    trigger: copy("The appointment is approaching or a readiness field is incomplete.", "預約將近或準備欄位尚未完成。"),
    clinic: copy("Validate identity, consent, location and preparation. Resolve blockers and route only a ready case.", "核實身份、同意、地點及準備狀態。處理阻礙，只轉交準備妥當的個案。"),
    nurse: copy("Accept the routed case. Do not start screening while an admin blocker remains.", "接收已轉交個案。行政阻礙未解決前不可開始篩查。"),
    doctor: copy("The case is not available as ready for examination.", "個案不會以可檢查狀態出現在醫生工作清單。"),
    scenario: "S03",
  },
};
```

Populate J01-J08 exactly as defined in the approved specification.

Each Scenario receives bilingual or existing values for `currentState`, `painPoint`, `trigger`, `futureState`, `kpi`, `evidence` and `boundary`.

- [ ] **Step 2: Add selected Journey state**

Initial state:

```js
selectedJourney: "J01",
```

`select-journey` updates this value and rerenders. It must not navigate to a workspace.

- [ ] **Step 3: Render the selected-stage responsibility panel**

Show:

- Trigger condition
- Clinic Administrator action
- Nurse / Clinical Assistant action
- Contracted Doctor action

Each role panel uses explicit text such as `No active task` where applicable.

- [ ] **Step 4: Render the Persona by Journey swimlane**

Rows: Clinic Administrator, Nurse / Clinical Assistant, Contracted Doctor.  
Columns: J01-J08.  
Cells: compact role action label plus S01-S08 button only when the role participates in the stage.

Scenario buttons use:

```html
<button type="button" data-action="open-scenario-detail" data-scenario="S05">S05</button>
```

- [ ] **Step 5: Filter Scenario cards by selected stage**

When a stage is selected, show the matching Scenario first and provide a visible `Show all scenarios` control. Selecting `all` restores S01-S08.

- [ ] **Step 6: Add responsive Journey styling**

Keep the stage selector horizontally scrollable. Wrap the swimlane in its own horizontal scroll container with a stable minimum internal width. Ensure `documentElement.scrollWidth === innerWidth` at 1024px and 720px.

- [ ] **Step 7: Run contract tests**

Run: `node --test tests/prototype-contract.test.mjs`

Expected: all contract tests pass.

### Task 4: Restore Scenario detail interaction and controlled Demo entry

**Files:**
- Modify: `assets/app.js:257-320`
- Modify: `assets/app.js:573-592`
- Modify: `assets/app.js:609-683`
- Modify: `assets/prototype-v2.css`

**Interfaces:**
- Consumes: Scenario record selected by `state.modal.scenarioId`.
- Produces: modal type `scenario`, `data-action="enter-demo"`, and role/screen mapping from the Scenario record.

- [ ] **Step 1: Change Scenario card clicks**

Scenario cards open `state.modal = { type: "scenario", scenarioId }`. They do not enter the workspace directly.

- [ ] **Step 2: Render the Scenario detail modal**

Show the approved fields in a read-only sequence and retain the Scenario image. Add `Enter Demo` only when the Scenario has a mapped role and screen.

- [ ] **Step 3: Implement controlled Demo entry**

`enter-demo` closes the modal and calls `navigate(scenario.role, scenario.screen)`. No other Persona or Journey action calls `navigate()`.

- [ ] **Step 4: Add Escape close and focus return**

Track the invoking element before opening a modal. On Close or Escape, clear the modal, rerender and focus the corresponding Persona, Journey Scenario link or Scenario card.

- [ ] **Step 5: Run syntax and contract tests**

Run:

```bash
node --check assets/app.js
node --test tests/prototype-contract.test.mjs
```

Expected: syntax valid; all tests pass.

### Task 5: Complete bilingual, responsive and interaction QA

**Files:**
- Modify: `assets/app.js`
- Modify: `assets/prototype-v2.css`
- Modify: `README.md`
- Modify: `outputs/prototype_revision_backlog_20260804/PHKL_CMS_Prototype_Revision_Backlog.md`

**Interfaces:**
- Consumes: finished local prototype.
- Produces: verified English and Traditional Chinese Persona, Journey and Scenario analysis layers.

- [ ] **Step 1: Run content checks**

Run:

```bash
rg -n '[—–]' index.html assets/app.js assets/prototype-v2.css
node --test tests/prototype-contract.test.mjs
node --check assets/app.js
```

Expected: no visible em dash or en dash in loaded files; all tests pass.

- [ ] **Step 2: Verify Persona interaction in the browser**

For Clinic Admin, Nurse and Doctor:

- click the Persona card;
- confirm the five approved sections;
- confirm no editable control and no workspace navigation;
- close with the button and Escape;
- verify focus return.

- [ ] **Step 3: Verify all Journey stages**

For J01-J08:

- select the stage;
- confirm the trigger text;
- confirm all three role actions;
- click the corresponding S link in the swimlane;
- confirm the correct Scenario modal.

- [ ] **Step 4: Verify Demo entry and workflow preservation**

- confirm Open Demo opens Clinic Admin C01;
- confirm Scenario Enter Demo opens its mapped role and screen;
- confirm Case B evidence follow-up and Case C admin-blocker flows remain functional.

- [ ] **Step 5: Verify Traditional Chinese and responsive layouts**

- toggle Traditional Chinese and inspect Persona, Journey, swimlane and Scenario modal content;
- test desktop, 1024px tablet and 720px mobile widths;
- confirm no document-level horizontal overflow;
- confirm browser console contains no errors or warnings.

- [ ] **Step 6: Update local documentation**

Record that Persona and Journey analysis layers were restored and that no deployment occurred.

- [ ] **Step 7: Review the local diff and leave it uncommitted**

Run: `git status --short`

Expected: only the intended prototype, tests and local documentation are changed. Do not commit or push.
