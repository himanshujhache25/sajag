/* Gujarati: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(બીટા)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value. */
export const guHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "પૈસા ગયા? પહેલાં એક શ્વાસ લો.",
  "madad.sub": "તમે એકલા નથી. પહેલો કલાક જ સૌથી મહત્ત્વનો છે.",
  "madad.call1930": "૧૯૩૦ પર ફોન કરો",
  "madad.call1930Line":
    "જેટલું વહેલું જણાવશો, પૈસા અટકાવવાની તક એટલી વધારે. કોઈ ખાતરી આપી શકતું નથી.",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "આગળ",
  "madad.back": "પાછળ",
  "madad.skip": "છોડો",
  "madad.makePlan": "મારી યોજના બનાવો",
  "madad.savedHere": "તમારા જવાબો આ જ ફોનમાં રાખવામાં આવે છે.",
  "madad.resume": "એક અધૂરો કેસ ખુલ્લો છે",
  "madad.startOver": "નવો કેસ શરૂ કરો",

  "madad.q1": "તમે ક્યારે મોકલ્યા?",
  "madad.when.now": "હમણાં જ, અથવા એક કલાકમાં",
  "madad.when.today": "આજે",
  "madad.when.week": "છેલ્લા ૭ દિવસમાં",
  "madad.when.older": "એનાથી પણ જૂનું",

  "madad.q2": "તમે કેવી રીતે મોકલ્યા?",
  "madad.q2Hint": "એકથી વધુ પસંદ કરી શકો છો.",
  "madad.how.upi": "UPI",
  "madad.how.bank": "બેંક ટ્રાન્સફર (NEFT, IMPS)",
  "madad.how.card": "કાર્ડ",
  "madad.how.crypto": "ક્રિપ્ટો",
  "madad.how.cash": "રોકડ અથવા બીજું કંઈક",

  "madad.q3": "કેટલા?",
  "madad.amountLabel": "રકમ, રૂપિયામાં",

  "madad.q4": "કોને, અને ક્યાં?",
  "madad.q4Hint": "UPI આઈડી, ખાતા નંબર, એપ કે વેબસાઇટ, ગ્રૂપ કે નંબર.",
  "madad.q4Found": "અમને એમાં આ મળ્યું",
  "madad.txnLabel": "વ્યવહાર આઈડી અથવા UTR",

  "madad.q5": "તમને શું વચન આપવામાં આવ્યું હતું?",
  "madad.promised.sureProfit": "“પાક્કો નફો”",
  "madad.promised.double": "“પૈસા બમણા”",
  "madad.promised.ipo": "“IPO ફાળવણી”",
  "madad.promised.feeToWithdraw": "“ઉપાડવા માટે ફી ભરો”",
  "madad.promised.other": "બીજું કંઈક",
  "madad.promisedNote": "તમારા પોતાના શબ્દોમાં",

  "madad.q6": "તમારી પાસે શું પુરાવો છે?",
  "madad.proof.utr": "વ્યવહાર આઈડી અથવા UTR",
  "madad.proof.screenshots": "વાતચીતના સ્ક્રીનશોટ",
  "madad.proof.handle": "નંબર અથવા હેન્ડલ",
  "madad.proof.app": "એપનું નામ અથવા APK",
  "madad.proof.website": "વેબસાઇટની લિંક",
  "madad.proof.recording": "કોલ રેકોર્ડિંગ",
  "madad.proof.statement": "બેંક સ્ટેટમેન્ટ",

  "madad.script.title": "૧૯૩૦ પર આ વાંચી સંભળાવો",
  "madad.script.body":
    "મારું નામ {name} છે, હું {place} થી બોલું છું. ઓનલાઇન રોકાણના નામે મારી સાથે છેતરપિંડી થઈ છે. મેં {how} દ્વારા {amount} રૂપિયા મોકલ્યા. વ્યવહાર આઈડી {txn} છે. પૈસા {toWhom} પાસે ગયા.",
  "madad.script.nameLabel": "તમારું નામ",
  "madad.script.placeLabel": "ગામ કે શહેર",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "તમારી યોજના",
  "plan.sub": "તમારા જ જવાબો પરથી બનાવી છે. એ આ જ ફોનમાં રહે છે.",

  "plan.now.title": "અત્યારે જ, પહેલા કલાકમાં",
  "plan.now.call1930": "૧૯૩૦ પર ફોન કરીને ઉપરનું લખાણ વાંચી સંભળાવો.",
  "plan.now.tellBank":
    "તમારી UPI એપને કે બેંકની હેલ્પલાઇનને પણ તરત જણાવો.",
  "plan.now.sendNothingMore":
    "હવે વધુ પૈસા ન મોકલો. કોઈ “રિકવરી એજન્ટ”ને ફી ન આપો; એ ઘણી વાર બીજી છેતરપિંડી હોય છે.",

  "plan.today.title": "આજનો દિવસ પૂરો થાય તે પહેલાં",
  "plan.today.portal":
    "cybercrime.gov.in પર પૂરી વિગતો ભરો. ૧૯૩૦ ના ફોનથી મળેલો સ્વીકૃતિ નંબર સાચવી રાખો; સામાન્ય રીતે આ ૨૪ કલાકમાં કરવાનું કહેવાય છે.",
  "plan.today.keepEvidence": "વાતચીત ભૂંસશો નહીં. જેમ છે તેમ રહેવા દો.",
  "plan.today.screenshotsSafe":
    "સ્ક્રીનશોટ બીજે ક્યાંક કોપી કરી રાખો, જેથી ફોનમાંથી ખોવાઈ ન જાય.",

  "plan.week.title": "આ અઠવાડિયે",
  "plan.week.firstTheFirm":
    "જો પેઢી SEBI માં નોંધાયેલી હોય, તો પહેલાં પેઢીને જ ફરિયાદ કરો.",
  "plan.week.scores":
    "પછી એ SCORES પર મૂકો. પેઢીને જવાબ આપવા ૨૧ દિવસ છે, ત્યાર પછી બે સ્તરની સમીક્ષા છે.",
  "plan.week.ifUnregistered":
    "જો પેઢી નોંધાયેલી ન હોય, તો SEBI નો ફરિયાદ માર્ગ સામાન્ય રીતે લાગુ પડતો નથી. પોલીસ અને સાયબર ક્રાઇમનો માર્ગ જ યોગ્ય છે.",
  "plan.week.card":
    "કાર્ડથી ચૂકવ્યું હોય, તો બેંકને ચાર્જબેક વિશે પૂછો.",
  "plan.week.uninstall":
    "એ એપ કાઢી નાખો, બેંકિંગ પાસવર્ડ અને પિન બદલો, અને બેંકને જણાવો.",

  "plan.truth.title": "સાચી વાત, સીધી",
  "plan.truth.mayNotComeBack": "પૈસા પાછા ન પણ આવે.",
  "plan.truth.fasterHelps": "વહેલું જણાવવાથી એને અટકાવવાની તક વધે છે.",
  "plan.truth.recoveryFeeIsSecondScam":
    "જે તમારા પૈસા પાછા અપાવવા ફી માગે, તે બીજી છેતરપિંડી છે.",
  "plan.truth.notYourShame":
    "આ છેતરપિંડીઓ ખૂબ કાળજીથી ઘડાયેલી હોય છે. એમાં ફસાવું શરમજનક નથી.",
  "plan.truth.teleManas":
    "મન પર ભાર લાગે, તો ટેલી-માનસ ૧૪૪૧૬ પર વાત કરી શકો છો.",

  "plan.timeline": "શું થયું, ક્રમમાં",
  "plan.timelineWhen": "ક્યારે",
  "plan.timelineWhat": "શું થયું",
  "plan.timelineAdd": "એક લીટી ઉમેરો",
  "plan.timelineRemove": "કાઢો",

  "plan.drafts": "ફરિયાદના મુસદ્દા",
  "plan.portalFields": "સાયબર ક્રાઇમ પોર્ટલ આ પૂછશે",
  "plan.scoresDraft": "SCORES માટે મુસદ્દો",
  "plan.print": "છાપો અથવા PDF બનાવો",
  "plan.sendSelf": "વોટ્સએપ પર મને જ મોકલો",

  "plan.myCase": "મારો કેસ",
  "plan.ackLabel": "૧૯૩૦ તરફથી મળેલો સ્વીકૃતિ નંબર",
  "plan.done.called": "૧૯૩૦ પર ફોન કર્યો",
  "plan.done.portal": "પોર્ટલમાં ભર્યું",
  "plan.done.bank": "બેંક કે એપને જણાવ્યું",
  "plan.done.firm": "પેઢીને ફરિયાદ કરી",
  "plan.done.scores": "SCORES પર મૂક્યું",
  "plan.reminder": "૨૧ દિવસની તારીખ મારા કેલેન્ડરમાં મૂકો",
  "plan.reminderTitle": "SCORES: ૨૧ દિવસ પૂરા થયા",
  "plan.reminderNote":
    "પેઢીએ જવાબ ન આપ્યો હોય, તો SCORES પર આગળના સ્તરની સમીક્ષા માગો.",
  "plan.empty": "પહેલાં મદદ માં છ પ્રશ્નોના જવાબ આપો.",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "પૈસા, OTP કે એપ ન આપો.",
  "step.high.2": "આ નંબર કે ગ્રૂપ બ્લોક કરીને ફરિયાદ કરો.",
  "step.high.3": "ભરોસાના કોઈને બતાવો.",
  "step.multiple.1": "આજે પૈસા ન મોકલો. ૨૪ કલાક રાહ જુઓ.",
  "step.multiple.2": "નોંધણી જાતે SEBI ની સાઇટ પર તપાસો.",
  "step.multiple.3": "કોઈને પૂછો.",
  "step.some.1": "ઉતાવળમાં પૈસા ન મોકલો.",
  "step.some.2": "નોંધણી જાતે SEBI ની સાઇટ પર તપાસો.",
  "step.some.3": "કોઈને પૂછો.",
  "step.none.1": "આનો અર્થ એ નથી કે આ સલામત છે.",
  "step.none.2": "પૈસા મોકલતા પહેલાં UPI કે ખાતું SEBI Check પર તપાસો.",
  "step.notEnough.1": "આખો સંદેશ ચોંટાડો, પછી કંઈક કહી શકાશે.",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "શ્રેણી: ઓનલાઇન રોકાણના નામે છેતરપિંડી",
  "draft.portal.when": "ક્યારે થયું",
  "draft.portal.amount": "કેટલા મોકલ્યા",
  "draft.portal.how": "પૈસા કેવી રીતે ગયા",
  "draft.portal.toWhom": "ક્યાં ગયા: UPI આઈડી, ખાતું, એપ, વેબસાઇટ",
  "draft.portal.txn": "વ્યવહાર આઈડી અથવા UTR",
  "draft.portal.contact": "તમારું નામ, સરનામું અને મોબાઇલ નંબર",
  "draft.portal.evidence": "તમારી પુરાવાની ફાઇલો",
  "draft.scores.noChronology": "(બનાવોનો ક્રમ હજી ભરેલો નથી)",
  "draft.scores.body": `પ્રતિ,
ફરિયાદ નિવારણ કક્ષ

વિષય: ઓનલાઇન રોકાણના નામે થયેલી છેતરપિંડી અંગે ફરિયાદ

૧. ફરિયાદીની વિગતો: (નામ, સરનામું, મોબાઇલ, ઈમેલ ભરો)
૨. જેની સામે ફરિયાદ છે તે: {toWhom}
૩. ફરિયાદનું સ્વરૂપ: {promised} નું વચન આપીને પૈસા લેવાયા.
૪. બનાવોનો ક્રમ:
{chronology}
૫. રકમ: રૂ {amount}
૬. વ્યવહાર આઈડી: {txn}
૭. માગેલી રાહત: મોકલેલી રકમ પરત મળે, અને તપાસ થાય.
૮. જોડેલા દસ્તાવેજો: {evidence}

આપનો વિશ્વાસુ,
(નામ અને સહી)`,
  "draft.copy": "મુસદ્દો કોપી કરો",
  "draft.copied": "કોપી થયું",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "બોલો",
  "check.paste": "ચોંટાડો",
  "check.photo": "ફોટો",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "ચોંટાડવાની પરવાનગી મળી નથી. ખાનું દબાવી રાખો, પછી ચોંટાડો પસંદ કરો.",
  "check.fromShare": "વોટ્સએપ પરથી મોકલેલો સંદેશ",
  "check.tooShort": "થોડું વધારે લખો, આટલાથી કંઈ કહી શકાતું નથી.",
  "check.tooLong": "સંદેશ બહુ લાંબો છે, પહેલા {max} અક્ષરો તપાસાય છે.",
  "check.questionsTitle": "ઇચ્છા હોય તો, ત્રણ નાના પ્રશ્નો",
  "check.q1": "એમણે જ પહેલાં સંપર્ક કર્યો હતો?",
  "check.q2": "પૈસા, OTP કે એપ માગ્યાં?",
  "check.q3": "આ વ્યક્તિને તમે ઓળખો છો?",
  "check.samples": "નમૂના",
  "check.samplesTitle": "નમૂના સંદેશ",
  "check.samplesLine": "આ બધા કાલ્પનિક છે, કોઈ સાચી વ્યક્તિના નથી.",
  "check.useSample": "આ તપાસો",
  "check.listening": "સાંભળી રહ્યા છીએ",
  "check.speakIdle": "બોલો",
  "check.voiceUnavailable": "આ ફોનમાં બોલવાની સગવડ નથી. સંદેશ ચોંટાડો.",
  "check.voiceOffline": "બોલવા માટે ઇન્ટરનેટ જોઈએ. સંદેશ ચોંટાડો.",
  "check.voiceNothingHeard": "કંઈ સંભળાયું નહીં. ફરી કરો, અથવા સંદેશ ચોંટાડો.",
  "check.voiceDenied":
    "માઇક્રોફોન બંધ છે. બ્રાઉઝરની સેટિંગમાં પરવાનગી આપો, અથવા સંદેશ ચોંટાડો.",
  "check.ocrOffline": "ફોટો વાંચવા પહેલી વાર ઇન્ટરનેટ જોઈએ. સંદેશ ચોંટાડો.",
  "check.ocrReading": "ચિત્ર વાંચી રહ્યા છીએ",
  "check.ocrStayed": "ફોટો તમારા ફોનની બહાર ગયો નથી",
  "check.ocrLowConfidence": "કેટલાક શબ્દો ખોટા વંચાયા હોઈ શકે, એક વાર જોઈ લો.",
  "check.ocrFailed":
    "ચિત્ર સ્પષ્ટ વંચાયું નહીં. સંદેશ ચોંટાડો અથવા ફરી ફોટો લો.",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "સંદેશ અહીં ચોંટાડો, અથવા નીચે બોલો",
  "composer.label": "તપાસવાનો સંદેશ",
  "composer.speak": "બોલો",
  "composer.photo": "ફોટો",
  "composer.primedVoice": "બોલો દબાવો અને સંદેશ વાંચી સંભળાવો.",
  "composer.primedPhoto": "ફોટો દબાવીને સ્ક્રીનશોટ પસંદ કરો.",
  "composer.paste": "ચોંટાડો",
  "composer.clear": "ભૂંસો",
  "composer.submit": "તપાસો",
  "composer.empty": "પહેલાં સંદેશ ચોંટાડો અથવા બોલો",
  "composer.privacy": "તપાસ ફક્ત આ જ ફોનમાં થાય છે",
  "composer.photoPrivacy": "ફોટો તમારા ફોનની બહાર ગયો નથી",
  "composer.photoReading": "ફોટો વાંચી રહ્યા છીએ… {pct}%",
  "composer.fromShare": "બીજી એપ પરથી મોકલેલો સંદેશ",
  "composer.cleared": "તમે લખેલું ભૂંસી નાખ્યું.",
};
