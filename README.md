# PHKL Future Clinic Scenario Studio

Local static prototype for Prudential Hong Kong clinical management-system discussion.

Current scope after the 4 Aug 2026 workflow audit:

- CMS core users: clinic administrator, nurse / clinical assistant, and contracted doctor
- Underwriter, financial adviser and customer are outside CMS
- IQ is treated as current-state hand-off only unless PHKL confirms additional future-state functions
- Future-state notifications and reschedule links are assumed to be CMS-owned
- Prototype baseline exam: Current Health Assessment
- Preparation advice: fast and do not drink water for 12 hours before the exam
- Health Assessment components: blood sample, height/weight measurement, urine test and ECG
- Nurse attaches lab test results to the digital report package in CMS
- Doctor signs and sends the digital report package to Prudential Hong Kong
- Partner clinic visibility and HNW concierge transport are future notes only, not core prototype roles or flows

The demo uses one shared state across three synthetic cases:

- Case A: complete evidence path
- Case B: Lipids and HbA1c pending, with a Doctor to Nurse follow-up loop
- Case C: identity, consent and preparation blockers that must be resolved before clinical work

The Scenario Studio now keeps four distinct layers:

- Persona cards open read-only role details covering objective, current state, pain point, future role and data / role boundary
- Journey stage selection explains the trigger and the expected Clinic Admin, Nurse and Doctor action at each stage
- The Persona x Journey swimlane links S01-S08 to the relevant scenario analysis
- Scenario detail is the controlled bridge into the role-based operational demo; Persona and Journey interactions do not open a workbench directly

The HTML entry point is `index.html`. For full local interaction, serve this folder through a local static web server and open the resulting local URL.

Frontend enhancements from the 4 Aug 2026 feedback round:

- Every role (Clinic Admin, Nurse / Clinical Assistant, Doctor) lands on a dashboard view
- The readiness worklist includes Doctor Name, Sex and Age columns
- Date and date-range filters (Today, Yesterday, Last 7 days, Last 30 days, custom) drive the dashboard metrics and worklist
- Clinic Admin C03 and Doctor D05 provide a calendar view plus a date picker that lists the doctors available on the selected day
- Doctor D02 captures supplementary customer information, agent fields, booking remarks and patient follow-up details, opens the patient profile and history view, and generates a consolidated Underwriting Report preview with print / save-as-PDF
- Clinic Admin C02 case actions: edit applicant details, view patient profile, view agent details, upload supporting documents, schedule / reschedule appointment, view calendar and view pending lab results
- Nurse N01 is a dashboard worklist with Patient Name, Appointment Time, Examination Package, Status and Missing Requirement columns, status and search filters, and Start Screening, View Patient Record and View Pending Tasks actions
- Appointments outside the three interactive demo cases are deterministically generated synthetic schedule data

All data, names, IDs, outcomes and metrics are synthetic unless otherwise stated.
