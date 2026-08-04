const root = document.querySelector("#root");

const copy = (en, zh) => ({ en, zh });
const text = (value) => typeof value === "string" ? value : value[state.locale];

const roleConfig = {
  clinic: {
    name: copy("Clinic Admin", "診所行政"),
    subtitle: copy("CLINIC ADMIN", "診所行政"),
    actor: copy("Clinic Admin", "診所行政人員"),
    defaultScreen: "C01",
    screens: [
      ["C01", copy("Readiness queue", "準備狀態清單")],
      ["C02", copy("Appointment readiness", "預約準備狀態")],
    ],
  },
  nurse: {
    name: copy("Nurse Console", "護士工作台"),
    subtitle: copy("NURSE / CLINICAL ASSISTANT", "護士／臨床助理"),
    actor: copy("Nurse K. Tsang", "護士 K. Tsang"),
    defaultScreen: "N01",
    screens: [
      ["N01", copy("Worklist", "工作清單")],
      ["N02", copy("Screening", "篩查")],
      ["N03", copy("Handover", "交接")],
    ],
  },
  doctor: {
    name: copy("Doctor Workbench", "醫生工作台"),
    subtitle: copy("DOCTOR", "醫生"),
    actor: copy("Dr H. Pang", "H. Pang 醫生"),
    defaultScreen: "D01",
    screens: [
      ["D01", copy("Clinical queue", "臨床清單")],
      ["D02", copy("Examination", "臨床檢查")],
      ["D03", copy("Report draft", "報告草稿")],
      ["D04", copy("Review and submit", "審閱及提交")],
    ],
  },
  operations: {
    name: copy("Operations", "營運衡量"),
    subtitle: copy("MEASUREMENT", "衡量"),
    actor: copy("Operations", "營運團隊"),
    defaultScreen: "O01",
    screens: [["O01", copy("Measurement", "營運衡量")]],
  },
};

const syntheticLabs = (pending = false) => [
  {
    label: copy("Lipids", "血脂"),
    value: pending ? copy("Pending", "待完成") : copy("Within reference range*", "參考範圍內*"),
    source: pending ? "LAB-8821*" : copy("Synthetic lab result*", "模擬化驗結果*"),
    state: pending ? "missing" : "verified",
  },
  {
    label: copy("HbA1c", "糖化血紅素"),
    value: pending ? copy("Pending", "待完成") : copy("Within reference range*", "參考範圍內*"),
    source: pending ? "LAB-8821*" : copy("Synthetic lab result*", "模擬化驗結果*"),
    state: pending ? "missing" : "verified",
  },
];

const makeAudit = (caseKey) => [
  {
    id: `${caseKey}-01`,
    at: "27 Jul 2026 09:02*",
    actor: copy("PruForce integration*", "PruForce 整合層*"),
    action: copy("Booking received", "已接收預約"),
    detail: copy("Identity, date, time and location were received by CMS.", "CMS 已接收身份、日期、時間及地點。"),
  },
];

const initialCases = {
  A: {
    key: "A",
    caseId: "APP-2026-04418",
    applicant: "Wong Mei Ling",
    appointment: "09:20",
    clinic: copy("Tsim Sha Tsui", "尖沙咀"),
    examType: copy("Current Health Assessment", "現行健康評估"),
    ageSex: copy("41 · Female", "41 歲 · 女"),
    product: copy("Life + Critical Illness*", "人壽及危疾*"),
    sumBand: copy("Tier 3*", "第 3 級*"),
    identity: copy("Matched", "已核對"),
    consent: copy("Signed", "已簽署"),
    questionnaire: copy("Complete", "已完成"),
    preparation: copy("Confirmed", "已確認"),
    adminBlockers: [],
    adminReady: true,
    nurseReady: false,
    screeningComplete: false,
    handoverComplete: false,
    findingsSaved: false,
    draftGenerated: false,
    followUpRequested: false,
    reportSigned: false,
    missingEvidence: [],
    labs: syntheticLabs(false),
    vitals: {
      heightWeight: "163 cm · 58.4 kg*",
      bmi: "21.9*",
      bloodPressure: "134 / 84*",
      pulse: "76 bpm*",
      urine: copy("Clear*", "正常*"),
      ecg: copy("Completed · no alert*", "已完成 · 無警示*"),
    },
    findings: {
      appearance: copy("Unremarkable*", "無明顯異常*"),
      cardiovascular: copy("Normal heart sounds*", "心音正常*"),
      respiratory: copy("Clear on auscultation*", "聽診清晰*"),
      abdomen: copy("Soft, non-tender*", "柔軟、無壓痛*"),
      remarks: copy("No material clinical concern identified in this synthetic case.", "此模擬個案未發現重大臨床問題。"),
    },
    audit: makeAudit("A"),
  },
  B: {
    key: "B",
    caseId: "APP-2026-04419",
    applicant: "Leung Chi Ho",
    appointment: "09:40",
    clinic: copy("Tsim Sha Tsui", "尖沙咀"),
    examType: copy("Current Health Assessment", "現行健康評估"),
    ageSex: copy("46 · Male", "46 歲 · 男"),
    product: copy("Life + Critical Illness*", "人壽及危疾*"),
    sumBand: copy("Tier 3*", "第 3 級*"),
    identity: copy("Matched", "已核對"),
    consent: copy("Signed", "已簽署"),
    questionnaire: copy("Complete", "已完成"),
    preparation: copy("Confirmed", "已確認"),
    adminBlockers: [],
    adminReady: true,
    nurseReady: false,
    screeningComplete: false,
    handoverComplete: false,
    findingsSaved: false,
    draftGenerated: false,
    followUpRequested: false,
    reportSigned: false,
    missingEvidence: ["Lipids", "HbA1c"],
    labs: syntheticLabs(true),
    vitals: {
      heightWeight: "174 cm · 76.1 kg*",
      bmi: "25.1*",
      bloodPressure: "142 / 90*",
      pulse: "82 bpm*",
      urine: copy("Clear*", "正常*"),
      ecg: copy("Completed · review advised*", "已完成 · 建議審閱*"),
    },
    findings: {
      appearance: copy("Unremarkable*", "無明顯異常*"),
      cardiovascular: copy("Normal heart sounds*", "心音正常*"),
      respiratory: copy("Clear on auscultation*", "聽診清晰*"),
      abdomen: copy("Soft, non-tender*", "柔軟、無壓痛*"),
      remarks: copy("Repeat blood pressure remains borderline. Laboratory evidence is required before report sign-off.", "重複量度後血壓仍處於臨界水平。報告簽署前需要化驗證據。"),
    },
    audit: makeAudit("B"),
  },
  C: {
    key: "C",
    caseId: "APP-2026-04421",
    applicant: "Ho Wing Yan",
    appointment: "10:20",
    clinic: copy("Tsim Sha Tsui", "尖沙咀"),
    examType: copy("Current Health Assessment + ECG", "現行健康評估及心電圖"),
    ageSex: copy("38 · Female", "38 歲 · 女"),
    product: copy("Life + Critical Illness*", "人壽及危疾*"),
    sumBand: copy("Tier 2*", "第 2 級*"),
    identity: copy("ID detail incomplete", "身份資料未完成"),
    consent: copy("Outstanding", "尚未完成"),
    questionnaire: copy("Complete", "已完成"),
    preparation: copy("Fasting not confirmed", "未確認空腹準備"),
    adminBlockers: ["ID detail", "Consent", "Preparation"],
    adminReady: false,
    nurseReady: false,
    screeningComplete: false,
    handoverComplete: false,
    findingsSaved: false,
    draftGenerated: false,
    followUpRequested: false,
    reportSigned: false,
    missingEvidence: [],
    labs: syntheticLabs(false),
    vitals: {
      heightWeight: copy("Not started", "尚未開始"),
      bmi: copy("Not available", "未有資料"),
      bloodPressure: copy("Not started", "尚未開始"),
      pulse: copy("Not started", "尚未開始"),
      urine: copy("Not started", "尚未開始"),
      ecg: copy("Not started", "尚未開始"),
    },
    findings: {
      appearance: copy("Not started", "尚未開始"),
      cardiovascular: copy("Not started", "尚未開始"),
      respiratory: copy("Not started", "尚未開始"),
      abdomen: copy("Not started", "尚未開始"),
      remarks: copy("Administrative readiness must be resolved before clinical work starts.", "開始臨床工作前必須先解決行政準備問題。"),
    },
    audit: makeAudit("C"),
  },
};

const resetCases = () => structuredClone(initialCases);

const state = {
  view: "studio",
  locale: "en",
  role: "clinic",
  screen: "C01",
  selectedCase: "A",
  selectedJourney: "J01",
  scenarioFilter: "all",
  cases: resetCases(),
  modal: null,
};

const personas = [
  {
    id: "clinic",
    name: copy("Clinic Administrator", "診所行政人員"),
    image: "./assets/studio/persona-clinic-admin.png",
    objective: copy("Keep each appointment operationally ready from booking receipt to Nurse routing.", "從接收預約至轉交護士，確保每個預約均已完成營運準備。"),
    currentState: copy("Receives booking hand-off and coordinates readiness through disconnected communications and manual checks.", "接收預約交接後，透過分散的通訊及人工檢查協調準備狀態。"),
    painPoint: copy("Missing identity, consent or preparation details can remain unclear until the applicant arrives.", "身份、同意或準備資料缺失，可能到申請人到場時才被發現。"),
    futureRole: copy("Own readiness triage, resolve administrative blockers and route only ready cases to the Nurse worklist.", "負責準備狀態分流、處理行政阻礙，並只把準備妥當的個案轉交護士工作清單。"),
    boundary: copy("May manage identity and logistics. Cannot change clinical evidence, doctor findings or signed reports.", "可管理身份及安排資料，不可修改臨床證據、醫生檢查結果或已簽署報告。"),
  },
  {
    id: "nurse",
    name: copy("Nurse / Clinical Assistant", "護士／臨床助理"),
    image: "./assets/studio/persona-nurse.png",
    objective: copy("Complete screening, maintain evidence status and hand over a transparent clinical package.", "完成篩查、維護證據狀態，並交接清晰透明的臨床資料套件。"),
    currentState: copy("Captures screening evidence while laboratory attachments and handover status can remain fragmented.", "記錄篩查證據，但化驗附件及交接狀態可能仍然分散。"),
    painPoint: copy("Missing evidence can delay the report or be discovered late in doctor review.", "缺失證據可能延遲報告，或到醫生審閱後期才被發現。"),
    futureRole: copy("Triage the worklist, record structured screening evidence, attach laboratory results and respond to doctor follow-up.", "分流工作清單、記錄結構化篩查證據、附加化驗結果，並回應醫生跟進要求。"),
    boundary: copy("May capture and attach evidence. Cannot diagnose, sign the doctor report or make PHKL review decisions.", "可記錄及附加證據，不可作出診斷、簽署醫生報告或作 PHKL 審核決定。"),
  },
  {
    id: "doctor",
    name: copy("Contracted Doctor*", "合約醫生*"),
    image: "./assets/studio/persona-doctor.png",
    objective: copy("Own the clinical examination, report content and final signed package.", "負責臨床檢查、報告內容及最終簽署套件。"),
    currentState: copy("Reviews clinic information, manually prepares the report and manually sends it onward.", "審閱診所資料、人工準備報告，再以人工方式發送。"),
    painPoint: copy("Manual preparation makes evidence completeness and submission status harder to control.", "人工準備令證據完整度及提交狀態更難控制。"),
    futureRole: copy("Review Nurse evidence, complete findings, control the report draft, request follow-up and sign only a complete package.", "審閱護士證據、完成檢查結果、控制報告草稿、要求跟進，並只簽署完整套件。"),
    boundary: copy("Owns clinical content and sign-off. AI cannot diagnose, sign or alter a locked record.", "負責臨床內容及簽署。AI 不可診斷、簽署或修改已鎖定紀錄。"),
  },
];

const contextRoles = [
  { id: "applicant", name: copy("Prospective Applicant", "準客戶"), treatment: copy("Context only", "只作情境角色"), boundary: copy("Receives appointment logistics, preparation advice and change links. Does not use the clinic CMS workspace.", "接收預約安排、準備建議及改期連結，不使用診所 CMS 工作台。") },
  { id: "adviser", name: copy("Financial Adviser", "理財顧問"), treatment: copy("Context only", "只作情境角色"), boundary: copy("Books in PruForce and receives logistics updates only. No clinical data or CMS workspace access.", "在 PruForce 預約，只接收安排更新，不接收臨床資料，也不進入 CMS 工作台。") },
  { id: "phkl-review", name: copy("PHKL Review Platform / Medical Review Team", "PHKL 審核平台／醫療審核團隊"), treatment: copy("Downstream boundary", "下游邊界"), boundary: copy("Receives the signed digital report package and evaluates it outside CMS.", "接收已簽署的電子報告套件，並在 CMS 以外進行審核。") },
  { id: "clinic-operations", name: copy("Clinic Operations", "診所營運"), treatment: copy("Supporting", "支援角色"), boundary: copy("Measures readiness, evidence completeness, no-show recovery and report turnaround. It does not change clinical records.", "衡量準備狀態、證據完整度、爽約恢復及報告周轉時間，不修改臨床紀錄。") },
];

const journey = [
  { id: "J01", title: copy("Booking sync", "預約同步") },
  { id: "J02", title: copy("Confirm and prepare", "確認及準備") },
  { id: "J03", title: copy("Admin readiness", "行政準備") },
  { id: "J04", title: copy("Nurse assessment", "護士評估") },
  { id: "J05", title: copy("Doctor examination", "醫生檢查") },
  { id: "J06", title: copy("Evidence package", "證據套件") },
  { id: "J07", title: copy("PHKL submission", "提交 PHKL") },
  { id: "J08", title: copy("Measure", "衡量") },
];

const roleAction = (labelEn, labelZh, detailEn, detailZh, active = true) => ({
  label: copy(labelEn, labelZh),
  detail: copy(detailEn, detailZh),
  active,
});

const journeyActions = {
  J01: {
    trigger: copy("CMS receives applicant identity, appointment date, time and location from the confirmed upstream integration.", "CMS 從已確認的上游整合接收申請人身份、預約日期、時間及地點。"),
    clinic: roleAction("Review booking", "審閱預約", "Review the new booking and confirm that the minimum booking fields arrived. Route integration exceptions for correction.", "審閱新預約並確認最低限度的預約欄位已到達。把整合異常轉交修正。"),
    nurse: roleAction("No active task", "沒有主動任務", "No active task at booking receipt.", "接收預約時沒有主動任務。", false),
    doctor: roleAction("No active task", "沒有主動任務", "No active task at booking receipt.", "接收預約時沒有主動任務。", false),
    scenario: "S01",
  },
  J02: {
    trigger: copy("A booking has been accepted and customer confirmation or preparation communication is due.", "預約已被接納，現需發送客戶確認或準備訊息。"),
    clinic: roleAction("Confirm and prepare", "確認及準備", "Monitor confirmation, approved preparation advice, reschedule requests and logistics notifications. Resolve communication exceptions.", "監察確認、已核准準備建議、改期要求及安排通知，並處理通訊異常。"),
    nurse: roleAction("Clarify advice if asked", "按需要澄清建議", "No routine task. Clarify clinical preparation wording only when requested.", "沒有例行任務，只在收到要求時澄清臨床準備用語。", false),
    doctor: roleAction("No active task", "沒有主動任務", "No active task before clinical handover.", "臨床交接前沒有主動任務。", false),
    scenario: "S02",
  },
  J03: {
    trigger: copy("The appointment is approaching or a readiness field is incomplete.", "預約將近，或準備狀態欄位尚未完成。"),
    clinic: roleAction("Resolve and route", "處理並轉交", "Validate identity, consent, location and preparation. Resolve blockers and route only an admin-ready case.", "核實身份、同意、地點及準備狀態。處理阻礙，只轉交行政準備妥當的個案。"),
    nurse: roleAction("Accept ready case", "接收準備妥當個案", "Accept the routed case. Do not start screening if an administrative blocker remains.", "接收已轉交個案。行政阻礙未解決前不可開始篩查。"),
    doctor: roleAction("Not yet available", "尚未可處理", "The case is not available as ready for examination.", "個案不會以可檢查狀態出現在醫生工作清單。", false),
    scenario: "S03",
  },
  J04: {
    trigger: copy("The applicant has arrived and the case is admin-ready in the Nurse worklist.", "申請人已到場，個案在護士工作清單中已完成行政準備。"),
    clinic: roleAction("Handle logistics only", "只處理安排異常", "Handle logistics exceptions only. Do not edit clinical evidence.", "只處理安排異常，不修改臨床證據。"),
    nurse: roleAction("Screen and capture", "篩查及記錄", "Start screening, record height, weight, vitals, urine and ECG status, and keep missing evidence visible.", "開始篩查，記錄身高、體重、生命體徵、尿液及心電圖狀態，並保持缺失證據可見。"),
    doctor: roleAction("Await handover", "等候交接", "No active task until Nurse handover.", "護士交接前沒有主動任務。", false),
    scenario: "S04",
  },
  J05: {
    trigger: copy("Nurse screening is complete and the case has been handed over, with pending evidence clearly flagged.", "護士篩查已完成並已交接個案，待完成證據已清楚標示。"),
    clinic: roleAction("No clinical action", "沒有臨床行動", "No clinical action after handover.", "交接後沒有臨床行動。", false),
    nurse: roleAction("Complete handover", "完成交接", "Complete handover and respond to evidence follow-up requests.", "完成交接並回應證據跟進要求。"),
    doctor: roleAction("Review and examine", "審閱及檢查", "Review applicant context and Nurse evidence. Complete and save structured examination findings.", "審閱申請人資料及護士證據，完成並儲存結構化檢查結果。"),
    scenario: "S05",
  },
  J06: {
    trigger: copy("Doctor findings are saved or mandatory laboratory results are still pending.", "醫生檢查結果已儲存，或必要化驗結果仍待完成。"),
    clinic: roleAction("No clinical action", "沒有臨床行動", "No clinical evidence task at report preparation.", "準備報告時沒有臨床證據任務。", false),
    nurse: roleAction("Attach lab results", "附加化驗結果", "Attach Lipids, HbA1c and other required laboratory results when available.", "在結果可用時附加血脂、糖化血紅素及其他所需化驗結果。"),
    doctor: roleAction("Draft or request", "草擬或要求跟進", "Review or refresh the report draft. If evidence is incomplete, request Nurse follow-up and do not sign.", "審閱或更新報告草稿。若證據不完整，要求護士跟進且不可簽署。"),
    scenario: "S06",
  },
  J07: {
    trigger: copy("Findings and report draft are complete and all mandatory evidence is attached.", "檢查結果及報告草稿已完成，所有必要證據已附加。"),
    clinic: roleAction("View completion", "查看完成狀態", "View completion status only. Do not edit the clinical package.", "只查看完成狀態，不修改臨床套件。"),
    nurse: roleAction("Confirm evidence", "確認證據", "Confirm that requested evidence has been attached.", "確認所要求的證據已附加。"),
    doctor: roleAction("Sign and submit", "簽署及提交", "Review the final package, e-sign, lock the record and submit it to the PHKL review platform.", "審閱最終套件、電子簽署、鎖定紀錄並提交至 PHKL 審核平台。"),
    scenario: "S07",
  },
  J08: {
    trigger: copy("Operational events have accumulated and a pilot or service review is due.", "營運事件已累積，現需進行試點或服務檢討。"),
    clinic: roleAction("Review readiness", "檢視準備表現", "Review readiness, reschedule and no-show measures.", "檢視準備狀態、改期及爽約指標。"),
    nurse: roleAction("Review completeness", "檢視完整度", "Review assessment throughput, evidence completeness and follow-up ageing.", "檢視評估吞吐量、證據完整度及跟進時長。"),
    doctor: roleAction("Review turnaround", "檢視周轉時間", "Review examination-to-report and sign-off turnaround.", "檢視由檢查至報告及簽署的周轉時間。"),
    scenario: "S08",
  },
};

const scenarios = [
  { id: "S01", stage: "J01", title: copy("Booking sync into CMS", "預約同步至 CMS"), summary: copy("CMS receives identity, date, time and location. IQ remains optional pending confirmation.", "CMS 接收身份、日期、時間及地點。IQ 是否保留仍待確認。"), currentState: copy("PruForce and IQ currently hand booking availability and confirmation information toward CMS.", "目前由 PruForce 及 IQ 把預約可用性及確認資料傳送至 CMS。"), painPoint: copy("An unconfirmed IQ role can over-scope the target architecture.", "未確認的 IQ 角色可能令目標架構範圍過大。"), futureState: copy("CMS receives the minimum confirmed booking data through the approved integration path.", "CMS 透過已核准的整合路徑接收最低限度的已確認預約資料。"), kpi: copy("Booking-to-CMS latency and hand-off exception rate*", "預約至 CMS 延遲及交接異常率*"), evidence: copy("Based on the latest PHKL feedback about the PruForce, IQ and CMS hand-off.", "根據 PHKL 對 PruForce、IQ 及 CMS 交接的最新回覆。"), boundary: copy("CMS does not replace PruForce. IQ is not shown as mandatory without confirmation.", "CMS 不取代 PruForce。未確認前，不把 IQ 顯示為必要組件。"), role: "clinic", screen: "C01", image: "scenario-manual-intake.png" },
  { id: "S02", stage: "J02", title: copy("Customer confirmation and preparation", "客戶確認及準備"), summary: copy("CMS sends approved confirmation, preparation, reminder and change-link messages.", "CMS 發送已核准的確認、準備、提醒及改期連結訊息。"), currentState: copy("Notification ownership and reschedule handling are not consistently visible across channels.", "不同渠道的通知責任及改期處理目前未能一致呈現。"), painPoint: copy("Fragmented communication increases avoidable queries and no-show risk.", "分散的通訊增加可避免查詢及爽約風險。"), futureState: copy("CMS owns approved appointment communications. The Financial Adviser receives logistics updates only.", "CMS 負責已核准的預約通訊。理財顧問只接收安排更新。"), kpi: copy("Delivery, confirmation, reschedule and no-show measures*", "送達、確認、改期及爽約指標*"), evidence: copy("Based on PHKL feedback that CMS should own future-state notifications.", "根據 PHKL 回覆，目標狀態應由 CMS 負責通知。"), boundary: copy("Customer and Adviser are message recipients, not clinic CMS users.", "客戶及顧問是訊息接收者，不是診所 CMS 使用者。"), role: "clinic", screen: "C02", image: "persona-clinic-admin.png" },
  { id: "S03", stage: "J03", title: copy("Clinic Admin readiness triage", "診所行政準備分流"), summary: copy("A booking becomes ready for clinical work only after administrative checks are complete.", "只有完成行政檢查後，預約才可進入臨床工作。"), currentState: copy("Identity, consent and preparation checks can be handled through separate manual steps.", "身份、同意及準備檢查可能由不同人工步驟處理。"), painPoint: copy("The clinical team can receive a case before its blockers are explicit.", "臨床團隊可能在阻礙尚未清楚呈現前收到個案。"), futureState: copy("Clinic Admin resolves blockers and routes only an admin-ready case to the Nurse worklist.", "診所行政人員處理阻礙，只把行政準備妥當的個案轉交護士。"), kpi: copy("Prepared-arrival rate and admin exception ageing*", "到場準備完成率及行政異常時長*"), evidence: copy("Based on the confirmed minimum personal details, consent and Health Assessment preparation requirements.", "根據已確認的最低個人資料、同意及健康評估準備要求。"), boundary: copy("Clinic Admin does not edit clinical evidence or the medical report.", "診所行政人員不修改臨床證據或醫療報告。"), role: "clinic", screen: "C02", image: "scenario-manual-intake.png" },
  { id: "S04", stage: "J04", title: copy("Nurse assessment and evidence capture", "護士評估及證據記錄"), summary: copy("The Nurse starts ready cases, records screening evidence and maintains evidence status.", "護士開始處理準備妥當的個案、記錄篩查證據並維護證據狀態。"), currentState: copy("Screening, laboratory attachment and handover status can remain fragmented.", "篩查、化驗附件及交接狀態可能仍然分散。"), painPoint: copy("Missing evidence can be discovered late and cause report rework.", "缺失證據可能在後期才被發現，造成報告重做。"), futureState: copy("The Nurse works from a readiness queue, records structured screening data and keeps pending evidence visible.", "護士從準備狀態清單工作，記錄結構化篩查資料，並保持待完成證據可見。"), kpi: copy("Assessment throughput and evidence completeness*", "評估吞吐量及證據完整率*"), evidence: copy("Based on Anushka feedback for a Nurse worklist and PHKL feedback that the Nurse attaches lab results.", "根據 Anushka 對護士工作清單的回覆，以及 PHKL 關於護士附加化驗結果的回覆。"), boundary: copy("The Nurse captures evidence but does not diagnose or sign the doctor report.", "護士記錄證據，但不作診斷或簽署醫生報告。"), role: "nurse", screen: "N01", image: "persona-nurse.png" },
  { id: "S05", stage: "J05", title: copy("Doctor examination and clinical readiness", "醫生檢查及臨床準備"), summary: copy("The Doctor reviews Nurse evidence and completes structured examination findings.", "醫生審閱護士證據並完成結構化檢查結果。"), currentState: copy("The Doctor gathers clinic context and prepares the medical report after the appointment.", "醫生在預約後整理診所資料並準備醫療報告。"), painPoint: copy("Manual context gathering makes evidence readiness harder to confirm.", "人工整理資料令證據準備狀態更難確認。"), futureState: copy("The Doctor reviews applicant context and Nurse evidence, then saves structured findings while blockers remain visible.", "醫生審閱申請人資料及護士證據，在阻礙保持可見的情況下儲存結構化結果。"), kpi: copy("Examination documentation time and doctor rework*", "檢查記錄時間及醫生重做率*"), evidence: copy("Roberto confirmed that the medical report is always completed by the Doctor.", "Roberto 已確認醫療報告始終由醫生完成。"), boundary: copy("No AI diagnosis or final PHKL decision. The Doctor remains clinically accountable.", "AI 不作診斷或 PHKL 最終決定。醫生保留臨床責任。"), role: "doctor", screen: "D02", image: "persona-doctor.png" },
  { id: "S06", stage: "J06", title: copy("Report draft and evidence review", "報告草稿及證據審閱"), summary: copy("The report draft stays grounded in visible evidence and under Doctor control.", "報告草稿以可見證據為基礎，並由醫生控制。"), currentState: copy("Report preparation and laboratory evidence may be assembled manually.", "報告準備及化驗證據可能以人工方式整合。"), painPoint: copy("Incomplete evidence can interrupt sign-off and create avoidable follow-up.", "證據不完整會中斷簽署並產生可避免的跟進。"), futureState: copy("The Nurse attaches laboratory evidence. The Doctor reviews the draft and requests follow-up when evidence is incomplete.", "護士附加化驗證據。醫生審閱草稿，並在證據不完整時要求跟進。"), kpi: copy("Package completeness, follow-up ageing and draft turnaround*", "套件完整率、跟進時長及草稿周轉時間*"), evidence: copy("Based on Erienne feedback that the digital report includes all laboratory results.", "根據 Erienne 的回覆，電子報告包括所有化驗結果。"), boundary: copy("AI assists with drafting and completeness only. It cannot sign or alter a locked record.", "AI 只協助草擬及完整度檢查，不可簽署或修改已鎖定紀錄。"), role: "doctor", screen: "D03", image: "scenario-electronic-report.png" },
  { id: "S07", stage: "J07", title: copy("Digital submission to PHKL", "電子提交至 PHKL"), summary: copy("A complete signed report package is submitted to the PHKL review platform.", "完整並已簽署的報告套件會提交至 PHKL 審核平台。"), currentState: copy("The Doctor manually sends the completed report copy to Prudential Hong Kong.", "醫生以人工方式把已完成報告副本發送至 Prudential Hong Kong。"), painPoint: copy("Manual send-out weakens package receipt and completion visibility.", "人工發送令套件接收及完成狀態較難追蹤。"), futureState: copy("The Doctor e-signs, locks and submits the complete digital package to PHKL.", "醫生電子簽署、鎖定並把完整電子套件提交至 PHKL。"), kpi: copy("Sign-off to PHKL receipt and submission exception rate*", "簽署至 PHKL 接收時間及提交異常率*"), evidence: copy("Based on the confirmed future-state digital report package direction.", "根據已確認的目標狀態電子報告套件方向。"), boundary: copy("PHKL evaluates the package in a different platform outside CMS.", "PHKL 在 CMS 以外的另一平台評估套件。"), role: "doctor", screen: "D04", image: "scenario-electronic-report.png" },
  { id: "S08", stage: "J08", title: copy("Operational measurement", "營運衡量"), summary: copy("Measure workflow performance before claiming realised benefits.", "在聲稱已實現效益前衡量流程表現。"), currentState: copy("Booking volume is approximately known, but readiness, no-show, completeness and cost baselines are not confirmed.", "預約量已有約數，但準備狀態、爽約、完整度及成本基線尚未確認。"), painPoint: copy("Benefits cannot be defended without consistent baseline and event data.", "缺乏一致的基線及事件資料時，效益難以被證明。"), futureState: copy("Clinic roles review readiness, evidence completeness and report turnaround using shared workflow events.", "診所角色利用共享流程事件檢視準備狀態、證據完整度及報告周轉時間。"), kpi: copy("Readiness, no-show, evidence completeness and report turnaround*", "準備狀態、爽約、證據完整度及報告周轉時間*"), evidence: copy("Measures are proposed for pilot validation and require PHKL baseline confirmation.", "指標用於試點驗證，並需要 PHKL 確認基線。"), boundary: copy("Illustrative measures are not realised benefits or production commitments.", "示意指標並非已實現效益或生產承諾。"), role: "operations", screen: "O01", image: "persona-clinic-admin.png" },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function status(label, tone = "neutral") {
  return `<span class="status status--${tone}">${escapeHtml(text(label))}</span>`;
}

function button(label, action, options = {}) {
  const classes = ["button", options.primary ? "button--primary" : "", options.quiet ? "button--quiet" : "", options.full ? "button--full" : "", options.warning ? "button--warning" : ""].filter(Boolean).join(" ");
  return `<button type="button" class="${classes}" data-action="${action}" ${options.caseKey ? `data-case="${options.caseKey}"` : ""} ${options.screen ? `data-screen="${options.screen}"` : ""} ${options.role ? `data-role="${options.role}"` : ""} ${options.disabled ? "disabled aria-disabled=\"true\"" : ""}>${escapeHtml(text(label))}</button>`;
}

function panel(title, body, meta = "", extraClass = "") {
  return `<section class="panel ${extraClass}"><header class="panel__header"><div><h2>${escapeHtml(text(title))}</h2>${meta ? `<span>${escapeHtml(text(meta))}</span>` : ""}</div></header><div class="panel__body">${body}</div></section>`;
}

function metric(label, value, note, tone = "default") {
  return `<div class="metric metric--${tone}"><span class="eyebrow">${escapeHtml(text(label))}</span><strong>${escapeHtml(text(value))}</strong><small>${escapeHtml(text(note))}</small></div>`;
}

function field(label, value, tone = "") {
  return `<div class="field-row"><span>${escapeHtml(text(label))}</span><span class="field-value ${tone ? `field-value--${tone}` : ""}">${escapeHtml(text(value))}</span></div>`;
}

function addAudit(c, actor, action, detail) {
  c.audit.push({
    id: `${c.key}-${Date.now()}`,
    at: copy("Demo now*", "示範當下*"),
    actor,
    action,
    detail,
  });
}

function readiness(c) {
  if (c.adminBlockers.length) return { label: copy("Action required", "需要處理"), tone: "danger", reason: c.adminBlockers.join(", ") };
  if (!c.nurseReady) return { label: copy("Ready for nurse routing", "可轉交護士"), tone: "info", reason: copy("No administrative blocker", "沒有行政阻礙") };
  if (!c.screeningComplete) return { label: copy("Awaiting nurse assessment", "等候護士評估"), tone: "info", reason: copy("Screening not started", "尚未開始篩查") };
  if (!c.handoverComplete) return { label: copy("Ready for doctor handover", "可交接醫生"), tone: c.missingEvidence.length ? "warning" : "success", reason: c.missingEvidence.length ? copy("Laboratory evidence pending", "化驗證據待完成") : copy("All required evidence available", "所有所需證據已齊備") };
  if (c.missingEvidence.length) return { label: copy("Report sign-off blocked", "報告簽署受阻"), tone: "warning", reason: copy("Lipids and HbA1c pending", "血脂及糖化血紅素待完成") };
  if (c.reportSigned) return { label: copy("Submitted to PHKL", "已提交 PHKL"), tone: "success", reason: copy("Signed package sent", "已發送簽署套件") };
  return { label: copy("Ready for report completion", "可完成報告"), tone: "success", reason: copy("Evidence package complete", "證據套件完整") };
}

function auditTrail(c) {
  return `<ol class="audit-trail">${[...c.audit].reverse().map((event) => `<li><span class="audit-dot"></span><div><strong>${escapeHtml(text(event.action))}</strong><span>${escapeHtml(text(event.actor))} · ${escapeHtml(text(event.at))}</span><p>${escapeHtml(text(event.detail))}</p></div></li>`).join("")}</ol>`;
}

function scenarioById(id) {
  return scenarios.find((scenario) => scenario.id === id);
}

function renderPersonas() {
  const isZh = state.locale === "zh";
  const coreCards = personas.map((persona) => `<button class="persona-card" type="button" data-action="open-persona" data-persona="${persona.id}"><img src="${persona.image}" alt=""><span class="persona-card__category">${isZh ? "核心" : "CORE"}</span><div><strong>${escapeHtml(text(persona.name))}</strong><p>${escapeHtml(text(persona.objective))}</p><small>${isZh ? "查看角色目標、現況、痛點、未來職責及責任邊界" : "View objective, current state, pain point, future role and responsibility boundary"}</small></div></button>`).join("");
  const contextCards = contextRoles.map((role) => `<button type="button" class="context-role" data-action="open-persona" data-persona="${role.id}"><strong>${escapeHtml(text(role.name))}</strong><span>${escapeHtml(text(role.treatment))}</span></button>`).join("");
  return `<section class="studio-section" id="personas"><div class="studio-section__heading"><div><h2>${isZh ? "核心角色" : "Core personas"}</h2><p>${isZh ? "選擇角色，查看其現況、痛點、未來職責及資料邊界。" : "Select a Persona to review current state, pain point, future role and data boundary."}</p></div></div><div class="persona-gallery">${coreCards}</div><div class="context-personas"><div><strong>${isZh ? "支援及邊界角色" : "Supporting and boundary roles"}</strong></div>${contextCards}</div></section>`;
}

function renderJourney() {
  const isZh = state.locale === "zh";
  const selectedStage = journey.find((stage) => stage.id === state.selectedJourney) || journey[0];
  const selected = journeyActions[selectedStage.id];
  const laneRoles = [
    { key: "clinic", name: copy("Clinic Administrator", "診所行政人員"), image: "./assets/studio/persona-clinic-admin.png" },
    { key: "nurse", name: copy("Nurse / Clinical Assistant", "護士／臨床助理"), image: "./assets/studio/persona-nurse.png" },
    { key: "doctor", name: copy("Contracted Doctor*", "合約醫生*"), image: "./assets/studio/persona-doctor.png" },
  ];
  const stageSelector = journey.map((stage) => `<button type="button" class="${stage.id === selectedStage.id ? "is-current" : ""}" data-action="select-journey" data-journey="${stage.id}"><span>${stage.id}</span><strong>${escapeHtml(text(stage.title))}</strong></button>`).join("");
  const responsibilityCards = laneRoles.map((role) => {
    const roleState = selected[role.key];
    return `<article class="journey-role-action ${roleState.active ? "is-active" : "is-inactive"}"><div><img src="${role.image}" alt=""><span>${escapeHtml(text(role.name))}</span></div><strong>${escapeHtml(text(roleState.label))}</strong><p>${escapeHtml(text(roleState.detail))}</p></article>`;
  }).join("");
  const laneHeader = `<div class="journey-lanes__header"><span>${isZh ? "角色" : "Persona"}</span>${journey.map((stage) => `<span><small>${stage.id}</small>${escapeHtml(text(stage.title))}</span>`).join("")}</div>`;
  const laneRows = laneRoles.map((role) => `<div class="journey-lane"><div class="journey-lane__persona"><img src="${role.image}" alt=""><strong>${escapeHtml(text(role.name))}</strong></div><div class="journey-lane__cells">${journey.map((stage) => {
    const roleState = journeyActions[stage.id][role.key];
    if (!roleState.active) return `<div class="journey-lane__empty"><span>${isZh ? "沒有主動任務" : "No active task"}</span></div>`;
    return `<div class="journey-lane__action"><span>${escapeHtml(text(roleState.label))}</span><button type="button" data-action="open-scenario-detail" data-scenario="${journeyActions[stage.id].scenario}" data-source="lane">${journeyActions[stage.id].scenario}</button></div>`;
  }).join("")}</div></div>`).join("");
  return `<section class="studio-section studio-journey" id="journey"><div class="studio-section__heading"><div><h2>${isZh ? "一條受控的診所旅程" : "One controlled clinic journey"}</h2><p>${isZh ? "選擇階段，查看觸發條件，以及診所行政、護士和醫生在該狀態下需要做甚麼。" : "Select a stage to see its trigger and what Clinic Admin, Nurse and Doctor need to do."}</p></div></div><div class="journey-strip" aria-label="${isZh ? "旅程階段" : "Journey stages"}">${stageSelector}</div><section class="journey-responsibility" aria-live="polite"><header><div><span>${selectedStage.id}</span><h3>${escapeHtml(text(selectedStage.title))}</h3></div><div><span>${isZh ? "觸發條件" : "Trigger condition"}</span><p>${escapeHtml(text(selected.trigger))}</p></div></header><div class="journey-responsibility__roles">${responsibilityCards}</div></section><div class="journey-lanes" aria-label="${isZh ? "角色與旅程階段泳道" : "Persona by Journey stage swimlane"}">${laneHeader}${laneRows}</div></section>`;
}

function renderScenarioCards() {
  const isZh = state.locale === "zh";
  const filteredScenarios = state.scenarioFilter === "all" ? scenarios : scenarios.filter((scenario) => scenario.stage === state.scenarioFilter);
  const filterNote = state.scenarioFilter === "all"
    ? `<span>${isZh ? "顯示全部 8 個場景" : "Showing all 8 scenarios"}</span>`
    : `<span>${isZh ? `顯示 ${state.scenarioFilter} 對應場景` : `Showing scenario for ${state.scenarioFilter}`}</span>${button(copy("Show all scenarios", "顯示全部場景"), "show-all-scenarios", { quiet: true })}`;
  const cards = filteredScenarios.map((scenario) => `<button type="button" class="scenario-card" data-action="open-scenario-detail" data-scenario="${scenario.id}" data-source="card"><figure><img src="./assets/studio/${scenario.image}" alt=""></figure><div class="scenario-card__meta"><span>${scenario.id}</span>${status(copy("Core demo", "核心示範"), scenario.role === "operations" ? "warning" : "success")}</div><strong>${escapeHtml(text(scenario.title))}</strong><p>${escapeHtml(text(scenario.summary))}</p><div class="scenario-card__footer"><span>${scenario.stage}</span><span>${scenario.screen}</span></div></button>`).join("");
  return `<section class="studio-section studio-scenarios" id="scenarios"><div class="studio-section__heading"><div><h2>${isZh ? "場景工作台" : "Scenario workbench"}</h2><p>${isZh ? "先展開場景分析，再由場景詳情進入相應操作演示。" : "Open the Scenario analysis first, then enter the mapped operational demo from its detail view."}</p></div></div><div class="scenario-filter-state">${filterNote}</div><div class="scenario-grid ${filteredScenarios.length === 1 ? "scenario-grid--filtered" : ""}">${cards}</div></section>`;
}

function renderStudio() {
  const isZh = state.locale === "zh";
  return `<div class="studio">
    <header class="studio-topbar">
      <div class="studio-brand"><span class="brand-mark" aria-hidden="true"></span><div><strong>PHKL Future Clinic</strong><span>${isZh ? "場景工作室 · 診所 CMS 範圍" : "Scenario Studio · Clinic CMS scope"}</span></div></div>
      <nav aria-label="${isZh ? "場景工作室導覽" : "Studio sections"}"><a href="#personas">${isZh ? "角色" : "Personas"}</a><a href="#journey">${isZh ? "旅程" : "Journey"}</a><a href="#scenarios">${isZh ? "場景" : "Scenarios"}</a><a href="#measure">${isZh ? "衡量" : "Measure"}</a></nav>
      <div class="studio-topbar__actions">${button(isZh ? "EN" : "繁體中文", "toggle-locale", { quiet: true })}${button(copy("Open demo", "開啟示範"), "open-workspace", { primary: true })}</div>
    </header>
    <main>
      <section class="studio-hero">
        <div class="studio-hero__copy"><span class="eyebrow">${isZh ? "PHKL 未來診所體驗" : "PHKL FUTURE CLINIC EXPERIENCE"}</span><h1>${isZh ? "讓個案狀態清楚決定下一步行動。" : "Let case status drive the next clinical action."}</h1><p>${isZh ? "從預約準備、護士證據到醫生簽署，建立一條可追蹤且責任清晰的診所流程。" : "Connect appointment readiness, nurse evidence and doctor sign-off in one traceable clinic workflow."}</p><div class="studio-hero__actions">${button(copy("Open demo", "開啟示範"), "open-workspace", { primary: true })}<span>${isZh ? "管理層展示 · 模擬資料" : "Executive showcase · synthetic data"}</span></div></div>
        <figure class="studio-hero__image"><img src="./assets/studio/scenario-electronic-report.png" alt=""><figcaption><span>${isZh ? "流程" : "FLOW"}</span><strong>${isZh ? "預約準備 → 臨床證據 → PHKL 提交" : "Readiness → clinical evidence → PHKL submission"}</strong></figcaption></figure>
      </section>
      <section class="studio-section studio-assumptions" aria-label="${isZh ? "範圍及假設" : "Scope and assumptions"}">
        <div><span class="eyebrow">${isZh ? "上游" : "UPSTREAM"}</span><strong>PruForce</strong><p>${isZh ? "提供身份及預約安排。IQ 在目標狀態中屬待確認。" : "Provides identity and appointment logistics. IQ is optional pending confirmation."}</p></div>
        <div><span class="eyebrow">${isZh ? "CMS 責任" : "CMS OWNERSHIP"}</span><strong>${isZh ? "準備、證據、提交" : "Readiness, evidence, submission"}</strong><p>${isZh ? "狀態和下一步由同一個案紀錄驅動。" : "One case record drives status and next action."}</p></div>
        <div><span class="eyebrow">${isZh ? "下游" : "DOWNSTREAM"}</span><strong>${isZh ? "PHKL 審核平台" : "PHKL review platform"}</strong><p>${isZh ? "接收完整報告套件，不是 CMS 使用者。" : "Receives the complete report package and is not a CMS user."}</p></div>
      </section>
      ${renderPersonas()}
      ${renderJourney()}
      ${renderScenarioCards()}
      <section class="studio-section studio-measure" id="measure"><div class="studio-section__heading"><div><h2>${isZh ? "先建立基線，再衡量效益" : "Establish the baseline before claiming benefits"}</h2><p>${isZh ? "展示已知量、待確認基線及建議 KPI，不把示意數字當成實現效益。" : "Separate known volume, missing baselines and proposed KPIs from realised benefits."}</p></div></div><div class="measure-model"><article><strong>~1,000*</strong><p>${isZh ? "每年體檢預約量，待 PHKL 確認。" : "Annual medical-check bookings, pending PHKL confirmation."}</p></article><div class="measure-model__formula"><span>${isZh ? "建議 KPI" : "PROPOSED KPIS"}</span><code>${isZh ? "準備完成率 · 證據完整率 · 報告周轉時間" : "Readiness % · evidence completeness % · report turnaround"}</code></div><article><strong>${isZh ? "需要基線" : "Baseline required"}</strong><p>${isZh ? "爽約率、重做率、每宗成本及 P90 時間。" : "No-show rate, rework, cost per case and P90 time."}</p></article></div></section>
    </main>
    <footer class="studio-footer"><div><span class="brand-mark" aria-hidden="true"></span><strong>PHKL Future Clinic</strong></div><span>${isZh ? "所有姓名、編號、醫療資料及結果均為模擬資料。" : "All names, IDs, medical data and outcomes are synthetic."}</span></footer>
  </div>`;
}

function topbarCaseStatus(c) {
  const current = readiness(c);
  return status(current.label, current.tone);
}

function renderShell(content) {
  const role = roleConfig[state.role];
  const c = state.cases[state.selectedCase];
  const isZh = state.locale === "zh";
  return `<div class="app-shell"><a class="skip-link" href="#main-content">${isZh ? "跳到主要內容" : "Skip to content"}</a><aside class="sidebar"><div class="brand-lockup"><span class="brand-mark" aria-hidden="true"></span><div><strong>${escapeHtml(text(role.name))}</strong><small>${escapeHtml(text(role.subtitle))}</small></div></div>${button(copy("Back to Scenario Studio", "返回場景工作室"), "back-studio", { quiet: true })}<nav class="screen-nav" aria-label="${escapeHtml(text(role.name))}">${role.screens.map(([id, label]) => `<button type="button" data-action="nav" data-screen="${id}" class="${state.screen === id ? "is-active" : ""}"><span>${escapeHtml(text(label))}</span><small>${id}</small></button>`).join("")}</nav><div class="role-switcher"><span class="eyebrow">${isZh ? "示範角色" : "DEMO ROLE"}</span>${Object.entries(roleConfig).map(([key, config]) => `<button type="button" data-action="set-role" data-role="${key}" class="${state.role === key ? "is-current" : ""}">${escapeHtml(text(config.subtitle))}</button>`).join("")}</div><footer><strong>${escapeHtml(text(role.actor))}</strong><span>${isZh ? "模擬資料" : "Synthetic data"}</span></footer></aside><div class="workspace"><header class="topbar"><div class="topbar__title"><strong>${escapeHtml(c.applicant)}</strong><span>${c.caseId}</span>${topbarCaseStatus(c)}</div><div class="topbar__controls"><label><span>${isZh ? "示範個案" : "Demo case"}</span><select data-action="select-case" aria-label="${isZh ? "示範個案" : "Demo case"}">${Object.values(state.cases).map((item) => `<option value="${item.key}" ${item.key === state.selectedCase ? "selected" : ""}>${isZh ? "個案" : "Case"} ${item.key} · ${escapeHtml(item.applicant)}</option>`).join("")}</select></label>${button(isZh ? "EN" : "繁體中文", "toggle-locale", { quiet: true })}${button(copy("Reset", "重設"), "reset", { quiet: true })}</div></header><main id="main-content" class="main-content">${content}<div class="prototype-note"><strong>${isZh ? "診所 CMS 原型" : "Clinic CMS prototype"}</strong><span>${isZh ? "模擬資料 · PHKL 審核在 CMS 以外 · 非生產系統" : "Synthetic data · PHKL review outside CMS · not a production system"}</span></div></main></div></div>${renderModal()}`;
}

function clinicQueue() {
  const isZh = state.locale === "zh";
  const rows = Object.values(state.cases).map((c) => {
    const r = readiness(c);
    const next = c.adminBlockers.length ? copy("Resolve requirements", "處理未完成要求") : c.nurseReady ? copy("Review status", "查看狀態") : copy("Review readiness", "審閱準備狀態");
    return `<tr class="${c.key === state.selectedCase ? "is-selected" : ""}"><td class="mono">${c.appointment}</td><td><strong>${escapeHtml(c.applicant)}</strong><small>${c.caseId}</small></td><td>${escapeHtml(text(c.examType))}</td><td>${status(r.label, r.tone)}</td><td>${escapeHtml(text(r.reason))}</td><td>${button(next, "open-case", { caseKey: c.key })}</td></tr>`;
  }).join("");
  return `<div class="page-heading"><div><span class="eyebrow">C01 · ${isZh ? "準備狀態清單" : "READINESS QUEUE"}</span><h1>${isZh ? "今天的預約準備狀態" : "Today’s appointment readiness"}</h1><p>${isZh ? "先處理身份、同意及準備問題，再把個案轉交臨床團隊。" : "Resolve identity, consent and preparation issues before routing cases into clinical work."}</p></div>${status(copy("3 cases need triage*", "3 個個案待分流*"), "info")}</div><div class="metrics-grid">${metric(copy("BOOKED TODAY*", "今日預約*"), "24", copy("Synthetic operating view", "模擬營運畫面"))}${metric(copy("READY FOR NURSE*", "可轉交護士*"), String(Object.values(state.cases).filter((c) => c.adminReady && !c.nurseReady).length), copy("No admin blocker", "沒有行政阻礙"), "positive")}${metric(copy("ACTION REQUIRED*", "需要處理*"), String(Object.values(state.cases).filter((c) => c.adminBlockers.length).length), copy("Identity, consent or preparation", "身份、同意或準備"), "warning")}${metric(copy("ROUTED TO NURSE*", "已轉交護士*"), String(Object.values(state.cases).filter((c) => c.nurseReady).length), copy("Current demo state", "目前示範狀態"))}</div>${panel(copy("Readiness worklist", "準備狀態工作清單"), `<div class="table-wrap"><table><thead><tr><th>${isZh ? "時間" : "Time"}</th><th>${isZh ? "申請人" : "Applicant"}</th><th>${isZh ? "檢查項目" : "Examination"}</th><th>${isZh ? "準備狀態" : "Readiness"}</th><th>${isZh ? "阻礙原因" : "Blocking reason"}</th><th>${isZh ? "下一步" : "Next step"}</th></tr></thead><tbody>${rows}</tbody></table></div>`, copy("Case status determines the next action", "個案狀態決定下一步行動"))}`;
}

function clinicReadiness() {
  const c = state.cases[state.selectedCase];
  const isZh = state.locale === "zh";
  const r = readiness(c);
  const adminFields = [
    [copy("Identity", "身份"), c.identity, c.adminBlockers.includes("ID detail") ? "danger" : "success"],
    [copy("Consent", "同意書"), c.consent, c.adminBlockers.includes("Consent") ? "danger" : "success"],
    [copy("Questionnaire", "問卷"), c.questionnaire, "success"],
    [copy("Preparation", "檢查準備"), c.preparation, c.adminBlockers.includes("Preparation") ? "warning" : "success"],
  ];
  const evidence = c.labs.map((lab) => field(lab.label, lab.value, lab.state === "missing" ? "warning" : "success")).join("");
  let action = "";
  if (c.adminBlockers.length) {
    action = `<div class="next-step next-step--danger"><div><span>${isZh ? "阻礙原因" : "Blocking reason"}</span><strong>${escapeHtml(c.adminBlockers.join(", "))}</strong><p>${isZh ? "此個案不會進入護士或醫生的準備清單。" : "This case will not enter the ready nurse or doctor queue."}</p></div>${button(copy("Resolve requirements", "處理未完成要求"), "resolve-admin", { primary: true })}</div>`;
  } else if (!c.nurseReady) {
    action = `<div class="next-step next-step--success"><div><span>${isZh ? "下一步" : "Next step"}</span><strong>${isZh ? "轉交護士工作清單" : "Route to nurse worklist"}</strong><p>${isZh ? "行政要求已完成。化驗結果可在臨床流程中保持待完成狀態。" : "Administrative checks are complete. Laboratory results may remain pending during the clinical flow."}</p></div>${button(copy("Send to nurse worklist", "轉交護士工作清單"), "send-nurse", { primary: true })}</div>`;
  } else {
    action = `<div class="next-step"><div><span>${isZh ? "目前狀態" : "Current state"}</span><strong>${isZh ? "已轉交護士" : "Routed to nurse"}</strong><p>${isZh ? "個案已出現在護士評估清單。" : "The case is now visible in the nurse assessment worklist."}</p></div>${button(copy("Open nurse worklist", "開啟護士工作清單"), "open-nurse", { primary: true })}</div>`;
  }
  return `<div class="page-heading"><div><span class="eyebrow">C02 · ${isZh ? "預約準備狀態" : "APPOINTMENT READINESS"}</span><h1>${isZh ? "選定預約的準備狀態" : "Selected appointment readiness"}</h1><p>${isZh ? "查看行政要求、準備指引及證據狀態，再決定是否轉交護士。" : "Review administrative requirements, preparation and evidence status before routing the case."}</p></div>${status(r.label, r.tone)}</div><div class="three-column">${panel(copy("Applicant and booking", "申請人及預約"), `${field(copy("Applicant", "申請人"), c.applicant)}${field(copy("Application", "申請編號"), c.caseId)}${field(copy("Appointment", "預約"), `${c.appointment} · ${text(c.clinic)}`)}${field(copy("Examination", "檢查項目"), c.examType)}`)}${panel(copy("Administrative readiness", "行政準備狀態"), adminFields.map(([label, value, tone]) => field(label, value, tone)).join(""))}${panel(copy("Clinical evidence status", "臨床證據狀態"), `${evidence}<div class="evidence-action ${c.missingEvidence.length ? "evidence-action--warning" : "evidence-action--success"}"><strong>${c.missingEvidence.length ? (isZh ? "化驗證據待完成" : "Laboratory evidence pending") : (isZh ? "證據已齊備" : "Evidence available")}</strong><span>${c.missingEvidence.length ? (isZh ? "不阻止檢查，但會阻止最終報告簽署。" : "Does not block examination, but blocks final report sign-off.") : (isZh ? "沒有未完成的必要證據。" : "No mandatory evidence is outstanding.")}</span></div>`)} </div>${panel(copy("Preparation advice", "檢查準備建議"), `<div class="advice-list"><p>${isZh ? "檢查前 12 小時禁食及不要飲水。" : "Fast and do not drink water for 12 hours before the examination."}</p><p>${isZh ? "包括抽血、身高體重、尿液檢查及心電圖。" : "Includes blood sample, height and weight, urine test and electrocardiogram."}</p><p>${isZh ? "確認地點、日期、時間及醫生性別偏好。" : "Confirm location, date, time and doctor gender preference."}</p></div>`, copy("Customer messages are CMS-owned in the target state*", "目標狀態由 CMS 負責客戶訊息*"))}${panel(copy("Recommended next step", "建議下一步"), action, "", "span-two")}`;
}

function nurseWorklist() {
  const isZh = state.locale === "zh";
  const rows = Object.values(state.cases).map((c) => {
    let label;
    let tone;
    let action;
    if (c.adminBlockers.length) {
      label = copy("Blocked before screening", "篩查前受阻");
      tone = "danger";
      action = button(copy("Review blocker", "查看阻礙"), "view-blocker", { caseKey: c.key });
    } else if (!c.nurseReady) {
      label = copy("Awaiting admin routing", "等候行政轉交");
      tone = "neutral";
      action = button(copy("View record", "查看紀錄"), "view-record", { caseKey: c.key });
    } else if (c.followUpRequested && c.missingEvidence.length) {
      label = copy("Lab follow-up requested", "已要求化驗跟進");
      tone = "warning";
      action = button(copy("Attach lab results", "附加化驗結果"), "attach-labs", { caseKey: c.key, primary: true });
    } else if (!c.screeningComplete) {
      label = copy("Ready for screening", "可開始篩查");
      tone = "info";
      action = `${button(copy("Start screening", "開始篩查"), "start-screening", { caseKey: c.key, primary: true })}<button type="button" class="table-link" data-action="view-record" data-case="${c.key}">${isZh ? "紀錄" : "Record"}</button>`;
    } else if (!c.handoverComplete) {
      label = c.missingEvidence.length ? copy("Screening complete · labs pending", "篩查完成 · 化驗待完成") : copy("Ready for handover", "可交接醫生");
      tone = c.missingEvidence.length ? "warning" : "success";
      action = button(copy("Review handover", "審閱交接"), "review-handover", { caseKey: c.key });
    } else if (c.missingEvidence.length) {
      label = copy("With doctor · labs pending", "已交醫生 · 化驗待完成");
      tone = "warning";
      action = button(copy("Attach lab results", "附加化驗結果"), "attach-labs", { caseKey: c.key });
    } else {
      label = copy("Clinical evidence complete", "臨床證據已齊備");
      tone = "success";
      action = button(copy("View record", "查看紀錄"), "view-record", { caseKey: c.key });
    }
    const missing = c.adminBlockers.length ? c.adminBlockers.join(", ") : c.missingEvidence.length ? c.missingEvidence.join(", ") : copy("None", "沒有");
    return `<tr class="${c.key === state.selectedCase ? "is-selected" : ""}"><td class="mono">${c.appointment}</td><td><strong>${escapeHtml(c.applicant)}</strong><small>${c.caseId}</small></td><td>${escapeHtml(text(c.examType))}</td><td>${status(label, tone)}</td><td>${escapeHtml(text(missing))}</td><td class="next-action-cell">${action}</td></tr>`;
  }).join("");
  return `<div class="page-heading"><div><span class="eyebrow">N01 · ${isZh ? "護士工作清單" : "NURSE WORKLIST"}</span><h1>${isZh ? "護士評估工作清單" : "Nurse assessment worklist"}</h1><p>${isZh ? "清楚顯示現在可以處理哪位病人，以及其餘個案受甚麼阻礙。" : "See which patient can be assessed now and what blocks the remaining cases."}</p></div>${status(copy("Status-driven next steps", "狀態驅動下一步"), "info")}</div><div class="metrics-grid">${metric(copy("READY TO START*", "可開始*"), String(Object.values(state.cases).filter((c) => c.nurseReady && !c.screeningComplete).length), copy("Administrative checks complete", "行政檢查已完成"), "positive")}${metric(copy("LAB FOLLOW-UP*", "化驗跟進*"), String(Object.values(state.cases).filter((c) => c.missingEvidence.length).length), copy("Visible until attached", "附加前保持可見"), "warning")}${metric(copy("ADMIN BLOCKED*", "行政受阻*"), String(Object.values(state.cases).filter((c) => c.adminBlockers.length).length), copy("Cannot start screening", "不可開始篩查"), "warning")}${metric(copy("NEXT APPOINTMENT*", "下一個預約*"), "09:20", "Wong Mei Ling")}</div>${panel(copy("Assessment queue", "評估清單"), `<div class="table-wrap"><table><thead><tr><th>${isZh ? "時間" : "Time"}</th><th>${isZh ? "病人" : "Patient"}</th><th>${isZh ? "檢查項目" : "Examination"}</th><th>${isZh ? "狀態" : "Status"}</th><th>${isZh ? "未完成要求" : "Missing requirement"}</th><th>${isZh ? "下一步" : "Next step"}</th></tr></thead><tbody>${rows}</tbody></table></div>`, copy("One primary action per case", "每個個案只有一個主要行動"))}`;
}

function nurseScreening() {
  const c = state.cases[state.selectedCase];
  const isZh = state.locale === "zh";
  if (!c.nurseReady || c.adminBlockers.length) {
    return blockedScreen("N02", copy("Screening is not available", "暫不可進行篩查"), copy("Clinic Admin must resolve readiness requirements and route the case first.", "診所行政人員必須先處理準備要求並轉交個案。"), "clinic", "C02");
  }
  const inputs = [
    [copy("Height / weight", "身高／體重"), c.vitals.heightWeight],
    [copy("BMI", "體重指數"), c.vitals.bmi],
    [copy("Blood pressure", "血壓"), c.vitals.bloodPressure],
    [copy("Pulse", "脈搏"), c.vitals.pulse],
    [copy("Urine test", "尿液檢查"), c.vitals.urine],
    [copy("Electrocardiogram", "心電圖"), c.vitals.ecg],
  ];
  const labRows = c.labs.map((lab) => `<div class="evidence-item"><div><strong>${escapeHtml(text(lab.label))}</strong><span>${escapeHtml(text(lab.source))}</span></div>${status(lab.value, lab.state === "missing" ? "warning" : "success")}</div>`).join("");
  return `<div class="page-heading"><div><span class="eyebrow">N02 · ${isZh ? "篩查及證據記錄" : "SCREENING AND EVIDENCE"}</span><h1>${isZh ? "篩查及生命體徵" : "Screening and vitals"}</h1><p>${isZh ? "記錄結構化篩查資料，並讓化驗狀態在交接時保持可見。" : "Capture structured screening data and keep laboratory status visible through handover."}</p></div>${status(c.screeningComplete ? copy("Screening complete", "篩查完成") : copy("In progress", "進行中"), c.screeningComplete ? "success" : "info")}</div><div class="content-with-rail content-with-rail--wide">${panel(copy("Nurse assessment", "護士評估"), `<div class="form-grid form-grid--two">${inputs.map(([label, value]) => `<label class="form-field"><span>${escapeHtml(text(label))}</span><input value="${escapeHtml(text(value))}" aria-label="${escapeHtml(text(label))}"></label>`).join("")}</div><div class="action-bar action-bar--inside">${button(c.screeningComplete ? copy("Screening completed", "篩查已完成") : copy("Complete screening", "完成篩查"), "complete-screening", { primary: true, disabled: c.screeningComplete })}${button(copy("Review handover", "審閱交接"), "review-handover")}</div>`, copy("All values are synthetic*", "所有數值均為模擬資料*"))}${panel(copy("Laboratory evidence", "化驗證據"), `${labRows}${c.missingEvidence.length ? `<div class="evidence-action evidence-action--warning"><strong>${isZh ? "化驗待完成" : "Laboratory results pending"}</strong><span>${isZh ? "可繼續檢查，但報告簽署仍然受阻。" : "Examination may proceed, but report sign-off remains blocked."}</span></div>` : `<div class="evidence-action evidence-action--success"><strong>${isZh ? "證據已齊備" : "Evidence complete"}</strong><span>${isZh ? "所有必要化驗結果已附加。" : "All mandatory laboratory results are attached."}</span></div>`}`)}</div>`;
}

function nurseHandover() {
  const c = state.cases[state.selectedCase];
  const isZh = state.locale === "zh";
  if (!c.screeningComplete) {
    return blockedScreen("N03", copy("Handover is not ready", "尚未可以交接"), copy("Complete N02 screening before handing the case to the doctor.", "轉交醫生前，請先完成 N02 篩查。"), "nurse", "N02");
  }
  const evidenceState = c.missingEvidence.length ? copy("Clinical screening complete, laboratory results pending", "臨床篩查完成，化驗結果待完成") : copy("All mandatory evidence is available", "所有必要證據已齊備");
  const actionLabel = c.missingEvidence.length ? copy("Handover with pending evidence", "連同待完成證據交接") : copy("Handover to doctor", "轉交醫生");
  return `<div class="page-heading"><div><span class="eyebrow">N03 · ${isZh ? "臨床交接" : "CLINICAL HANDOVER"}</span><h1>${isZh ? "醫生交接" : "Doctor handover"}</h1><p>${isZh ? "未完成證據不會在交接時消失，並會繼續限制報告簽署。" : "Outstanding evidence stays visible at handover and continues to restrict report sign-off."}</p></div>${status(c.handoverComplete ? copy("With doctor", "已交醫生") : copy("Ready for handover", "可進行交接"), c.missingEvidence.length ? "warning" : "success")}</div><div class="content-with-rail">${panel(copy("Handover summary", "交接摘要"), `<div class="summary-banner"><div><strong>${escapeHtml(c.applicant)}</strong><span>${escapeHtml(text(c.examType))}</span></div><div><strong>${escapeHtml(text(evidenceState))}</strong><span>${c.missingEvidence.length ? escapeHtml(c.missingEvidence.join(" · ")) : (isZh ? "沒有未完成項目" : "No open items")}</span></div></div><div class="section-title">${isZh ? "篩查證據" : "Screening evidence"}</div>${Object.entries(c.vitals).map(([key, value]) => field(copy(key.replaceAll(/([A-Z])/g, " $1"), key), value)).join("")}<div class="action-bar action-bar--inside">${button(c.handoverComplete ? copy("Handover completed", "交接已完成") : actionLabel, "handover", { primary: true, disabled: c.handoverComplete })}</div>`)}${panel(copy("Handover controls", "交接控制"), `<ul class="check-list"><li class="is-done">${isZh ? "身份及同意已核實" : "Identity and consent verified"}</li><li class="is-done">${isZh ? "篩查已完成" : "Screening complete"}</li><li class="${c.missingEvidence.length ? "is-open" : "is-done"}">${c.missingEvidence.length ? (isZh ? "化驗結果待完成，醫生簽署將受阻" : "Laboratory results pending, doctor sign-off blocked") : (isZh ? "證據套件完整" : "Evidence package complete")}</li></ul>`)}</div>`;
}

function doctorQueue() {
  const isZh = state.locale === "zh";
  const eligible = Object.values(state.cases).filter((c) => !c.adminBlockers.length);
  const cards = eligible.map((c) => {
    let label;
    let tone;
    if (!c.handoverComplete) {
      label = copy("Awaiting nurse handover", "等候護士交接");
      tone = "neutral";
    } else if (c.missingEvidence.length) {
      label = copy("Exam ready · report blocked", "可檢查 · 報告受阻");
      tone = "warning";
    } else {
      label = copy("Ready for examination", "可進行檢查");
      tone = "success";
    }
    return `<button type="button" class="case-card ${c.key === state.selectedCase ? "is-selected" : ""}" data-action="open-doctor-case" data-case="${c.key}" ${!c.handoverComplete ? "disabled" : ""}><span class="mono">${c.appointment}</span><strong>${escapeHtml(c.applicant)}</strong><small>${c.caseId}<br>${escapeHtml(text(c.examType))}</small>${status(label, tone)}</button>`;
  }).join("");
  return `<div class="page-heading"><div><span class="eyebrow">D01 · ${isZh ? "臨床清單" : "CLINICAL QUEUE"}</span><h1>${isZh ? "我的臨床個案" : "My clinical queue"}</h1><p>${isZh ? "行政受阻個案不會進入可處理清單。臨床檢查與報告準備狀態分開顯示。" : "Admin-blocked cases stay out of the ready queue. Examination readiness and report readiness are shown separately."}</p></div>${status(copy("Prioritised by readiness", "按準備狀態排序"), "info")}</div>${panel(copy("Today’s cases", "今日個案"), `<div class="case-cards">${cards}</div>`, copy("Dr H. Pang · Tsim Sha Tsui", "H. Pang 醫生 · 尖沙咀"))}`;
}

function doctorExam() {
  const c = state.cases[state.selectedCase];
  const isZh = state.locale === "zh";
  if (!c.handoverComplete) {
    return blockedScreen("D02", copy("Clinical examination is not ready", "尚未可以進行臨床檢查"), copy("The nurse must complete screening and hand over the case first.", "護士必須先完成篩查並交接個案。"), "nurse", "N03");
  }
  const clinicalReadiness = c.missingEvidence.length ? copy("Examination can proceed. Report sign-off remains blocked by pending laboratory evidence.", "可以進行檢查。由於化驗證據待完成，報告簽署仍然受阻。") : copy("Examination and report preparation can proceed. The evidence package is complete.", "可以進行檢查及準備報告。證據套件已完整。" );
  const findings = Object.entries(c.findings).filter(([key]) => key !== "remarks").map(([key, value]) => `<label class="form-field"><span>${escapeHtml(key.replaceAll(/([A-Z])/g, " $1"))}</span><input value="${escapeHtml(text(value))}"></label>`).join("");
  return `<div class="page-heading"><div><span class="eyebrow">D02 · ${isZh ? "臨床檢查" : "CLINICAL EXAMINATION"}</span><h1>${isZh ? "結構化臨床檢查" : "Structured clinical examination"}</h1><p>${isZh ? "醫生查看護士證據、完成檢查，並清楚看到甚麼會阻止報告簽署。" : "Review nurse evidence, complete the examination and see exactly what blocks report sign-off."}</p></div>${status(c.missingEvidence.length ? copy("Report blocked by labs", "報告受化驗阻礙") : copy("Evidence complete", "證據已齊備"), c.missingEvidence.length ? "warning" : "success")}</div><div class="three-column doctor-layout">${panel(copy("Applicant context", "申請人資料"), `${field(copy("Age / sex", "年齡／性別"), c.ageSex)}${field(copy("Product sought*", "申請產品*"), c.product)}${field(copy("Sum assured band*", "保額級別*"), c.sumBand)}${field(copy("Nurse screening", "護士篩查"), c.screeningComplete ? copy("Complete", "已完成") : copy("Pending", "待完成"), c.screeningComplete ? "success" : "warning")}`)}${panel(copy("Clinical readiness and next step", "臨床準備狀態及下一步"), `<div class="next-step ${c.missingEvidence.length ? "next-step--warning" : "next-step--success"}"><div><span>${isZh ? "目前狀態" : "Current state"}</span><strong>${c.missingEvidence.length ? (isZh ? "檢查可繼續，報告簽署受阻" : "Exam ready, report sign-off blocked") : (isZh ? "可準備報告" : "Ready to prepare report")}</strong><p>${escapeHtml(text(clinicalReadiness))}</p></div></div><div class="compact-links"><button type="button" class="table-link" data-action="view-record" data-case="${c.key}">${isZh ? "查看病人摘要" : "View patient summary"}</button><button type="button" class="table-link" data-action="view-evidence" data-case="${c.key}">${isZh ? "查看護士證據" : "View nurse evidence"}</button></div>`)}${panel(copy("Examination findings", "檢查結果"), `<div class="form-grid form-grid--two">${findings}</div><label class="form-field"><span>${isZh ? "醫生備註" : "Doctor remarks"}</span><textarea rows="4">${escapeHtml(text(c.findings.remarks))}</textarea></label><div class="action-bar action-bar--inside">${button(c.findingsSaved ? copy("Findings saved", "結果已儲存") : copy("Save findings", "儲存結果"), "save-findings", { primary: true, disabled: c.findingsSaved })}${button(copy("Prepare report", "準備報告"), "prepare-report", { disabled: !c.findingsSaved })}</div>`, "", "span-two")}</div>`;
}

function evidencePackage(c) {
  const isZh = state.locale === "zh";
  const items = [
    [copy("Health questionnaire", "健康問卷"), true, copy("Customer record*", "客戶紀錄*")],
    [copy("Nurse screening", "護士篩查"), c.screeningComplete, copy("N02", "N02")],
    [copy("Doctor findings", "醫生檢查結果"), c.findingsSaved, copy("D02", "D02")],
    ...c.labs.map((lab) => [lab.label, lab.state !== "missing", lab.source]),
  ];
  return `<div class="evidence-package"><div class="evidence-package__summary"><div><span>${isZh ? "套件狀態" : "Package status"}</span><strong>${c.missingEvidence.length ? (isZh ? "不完整" : "Incomplete") : (isZh ? "完整" : "Complete")}</strong></div>${status(c.missingEvidence.length ? copy(`${c.missingEvidence.length} items pending`, `${c.missingEvidence.length} 項待完成`) : copy("All required evidence attached", "所有必要證據已附加"), c.missingEvidence.length ? "warning" : "success")}</div>${items.map(([label, done, source]) => `<div class="evidence-item"><div><strong>${escapeHtml(text(label))}</strong><span>${escapeHtml(text(source))}</span></div>${status(done ? copy("Available", "已提供") : copy("Pending", "待完成"), done ? "success" : "warning")}</div>`).join("")}</div>`;
}

function doctorDraft() {
  const c = state.cases[state.selectedCase];
  const isZh = state.locale === "zh";
  if (!c.findingsSaved) {
    return blockedScreen("D03", copy("Report preparation is not ready", "尚未可以準備報告"), copy("Complete and save the structured examination first.", "請先完成並儲存結構化臨床檢查。"), "doctor", "D02");
  }
  const statusCopy = c.missingEvidence.length ? copy("Laboratory results pending: Lipids and HbA1c. The doctor may review the draft, but final sign-off is blocked.", "化驗結果待完成：血脂及糖化血紅素。醫生可以審閱草稿，但最終簽署受阻。") : copy("All required evidence is attached. The draft can proceed to doctor review and sign-off.", "所有必要證據已附加。草稿可進入醫生審閱及簽署。" );
  return `<div class="page-heading"><div><span class="eyebrow">D03 · ${isZh ? "報告及證據套件" : "REPORT AND EVIDENCE PACKAGE"}</span><h1>${isZh ? "AI 輔助報告草稿*" : "AI-assisted report draft*"}</h1><p>${isZh ? "草稿只根據可見證據生成，必須由醫生審閱及控制。" : "The draft is grounded only in visible evidence and remains under doctor control."}</p></div>${status(copy("Human review required", "需要人工審閱"), "info")}</div><div class="content-with-rail content-with-rail--wide">${panel(copy("Report draft", "報告草稿"), `<div class="ai-banner"><strong>${isZh ? "證據來源清晰可追蹤" : "Grounded in traceable evidence"}</strong><span>${escapeHtml(text(statusCopy))}</span></div><article class="report-draft"><h3>${isZh ? "臨床檢查摘要" : "Clinical examination summary"}</h3><p>${escapeHtml(text(c.findings.remarks))}</p><h3>${isZh ? "臨床結論" : "Clinical conclusion"}</h3><p>${c.missingEvidence.length ? (isZh ? "評估待完成。必要化驗證據尚未齊備。" : "Assessment pending. Required laboratory evidence is incomplete.") : (isZh ? "臨床紀錄可提交 PHKL 審核。沒有作出自動保單決定。" : "The clinical record is ready for PHKL review. No automatic policy decision has been made.")}</p></article><p class="footnote">${isZh ? "* 概念性草稿及完整度支援。醫生保留臨床責任，PHKL 審核在 CMS 以外進行。" : "* Conceptual drafting and completeness support only. Clinical accountability stays with the doctor and PHKL review remains outside CMS."}</p><div class="action-bar action-bar--inside">${button(c.draftGenerated ? copy("Draft refreshed", "草稿已更新") : copy("Regenerate from evidence*", "根據證據重新生成*"), "generate-draft", { primary: true })}${button(copy("Continue to review", "繼續審閱"), "review-sign")}</div>`)}${panel(copy("Evidence package status", "證據套件狀態"), `${evidencePackage(c)}${c.missingEvidence.length ? `<div class="action-bar action-bar--inside">${button(copy("Request nurse follow-up", "要求護士跟進"), "request-followup", { warning: true, disabled: c.followUpRequested })}</div>` : ""}`)}</div>`;
}

function doctorSign() {
  const c = state.cases[state.selectedCase];
  const isZh = state.locale === "zh";
  const evidenceReady = c.missingEvidence.length === 0;
  const reportReady = c.findingsSaved && c.draftGenerated;
  const canSignReport = evidenceReady && reportReady && !c.reportSigned;
  const signState = c.reportSigned
    ? { label: copy("Submitted to PHKL", "已提交 PHKL"), tone: "success" }
    : !evidenceReady
      ? { label: copy("Sign-off blocked", "簽署受阻"), tone: "warning" }
      : !reportReady
        ? { label: copy("Prior steps required", "需要完成前置步驟"), tone: "info" }
        : { label: copy("Ready for sign-off", "可簽署"), tone: "success" };
  const reportReadinessCopy = !evidenceReady
    ? copy("Report sign-off remains blocked. Missing laboratory results are not hidden or ignored.", "報告簽署仍然受阻。缺少的化驗結果不會被隱藏或忽略。")
    : !reportReady
      ? copy("Complete the examination and refresh the report draft before sign-off.", "簽署前請完成臨床檢查並更新報告草稿。")
      : copy("The evidence package and report are complete and ready for PHKL review.", "證據套件及報告已完整，可提交 PHKL 審核。");
  const priorStepNotice = evidenceReady && !reportReady
    ? `<div class="evidence-action evidence-action--warning"><strong>${isZh ? "需要完成前置步驟" : "Prior steps required"}</strong><span>${escapeHtml(text(copy("Complete the examination and refresh the report draft before sign-off.", "簽署前請完成臨床檢查並更新報告草稿。")))}</span></div>`
    : "";
  const checklist = [
    [copy("Structured findings reviewed", "已審閱結構化結果"), c.findingsSaved],
    [copy("Report draft reviewed and refreshed*", "已審閱及更新報告草稿*"), c.draftGenerated],
    [copy("Mandatory evidence complete", "必要證據已齊備"), evidenceReady],
  ];
  return `<div class="page-heading"><div><span class="eyebrow">D04 · ${isZh ? "審閱、簽署及提交" : "REVIEW, SIGN AND SUBMIT"}</span><h1>${isZh ? "最終報告審閱" : "Final report review"}</h1><p>${isZh ? "醫生簽署會鎖定紀錄，並把完整電子報告套件提交至 PHKL 審核平台。" : "Doctor sign-off locks the record and submits the complete digital package to the PHKL review platform."}</p></div>${status(signState.label, signState.tone)}</div><div class="content-with-rail">${panel(copy("Final clinical record", "最終臨床紀錄"), `<div class="summary-banner"><div><strong>${escapeHtml(c.applicant)}</strong><span>${c.caseId}</span></div><div><strong>${evidenceReady ? (isZh ? "證據套件完整" : "Evidence package complete") : (isZh ? "證據套件不完整" : "Evidence package incomplete")}</strong><span>${!evidenceReady ? escapeHtml(c.missingEvidence.join(" · ")) : reportReady ? (isZh ? "可提交" : "Ready to submit") : (isZh ? "報告步驟待完成" : "Report steps remain")}</span></div></div><article class="report-draft"><p>${escapeHtml(text(c.findings.remarks))}</p><p>${escapeHtml(text(reportReadinessCopy))}</p></article><div class="signature-block"><span>${isZh ? "專業註冊" : "Professional registration"}</span><strong>Dr H. Pang · M12874*</strong><small>${isZh ? "簽署會建立不可更改的概念性審計事件。" : "Signing creates an immutable conceptual audit event."}</small></div>`)}${panel(copy("Before you sign", "簽署前檢查"), `<ul class="check-list">${checklist.map(([label, done]) => `<li class="${done ? "is-done" : "is-open"}">${escapeHtml(text(label))}</li>`).join("")}</ul>${priorStepNotice}${!evidenceReady ? `<div class="evidence-action evidence-action--warning"><strong>${isZh ? "需要護士跟進" : "Nurse follow-up required"}</strong><span>${isZh ? "血脂及糖化血紅素結果待完成。附加結果後才能簽署。" : "Lipids and HbA1c are pending. Attach the results before sign-off."}</span></div>${button(c.followUpRequested ? copy("Follow-up requested", "已要求跟進") : copy("Request nurse follow-up", "要求護士跟進"), "request-followup", { full: true, warning: true, disabled: c.followUpRequested })}` : ""}${button(c.reportSigned ? copy("Submitted to PHKL", "已提交 PHKL") : copy("Review, e-sign & submit", "審閱、電子簽署及提交"), "sign-report", { primary: true, full: true, disabled: !canSignReport })}`)}</div>`;
}

function operations() {
  const isZh = state.locale === "zh";
  return `<div class="page-heading"><div><span class="eyebrow">O01 · ${isZh ? "營運衡量" : "OPERATIONAL MEASUREMENT"}</span><h1>${isZh ? "衡量流程流失及服務表現" : "Measure workflow leakage and service performance"}</h1><p>${isZh ? "先取得 PHKL 基線，再驗證流程改善。所有數值均為示意。" : "Capture PHKL baselines before validating improvement. All values are illustrative."}</p></div>${status(copy("Baseline required", "需要基線"), "warning")}</div><div class="metrics-grid">${metric(copy("BOOKINGS / YEAR*", "每年預約*"), "~1,000", copy("Pending PHKL confirmation", "待 PHKL 確認"))}${metric(copy("READINESS %", "準備完成率"), copy("Baseline required", "需要基線"), copy("Admin-ready before arrival", "到達前完成行政準備"), "warning")}${metric(copy("EVIDENCE COMPLETE %", "證據完整率"), copy("Baseline required", "需要基線"), copy("Before doctor sign-off", "醫生簽署前"), "warning")}${metric(copy("REPORT TURNAROUND", "報告周轉時間"), copy("Median / P90", "中位數／P90"), copy("Exam to PHKL receipt", "檢查至 PHKL 接收"))}</div>${panel(copy("Pilot measurement frame", "試點衡量框架"), `<div class="measurement-grid"><article><strong>${isZh ? "準備" : "Readiness"}</strong><p>${isZh ? "身份、同意、準備及改期在預約前完成。" : "Identity, consent, preparation and rescheduling resolved before the visit."}</p></article><article><strong>${isZh ? "證據" : "Evidence"}</strong><p>${isZh ? "化驗結果附加率、重做率及未完成證據老化。" : "Lab attachment rate, rework and ageing of missing evidence."}</p></article><article><strong>${isZh ? "報告" : "Report"}</strong><p>${isZh ? "檢查至草稿、簽署及 PHKL 接收的時間。" : "Time from examination to draft, sign-off and PHKL receipt."}</p></article></div>`)}`;
}

function blockedScreen(id, title, body, role, screen) {
  const isZh = state.locale === "zh";
  return `<div class="page-heading"><div><span class="eyebrow">${id} · ${isZh ? "受控狀態" : "CONTROLLED STATE"}</span><h1>${escapeHtml(text(title))}</h1><p>${escapeHtml(text(body))}</p></div>${status(copy("Action required", "需要處理"), "warning")}</div>${panel(copy("Required next step", "所需下一步"), `<div class="empty-state"><strong>${escapeHtml(text(title))}</strong><p>${escapeHtml(text(body))}</p>${button(copy("Open required step", "開啟所需步驟"), "go-required", { primary: true, role, screen })}</div>`)}`;
}

function renderWorkspace() {
  let content = "";
  if (state.screen === "C01") content = clinicQueue();
  if (state.screen === "C02") content = clinicReadiness();
  if (state.screen === "N01") content = nurseWorklist();
  if (state.screen === "N02") content = nurseScreening();
  if (state.screen === "N03") content = nurseHandover();
  if (state.screen === "D01") content = doctorQueue();
  if (state.screen === "D02") content = doctorExam();
  if (state.screen === "D03") content = doctorDraft();
  if (state.screen === "D04") content = doctorSign();
  if (state.screen === "O01") content = operations();
  return renderShell(content);
}

function renderModal() {
  if (!state.modal) return "";
  const isZh = state.locale === "zh";
  const c = state.cases[state.modal.caseKey || state.selectedCase];
  let title = copy("Case information", "個案資料");
  let eyebrow = copy("Traceable case state", "可追蹤個案狀態");
  let body = "";
  if (state.modal.type === "persona") {
    const persona = personas.find((item) => item.id === state.modal.personaId);
    const contextRole = contextRoles.find((item) => item.id === state.modal.personaId);
    if (persona) {
      title = persona.name;
      eyebrow = copy("Persona analysis", "角色分析");
      body = `<div class="persona-detail"><figure class="persona-detail__visual"><img src="${persona.image}" alt=""><figcaption>${status(copy("Core CMS Persona", "核心 CMS 角色"), "success")}</figcaption></figure><div class="persona-detail__content"><section><span>${isZh ? "目標" : "Objective"}</span><p>${escapeHtml(text(persona.objective))}</p></section><section><span>${isZh ? "目前狀態" : "Current State"}</span><p>${escapeHtml(text(persona.currentState))}</p></section><section><span>${isZh ? "痛點" : "Pain Point"}</span><p>${escapeHtml(text(persona.painPoint))}</p></section><section><span>${isZh ? "未來職責" : "Future Role"}</span><p>${escapeHtml(text(persona.futureRole))}</p></section><section class="persona-detail__boundary"><span>${isZh ? "資料／角色邊界" : "Data / Role Boundary"}</span><p>${escapeHtml(text(persona.boundary))}</p></section></div></div>`;
    }
    if (contextRole) {
      title = contextRole.name;
      eyebrow = copy("Supporting and boundary role", "支援及邊界角色");
      body = `<div class="persona-boundary-detail">${status(contextRole.treatment, "warning")}<section><span>${isZh ? "資料／角色邊界" : "Data / Role Boundary"}</span><p>${escapeHtml(text(contextRole.boundary))}</p></section><p>${isZh ? "此角色不會進入診所 CMS 操作工作台。" : "This role does not enter a clinic CMS operational workspace."}</p></div>`;
    }
  }
  if (state.modal.type === "scenario") {
    const scenario = scenarioById(state.modal.scenarioId);
    const stageState = scenario ? journeyActions[scenario.stage] : null;
    if (scenario && stageState) {
      title = scenario.title;
      eyebrow = copy(`${scenario.id} Scenario analysis`, `${scenario.id} 場景分析`);
      const roleSummaries = [
        [copy("Clinic Administrator", "診所行政人員"), stageState.clinic],
        [copy("Nurse / Clinical Assistant", "護士／臨床助理"), stageState.nurse],
        [copy("Contracted Doctor*", "合約醫生*"), stageState.doctor],
      ].map(([roleName, roleState]) => `<article class="scenario-role-summary ${roleState.active ? "is-active" : "is-inactive"}"><span>${escapeHtml(text(roleName))}</span><strong>${escapeHtml(text(roleState.label))}</strong><p>${escapeHtml(text(roleState.detail))}</p></article>`).join("");
      body = `<div class="scenario-detail"><figure><img src="./assets/studio/${scenario.image}" alt=""></figure><div class="scenario-detail__summary"><div>${status(copy(scenario.stage, scenario.stage), "info")}${status(copy("Read-only analysis", "只讀分析"), "neutral")}</div><p>${escapeHtml(text(scenario.summary))}</p></div><div class="scenario-detail__grid"><section><span>${isZh ? "目前狀態" : "Current State"}</span><p>${escapeHtml(text(scenario.currentState))}</p></section><section><span>${isZh ? "痛點" : "Pain Point"}</span><p>${escapeHtml(text(scenario.painPoint))}</p></section><section><span>${isZh ? "觸發條件" : "Trigger condition"}</span><p>${escapeHtml(text(stageState.trigger))}</p></section><section><span>${isZh ? "未來狀態" : "Future State"}</span><p>${escapeHtml(text(scenario.futureState))}</p></section><section><span>${isZh ? "指標／衡量意圖" : "KPI / measurement intent"}</span><p>${escapeHtml(text(scenario.kpi))}</p></section><section><span>${isZh ? "證據／假設依據" : "Evidence / assumption basis"}</span><p>${escapeHtml(text(scenario.evidence))}</p></section></div><section class="scenario-detail__roles"><h3>${isZh ? "角色行動" : "Role actions"}</h3><div>${roleSummaries}</div></section><section class="scenario-detail__boundary"><span>${isZh ? "資料／角色邊界" : "Data / Role Boundary"}</span><p>${escapeHtml(text(scenario.boundary))}</p></section><div class="scenario-detail__actions"><span>${isZh ? `進入 ${scenario.screen} 操作演示` : `Enter the ${scenario.screen} operational demo`}</span><button type="button" class="button button--primary" data-action="enter-demo" data-scenario="${scenario.id}">${isZh ? "進入演示" : "Enter Demo"}</button></div></div>`;
    }
  }
  if (state.modal.type === "record") {
    title = copy("Patient record", "病人紀錄");
    body = `${field(copy("Applicant", "申請人"), c.applicant)}${field(copy("Application", "申請編號"), c.caseId)}${field(copy("Examination", "檢查項目"), c.examType)}${field(copy("Current status", "目前狀態"), readiness(c).label)}${auditTrail(c)}`;
  }
  if (state.modal.type === "blocker") {
    title = copy("Readiness blocker", "準備狀態阻礙");
    body = `<div class="evidence-action evidence-action--warning"><strong>${isZh ? "不可開始篩查" : "Screening cannot start"}</strong><span>${escapeHtml(c.adminBlockers.join(" · "))}</span></div><p>${isZh ? "請由診所行政人員處理身份、同意及準備要求。" : "Clinic Admin must resolve identity, consent and preparation requirements."}</p>`;
  }
  if (state.modal.type === "evidence") {
    title = copy("Nurse evidence", "護士證據");
    body = `${Object.entries(c.vitals).map(([key, value]) => field(copy(key.replaceAll(/([A-Z])/g, " $1"), key), value)).join("")}${evidencePackage(c)}`;
  }
  return `<div class="modal-backdrop" data-action="close-modal"><section class="modal modal--medium" role="dialog" aria-modal="true" aria-label="${escapeHtml(text(title))}" data-modal-panel><header class="modal__header"><div><span class="eyebrow">${escapeHtml(text(eyebrow))}</span><h2>${escapeHtml(text(title))}</h2></div>${button(copy("Close", "關閉"), "close-modal", { quiet: true })}</header><div class="modal__body">${body}</div></section></div>`;
}

function render() {
  document.documentElement.lang = state.locale === "zh" ? "zh-Hant" : "en";
  root.innerHTML = state.view === "studio" ? `${renderStudio()}${renderModal()}` : renderWorkspace();
}

function navigate(role, screen) {
  state.view = "workspace";
  state.role = role;
  state.screen = screen;
}

function actionTarget(target) {
  return target.closest("[data-action]");
}

root.addEventListener("click", (event) => {
  const target = actionTarget(event.target);
  if (!target || target.disabled) return;
  const action = target.dataset.action;
  const caseKey = target.dataset.case || state.selectedCase;
  const c = state.cases[caseKey];
  let focusAfterRender = "";
  if (action === "toggle-locale") state.locale = state.locale === "en" ? "zh" : "en";
  if (action === "open-workspace") navigate("clinic", "C01");
  if (action === "back-studio") state.view = "studio";
  if (action === "open-persona") {
    state.modal = {
      type: "persona",
      personaId: target.dataset.persona,
      returnSelector: `[data-action="open-persona"][data-persona="${target.dataset.persona}"]`,
    };
  }
  if (action === "select-journey") {
    state.selectedJourney = target.dataset.journey;
    state.scenarioFilter = target.dataset.journey;
  }
  if (action === "show-all-scenarios") state.scenarioFilter = "all";
  if (action === "open-scenario-detail") {
    state.modal = {
      type: "scenario",
      scenarioId: target.dataset.scenario,
      returnSelector: `[data-action="open-scenario-detail"][data-scenario="${target.dataset.scenario}"][data-source="${target.dataset.source}"]`,
    };
  }
  if (action === "enter-demo") {
    const scenario = scenarioById(target.dataset.scenario);
    if (scenario) {
      state.modal = null;
      navigate(scenario.role, scenario.screen);
    }
  }
  if (action === "set-role") navigate(target.dataset.role, roleConfig[target.dataset.role].defaultScreen);
  if (action === "nav") state.screen = target.dataset.screen;
  if (action === "open-case") { state.selectedCase = caseKey; state.screen = "C02"; }
  if (action === "resolve-admin") {
    c.adminBlockers = [];
    c.adminReady = true;
    c.identity = copy("Matched", "已核對");
    c.consent = copy("Signed", "已簽署");
    c.preparation = copy("Confirmed", "已確認");
    addAudit(c, copy("Clinic Admin", "診所行政人員"), copy("Readiness requirements resolved", "準備要求已處理"), copy("Identity, consent and preparation are complete.", "身份、同意及準備要求已完成。"));
  }
  if (action === "send-nurse" && c.adminReady) {
    c.nurseReady = true;
    addAudit(c, copy("Clinic Admin", "診所行政人員"), copy("Routed to nurse worklist", "已轉交護士工作清單"), copy("Administrative readiness confirmed.", "行政準備狀態已確認。"));
  }
  if (action === "open-nurse") navigate("nurse", "N01");
  if (action === "start-screening") { state.selectedCase = caseKey; state.screen = "N02"; }
  if (action === "complete-screening") {
    c.screeningComplete = true;
    addAudit(c, copy("Nurse K. Tsang", "護士 K. Tsang"), copy("Screening completed", "篩查已完成"), copy("Vitals, urine test and ECG status were saved.", "生命體徵、尿液檢查及心電圖狀態已儲存。"));
  }
  if (action === "review-handover") { state.selectedCase = caseKey; state.screen = "N03"; }
  if (action === "handover" && c.screeningComplete) {
    c.handoverComplete = true;
    addAudit(c, copy("Nurse K. Tsang", "護士 K. Tsang"), copy("Handed to doctor", "已交接醫生"), c.missingEvidence.length ? copy("Pending laboratory evidence remains visible.", "待完成化驗證據保持可見。") : copy("Evidence package was complete at handover.", "交接時證據套件已完整。"));
    navigate("doctor", "D01");
  }
  if (action === "attach-labs") {
    state.selectedCase = caseKey;
    c.missingEvidence = [];
    c.labs = syntheticLabs(false);
    c.followUpRequested = false;
    addAudit(c, copy("Nurse K. Tsang", "護士 K. Tsang"), copy("Laboratory results attached", "已附加化驗結果"), copy("Lipids and HbA1c were added to the evidence package.", "血脂及糖化血紅素結果已加入證據套件。"));
  }
  if (action === "open-doctor-case") { state.selectedCase = caseKey; state.screen = "D02"; }
  if (action === "save-findings") {
    c.findingsSaved = true;
    addAudit(c, copy("Dr H. Pang", "H. Pang 醫生"), copy("Clinical findings saved", "臨床結果已儲存"), copy("Structured findings remain doctor-controlled.", "結構化結果仍由醫生控制。"));
  }
  if (action === "prepare-report") state.screen = "D03";
  if (action === "generate-draft") {
    c.draftGenerated = true;
    addAudit(c, copy("AI assist*", "AI 輔助*"), copy("Report draft refreshed", "報告草稿已更新"), copy("Draft generated from visible evidence. Human review required.", "草稿根據可見證據生成，需要人工審閱。"));
  }
  if (action === "review-sign") state.screen = "D04";
  if (action === "request-followup") {
    c.followUpRequested = true;
    addAudit(c, copy("Dr H. Pang", "H. Pang 醫生"), copy("Nurse follow-up requested", "已要求護士跟進"), copy("Laboratory results are required before report sign-off.", "報告簽署前需要化驗結果。"));
  }
  if (action === "sign-report") {
    const canSignReport = c.missingEvidence.length === 0 && c.findingsSaved && c.draftGenerated && !c.reportSigned;
    if (canSignReport) {
      c.reportSigned = true;
      addAudit(c, copy("Dr H. Pang", "H. Pang 醫生"), copy("Digital package submitted", "電子套件已提交"), copy("Signed report and laboratory evidence sent to the PHKL review platform.", "已簽署報告及化驗證據已提交至 PHKL 審核平台。"));
    }
  }
  if (action === "view-record") state.modal = { type: "record", caseKey };
  if (action === "view-blocker") state.modal = { type: "blocker", caseKey };
  if (action === "view-evidence") state.modal = { type: "evidence", caseKey };
  if (action === "close-modal") {
    focusAfterRender = state.modal?.returnSelector || "";
    state.modal = null;
  }
  if (action === "go-required") navigate(target.dataset.role, target.dataset.screen);
  if (action === "reset") state.cases = resetCases();
  render();
  if (focusAfterRender) requestAnimationFrame(() => document.querySelector(focusAfterRender)?.focus());
});

root.addEventListener("change", (event) => {
  if (event.target.dataset.action === "select-case") {
    state.selectedCase = event.target.value;
    render();
  }
});

root.addEventListener("click", (event) => {
  if (event.target.matches("[data-modal-panel], [data-modal-panel] *")) event.stopPropagation();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !state.modal) return;
  const returnSelector = state.modal.returnSelector || "";
  state.modal = null;
  render();
  if (returnSelector) requestAnimationFrame(() => document.querySelector(returnSelector)?.focus());
});

render();
