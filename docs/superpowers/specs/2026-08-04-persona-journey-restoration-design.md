# PHKL Persona and Journey Restoration Design

Date: 4 Aug 2026  
Status: Approved interaction direction, pending implementation  
Scope: Local HTML prototype only. No deployment.

## 1. Objective

Restore Persona and Journey as distinct analysis layers in the Scenario Studio while preserving the current state-driven Clinic Admin, Nurse and Doctor demo.

The page must communicate four levels in this order:

1. Persona: who participates, what they own and where their responsibility ends.
2. Journey: what condition triggers each stage and what each CMS role does.
3. Scenario: why the moment matters, how the future state works and which prototype screen demonstrates it.
4. Operational workspace: the clickable Case A, B and C workflows.

## 2. Information architecture

### Persona layer

The three core Persona cards remain visible:

- Clinic Administrator
- Nurse / Clinical Assistant
- Contracted Doctor*

Clicking a Persona opens a read-only detail modal. It must not navigate directly to a role workspace.

The modal contains:

- Objective
- Current State
- Pain Point
- Future Role
- Data / Role Boundary

Supporting and boundary roles remain secondary. If clicked, they open a shorter read-only boundary modal. They do not enter the CMS workspace.

### Journey layer

The Journey section contains three connected views:

1. Eight-stage selector.
2. Selected-stage responsibility panel showing trigger condition and role actions.
3. Persona by Journey swimlane matrix with compact action labels and Scenario links.

Selecting a Journey stage:

- highlights the stage;
- updates the trigger and role-action panel;
- filters the Scenario section to the matching Scenario;
- does not open the operational workspace.

Clicking an S01-S08 link inside the swimlane opens the corresponding Scenario detail modal.

### Scenario layer

Scenario cards remain the third layer.

Clicking a Scenario opens a read-only detail modal with:

- Current State
- Pain Point
- Trigger
- Future State
- Role actions
- KPI or measurement intent
- Evidence or assumption basis
- Data / Role Boundary

Core Scenarios include an Enter Demo action. This is one of only two ways to enter a role workspace. The other is the main Open Demo button.

## 3. Journey responsibility model

| Stage | Trigger condition | Clinic Administrator | Nurse / Clinical Assistant | Contracted Doctor | Scenario |
|---|---|---|---|---|---|
| J01 Booking sync | CMS receives applicant identity, appointment date, time and location from the confirmed upstream integration. | Review the new booking and check that the minimum booking fields arrived. Route integration exceptions for correction. | No active task. | No active task. | S01 |
| J02 Confirm and prepare | A booking has been accepted and customer confirmation or preparation communication is due. | Monitor confirmation, approved preparation advice, reschedule requests and logistics notifications. Resolve communication exceptions. | No active task unless clinical preparation wording needs clarification. | No active task. | S02 |
| J03 Admin readiness | The appointment is approaching or a readiness field is incomplete. | Validate identity, consent, location and preparation. Resolve blockers. Send only an admin-ready case to the Nurse worklist. | Accept the routed case. Do not start screening if an admin blocker remains. | The case is not available as ready for examination. | S03 |
| J04 Nurse assessment | The applicant has arrived and the case is admin-ready in the Nurse worklist. | Handle logistics exceptions only. Do not edit clinical evidence. | Start screening, record height, weight, vitals, urine and ECG status, and keep missing evidence visible. | No active task until Nurse handover. | S04 |
| J05 Doctor examination | Nurse screening is complete and the case has been handed over, with any pending evidence clearly flagged. | No clinical action. | Complete handover and respond to evidence follow-up requests. | Review applicant context and Nurse evidence. Complete and save structured examination findings. | S05 |
| J06 Evidence package | Doctor findings are saved or mandatory laboratory results are still pending. | No clinical action. | Attach Lipids, HbA1c and other required laboratory results when available. | Review or refresh the report draft. If evidence is incomplete, request Nurse follow-up. Do not sign. | S06 |
| J07 PHKL submission | Findings and report draft are complete and all mandatory evidence is attached. | View completion status only. | Confirm requested evidence has been attached. | Review the final package, e-sign, lock the record and submit it to the PHKL review platform. | S07 |
| J08 Measure | Operational events have accumulated and a pilot or service review is due. | Review readiness, reschedule and no-show measures. | Review assessment throughput, evidence completeness and follow-up ageing. | Review examination-to-report and sign-off turnaround. | S08 |

## 4. Persona content model

### Clinic Administrator

- Objective: Keep each appointment operationally ready from booking receipt to Nurse routing.
- Current State: Receives booking hand-off and coordinates appointment readiness across disconnected communications and manual checks.
- Pain Point: Missing identity, consent or preparation details can remain unclear until the applicant arrives.
- Future Role: Own readiness triage, resolve administrative blockers and route only ready cases to the Nurse worklist.
- Boundary: May manage identity and logistics. Cannot change clinical evidence, doctor findings or signed reports.

### Nurse / Clinical Assistant

- Objective: Complete screening, maintain evidence status and hand over a transparent clinical package.
- Current State: Captures screening evidence while laboratory attachments and handover status can remain fragmented.
- Pain Point: Missing evidence can delay the report or be discovered late in doctor review.
- Future Role: Triage the worklist, record structured screening evidence, attach laboratory results and respond to doctor follow-up.
- Boundary: May capture and attach evidence. Cannot diagnose, sign the doctor report or make PHKL review decisions.

### Contracted Doctor*

- Objective: Own the clinical examination, report content and final signed package.
- Current State: Reviews clinic information, manually prepares the report and manually sends it onward.
- Pain Point: Manual preparation makes evidence completeness and submission status harder to control.
- Future Role: Review Nurse evidence, complete findings, control the report draft, request follow-up and sign only a complete package.
- Boundary: Owns clinical content and sign-off. AI cannot diagnose, sign or alter a locked record.

## 5. Interaction rules

- Persona card click opens the Persona modal only.
- Supporting-role click opens a boundary modal only.
- Journey stage click selects and filters. It does not open a modal or workspace.
- Swimlane S01-S08 click opens the Scenario modal.
- Scenario card click opens the Scenario modal.
- Enter Demo opens the mapped role and screen.
- Open Demo opens Clinic Admin C01.
- Close and Escape dismiss an open modal and return focus to the invoking control.
- Modals are read-only and contain no editable form controls.

## 6. Visual and responsive behavior

- Preserve the current white, regulated B2B visual language.
- Persona cards retain the existing photography and three-column desktop layout.
- Journey stage selector remains compact and horizontally scrollable when needed.
- The responsibility panel appears below the stage selector.
- The swimlane uses concise action labels. Detailed trigger and action text belongs in the selected-stage panel.
- Tablet and mobile layouts may horizontally scroll the Journey matrix without creating document-level overflow.
- Status and responsibility must not rely on color alone.

## 7. Content and scope controls

- English and Traditional Chinese must cover Persona modals, Journey stages, trigger descriptions, role actions and Scenario modals.
- All personal, medical, operational and KPI data remains synthetic or marked with `*` where illustrative.
- Financial Adviser and Applicant remain outside the clickable CMS workspace.
- PHKL review remains downstream and outside CMS.
- Persona and Journey content must not reintroduce Underwriter as a CMS user.

## 8. Verification criteria

- Each of the three core Persona cards opens the correct read-only modal.
- No Persona card directly enters the operational workspace.
- All eight Journey stages update the selected-stage responsibility panel.
- Each stage shows a trigger plus explicit Admin, Nurse and Doctor actions or states that there is no active task.
- Every swimlane Scenario link opens the correct S01-S08 detail modal.
- Enter Demo opens the correct mapped role and screen.
- Scenario filtering and the operational Case A, B and C state remain intact.
- English and Traditional Chinese versions contain no missing key labels.
- Keyboard focus, Escape-to-close, responsive tablet layout and browser console checks pass.

## 9. Self-review

- No placeholders or unresolved design choices remain.
- Persona, Journey, Scenario and operational workspace have separate responsibilities.
- The eight-stage matrix aligns with the current state-driven workflow.
- The design preserves the latest confirmed role boundary and does not broaden CMS scope.
