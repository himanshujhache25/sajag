/* Telugu: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(బీటా)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value. */
export const teHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "డబ్బు పోయిందా? ముందు ఒక శ్వాస తీసుకోండి.",
  "madad.sub": "మీరు ఒంటరి కాదు. మొదటి గంటే అత్యంత ముఖ్యం.",
  "madad.call1930": "1930 కి కాల్ చేయండి",
  "madad.call1930Line":
    "ఎంత త్వరగా ఫిర్యాదు చేస్తే, డబ్బును ఆపే అవకాశం అంత ఎక్కువ. ఎవరూ హామీ ఇవ్వలేరు.",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "తర్వాత",
  "madad.back": "వెనక్కి",
  "madad.skip": "దాటవేయి",
  "madad.makePlan": "నా ప్రణాళికను తయారు చేయి",
  "madad.savedHere": "మీ సమాధానాలు ఈ ఫోన్‌లోనే ఉంచబడుతున్నాయి.",
  "madad.resume": "పూర్తికాని కేసు ఒకటి తెరిచి ఉంది",
  "madad.startOver": "కొత్త కేసు మొదలుపెట్టు",

  "madad.q1": "ఎప్పుడు పంపారు?",
  "madad.when.now": "ఇప్పుడే, లేదా ఒక గంటలోపు",
  "madad.when.today": "ఈ రోజు",
  "madad.when.week": "గత 7 రోజుల్లో",
  "madad.when.older": "అంతకన్నా ముందు",

  "madad.q2": "ఎలా పంపారు?",
  "madad.q2Hint": "ఒకటి కన్నా ఎక్కువ ఎంచుకోవచ్చు.",
  "madad.how.upi": "UPI",
  "madad.how.bank": "బ్యాంక్ బదిలీ (NEFT, IMPS)",
  "madad.how.card": "కార్డు",
  "madad.how.crypto": "క్రిప్టో",
  "madad.how.cash": "నగదు లేదా మరేదైనా",

  "madad.q3": "ఎంత?",
  "madad.amountLabel": "మొత్తం, రూపాయల్లో",

  "madad.q4": "ఎవరికి, ఎక్కడికి?",
  "madad.q4Hint": "UPI ఐడీ, ఖాతా నంబరు, యాప్ లేదా వెబ్‌సైట్, గ్రూప్ లేదా నంబరు.",
  "madad.q4Found": "దీనిలో మాకు ఇది దొరికింది",
  "madad.txnLabel": "లావాదేవీ ఐడీ లేదా UTR",

  "madad.q5": "మీకు ఏమని వాగ్దానం చేశారు?",
  "madad.promised.sureProfit": "“ఖచ్చితమైన లాభం”",
  "madad.promised.double": "“డబ్బు రెట్టింపు”",
  "madad.promised.ipo": "“IPO కేటాయింపు”",
  "madad.promised.feeToWithdraw": "“తీసుకోవడానికి రుసుము కట్టండి”",
  "madad.promised.other": "మరేదైనా",
  "madad.promisedNote": "మీ సొంత మాటల్లో",

  "madad.q6": "మీ దగ్గర ఏ ఆధారం ఉంది?",
  "madad.proof.utr": "లావాదేవీ ఐడీ లేదా UTR",
  "madad.proof.screenshots": "సంభాషణ స్క్రీన్‌షాట్లు",
  "madad.proof.handle": "నంబరు లేదా హ్యాండిల్",
  "madad.proof.app": "యాప్ పేరు లేదా APK",
  "madad.proof.website": "వెబ్‌సైట్ లింక్",
  "madad.proof.recording": "కాల్ రికార్డింగ్",
  "madad.proof.statement": "బ్యాంక్ స్టేట్‌మెంట్",

  "madad.script.title": "1930 లో దీన్ని చదివి వినిపించండి",
  "madad.script.body":
    "నా పేరు {name}, నేను {place} నుండి మాట్లాడుతున్నాను. ఆన్‌లైన్ పెట్టుబడి పేరుతో నేను మోసపోయాను. నేను {how} ద్వారా {amount} రూపాయలు పంపాను. లావాదేవీ ఐడీ {txn}. డబ్బు {toWhom} కి వెళ్ళింది.",
  "madad.script.nameLabel": "మీ పేరు",
  "madad.script.placeLabel": "ఊరు లేదా పట్టణం",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "మీ ప్రణాళిక",
  "plan.sub": "మీ సమాధానాల నుండే తయారైంది. ఇది ఈ ఫోన్‌లోనే ఉంటుంది.",

  "plan.now.title": "ఇప్పుడే, మొదటి గంటలో",
  "plan.now.call1930": "1930 కి కాల్ చేసి పైన ఉన్నది చదివి వినిపించండి.",
  "plan.now.tellBank":
    "మీ UPI యాప్‌కి లేదా బ్యాంకు సహాయ నంబరుకి కూడా వెంటనే తెలియజేయండి.",
  "plan.now.sendNothingMore":
    "ఇంకా డబ్బు పంపవద్దు. “రికవరీ ఏజెంట్”కి రుసుము చెల్లించవద్దు; అది తరచుగా రెండవ మోసం.",

  "plan.today.title": "ఈ రోజు ముగిసేలోపు",
  "plan.today.portal":
    "cybercrime.gov.in లో పూర్తి వివరాలు నింపండి. 1930 కాల్ నుండి వచ్చిన రసీదు నంబరును ఉంచుకోండి; సాధారణంగా దీన్ని 24 గంటల్లో చేయమంటారు.",
  "plan.today.keepEvidence": "సంభాషణను తొలగించవద్దు. ఉన్నది ఉన్నట్లే ఉంచండి.",
  "plan.today.screenshotsSafe":
    "స్క్రీన్‌షాట్లను వేరే చోట కాపీ చేసి ఉంచండి, ఫోన్ నుండి పోకుండా.",

  "plan.week.title": "ఈ వారం",
  "plan.week.firstTheFirm":
    "ఆ సంస్థ SEBI వద్ద నమోదై ఉంటే, ముందుగా సంస్థకే ఫిర్యాదు చేయండి.",
  "plan.week.scores":
    "తర్వాత దాన్ని SCORES లో పెట్టండి. సంస్థకు బదులివ్వడానికి 21 రోజులు ఉంటాయి, ఆ తర్వాత రెండు స్థాయిల సమీక్ష ఉంటుంది.",
  "plan.week.ifUnregistered":
    "సంస్థ నమోదు కాకపోతే, SEBI ఫిర్యాదు మార్గం సాధారణంగా వర్తించదు. పోలీసు, సైబర్ క్రైమ్ మార్గమే సరైనది.",
  "plan.week.card":
    "కార్డుతో చెల్లించి ఉంటే, చార్జ్‌బ్యాక్ గురించి బ్యాంకును అడగండి.",
  "plan.week.uninstall":
    "ఆ యాప్‌ను తీసివేయండి, బ్యాంకింగ్ పాస్‌వర్డ్‌లు, పిన్‌లు మార్చండి, బ్యాంకుకు చెప్పండి.",

  "plan.truth.title": "నిజం, నేరుగా",
  "plan.truth.mayNotComeBack": "డబ్బు తిరిగి రాకపోవచ్చు.",
  "plan.truth.fasterHelps": "త్వరగా ఫిర్యాదు చేస్తే ఆపే అవకాశం పెరుగుతుంది.",
  "plan.truth.recoveryFeeIsSecondScam":
    "మీ డబ్బు తిరిగి ఇప్పిస్తానని రుసుము అడిగేవాడు రెండవ మోసం.",
  "plan.truth.notYourShame":
    "ఈ మోసాలు చాలా జాగ్రత్తగా తయారు చేస్తారు. వాటిలో మోసపోవడం సిగ్గుపడాల్సిన విషయం కాదు.",
  "plan.truth.teleManas":
    "మనసుకు భారంగా అనిపిస్తే, టెలి-మానస్ 14416 లో మాట్లాడవచ్చు.",

  "plan.timeline": "ఏం జరిగింది, వరుసగా",
  "plan.timelineWhen": "ఎప్పుడు",
  "plan.timelineWhat": "ఏం జరిగింది",
  "plan.timelineAdd": "ఒక వరుస జోడించు",
  "plan.timelineRemove": "తొలగించు",

  "plan.drafts": "ఫిర్యాదు ముసాయిదాలు",
  "plan.portalFields": "సైబర్ క్రైమ్ పోర్టల్ వీటిని అడుగుతుంది",
  "plan.scoresDraft": "SCORES కోసం ముసాయిదా",
  "plan.print": "ముద్రించు లేదా PDF చేయి",
  "plan.sendSelf": "వాట్సాప్‌లో నాకే పంపు",

  "plan.myCase": "నా కేసు",
  "plan.ackLabel": "1930 నుండి వచ్చిన రసీదు నంబరు",
  "plan.done.called": "1930 కి కాల్ చేశాను",
  "plan.done.portal": "పోర్టల్‌లో నింపాను",
  "plan.done.bank": "బ్యాంకుకు లేదా యాప్‌కు చెప్పాను",
  "plan.done.firm": "సంస్థకు ఫిర్యాదు చేశాను",
  "plan.done.scores": "SCORES లో పెట్టాను",
  "plan.reminder": "21 రోజుల తేదీని నా క్యాలెండర్‌లో పెట్టు",
  "plan.reminderTitle": "SCORES: 21 రోజులు పూర్తయ్యాయి",
  "plan.reminderNote":
    "సంస్థ బదులివ్వకపోతే, SCORES లో తర్వాతి స్థాయి సమీక్షను కోరండి.",
  "plan.empty": "ముందుగా మదద్ లో ఆరు ప్రశ్నలకు సమాధానం ఇవ్వండి.",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "డబ్బు, OTP లేదా యాప్ ఇవ్వవద్దు.",
  "step.high.2": "ఈ నంబరును లేదా గ్రూపును బ్లాక్ చేసి ఫిర్యాదు చేయండి.",
  "step.high.3": "నమ్మకమైన వారికి చూపించండి.",
  "step.multiple.1": "ఈ రోజు డబ్బు పంపవద్దు. 24 గంటలు ఆగండి.",
  "step.multiple.2": "నమోదును మీరే SEBI సైట్‌లో చూసుకోండి.",
  "step.multiple.3": "ఎవరినైనా అడగండి.",
  "step.some.1": "తొందరపడి డబ్బు పంపవద్దు.",
  "step.some.2": "నమోదును మీరే SEBI సైట్‌లో చూసుకోండి.",
  "step.some.3": "ఎవరినైనా అడగండి.",
  "step.none.1": "ఇది సురక్షితమని దీని అర్థం కాదు.",
  "step.none.2": "డబ్బు పంపే ముందు UPI లేదా ఖాతాను SEBI Check లో చూడండి.",
  "step.notEnough.1": "పూర్తి సందేశాన్ని అతికించండి, అప్పుడే ఏదైనా చెప్పగలం.",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "వర్గం: ఆన్‌లైన్ పెట్టుబడి పేరుతో మోసం",
  "draft.portal.when": "ఎప్పుడు జరిగింది",
  "draft.portal.amount": "ఎంత పంపారు",
  "draft.portal.how": "డబ్బు ఎలా వెళ్ళింది",
  "draft.portal.toWhom": "ఎక్కడికి వెళ్ళింది: UPI ఐడీ, ఖాతా, యాప్, వెబ్‌సైట్",
  "draft.portal.txn": "లావాదేవీ ఐడీ లేదా UTR",
  "draft.portal.contact": "మీ పేరు, చిరునామా, మొబైల్ నంబరు",
  "draft.portal.evidence": "మీ ఆధార ఫైళ్ళు",
  "draft.scores.noChronology": "(సంఘటనల వరుస ఇంకా నింపలేదు)",
  "draft.scores.body": `కు,
ఫిర్యాదుల పరిష్కార విభాగం

విషయం: ఆన్‌లైన్ పెట్టుబడి పేరుతో జరిగిన మోసంపై ఫిర్యాదు

1. ఫిర్యాదుదారు వివరాలు: (పేరు, చిరునామా, మొబైల్, ఈమెయిల్ నింపండి)
2. ఎవరిపై ఫిర్యాదు: {toWhom}
3. ఫిర్యాదు స్వభావం: {promised} అని వాగ్దానం చేసి డబ్బు తీసుకున్నారు.
4. సంఘటనల వరుస:
{chronology}
5. మొత్తం: రూ {amount}
6. లావాదేవీ ఐడీ: {txn}
7. కోరుతున్న ఉపశమనం: పంపిన మొత్తం తిరిగి ఇవ్వడం, మరియు విచారణ.
8. జతచేసిన పత్రాలు: {evidence}

మీ విశ్వాసపాత్రుడు,
(పేరు, సంతకం)`,
  "draft.copy": "ముసాయిదాను కాపీ చేయి",
  "draft.copied": "కాపీ అయింది",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "మాట్లాడండి",
  "check.paste": "అతికించు",
  "check.photo": "ఫోటో",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "అతికించడానికి అనుమతి రాలేదు. పెట్టెను నొక్కి పట్టుకుని, అతికించు ఎంచుకోండి.",
  "check.fromShare": "వాట్సాప్ నుండి పంపిన సందేశం",
  "check.tooShort": "ఇంకొంచెం రాయండి, ఇంత దానితో చెప్పలేం.",
  "check.tooLong": "సందేశం చాలా పొడవుగా ఉంది, మొదటి {max} అక్షరాలు చూస్తున్నాం.",
  "check.questionsTitle": "ఇష్టమైతే, మూడు చిన్న ప్రశ్నలు",
  "check.q1": "వాళ్ళే ముందుగా సంప్రదించారా?",
  "check.q2": "డబ్బు, OTP లేదా యాప్ అడిగారా?",
  "check.q3": "ఈ వ్యక్తి మీకు తెలుసా?",
  "check.samples": "నమూనాలు",
  "check.samplesTitle": "నమూనా సందేశాలు",
  "check.samplesLine": "ఇవన్నీ కల్పితం, ఏదీ నిజమైన వ్యక్తిది కాదు.",
  "check.useSample": "దీన్ని చూడు",
  "check.listening": "వింటున్నాం",
  "check.speakIdle": "మాట్లాడండి",
  "check.voiceUnavailable":
    "ఈ ఫోన్‌లో మాట్లాడే సౌకర్యం లేదు. సందేశాన్ని అతికించండి.",
  "check.voiceOffline": "మాట్లాడటానికి ఇంటర్నెట్ కావాలి. సందేశాన్ని అతికించండి.",
  "check.voiceNothingHeard":
    "ఏమీ వినిపించలేదు. మళ్ళీ ప్రయత్నించండి, లేదా సందేశాన్ని అతికించండి.",
  "check.voiceDenied":
    "మైక్రోఫోన్ నిరోధించబడింది. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి, లేదా సందేశాన్ని అతికించండి.",
  "check.ocrOffline":
    "ఫోటో చదవడానికి మొదటిసారి ఇంటర్నెట్ కావాలి. సందేశాన్ని అతికించండి.",
  "check.ocrReading": "చిత్రాన్ని చదువుతున్నాం",
  "check.ocrStayed": "ఫోటో మీ ఫోన్ నుండి బయటికి వెళ్ళలేదు",
  "check.ocrLowConfidence":
    "కొన్ని పదాలు తప్పుగా చదివి ఉండవచ్చు, ఒకసారి చూసుకోండి.",
  "check.ocrFailed":
    "చిత్రం స్పష్టంగా చదవలేకపోయాం. సందేశాన్ని అతికించండి లేదా మళ్ళీ తీయండి.",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "సందేశాన్ని ఇక్కడ అతికించండి, లేదా కింద మాట్లాడండి",
  "composer.label": "చూడవలసిన సందేశం",
  "composer.speak": "మాట్లాడండి",
  "composer.photo": "ఫోటో",
  "composer.primedVoice": "మాట్లాడండి నొక్కి, సందేశాన్ని చదివి వినిపించండి.",
  "composer.primedPhoto": "ఫోటో నొక్కి స్క్రీన్‌షాట్ ఎంచుకోండి.",
  "composer.paste": "అతికించు",
  "composer.clear": "తుడిచివేయి",
  "composer.submit": "చూడు",
  "composer.empty": "ముందుగా సందేశాన్ని అతికించండి లేదా మాట్లాడండి",
  "composer.privacy": "పరిశీలన ఈ ఫోన్‌లోనే జరుగుతుంది",
  "composer.photoPrivacy": "ఫోటో మీ ఫోన్ నుండి బయటికి వెళ్ళలేదు",
  "composer.photoReading": "ఫోటోను చదువుతున్నాం… {pct}%",
  "composer.fromShare": "వేరే యాప్ నుండి పంపిన సందేశం",
  "composer.cleared": "మీరు రాసినది తుడిచివేయబడింది.",
};
