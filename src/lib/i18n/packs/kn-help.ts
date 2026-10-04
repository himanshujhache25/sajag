/* Kannada: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(ಬೀಟಾ)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value. */
export const knHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "ಹಣ ಹೋಯಿತೆ? ಮೊದಲು ಒಂದು ಉಸಿರು ತೆಗೆದುಕೊಳ್ಳಿ.",
  "madad.sub": "ನೀವು ಒಬ್ಬಂಟಿಯಲ್ಲ. ಮೊದಲ ಗಂಟೆಯೇ ಅತ್ಯಂತ ಮುಖ್ಯ.",
  "madad.call1930": "1930 ಗೆ ಕರೆ ಮಾಡಿ",
  "madad.call1930Line":
    "ಎಷ್ಟು ಬೇಗ ದೂರು ನೀಡುತ್ತೀರೋ, ಹಣವನ್ನು ತಡೆಯುವ ಸಾಧ್ಯತೆ ಅಷ್ಟು ಹೆಚ್ಚು. ಯಾರೂ ಭರವಸೆ ನೀಡಲಾರರು.",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "ಮುಂದೆ",
  "madad.back": "ಹಿಂದೆ",
  "madad.skip": "ಬಿಟ್ಟುಬಿಡಿ",
  "madad.makePlan": "ನನ್ನ ಯೋಜನೆ ಸಿದ್ಧಪಡಿಸಿ",
  "madad.savedHere": "ನಿಮ್ಮ ಉತ್ತರಗಳು ಈ ಫೋನಿನಲ್ಲೇ ಇರಿಸಲಾಗುತ್ತಿವೆ.",
  "madad.resume": "ಪೂರ್ಣಗೊಳ್ಳದ ಒಂದು ಪ್ರಕರಣ ತೆರೆದಿದೆ",
  "madad.startOver": "ಹೊಸ ಪ್ರಕರಣ ಆರಂಭಿಸಿ",

  "madad.q1": "ಯಾವಾಗ ಕಳುಹಿಸಿದಿರಿ?",
  "madad.when.now": "ಈಗಷ್ಟೇ, ಅಥವಾ ಒಂದು ಗಂಟೆಯೊಳಗೆ",
  "madad.when.today": "ಇಂದು",
  "madad.when.week": "ಕಳೆದ 7 ದಿನಗಳಲ್ಲಿ",
  "madad.when.older": "ಅದಕ್ಕಿಂತ ಹಳೆಯದು",

  "madad.q2": "ಹೇಗೆ ಕಳುಹಿಸಿದಿರಿ?",
  "madad.q2Hint": "ಒಂದಕ್ಕಿಂತ ಹೆಚ್ಚು ಆಯ್ಕೆ ಮಾಡಬಹುದು.",
  "madad.how.upi": "UPI",
  "madad.how.bank": "ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ (NEFT, IMPS)",
  "madad.how.card": "ಕಾರ್ಡ್",
  "madad.how.crypto": "ಕ್ರಿಪ್ಟೋ",
  "madad.how.cash": "ನಗದು ಅಥವಾ ಬೇರೇನಾದರೂ",

  "madad.q3": "ಎಷ್ಟು?",
  "madad.amountLabel": "ಮೊತ್ತ, ರೂಪಾಯಿಗಳಲ್ಲಿ",

  "madad.q4": "ಯಾರಿಗೆ, ಎಲ್ಲಿಗೆ?",
  "madad.q4Hint": "UPI ಐಡಿ, ಖಾತೆ ಸಂಖ್ಯೆ, ಆ್ಯಪ್ ಅಥವಾ ಜಾಲತಾಣ, ಗುಂಪು ಅಥವಾ ಸಂಖ್ಯೆ.",
  "madad.q4Found": "ಇದರಲ್ಲಿ ನಮಗೆ ಇದು ಸಿಕ್ಕಿತು",
  "madad.txnLabel": "ವಹಿವಾಟು ಐಡಿ ಅಥವಾ UTR",

  "madad.q5": "ನಿಮಗೆ ಏನು ಭರವಸೆ ನೀಡಲಾಗಿತ್ತು?",
  "madad.promised.sureProfit": "“ಖಚಿತ ಲಾಭ”",
  "madad.promised.double": "“ಹಣ ದುಪ್ಪಟ್ಟು”",
  "madad.promised.ipo": "“IPO ಹಂಚಿಕೆ”",
  "madad.promised.feeToWithdraw": "“ತೆಗೆಯಲು ಶುಲ್ಕ ಪಾವತಿಸಿ”",
  "madad.promised.other": "ಬೇರೇನಾದರೂ",
  "madad.promisedNote": "ನಿಮ್ಮದೇ ಮಾತುಗಳಲ್ಲಿ",

  "madad.q6": "ನಿಮ್ಮ ಬಳಿ ಯಾವ ಸಾಕ್ಷ್ಯ ಇದೆ?",
  "madad.proof.utr": "ವಹಿವಾಟು ಐಡಿ ಅಥವಾ UTR",
  "madad.proof.screenshots": "ಸಂಭಾಷಣೆಯ ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳು",
  "madad.proof.handle": "ಸಂಖ್ಯೆ ಅಥವಾ ಹ್ಯಾಂಡಲ್",
  "madad.proof.app": "ಆ್ಯಪ್ ಹೆಸರು ಅಥವಾ APK",
  "madad.proof.website": "ಜಾಲತಾಣದ ಕೊಂಡಿ",
  "madad.proof.recording": "ಕರೆ ಧ್ವನಿಮುದ್ರಿಕೆ",
  "madad.proof.statement": "ಬ್ಯಾಂಕ್ ಹೇಳಿಕೆ",

  "madad.script.title": "1930 ರಲ್ಲಿ ಇದನ್ನು ಓದಿ ಹೇಳಿ",
  "madad.script.body":
    "ನನ್ನ ಹೆಸರು {name}, ನಾನು {place} ಇಂದ ಮಾತನಾಡುತ್ತಿದ್ದೇನೆ. ಆನ್‌ಲೈನ್ ಹೂಡಿಕೆಯ ಹೆಸರಿನಲ್ಲಿ ನನಗೆ ಮೋಸವಾಗಿದೆ. ನಾನು {how} ಮೂಲಕ {amount} ರೂಪಾಯಿ ಕಳುಹಿಸಿದೆ. ವಹಿವಾಟು ಐಡಿ {txn}. ಹಣ {toWhom} ಗೆ ಹೋಯಿತು.",
  "madad.script.nameLabel": "ನಿಮ್ಮ ಹೆಸರು",
  "madad.script.placeLabel": "ಊರು ಅಥವಾ ಪಟ್ಟಣ",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "ನಿಮ್ಮ ಯೋಜನೆ",
  "plan.sub": "ನಿಮ್ಮದೇ ಉತ್ತರಗಳಿಂದ ಸಿದ್ಧವಾಗಿದೆ. ಇದು ಈ ಫೋನಿನಲ್ಲೇ ಉಳಿಯುತ್ತದೆ.",

  "plan.now.title": "ಈಗಲೇ, ಮೊದಲ ಗಂಟೆಯಲ್ಲಿ",
  "plan.now.call1930": "1930 ಗೆ ಕರೆ ಮಾಡಿ ಮೇಲಿನದನ್ನು ಓದಿ ಹೇಳಿ.",
  "plan.now.tellBank":
    "ನಿಮ್ಮ UPI ಆ್ಯಪ್‌ಗೆ ಅಥವಾ ಬ್ಯಾಂಕಿನ ಸಹಾಯವಾಣಿಗೆ ಕೂಡಲೇ ತಿಳಿಸಿ.",
  "plan.now.sendNothingMore":
    "ಇನ್ನು ಹಣ ಕಳುಹಿಸಬೇಡಿ. “ವಸೂಲಿ ಏಜೆಂಟ್”ಗೆ ಶುಲ್ಕ ಕೊಡಬೇಡಿ; ಅದು ಹಲವು ಬಾರಿ ಎರಡನೇ ಮೋಸ.",

  "plan.today.title": "ಇಂದು ಮುಗಿಯುವ ಮೊದಲು",
  "plan.today.portal":
    "cybercrime.gov.in ನಲ್ಲಿ ಪೂರ್ಣ ವಿವರ ತುಂಬಿ. 1930 ಕರೆಯಿಂದ ಬಂದ ಸ್ವೀಕೃತಿ ಸಂಖ್ಯೆಯನ್ನು ಇಟ್ಟುಕೊಳ್ಳಿ; ಸಾಮಾನ್ಯವಾಗಿ ಇದನ್ನು 24 ಗಂಟೆಯೊಳಗೆ ಮಾಡಲು ಹೇಳಲಾಗುತ್ತದೆ.",
  "plan.today.keepEvidence": "ಸಂಭಾಷಣೆಯನ್ನು ಅಳಿಸಬೇಡಿ. ಇದ್ದಂತೆಯೇ ಬಿಡಿ.",
  "plan.today.screenshotsSafe":
    "ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ಬೇರೆಡೆ ನಕಲಿಸಿ ಇಡಿ, ಫೋನಿನಿಂದ ಕಳೆದುಹೋಗದಂತೆ.",

  "plan.week.title": "ಈ ವಾರ",
  "plan.week.firstTheFirm":
    "ಆ ಸಂಸ್ಥೆ SEBI ಯಲ್ಲಿ ನೋಂದಣಿಯಾಗಿದ್ದರೆ, ಮೊದಲು ಸಂಸ್ಥೆಗೇ ದೂರು ನೀಡಿ.",
  "plan.week.scores":
    "ನಂತರ ಅದನ್ನು SCORES ನಲ್ಲಿ ಹಾಕಿ. ಸಂಸ್ಥೆಗೆ ಉತ್ತರಿಸಲು 21 ದಿನ ಇದೆ, ಆ ಮೇಲೆ ಎರಡು ಹಂತದ ಪರಿಶೀಲನೆ ಇದೆ.",
  "plan.week.ifUnregistered":
    "ಸಂಸ್ಥೆ ನೋಂದಣಿಯಾಗಿಲ್ಲದಿದ್ದರೆ, SEBI ಯ ದೂರು ಮಾರ್ಗ ಸಾಮಾನ್ಯವಾಗಿ ಅನ್ವಯಿಸುವುದಿಲ್ಲ. ಪೊಲೀಸ್ ಮತ್ತು ಸೈಬರ್ ಕ್ರೈಂ ಮಾರ್ಗವೇ ಸರಿ.",
  "plan.week.card":
    "ಕಾರ್ಡಿನಿಂದ ಪಾವತಿಸಿದ್ದರೆ, ಚಾರ್ಜ್‌ಬ್ಯಾಕ್ ಬಗ್ಗೆ ಬ್ಯಾಂಕನ್ನು ಕೇಳಿ.",
  "plan.week.uninstall":
    "ಆ ಆ್ಯಪ್ ತೆಗೆದುಹಾಕಿ, ಬ್ಯಾಂಕಿಂಗ್ ಪಾಸ್‌ವರ್ಡ್ ಮತ್ತು ಪಿನ್ ಬದಲಾಯಿಸಿ, ಬ್ಯಾಂಕಿಗೆ ತಿಳಿಸಿ.",

  "plan.truth.title": "ಸತ್ಯ, ನೇರವಾಗಿ",
  "plan.truth.mayNotComeBack": "ಹಣ ಮರಳಿ ಬಾರದೆಯೂ ಇರಬಹುದು.",
  "plan.truth.fasterHelps": "ಬೇಗ ದೂರು ನೀಡಿದರೆ ಅದನ್ನು ತಡೆಯುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚುತ್ತದೆ.",
  "plan.truth.recoveryFeeIsSecondScam":
    "ನಿಮ್ಮ ಹಣ ಮರಳಿ ಕೊಡಿಸುವುದಾಗಿ ಶುಲ್ಕ ಕೇಳುವವನು ಎರಡನೇ ಮೋಸ.",
  "plan.truth.notYourShame":
    "ಈ ಮೋಸಗಳನ್ನು ಬಹಳ ಜಾಗರೂಕತೆಯಿಂದ ಕಟ್ಟಲಾಗಿರುತ್ತದೆ. ಅದರಲ್ಲಿ ಸಿಕ್ಕಿಬೀಳುವುದು ನಾಚಿಕೆಯ ವಿಷಯವಲ್ಲ.",
  "plan.truth.teleManas":
    "ಮನಸ್ಸಿಗೆ ಭಾರವೆನಿಸಿದರೆ, ಟೆಲಿ-ಮಾನಸ್ 14416 ರಲ್ಲಿ ಮಾತನಾಡಬಹುದು.",

  "plan.timeline": "ಏನಾಯಿತು, ಕ್ರಮವಾಗಿ",
  "plan.timelineWhen": "ಯಾವಾಗ",
  "plan.timelineWhat": "ಏನಾಯಿತು",
  "plan.timelineAdd": "ಒಂದು ಸಾಲು ಸೇರಿಸಿ",
  "plan.timelineRemove": "ತೆಗೆಯಿರಿ",

  "plan.drafts": "ದೂರಿನ ಕರಡುಗಳು",
  "plan.portalFields": "ಸೈಬರ್ ಕ್ರೈಂ ಪೋರ್ಟಲ್ ಇದನ್ನು ಕೇಳುತ್ತದೆ",
  "plan.scoresDraft": "SCORES ಗಾಗಿ ಕರಡು",
  "plan.print": "ಮುದ್ರಿಸಿ ಅಥವಾ PDF ಮಾಡಿ",
  "plan.sendSelf": "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ನನಗೇ ಕಳುಹಿಸಿ",

  "plan.myCase": "ನನ್ನ ಪ್ರಕರಣ",
  "plan.ackLabel": "1930 ರಿಂದ ಬಂದ ಸ್ವೀಕೃತಿ ಸಂಖ್ಯೆ",
  "plan.done.called": "1930 ಗೆ ಕರೆ ಮಾಡಿದೆ",
  "plan.done.portal": "ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ತುಂಬಿದೆ",
  "plan.done.bank": "ಬ್ಯಾಂಕಿಗೆ ಅಥವಾ ಆ್ಯಪ್‌ಗೆ ತಿಳಿಸಿದೆ",
  "plan.done.firm": "ಸಂಸ್ಥೆಗೆ ದೂರು ನೀಡಿದೆ",
  "plan.done.scores": "SCORES ನಲ್ಲಿ ಹಾಕಿದೆ",
  "plan.reminder": "21 ದಿನಗಳ ದಿನಾಂಕವನ್ನು ನನ್ನ ಕ್ಯಾಲೆಂಡರ್‌ನಲ್ಲಿ ಇಡಿ",
  "plan.reminderTitle": "SCORES: 21 ದಿನಗಳು ಮುಗಿದಿವೆ",
  "plan.reminderNote":
    "ಸಂಸ್ಥೆ ಉತ್ತರಿಸದಿದ್ದರೆ, SCORES ನಲ್ಲಿ ಮುಂದಿನ ಹಂತದ ಪರಿಶೀಲನೆ ಕೇಳಿ.",
  "plan.empty": "ಮೊದಲು ಮದದ್ ನಲ್ಲಿ ಆರು ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಿಸಿ.",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "ಹಣ, OTP ಅಥವಾ ಆ್ಯಪ್ ಕೊಡಬೇಡಿ.",
  "step.high.2": "ಈ ಸಂಖ್ಯೆ ಅಥವಾ ಗುಂಪನ್ನು ನಿರ್ಬಂಧಿಸಿ ದೂರು ನೀಡಿ.",
  "step.high.3": "ನಂಬಿಕೆಯ ಯಾರಿಗಾದರೂ ತೋರಿಸಿ.",
  "step.multiple.1": "ಇಂದು ಹಣ ಕಳುಹಿಸಬೇಡಿ. 24 ಗಂಟೆ ಕಾಯಿರಿ.",
  "step.multiple.2": "ನೋಂದಣಿಯನ್ನು ನೀವೇ SEBI ತಾಣದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
  "step.multiple.3": "ಯಾರನ್ನಾದರೂ ಕೇಳಿ.",
  "step.some.1": "ಆತುರದಲ್ಲಿ ಹಣ ಕಳುಹಿಸಬೇಡಿ.",
  "step.some.2": "ನೋಂದಣಿಯನ್ನು ನೀವೇ SEBI ತಾಣದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
  "step.some.3": "ಯಾರನ್ನಾದರೂ ಕೇಳಿ.",
  "step.none.1": "ಇದು ಸುರಕ್ಷಿತ ಎಂದು ಇದರ ಅರ್ಥವಲ್ಲ.",
  "step.none.2": "ಹಣ ಕಳುಹಿಸುವ ಮೊದಲು UPI ಅಥವಾ ಖಾತೆಯನ್ನು SEBI Check ನಲ್ಲಿ ನೋಡಿ.",
  "step.notEnough.1": "ಪೂರ್ತಿ ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ, ಆಗ ಏನಾದರೂ ಹೇಳಬಹುದು.",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "ವರ್ಗ: ಆನ್‌ಲೈನ್ ಹೂಡಿಕೆಯ ಹೆಸರಿನಲ್ಲಿ ವಂಚನೆ",
  "draft.portal.when": "ಯಾವಾಗ ನಡೆಯಿತು",
  "draft.portal.amount": "ಎಷ್ಟು ಕಳುಹಿಸಲಾಯಿತು",
  "draft.portal.how": "ಹಣ ಹೇಗೆ ಹೋಯಿತು",
  "draft.portal.toWhom": "ಎಲ್ಲಿಗೆ ಹೋಯಿತು: UPI ಐಡಿ, ಖಾತೆ, ಆ್ಯಪ್, ಜಾಲತಾಣ",
  "draft.portal.txn": "ವಹಿವಾಟು ಐಡಿ ಅಥವಾ UTR",
  "draft.portal.contact": "ನಿಮ್ಮ ಹೆಸರು, ವಿಳಾಸ ಮತ್ತು ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
  "draft.portal.evidence": "ನಿಮ್ಮ ಸಾಕ್ಷ್ಯದ ಕಡತಗಳು",
  "draft.scores.noChronology": "(ಘಟನೆಗಳ ಕ್ರಮ ಇನ್ನೂ ತುಂಬಿಲ್ಲ)",
  "draft.scores.body": `ಗೆ,
ಕುಂದುಕೊರತೆ ಪರಿಹಾರ ಘಟಕ

ವಿಷಯ: ಆನ್‌ಲೈನ್ ಹೂಡಿಕೆಯ ಹೆಸರಿನಲ್ಲಿ ನಡೆದ ವಂಚನೆ ಕುರಿತು ದೂರು

1. ದೂರುದಾರರ ವಿವರ: (ಹೆಸರು, ವಿಳಾಸ, ಮೊಬೈಲ್, ಇಮೇಲ್ ತುಂಬಿ)
2. ಯಾರ ವಿರುದ್ಧ ದೂರು: {toWhom}
3. ದೂರಿನ ಸ್ವರೂಪ: {promised} ಎಂಬ ಭರವಸೆ ನೀಡಿ ಹಣ ಪಡೆಯಲಾಗಿದೆ.
4. ಘಟನೆಗಳ ಕ್ರಮ:
{chronology}
5. ಮೊತ್ತ: ರೂ {amount}
6. ವಹಿವಾಟು ಐಡಿ: {txn}
7. ಕೋರಿದ ಪರಿಹಾರ: ಕಳುಹಿಸಿದ ಮೊತ್ತ ಮರಳಿ ಸಿಗುವುದು, ಮತ್ತು ತನಿಖೆ.
8. ಲಗತ್ತಿಸಿದ ದಾಖಲೆಗಳು: {evidence}

ತಮ್ಮ ವಿಶ್ವಾಸಿ,
(ಹೆಸರು ಮತ್ತು ಸಹಿ)`,
  "draft.copy": "ಕರಡನ್ನು ನಕಲಿಸಿ",
  "draft.copied": "ನಕಲಾಗಿದೆ",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "ಮಾತನಾಡಿ",
  "check.paste": "ಅಂಟಿಸಿ",
  "check.photo": "ಫೋಟೋ",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "ಅಂಟಿಸಲು ಅನುಮತಿ ಸಿಗಲಿಲ್ಲ. ಪೆಟ್ಟಿಗೆಯನ್ನು ಒತ್ತಿ ಹಿಡಿದು, ನಂತರ ಅಂಟಿಸಿ ಆಯ್ಕೆ ಮಾಡಿ.",
  "check.fromShare": "ವಾಟ್ಸಾಪ್‌ನಿಂದ ಹಂಚಿದ ಸಂದೇಶ",
  "check.tooShort": "ಇನ್ನಷ್ಟು ಬರೆಯಿರಿ, ಇಷ್ಟರಿಂದ ಏನೂ ಹೇಳಲಾಗದು.",
  "check.tooLong": "ಸಂದೇಶ ಬಹಳ ಉದ್ದವಾಗಿದೆ, ಮೊದಲ {max} ಅಕ್ಷರಗಳನ್ನು ನೋಡಲಾಗುತ್ತಿದೆ.",
  "check.questionsTitle": "ಇಷ್ಟವಿದ್ದರೆ, ಮೂರು ಸಣ್ಣ ಪ್ರಶ್ನೆಗಳು",
  "check.q1": "ಅವರೇ ಮೊದಲು ಸಂಪರ್ಕಿಸಿದರೆ?",
  "check.q2": "ಹಣ, OTP ಅಥವಾ ಆ್ಯಪ್ ಕೇಳಿದರೆ?",
  "check.q3": "ಈ ವ್ಯಕ್ತಿ ನಿಮಗೆ ಗೊತ್ತೆ?",
  "check.samples": "ಮಾದರಿಗಳು",
  "check.samplesTitle": "ಮಾದರಿ ಸಂದೇಶಗಳು",
  "check.samplesLine": "ಇವೆಲ್ಲ ಕಲ್ಪಿತ, ಯಾವುದೂ ನಿಜವಾದ ವ್ಯಕ್ತಿಯದ್ದಲ್ಲ.",
  "check.useSample": "ಇದನ್ನು ನೋಡಿ",
  "check.listening": "ಕೇಳುತ್ತಿದೆ",
  "check.speakIdle": "ಮಾತನಾಡಿ",
  "check.voiceUnavailable":
    "ಈ ಫೋನಿನಲ್ಲಿ ಮಾತನಾಡುವ ಸೌಲಭ್ಯವಿಲ್ಲ. ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ.",
  "check.voiceOffline": "ಮಾತನಾಡಲು ಅಂತರಜಾಲ ಬೇಕು. ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ.",
  "check.voiceNothingHeard":
    "ಏನೂ ಕೇಳಿಸಲಿಲ್ಲ. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ.",
  "check.voiceDenied":
    "ಮೈಕ್ರೊಫೋನ್ ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ನಲ್ಲಿ ಅನುಮತಿಸಿ, ಅಥವಾ ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ.",
  "check.ocrOffline":
    "ಫೋಟೋ ಓದಲು ಮೊದಲ ಬಾರಿ ಅಂತರಜಾಲ ಬೇಕು. ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ.",
  "check.ocrReading": "ಚಿತ್ರವನ್ನು ಓದಲಾಗುತ್ತಿದೆ",
  "check.ocrStayed": "ಫೋಟೋ ನಿಮ್ಮ ಫೋನಿನಿಂದ ಹೊರಗೆ ಹೋಗಲಿಲ್ಲ",
  "check.ocrLowConfidence": "ಕೆಲವು ಪದಗಳು ತಪ್ಪಾಗಿ ಓದಿರಬಹುದು, ಒಮ್ಮೆ ನೋಡಿಕೊಳ್ಳಿ.",
  "check.ocrFailed":
    "ಚಿತ್ರ ಸ್ಪಷ್ಟವಾಗಿ ಓದಲಾಗಲಿಲ್ಲ. ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ ಅಥವಾ ಮತ್ತೆ ತೆಗೆಯಿರಿ.",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "ಸಂದೇಶವನ್ನು ಇಲ್ಲಿ ಅಂಟಿಸಿ, ಅಥವಾ ಕೆಳಗೆ ಮಾತನಾಡಿ",
  "composer.label": "ಪರಿಶೀಲಿಸಬೇಕಾದ ಸಂದೇಶ",
  "composer.speak": "ಮಾತನಾಡಿ",
  "composer.photo": "ಫೋಟೋ",
  "composer.primedVoice": "ಮಾತನಾಡಿ ಒತ್ತಿ, ಸಂದೇಶವನ್ನು ಓದಿ ಹೇಳಿ.",
  "composer.primedPhoto": "ಫೋಟೋ ಒತ್ತಿ ಸ್ಕ್ರೀನ್‌ಶಾಟ್ ಆಯ್ಕೆ ಮಾಡಿ.",
  "composer.paste": "ಅಂಟಿಸಿ",
  "composer.clear": "ಅಳಿಸಿ",
  "composer.submit": "ಪರಿಶೀಲಿಸಿ",
  "composer.empty": "ಮೊದಲು ಸಂದೇಶವನ್ನು ಅಂಟಿಸಿ ಅಥವಾ ಮಾತನಾಡಿ",
  "composer.privacy": "ಪರಿಶೀಲನೆ ಈ ಫೋನಿನಲ್ಲೇ ನಡೆಯುತ್ತದೆ",
  "composer.photoPrivacy": "ಫೋಟೋ ನಿಮ್ಮ ಫೋನಿನಿಂದ ಹೊರಗೆ ಹೋಗಲಿಲ್ಲ",
  "composer.photoReading": "ಫೋಟೋವನ್ನು ಓದಲಾಗುತ್ತಿದೆ… {pct}%",
  "composer.fromShare": "ಬೇರೆ ಆ್ಯಪ್‌ನಿಂದ ಹಂಚಿದ ಸಂದೇಶ",
  "composer.cleared": "ನೀವು ಬರೆದಿದ್ದನ್ನು ಅಳಿಸಲಾಗಿದೆ.",
};
