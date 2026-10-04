/* Odia: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(ବିଟା)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value. */
export const orHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "ଟଙ୍କା ଚାଲିଗଲା? ପ୍ରଥମେ ଟିକେ ନିଶ୍ୱାସ ନିଅନ୍ତୁ।",
  "madad.sub": "ଆପଣ ଏକା ନୁହନ୍ତି। ପ୍ରଥମ ଘଣ୍ଟାଟି ସବୁଠାରୁ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ।",
  "madad.call1930": "୧୯୩୦ କୁ ଫୋନ୍ କରନ୍ତୁ",
  "madad.call1930Line":
    "ଯେତେ ଶୀଘ୍ର ଜଣାଇବେ, ଟଙ୍କା ଅଟକାଇବାର ସମ୍ଭାବନା ସେତେ ଅଧିକ। କେହି ଭରସା ଦେଇପାରିବେ ନାହିଁ।",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "ପରବର୍ତ୍ତୀ",
  "madad.back": "ପଛକୁ",
  "madad.skip": "ଛାଡ଼ନ୍ତୁ",
  "madad.makePlan": "ମୋ ଯୋଜନା ତିଆରି କରନ୍ତୁ",
  "madad.savedHere": "ଆପଣଙ୍କ ଉତ୍ତରଗୁଡ଼ିକ ଏହି ଫୋନରେ ହିଁ ରଖାଯାଉଛି।",
  "madad.resume": "ଗୋଟିଏ ଅସମ୍ପୂର୍ଣ୍ଣ ମାମଲା ଖୋଲା ଅଛି",
  "madad.startOver": "ନୂଆ ମାମଲା ଆରମ୍ଭ କରନ୍ତୁ",

  "madad.q1": "କେବେ ପଠାଇଥିଲେ?",
  "madad.when.now": "ଏହିକ୍ଷଣି, କିମ୍ବା ଘଣ୍ଟାଏ ଭିତରେ",
  "madad.when.today": "ଆଜି",
  "madad.when.week": "ଗତ ୭ ଦିନ ଭିତରେ",
  "madad.when.older": "ତା’ଠାରୁ ପୁରୁଣା",

  "madad.q2": "କିପରି ପଠାଇଥିଲେ?",
  "madad.q2Hint": "ଗୋଟିଏରୁ ଅଧିକ ବାଛିପାରିବେ।",
  "madad.how.upi": "UPI",
  "madad.how.bank": "ବ୍ୟାଙ୍କ ଟ୍ରାନ୍ସଫର (NEFT, IMPS)",
  "madad.how.card": "କାର୍ଡ",
  "madad.how.crypto": "କ୍ରିପ୍ଟୋ",
  "madad.how.cash": "ନଗଦ କିମ୍ବା ଅନ୍ୟ କିଛି",

  "madad.q3": "କେତେ?",
  "madad.amountLabel": "ପରିମାଣ, ଟଙ୍କାରେ",

  "madad.q4": "କାହାକୁ, ଆଉ କେଉଁଠି?",
  "madad.q4Hint": "UPI ଆଇଡି, ଖାତା ନମ୍ବର, ଆପ୍ କିମ୍ବା ୱେବସାଇଟ, ଗୋଷ୍ଠୀ କିମ୍ବା ନମ୍ବର।",
  "madad.q4Found": "ଏଥିରେ ଆମେ ଏହା ପାଇଲୁ",
  "madad.txnLabel": "କାରବାର ଆଇଡି କିମ୍ବା UTR",

  "madad.q5": "ଆପଣଙ୍କୁ କ’ଣ ପ୍ରତିଶ୍ରୁତି ଦିଆଯାଇଥିଲା?",
  "madad.promised.sureProfit": "“ନିଶ୍ଚିତ ଲାଭ”",
  "madad.promised.double": "“ଟଙ୍କା ଦୁଇଗୁଣ”",
  "madad.promised.ipo": "“IPO ଆବଣ୍ଟନ”",
  "madad.promised.feeToWithdraw": "“ଉଠାଇବା ପାଇଁ ଶୁଳ୍କ ଦିଅନ୍ତୁ”",
  "madad.promised.other": "ଅନ୍ୟ କିଛି",
  "madad.promisedNote": "ଆପଣଙ୍କ ନିଜ ଭାଷାରେ",

  "madad.q6": "ଆପଣଙ୍କ ପାଖରେ କ’ଣ ପ୍ରମାଣ ଅଛି?",
  "madad.proof.utr": "କାରବାର ଆଇଡି କିମ୍ବା UTR",
  "madad.proof.screenshots": "ଚାଟର ସ୍କ୍ରିନସଟ",
  "madad.proof.handle": "ନମ୍ବର କିମ୍ବା ହ୍ୟାଣ୍ଡଲ",
  "madad.proof.app": "ଆପ୍‌ର ନାମ କିମ୍ବା APK",
  "madad.proof.website": "ୱେବସାଇଟ ଲିଙ୍କ",
  "madad.proof.recording": "କଲ ରେକର୍ଡିଂ",
  "madad.proof.statement": "ବ୍ୟାଙ୍କ ଷ୍ଟେଟମେଣ୍ଟ",

  "madad.script.title": "୧୯୩୦ ରେ ଏହା ପଢ଼ି ଶୁଣାନ୍ତୁ",
  "madad.script.body":
    "ମୋ ନାମ {name}, ମୁଁ {place} ରୁ କହୁଛି। ଅନଲାଇନ ନିବେଶ ନାମରେ ମୋ ସହିତ ପ୍ରତାରଣା ହୋଇଛି। ମୁଁ {how} ମାଧ୍ୟମରେ {amount} ଟଙ୍କା ପଠାଇଥିଲି। କାରବାର ଆଇଡି {txn}। ଟଙ୍କା {toWhom} କୁ ଯାଇଛି।",
  "madad.script.nameLabel": "ଆପଣଙ୍କ ନାମ",
  "madad.script.placeLabel": "ଗାଁ କିମ୍ବା ସହର",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "ଆପଣଙ୍କ ଯୋଜନା",
  "plan.sub": "ଆପଣଙ୍କ ନିଜ ଉତ୍ତରରୁ ହିଁ ତିଆରି। ଏହା ଏହି ଫୋନରେ ହିଁ ରହେ।",

  "plan.now.title": "ଏହିକ୍ଷଣି, ପ୍ରଥମ ଘଣ୍ଟାରେ",
  "plan.now.call1930": "୧୯୩୦ କୁ ଫୋନ୍ କରି ଉପରର ଲେଖାଟି ପଢ଼ି ଶୁଣାନ୍ତୁ।",
  "plan.now.tellBank":
    "ଆପଣଙ୍କ UPI ଆପ୍ କିମ୍ବା ବ୍ୟାଙ୍କର ହେଲ୍ପଲାଇନକୁ ମଧ୍ୟ ସଙ୍ଗେ ସଙ୍ଗେ ଜଣାନ୍ତୁ।",
  "plan.now.sendNothingMore":
    "ଆଉ ଟଙ୍କା ପଠାନ୍ତୁ ନାହିଁ। କୌଣସି “ରିକଭରି ଏଜେଣ୍ଟ”କୁ ଶୁଳ୍କ ଦିଅନ୍ତୁ ନାହିଁ; ତାହା ପ୍ରାୟତଃ ଦ୍ୱିତୀୟ ପ୍ରତାରଣା।",

  "plan.today.title": "ଆଜି ସରିବା ପୂର୍ବରୁ",
  "plan.today.portal":
    "cybercrime.gov.in ରେ ପୂରା ବିବରଣୀ ଭରନ୍ତୁ। ୧୯୩୦ ଫୋନରୁ ମିଳିଥିବା ସ୍ୱୀକୃତି ନମ୍ବର ରଖନ୍ତୁ; ସାଧାରଣତଃ ଏହା ୨୪ ଘଣ୍ଟା ଭିତରେ କରିବାକୁ କୁହାଯାଏ।",
  "plan.today.keepEvidence": "ଚାଟ ଲିଭାନ୍ତୁ ନାହିଁ। ଯେପରି ଅଛି ସେମିତି ରଖନ୍ତୁ।",
  "plan.today.screenshotsSafe":
    "ସ୍କ୍ରିନସଟଗୁଡ଼ିକ ଅନ୍ୟ କେଉଁଠି କପି କରି ରଖନ୍ତୁ, ଯେପରି ଫୋନରୁ ହଜିଯିବ ନାହିଁ।",

  "plan.week.title": "ଏହି ସପ୍ତାହରେ",
  "plan.week.firstTheFirm":
    "ସଂସ୍ଥାଟି SEBI ରେ ପଞ୍ଜୀକୃତ ହୋଇଥିଲେ, ପ୍ରଥମେ ସଂସ୍ଥାକୁ ହିଁ ଅଭିଯୋଗ କରନ୍ତୁ।",
  "plan.week.scores":
    "ତା’ପରେ ତାହା SCORES ରେ ରଖନ୍ତୁ। ସଂସ୍ଥାକୁ ଉତ୍ତର ଦେବାକୁ ୨୧ ଦିନ ଅଛି, ତା’ପରେ ଦୁଇ ସ୍ତରର ସମୀକ୍ଷା ଅଛି।",
  "plan.week.ifUnregistered":
    "ସଂସ୍ଥା ପଞ୍ଜୀକୃତ ନ ହୋଇଥିଲେ, SEBI ର ଅଭିଯୋଗ ବାଟ ସାଧାରଣତଃ ଲାଗୁ ହୁଏ ନାହିଁ। ପୋଲିସ ଓ ସାଇବର କ୍ରାଇମ ବାଟ ହିଁ ଠିକ୍।",
  "plan.week.card":
    "କାର୍ଡରେ ଦେଇଥିଲେ, ବ୍ୟାଙ୍କକୁ ଚାର୍ଜବ୍ୟାକ ବିଷୟରେ ପଚାରନ୍ତୁ।",
  "plan.week.uninstall":
    "ସେହି ଆପ୍ କାଢ଼ି ଦିଅନ୍ତୁ, ବ୍ୟାଙ୍କିଂ ପାସୱାର୍ଡ ଓ ପିନ ବଦଳାନ୍ତୁ, ଆଉ ବ୍ୟାଙ୍କକୁ ଜଣାନ୍ତୁ।",

  "plan.truth.title": "ସତ କଥା, ସିଧା",
  "plan.truth.mayNotComeBack": "ଟଙ୍କା ଫେରି ନ ଆସିପାରେ।",
  "plan.truth.fasterHelps": "ଶୀଘ୍ର ଜଣାଇଲେ ତାହା ଅଟକାଇବାର ସମ୍ଭାବନା ବଢ଼େ।",
  "plan.truth.recoveryFeeIsSecondScam":
    "ଯିଏ ଆପଣଙ୍କ ଟଙ୍କା ଫେରାଇ ଦେବା ପାଇଁ ଶୁଳ୍କ ମାଗେ, ସେ ଦ୍ୱିତୀୟ ପ୍ରତାରଣା।",
  "plan.truth.notYourShame":
    "ଏହି ପ୍ରତାରଣାଗୁଡ଼ିକ ବହୁତ ଯତ୍ନରେ ତିଆରି ହୋଇଥାଏ। ଏଥିରେ ପଡ଼ିଯିବା ଲଜ୍ଜାର କଥା ନୁହେଁ।",
  "plan.truth.teleManas":
    "ମନ ଉପରେ ଭାର ଲାଗିଲେ, ଟେଲି-ମାନସ ୧୪୪୧୬ ରେ କଥା ହୋଇପାରିବେ।",

  "plan.timeline": "କ’ଣ ଘଟିଲା, କ୍ରମରେ",
  "plan.timelineWhen": "କେବେ",
  "plan.timelineWhat": "କ’ଣ ଘଟିଲା",
  "plan.timelineAdd": "ଗୋଟିଏ ଧାଡ଼ି ଯୋଡ଼ନ୍ତୁ",
  "plan.timelineRemove": "କାଢ଼ନ୍ତୁ",

  "plan.drafts": "ଅଭିଯୋଗର ଖସଡ଼ା",
  "plan.portalFields": "ସାଇବର କ୍ରାଇମ ପୋର୍ଟାଲ ଏହା ପଚାରିବ",
  "plan.scoresDraft": "SCORES ପାଇଁ ଖସଡ଼ା",
  "plan.print": "ଛାପନ୍ତୁ କିମ୍ବା PDF କରନ୍ତୁ",
  "plan.sendSelf": "ହ୍ୱାଟସଆପରେ ନିଜକୁ ପଠାନ୍ତୁ",

  "plan.myCase": "ମୋ ମାମଲା",
  "plan.ackLabel": "୧୯୩୦ ରୁ ମିଳିଥିବା ସ୍ୱୀକୃତି ନମ୍ବର",
  "plan.done.called": "୧୯୩୦ କୁ ଫୋନ୍ କରାଗଲା",
  "plan.done.portal": "ପୋର୍ଟାଲରେ ଭରାଗଲା",
  "plan.done.bank": "ବ୍ୟାଙ୍କ କିମ୍ବା ଆପ୍‌କୁ ଜଣାଗଲା",
  "plan.done.firm": "ସଂସ୍ଥାକୁ ଅଭିଯୋଗ କରାଗଲା",
  "plan.done.scores": "SCORES ରେ ରଖାଗଲା",
  "plan.reminder": "୨୧ ଦିନର ତାରିଖ ମୋ କ୍ୟାଲେଣ୍ଡରରେ ରଖନ୍ତୁ",
  "plan.reminderTitle": "SCORES: ୨୧ ଦିନ ପୂରିଲା",
  "plan.reminderNote":
    "ସଂସ୍ଥା ଉତ୍ତର ନ ଦେଇଥିଲେ, SCORES ରେ ପରବର୍ତ୍ତୀ ସ୍ତରର ସମୀକ୍ଷା ମାଗନ୍ତୁ।",
  "plan.empty": "ପ୍ରଥମେ ମଦଦ ରେ ଛଅଟି ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଅନ୍ତୁ।",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "ଟଙ୍କା, OTP କିମ୍ବା ଆପ୍ ଦିଅନ୍ତୁ ନାହିଁ।",
  "step.high.2": "ଏହି ନମ୍ବର କିମ୍ବା ଗୋଷ୍ଠୀକୁ ବ୍ଲକ କରି ରିପୋର୍ଟ କରନ୍ତୁ।",
  "step.high.3": "ବିଶ୍ୱାସର କାହାକୁ ଦେଖାନ୍ତୁ।",
  "step.multiple.1": "ଆଜି ଟଙ୍କା ପଠାନ୍ତୁ ନାହିଁ। ୨୪ ଘଣ୍ଟା ଅପେକ୍ଷା କରନ୍ତୁ।",
  "step.multiple.2": "ପଞ୍ଜୀକରଣ ନିଜେ SEBI ସାଇଟରେ ଯାଞ୍ଚ କରନ୍ତୁ।",
  "step.multiple.3": "କାହାକୁ ପଚାରନ୍ତୁ।",
  "step.some.1": "ତରବରରେ ଟଙ୍କା ପଠାନ୍ତୁ ନାହିଁ।",
  "step.some.2": "ପଞ୍ଜୀକରଣ ନିଜେ SEBI ସାଇଟରେ ଯାଞ୍ଚ କରନ୍ତୁ।",
  "step.some.3": "କାହାକୁ ପଚାରନ୍ତୁ।",
  "step.none.1": "ଏହାର ଅର୍ଥ ନୁହେଁ ଯେ ଏହା ସୁରକ୍ଷିତ।",
  "step.none.2": "ଟଙ୍କା ପଠାଇବା ପୂର୍ବରୁ UPI କିମ୍ବା ଖାତା SEBI Check ରେ ଦେଖନ୍ତୁ।",
  "step.notEnough.1": "ପୂରା ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ, ତା’ପରେ କିଛି କୁହାଯାଇପାରିବ।",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "ଶ୍ରେଣୀ: ଅନଲାଇନ ନିବେଶ ନାମରେ ପ୍ରତାରଣା",
  "draft.portal.when": "କେବେ ଘଟିଲା",
  "draft.portal.amount": "କେତେ ପଠାଗଲା",
  "draft.portal.how": "ଟଙ୍କା କିପରି ଗଲା",
  "draft.portal.toWhom": "କେଉଁଠି ଗଲା: UPI ଆଇଡି, ଖାତା, ଆପ୍, ୱେବସାଇଟ",
  "draft.portal.txn": "କାରବାର ଆଇଡି କିମ୍ବା UTR",
  "draft.portal.contact": "ଆପଣଙ୍କ ନାମ, ଠିକଣା ଓ ମୋବାଇଲ ନମ୍ବର",
  "draft.portal.evidence": "ଆପଣଙ୍କ ପ୍ରମାଣ ଫାଇଲ",
  "draft.scores.noChronology": "(ଘଟଣାର କ୍ରମ ଏପର୍ଯ୍ୟନ୍ତ ଭରାଯାଇନାହିଁ)",
  "draft.scores.body": `ପ୍ରତି,
ଅଭିଯୋଗ ନିବାରଣ ସେଲ

ବିଷୟ: ଅନଲାଇନ ନିବେଶ ନାମରେ ହୋଇଥିବା ପ୍ରତାରଣା ସମ୍ବନ୍ଧୀୟ ଅଭିଯୋଗ

୧. ଅଭିଯୋଗକାରୀଙ୍କ ବିବରଣୀ: (ନାମ, ଠିକଣା, ମୋବାଇଲ, ଇମେଲ ଭରନ୍ତୁ)
୨. ଯାହା ବିରୁଦ୍ଧରେ ଅଭିଯୋଗ: {toWhom}
୩. ଅଭିଯୋଗର ପ୍ରକୃତି: {promised} ପ୍ରତିଶ୍ରୁତି ଦେଇ ଟଙ୍କା ନିଆଯାଇଛି।
୪. ଘଟଣାକ୍ରମ:
{chronology}
୫. ପରିମାଣ: ଟ {amount}
୬. କାରବାର ଆଇଡି: {txn}
୭. ମାଗିଥିବା ପ୍ରତିକାର: ପଠାଯାଇଥିବା ଟଙ୍କା ଫେରସ୍ତ, ଏବଂ ଏକ ତଦନ୍ତ।
୮. ସଂଲଗ୍ନ ଦଲିଲ: {evidence}

ଆପଣଙ୍କ ବିଶ୍ୱସ୍ତ,
(ନାମ ଓ ଦସ୍ତଖତ)`,
  "draft.copy": "ଖସଡ଼ା କପି କରନ୍ତୁ",
  "draft.copied": "କପି ହେଲା",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "କୁହନ୍ତୁ",
  "check.paste": "ପେଷ୍ଟ",
  "check.photo": "ଫଟୋ",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "ପେଷ୍ଟ କରିବାର ଅନୁମତି ମିଳିଲା ନାହିଁ। ବାକ୍ସଟିକୁ ଚାପି ଧରନ୍ତୁ, ତା’ପରେ ପେଷ୍ଟ ବାଛନ୍ତୁ।",
  "check.fromShare": "ହ୍ୱାଟସଆପରୁ ପଠାଯାଇଥିବା ବାର୍ତ୍ତା",
  "check.tooShort": "ଆଉ ଟିକେ ଲେଖନ୍ତୁ, ଏତିକିରେ କିଛି କୁହାଯାଇପାରିବ ନାହିଁ।",
  "check.tooLong": "ବାର୍ତ୍ତାଟି ବହୁତ ଲମ୍ବା, ପ୍ରଥମ {max} ଅକ୍ଷର ଦେଖାଯାଉଛି।",
  "check.questionsTitle": "ଇଚ୍ଛା ଥିଲେ, ତିନୋଟି ଛୋଟ ପ୍ରଶ୍ନ",
  "check.q1": "ସେମାନେ ହିଁ ପ୍ରଥମେ ଯୋଗାଯୋଗ କରିଥିଲେ କି?",
  "check.q2": "ଟଙ୍କା, OTP କିମ୍ବା ଆପ୍ ମାଗିଥିଲେ କି?",
  "check.q3": "ଏହି ବ୍ୟକ୍ତିଙ୍କୁ ଆପଣ ଜାଣନ୍ତି କି?",
  "check.samples": "ନମୁନା",
  "check.samplesTitle": "ନମୁନା ବାର୍ତ୍ତା",
  "check.samplesLine": "ଏସବୁ କାଳ୍ପନିକ, କୌଣସିଟି ପ୍ରକୃତ ବ୍ୟକ୍ତିଙ୍କର ନୁହେଁ।",
  "check.useSample": "ଏହାକୁ ଦେଖନ୍ତୁ",
  "check.listening": "ଶୁଣୁଛି",
  "check.speakIdle": "କୁହନ୍ତୁ",
  "check.voiceUnavailable":
    "ଏହି ଫୋନରେ କହିବାର ସୁବିଧା ନାହିଁ। ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ।",
  "check.voiceOffline": "କହିବା ପାଇଁ ଇଣ୍ଟରନେଟ ଦରକାର। ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ।",
  "check.voiceNothingHeard":
    "କିଛି ଶୁଣାଗଲା ନାହିଁ। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ, କିମ୍ବା ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ।",
  "check.voiceDenied":
    "ମାଇକ୍ରୋଫୋନ ବନ୍ଦ ଅଛି। ବ୍ରାଉଜର ସେଟିଂସରେ ଅନୁମତି ଦିଅନ୍ତୁ, କିମ୍ବା ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ।",
  "check.ocrOffline":
    "ଫଟୋ ପଢ଼ିବା ପାଇଁ ପ୍ରଥମ ଥର ଇଣ୍ଟରନେଟ ଦରକାର। ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ।",
  "check.ocrReading": "ଛବିଟି ପଢ଼ାଯାଉଛି",
  "check.ocrStayed": "ଫଟୋଟି ଆପଣଙ୍କ ଫୋନ ଛାଡ଼ି ଯାଇନାହିଁ",
  "check.ocrLowConfidence":
    "କିଛି ଶବ୍ଦ ଭୁଲ ପଢ଼ାଯାଇଥାଇପାରେ, ଥରେ ଦେଖିନିଅନ୍ତୁ।",
  "check.ocrFailed":
    "ଛବିଟି ସ୍ପଷ୍ଟ ପଢ଼ାଗଲା ନାହିଁ। ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ କିମ୍ବା ପୁଣି ଉଠାନ୍ତୁ।",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "ବାର୍ତ୍ତାଟି ଏଠାରେ ପେଷ୍ଟ କରନ୍ତୁ, କିମ୍ବା ତଳେ କୁହନ୍ତୁ",
  "composer.label": "ଯାଞ୍ଚ କରିବାକୁ ଥିବା ବାର୍ତ୍ତା",
  "composer.speak": "କୁହନ୍ତୁ",
  "composer.photo": "ଫଟୋ",
  "composer.primedVoice": "କୁହନ୍ତୁ ଦବାନ୍ତୁ ଆଉ ବାର୍ତ୍ତାଟି ପଢ଼ି ଶୁଣାନ୍ତୁ।",
  "composer.primedPhoto": "ଫଟୋ ଦବାଇ ସ୍କ୍ରିନସଟଟି ବାଛନ୍ତୁ।",
  "composer.paste": "ପେଷ୍ଟ",
  "composer.clear": "ଲିଭାନ୍ତୁ",
  "composer.submit": "ଯାଞ୍ଚ କରନ୍ତୁ",
  "composer.empty": "ପ୍ରଥମେ ବାର୍ତ୍ତାଟି ପେଷ୍ଟ କରନ୍ତୁ କିମ୍ବା କୁହନ୍ତୁ",
  "composer.privacy": "ଯାଞ୍ଚ କେବଳ ଏହି ଫୋନରେ ହିଁ ହୁଏ",
  "composer.photoPrivacy": "ଫଟୋଟି ଆପଣଙ୍କ ଫୋନ ଛାଡ଼ି ଯାଇନାହିଁ",
  "composer.photoReading": "ଫଟୋଟି ପଢ଼ାଯାଉଛି… {pct}%",
  "composer.fromShare": "ଅନ୍ୟ ଆପ୍‌ରୁ ପଠାଯାଇଥିବା ବାର୍ତ୍ତା",
  "composer.cleared": "ଆପଣ ଯାହା ଲେଖିଥିଲେ ତାହା ଲିଭାଗଲା।",
};
