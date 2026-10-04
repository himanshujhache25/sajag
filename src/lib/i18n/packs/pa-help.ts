/* Punjabi: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(ਬੀਟਾ)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value. */
export const paHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "ਪੈਸੇ ਚਲੇ ਗਏ? ਪਹਿਲਾਂ ਇੱਕ ਸਾਹ ਲਵੋ।",
  "madad.sub": "ਤੁਸੀਂ ਇਕੱਲੇ ਨਹੀਂ ਹੋ। ਪਹਿਲਾ ਘੰਟਾ ਹੀ ਸਭ ਤੋਂ ਜ਼ਰੂਰੀ ਹੈ।",
  "madad.call1930": "੧੯੩੦ ਉੱਤੇ ਫ਼ੋਨ ਕਰੋ",
  "madad.call1930Line":
    "ਜਿੰਨੀ ਛੇਤੀ ਦੱਸੋਗੇ, ਪੈਸੇ ਰੋਕਣ ਦੀ ਸੰਭਾਵਨਾ ਓਨੀ ਵੱਧ। ਕੋਈ ਵੀ ਵਾਅਦਾ ਨਹੀਂ ਕਰ ਸਕਦਾ।",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "ਅੱਗੇ",
  "madad.back": "ਪਿੱਛੇ",
  "madad.skip": "ਛੱਡੋ",
  "madad.makePlan": "ਮੇਰੀ ਯੋਜਨਾ ਬਣਾਓ",
  "madad.savedHere": "ਤੁਹਾਡੇ ਜਵਾਬ ਇਸੇ ਫ਼ੋਨ ਵਿੱਚ ਰੱਖੇ ਜਾ ਰਹੇ ਹਨ।",
  "madad.resume": "ਇੱਕ ਅਧੂਰਾ ਕੇਸ ਖੁੱਲ੍ਹਾ ਹੈ",
  "madad.startOver": "ਨਵਾਂ ਕੇਸ ਸ਼ੁਰੂ ਕਰੋ",

  "madad.q1": "ਤੁਸੀਂ ਕਦੋਂ ਭੇਜੇ?",
  "madad.when.now": "ਹੁਣੇ ਹੀ, ਜਾਂ ਇੱਕ ਘੰਟੇ ਵਿੱਚ",
  "madad.when.today": "ਅੱਜ",
  "madad.when.week": "ਪਿਛਲੇ ੭ ਦਿਨਾਂ ਵਿੱਚ",
  "madad.when.older": "ਉਸ ਤੋਂ ਵੀ ਪੁਰਾਣਾ",

  "madad.q2": "ਤੁਸੀਂ ਕਿਵੇਂ ਭੇਜੇ?",
  "madad.q2Hint": "ਇੱਕ ਤੋਂ ਵੱਧ ਚੁਣ ਸਕਦੇ ਹੋ।",
  "madad.how.upi": "UPI",
  "madad.how.bank": "ਬੈਂਕ ਟ੍ਰਾਂਸਫ਼ਰ (NEFT, IMPS)",
  "madad.how.card": "ਕਾਰਡ",
  "madad.how.crypto": "ਕ੍ਰਿਪਟੋ",
  "madad.how.cash": "ਨਕਦ ਜਾਂ ਕੁਝ ਹੋਰ",

  "madad.q3": "ਕਿੰਨੇ?",
  "madad.amountLabel": "ਰਕਮ, ਰੁਪਏ ਵਿੱਚ",

  "madad.q4": "ਕਿਸਨੂੰ, ਅਤੇ ਕਿੱਥੇ?",
  "madad.q4Hint": "UPI ਆਈਡੀ, ਖਾਤਾ ਨੰਬਰ, ਐਪ ਜਾਂ ਵੈੱਬਸਾਈਟ, ਗਰੁੱਪ ਜਾਂ ਨੰਬਰ।",
  "madad.q4Found": "ਸਾਨੂੰ ਇਸ ਵਿੱਚ ਇਹ ਮਿਲਿਆ",
  "madad.txnLabel": "ਲੈਣ-ਦੇਣ ਆਈਡੀ ਜਾਂ UTR",

  "madad.q5": "ਤੁਹਾਨੂੰ ਕੀ ਵਾਅਦਾ ਕੀਤਾ ਗਿਆ ਸੀ?",
  "madad.promised.sureProfit": "“ਪੱਕਾ ਮੁਨਾਫ਼ਾ”",
  "madad.promised.double": "“ਪੈਸੇ ਦੁੱਗਣੇ”",
  "madad.promised.ipo": "“IPO ਅਲਾਟਮੈਂਟ”",
  "madad.promised.feeToWithdraw": "“ਕਢਵਾਉਣ ਲਈ ਫ਼ੀਸ ਭਰੋ”",
  "madad.promised.other": "ਕੁਝ ਹੋਰ",
  "madad.promisedNote": "ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ",

  "madad.q6": "ਤੁਹਾਡੇ ਕੋਲ ਕੀ ਸਬੂਤ ਹੈ?",
  "madad.proof.utr": "ਲੈਣ-ਦੇਣ ਆਈਡੀ ਜਾਂ UTR",
  "madad.proof.screenshots": "ਗੱਲਬਾਤ ਦੇ ਸਕ੍ਰੀਨਸ਼ਾਟ",
  "madad.proof.handle": "ਨੰਬਰ ਜਾਂ ਹੈਂਡਲ",
  "madad.proof.app": "ਐਪ ਦਾ ਨਾਂ ਜਾਂ APK",
  "madad.proof.website": "ਵੈੱਬਸਾਈਟ ਦਾ ਲਿੰਕ",
  "madad.proof.recording": "ਕਾਲ ਰਿਕਾਰਡਿੰਗ",
  "madad.proof.statement": "ਬੈਂਕ ਸਟੇਟਮੈਂਟ",

  "madad.script.title": "੧੯੩੦ ਉੱਤੇ ਇਹ ਪੜ੍ਹ ਕੇ ਸੁਣਾਓ",
  "madad.script.body":
    "ਮੇਰਾ ਨਾਂ {name} ਹੈ, ਮੈਂ {place} ਤੋਂ ਬੋਲ ਰਿਹਾ ਹਾਂ। ਆਨਲਾਈਨ ਨਿਵੇਸ਼ ਦੇ ਨਾਂ ਉੱਤੇ ਮੇਰੇ ਨਾਲ ਠੱਗੀ ਹੋਈ ਹੈ। ਮੈਂ {how} ਰਾਹੀਂ {amount} ਰੁਪਏ ਭੇਜੇ। ਲੈਣ-ਦੇਣ ਆਈਡੀ {txn} ਹੈ। ਪੈਸੇ {toWhom} ਕੋਲ ਗਏ।",
  "madad.script.nameLabel": "ਤੁਹਾਡਾ ਨਾਂ",
  "madad.script.placeLabel": "ਪਿੰਡ ਜਾਂ ਸ਼ਹਿਰ",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "ਤੁਹਾਡੀ ਯੋਜਨਾ",
  "plan.sub": "ਤੁਹਾਡੇ ਆਪਣੇ ਜਵਾਬਾਂ ਤੋਂ ਹੀ ਬਣੀ ਹੈ। ਇਹ ਇਸੇ ਫ਼ੋਨ ਵਿੱਚ ਰਹਿੰਦੀ ਹੈ।",

  "plan.now.title": "ਹੁਣੇ ਹੀ, ਪਹਿਲੇ ਘੰਟੇ ਵਿੱਚ",
  "plan.now.call1930": "੧੯੩੦ ਉੱਤੇ ਫ਼ੋਨ ਕਰ ਕੇ ਉੱਪਰ ਵਾਲਾ ਪੜ੍ਹ ਕੇ ਸੁਣਾਓ।",
  "plan.now.tellBank":
    "ਆਪਣੀ UPI ਐਪ ਜਾਂ ਬੈਂਕ ਦੀ ਹੈਲਪਲਾਈਨ ਨੂੰ ਵੀ ਤੁਰੰਤ ਦੱਸੋ।",
  "plan.now.sendNothingMore":
    "ਹੋਰ ਪੈਸੇ ਨਾ ਭੇਜੋ। ਕਿਸੇ “ਰਿਕਵਰੀ ਏਜੰਟ” ਨੂੰ ਫ਼ੀਸ ਨਾ ਦਿਓ; ਉਹ ਅਕਸਰ ਦੂਜੀ ਠੱਗੀ ਹੁੰਦੀ ਹੈ।",

  "plan.today.title": "ਅੱਜ ਦਾ ਦਿਨ ਮੁੱਕਣ ਤੋਂ ਪਹਿਲਾਂ",
  "plan.today.portal":
    "cybercrime.gov.in ਉੱਤੇ ਪੂਰੀ ਜਾਣਕਾਰੀ ਭਰੋ। ੧੯੩੦ ਦੀ ਕਾਲ ਤੋਂ ਮਿਲਿਆ ਰਸੀਦ ਨੰਬਰ ਸੰਭਾਲ ਕੇ ਰੱਖੋ; ਆਮ ਤੌਰ ਉੱਤੇ ਇਹ ੨੪ ਘੰਟਿਆਂ ਵਿੱਚ ਕਰਨ ਲਈ ਕਿਹਾ ਜਾਂਦਾ ਹੈ।",
  "plan.today.keepEvidence": "ਗੱਲਬਾਤ ਨਾ ਮਿਟਾਓ। ਜਿਵੇਂ ਹੈ ਉਵੇਂ ਰਹਿਣ ਦਿਓ।",
  "plan.today.screenshotsSafe":
    "ਸਕ੍ਰੀਨਸ਼ਾਟ ਕਿਤੇ ਹੋਰ ਕਾਪੀ ਕਰ ਕੇ ਰੱਖੋ, ਤਾਂ ਜੋ ਫ਼ੋਨ ਵਿੱਚੋਂ ਗੁਆਚ ਨਾ ਜਾਣ।",

  "plan.week.title": "ਇਸ ਹਫ਼ਤੇ",
  "plan.week.firstTheFirm":
    "ਜੇ ਫ਼ਰਮ SEBI ਕੋਲ ਰਜਿਸਟਰਡ ਹੈ, ਤਾਂ ਪਹਿਲਾਂ ਫ਼ਰਮ ਨੂੰ ਹੀ ਸ਼ਿਕਾਇਤ ਕਰੋ।",
  "plan.week.scores":
    "ਫਿਰ ਉਸਨੂੰ SCORES ਉੱਤੇ ਪਾਓ। ਫ਼ਰਮ ਕੋਲ ਜਵਾਬ ਦੇਣ ਲਈ ੨੧ ਦਿਨ ਹਨ, ਉਸ ਤੋਂ ਬਾਅਦ ਦੋ ਪੱਧਰ ਦੀ ਸਮੀਖਿਆ ਹੈ।",
  "plan.week.ifUnregistered":
    "ਜੇ ਫ਼ਰਮ ਰਜਿਸਟਰਡ ਨਹੀਂ, ਤਾਂ SEBI ਦਾ ਸ਼ਿਕਾਇਤ ਰਾਹ ਆਮ ਤੌਰ ਉੱਤੇ ਲਾਗੂ ਨਹੀਂ ਹੁੰਦਾ। ਪੁਲਿਸ ਅਤੇ ਸਾਈਬਰ ਕ੍ਰਾਈਮ ਦਾ ਰਾਹ ਹੀ ਠੀਕ ਹੈ।",
  "plan.week.card":
    "ਜੇ ਕਾਰਡ ਨਾਲ ਭਰਿਆ ਸੀ, ਤਾਂ ਬੈਂਕ ਤੋਂ ਚਾਰਜਬੈਕ ਬਾਰੇ ਪੁੱਛੋ।",
  "plan.week.uninstall":
    "ਉਹ ਐਪ ਹਟਾ ਦਿਓ, ਬੈਂਕਿੰਗ ਪਾਸਵਰਡ ਅਤੇ ਪਿੰਨ ਬਦਲੋ, ਅਤੇ ਬੈਂਕ ਨੂੰ ਦੱਸੋ।",

  "plan.truth.title": "ਸੱਚ, ਸਿੱਧਾ",
  "plan.truth.mayNotComeBack": "ਪੈਸੇ ਵਾਪਸ ਨਾ ਵੀ ਆਉਣ।",
  "plan.truth.fasterHelps": "ਛੇਤੀ ਦੱਸਣ ਨਾਲ ਉਸਨੂੰ ਰੋਕਣ ਦੀ ਸੰਭਾਵਨਾ ਵਧਦੀ ਹੈ।",
  "plan.truth.recoveryFeeIsSecondScam":
    "ਜੋ ਤੁਹਾਡੇ ਪੈਸੇ ਵਾਪਸ ਦਿਵਾਉਣ ਲਈ ਫ਼ੀਸ ਮੰਗੇ, ਉਹ ਦੂਜੀ ਠੱਗੀ ਹੈ।",
  "plan.truth.notYourShame":
    "ਇਹ ਠੱਗੀਆਂ ਬੜੇ ਧਿਆਨ ਨਾਲ ਘੜੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਇਨ੍ਹਾਂ ਵਿੱਚ ਫਸਣਾ ਸ਼ਰਮ ਦੀ ਗੱਲ ਨਹੀਂ।",
  "plan.truth.teleManas":
    "ਜੇ ਮਨ ਉੱਤੇ ਭਾਰ ਲੱਗੇ, ਤਾਂ ਟੈਲੀ-ਮਾਨਸ ੧੪੪੧੬ ਉੱਤੇ ਗੱਲ ਕਰ ਸਕਦੇ ਹੋ।",

  "plan.timeline": "ਕੀ ਹੋਇਆ, ਤਰਤੀਬ ਵਿੱਚ",
  "plan.timelineWhen": "ਕਦੋਂ",
  "plan.timelineWhat": "ਕੀ ਹੋਇਆ",
  "plan.timelineAdd": "ਇੱਕ ਸਤਰ ਜੋੜੋ",
  "plan.timelineRemove": "ਹਟਾਓ",

  "plan.drafts": "ਸ਼ਿਕਾਇਤ ਦੇ ਖਰੜੇ",
  "plan.portalFields": "ਸਾਈਬਰ ਕ੍ਰਾਈਮ ਪੋਰਟਲ ਇਹ ਪੁੱਛੇਗਾ",
  "plan.scoresDraft": "SCORES ਲਈ ਖਰੜਾ",
  "plan.print": "ਛਾਪੋ ਜਾਂ PDF ਬਣਾਓ",
  "plan.sendSelf": "ਵਟਸਐਪ ਉੱਤੇ ਆਪਣੇ ਆਪ ਨੂੰ ਭੇਜੋ",

  "plan.myCase": "ਮੇਰਾ ਕੇਸ",
  "plan.ackLabel": "੧੯੩੦ ਤੋਂ ਮਿਲਿਆ ਰਸੀਦ ਨੰਬਰ",
  "plan.done.called": "੧੯੩੦ ਉੱਤੇ ਫ਼ੋਨ ਕੀਤਾ",
  "plan.done.portal": "ਪੋਰਟਲ ਵਿੱਚ ਭਰਿਆ",
  "plan.done.bank": "ਬੈਂਕ ਜਾਂ ਐਪ ਨੂੰ ਦੱਸਿਆ",
  "plan.done.firm": "ਫ਼ਰਮ ਨੂੰ ਸ਼ਿਕਾਇਤ ਕੀਤੀ",
  "plan.done.scores": "SCORES ਉੱਤੇ ਪਾਇਆ",
  "plan.reminder": "੨੧ ਦਿਨਾਂ ਦੀ ਤਾਰੀਖ਼ ਮੇਰੇ ਕੈਲੰਡਰ ਵਿੱਚ ਪਾਓ",
  "plan.reminderTitle": "SCORES: ੨੧ ਦਿਨ ਪੂਰੇ ਹੋ ਗਏ",
  "plan.reminderNote":
    "ਜੇ ਫ਼ਰਮ ਨੇ ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ, ਤਾਂ SCORES ਉੱਤੇ ਅਗਲੇ ਪੱਧਰ ਦੀ ਸਮੀਖਿਆ ਮੰਗੋ।",
  "plan.empty": "ਪਹਿਲਾਂ ਮਦਦ ਵਿੱਚ ਛੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਦਿਓ।",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "ਪੈਸੇ, OTP ਜਾਂ ਐਪ ਨਾ ਦਿਓ।",
  "step.high.2": "ਇਹ ਨੰਬਰ ਜਾਂ ਗਰੁੱਪ ਬਲਾਕ ਕਰ ਕੇ ਸ਼ਿਕਾਇਤ ਕਰੋ।",
  "step.high.3": "ਭਰੋਸੇ ਵਾਲੇ ਕਿਸੇ ਨੂੰ ਦਿਖਾਓ।",
  "step.multiple.1": "ਅੱਜ ਪੈਸੇ ਨਾ ਭੇਜੋ। ੨੪ ਘੰਟੇ ਉਡੀਕੋ।",
  "step.multiple.2": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਆਪ SEBI ਦੀ ਸਾਈਟ ਉੱਤੇ ਜਾਂਚੋ।",
  "step.multiple.3": "ਕਿਸੇ ਨੂੰ ਪੁੱਛੋ।",
  "step.some.1": "ਕਾਹਲੀ ਵਿੱਚ ਪੈਸੇ ਨਾ ਭੇਜੋ।",
  "step.some.2": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਆਪ SEBI ਦੀ ਸਾਈਟ ਉੱਤੇ ਜਾਂਚੋ।",
  "step.some.3": "ਕਿਸੇ ਨੂੰ ਪੁੱਛੋ।",
  "step.none.1": "ਇਸਦਾ ਮਤਲਬ ਇਹ ਨਹੀਂ ਕਿ ਇਹ ਸੁਰੱਖਿਅਤ ਹੈ।",
  "step.none.2": "ਪੈਸੇ ਭੇਜਣ ਤੋਂ ਪਹਿਲਾਂ UPI ਜਾਂ ਖਾਤਾ SEBI Check ਉੱਤੇ ਦੇਖੋ।",
  "step.notEnough.1": "ਪੂਰਾ ਸੁਨੇਹਾ ਚਿਪਕਾਓ, ਫਿਰ ਕੁਝ ਕਿਹਾ ਜਾ ਸਕੇਗਾ।",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "ਸ਼੍ਰੇਣੀ: ਆਨਲਾਈਨ ਨਿਵੇਸ਼ ਦੇ ਨਾਂ ਉੱਤੇ ਠੱਗੀ",
  "draft.portal.when": "ਕਦੋਂ ਹੋਇਆ",
  "draft.portal.amount": "ਕਿੰਨੇ ਭੇਜੇ ਗਏ",
  "draft.portal.how": "ਪੈਸੇ ਕਿਵੇਂ ਗਏ",
  "draft.portal.toWhom": "ਕਿੱਥੇ ਗਏ: UPI ਆਈਡੀ, ਖਾਤਾ, ਐਪ, ਵੈੱਬਸਾਈਟ",
  "draft.portal.txn": "ਲੈਣ-ਦੇਣ ਆਈਡੀ ਜਾਂ UTR",
  "draft.portal.contact": "ਤੁਹਾਡਾ ਨਾਂ, ਪਤਾ ਅਤੇ ਮੋਬਾਈਲ ਨੰਬਰ",
  "draft.portal.evidence": "ਤੁਹਾਡੀਆਂ ਸਬੂਤ ਫ਼ਾਈਲਾਂ",
  "draft.scores.noChronology": "(ਘਟਨਾਵਾਂ ਦੀ ਤਰਤੀਬ ਹਾਲੇ ਭਰੀ ਨਹੀਂ ਗਈ)",
  "draft.scores.body": `ਸੇਵਾ ਵਿਖੇ,
ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ ਸੈੱਲ

ਵਿਸ਼ਾ: ਆਨਲਾਈਨ ਨਿਵੇਸ਼ ਦੇ ਨਾਂ ਉੱਤੇ ਹੋਈ ਠੱਗੀ ਬਾਰੇ ਸ਼ਿਕਾਇਤ

੧. ਸ਼ਿਕਾਇਤਕਰਤਾ ਦਾ ਵੇਰਵਾ: (ਨਾਂ, ਪਤਾ, ਮੋਬਾਈਲ, ਈਮੇਲ ਭਰੋ)
੨. ਜਿਸ ਵਿਰੁੱਧ ਸ਼ਿਕਾਇਤ ਹੈ: {toWhom}
੩. ਸ਼ਿਕਾਇਤ ਦੀ ਕਿਸਮ: {promised} ਦਾ ਵਾਅਦਾ ਕਰ ਕੇ ਪੈਸੇ ਲਏ ਗਏ।
੪. ਘਟਨਾਕ੍ਰਮ:
{chronology}
੫. ਰਕਮ: ਰੁ {amount}
੬. ਲੈਣ-ਦੇਣ ਆਈਡੀ: {txn}
੭. ਮੰਗੀ ਗਈ ਰਾਹਤ: ਭੇਜੀ ਰਕਮ ਦੀ ਵਾਪਸੀ, ਅਤੇ ਇੱਕ ਜਾਂਚ।
੮. ਨਾਲ ਲੱਗੇ ਦਸਤਾਵੇਜ਼: {evidence}

ਆਪ ਜੀ ਦਾ ਵਿਸ਼ਵਾਸਪਾਤਰ,
(ਨਾਂ ਅਤੇ ਦਸਤਖ਼ਤ)`,
  "draft.copy": "ਖਰੜਾ ਕਾਪੀ ਕਰੋ",
  "draft.copied": "ਕਾਪੀ ਹੋ ਗਿਆ",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "ਬੋਲੋ",
  "check.paste": "ਚਿਪਕਾਓ",
  "check.photo": "ਫ਼ੋਟੋ",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "ਚਿਪਕਾਉਣ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਮਿਲੀ। ਡੱਬੇ ਨੂੰ ਦਬਾ ਕੇ ਰੱਖੋ, ਫਿਰ ਚਿਪਕਾਓ ਚੁਣੋ।",
  "check.fromShare": "ਵਟਸਐਪ ਤੋਂ ਭੇਜਿਆ ਸੁਨੇਹਾ",
  "check.tooShort": "ਥੋੜ੍ਹਾ ਹੋਰ ਲਿਖੋ, ਇੰਨੇ ਨਾਲ ਕੁਝ ਨਹੀਂ ਕਿਹਾ ਜਾ ਸਕਦਾ।",
  "check.tooLong": "ਸੁਨੇਹਾ ਬਹੁਤ ਲੰਮਾ ਹੈ, ਪਹਿਲੇ {max} ਅੱਖਰ ਦੇਖੇ ਜਾ ਰਹੇ ਹਨ।",
  "check.questionsTitle": "ਜੇ ਚਾਹੋ, ਤਿੰਨ ਛੋਟੇ ਸਵਾਲ",
  "check.q1": "ਕੀ ਉਨ੍ਹਾਂ ਨੇ ਹੀ ਪਹਿਲਾਂ ਸੰਪਰਕ ਕੀਤਾ ਸੀ?",
  "check.q2": "ਕੀ ਪੈਸੇ, OTP ਜਾਂ ਐਪ ਮੰਗੀ?",
  "check.q3": "ਕੀ ਤੁਸੀਂ ਇਸ ਬੰਦੇ ਨੂੰ ਜਾਣਦੇ ਹੋ?",
  "check.samples": "ਨਮੂਨੇ",
  "check.samplesTitle": "ਨਮੂਨਾ ਸੁਨੇਹੇ",
  "check.samplesLine": "ਇਹ ਸਾਰੇ ਕਲਪਿਤ ਹਨ, ਕੋਈ ਵੀ ਅਸਲ ਬੰਦੇ ਦਾ ਨਹੀਂ।",
  "check.useSample": "ਇਹ ਦੇਖੋ",
  "check.listening": "ਸੁਣ ਰਹੇ ਹਾਂ",
  "check.speakIdle": "ਬੋਲੋ",
  "check.voiceUnavailable": "ਇਸ ਫ਼ੋਨ ਵਿੱਚ ਬੋਲਣ ਦੀ ਸਹੂਲਤ ਨਹੀਂ। ਸੁਨੇਹਾ ਚਿਪਕਾਓ।",
  "check.voiceOffline": "ਬੋਲਣ ਲਈ ਇੰਟਰਨੈੱਟ ਚਾਹੀਦਾ ਹੈ। ਸੁਨੇਹਾ ਚਿਪਕਾਓ।",
  "check.voiceNothingHeard":
    "ਕੁਝ ਸੁਣਾਈ ਨਹੀਂ ਦਿੱਤਾ। ਦੁਬਾਰਾ ਕਰੋ, ਜਾਂ ਸੁਨੇਹਾ ਚਿਪਕਾਓ।",
  "check.voiceDenied":
    "ਮਾਈਕ੍ਰੋਫ਼ੋਨ ਬੰਦ ਹੈ। ਬ੍ਰਾਊਜ਼ਰ ਦੀਆਂ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਇਜਾਜ਼ਤ ਦਿਓ, ਜਾਂ ਸੁਨੇਹਾ ਚਿਪਕਾਓ।",
  "check.ocrOffline":
    "ਫ਼ੋਟੋ ਪੜ੍ਹਨ ਲਈ ਪਹਿਲੀ ਵਾਰ ਇੰਟਰਨੈੱਟ ਚਾਹੀਦਾ ਹੈ। ਸੁਨੇਹਾ ਚਿਪਕਾਓ।",
  "check.ocrReading": "ਤਸਵੀਰ ਪੜ੍ਹੀ ਜਾ ਰਹੀ ਹੈ",
  "check.ocrStayed": "ਫ਼ੋਟੋ ਤੁਹਾਡੇ ਫ਼ੋਨ ਤੋਂ ਬਾਹਰ ਨਹੀਂ ਗਈ",
  "check.ocrLowConfidence": "ਕੁਝ ਸ਼ਬਦ ਗ਼ਲਤ ਪੜ੍ਹੇ ਗਏ ਹੋ ਸਕਦੇ ਹਨ, ਇੱਕ ਵਾਰ ਦੇਖ ਲਵੋ।",
  "check.ocrFailed":
    "ਤਸਵੀਰ ਸਾਫ਼ ਨਹੀਂ ਪੜ੍ਹੀ ਗਈ। ਸੁਨੇਹਾ ਚਿਪਕਾਓ ਜਾਂ ਦੁਬਾਰਾ ਫ਼ੋਟੋ ਲਵੋ।",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "ਸੁਨੇਹਾ ਇੱਥੇ ਚਿਪਕਾਓ, ਜਾਂ ਹੇਠਾਂ ਬੋਲੋ",
  "composer.label": "ਜਾਂਚਣ ਵਾਲਾ ਸੁਨੇਹਾ",
  "composer.speak": "ਬੋਲੋ",
  "composer.photo": "ਫ਼ੋਟੋ",
  "composer.primedVoice": "ਬੋਲੋ ਦਬਾਓ ਅਤੇ ਸੁਨੇਹਾ ਪੜ੍ਹ ਕੇ ਸੁਣਾਓ।",
  "composer.primedPhoto": "ਫ਼ੋਟੋ ਦਬਾ ਕੇ ਸਕ੍ਰੀਨਸ਼ਾਟ ਚੁਣੋ।",
  "composer.paste": "ਚਿਪਕਾਓ",
  "composer.clear": "ਮਿਟਾਓ",
  "composer.submit": "ਜਾਂਚੋ",
  "composer.empty": "ਪਹਿਲਾਂ ਸੁਨੇਹਾ ਚਿਪਕਾਓ ਜਾਂ ਬੋਲੋ",
  "composer.privacy": "ਜਾਂਚ ਸਿਰਫ਼ ਇਸੇ ਫ਼ੋਨ ਵਿੱਚ ਹੁੰਦੀ ਹੈ",
  "composer.photoPrivacy": "ਫ਼ੋਟੋ ਤੁਹਾਡੇ ਫ਼ੋਨ ਤੋਂ ਬਾਹਰ ਨਹੀਂ ਗਈ",
  "composer.photoReading": "ਫ਼ੋਟੋ ਪੜ੍ਹੀ ਜਾ ਰਹੀ ਹੈ… {pct}%",
  "composer.fromShare": "ਕਿਸੇ ਹੋਰ ਐਪ ਤੋਂ ਭੇਜਿਆ ਸੁਨੇਹਾ",
  "composer.cleared": "ਜੋ ਤੁਸੀਂ ਲਿਖਿਆ ਸੀ ਉਹ ਮਿਟਾ ਦਿੱਤਾ।",
};
