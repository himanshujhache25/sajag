/* English mirror of hi-signals.ts. Same keys, same order. */
export const enSignals: Record<string, string> = {
  "signal.S01.title": "Asks for an OTP, PIN or password",
  "signal.S01.why":
    "No real company, bank or official ever asks for an OTP, PIN, CVV or password.",
  "signal.S01.basis": "Basis: standard bank and regulator caution",

  "signal.S02.title": "Wants control of your phone",
  "signal.S02.why":
    "Screen sharing or an app installed from a link lets a stranger reach your banking app.",
  "signal.S02.basis": "Basis: cybercrime portal caution",

  "signal.S03.title": "A fee is demanded before your money is released",
  "signal.S03.why":
    "You are never charged tax, a fee or a deposit to withdraw your own money. This is a second scam.",
  "signal.S03.basis": "Basis: SEBI investor caution",

  "signal.S04.title": "A promise of sure profit together with a way to pay",
  "signal.S04.why":
    "A guarantee and a payment or group link in the same message is the commonest scam shape.",
  "signal.S04.basis": "Basis: SEBI investor caution",

  "signal.S05.title": "Borrows the name of SEBI, an exchange or a bank",
  "signal.S05.why":
    "SEBI does not approve a group or a tip, and never asks you for money.",
  "signal.S05.basis": "Basis: SEBI's own official list",

  "signal.S10.title": "Promises sure profit or no risk",
  "signal.S10.why":
    "Nobody can promise returns in the securities market. The promise itself is the warning.",
  "signal.S10.basis": "Basis: SEBI investor caution",

  "signal.S11.title": "A return that cannot happen",
  "signal.S11.why":
    "A fixed percentage per day or week, or doubling money, does not happen in a real investment.",
  "signal.S11.basis": "Basis: SEBI investor education material",

  "signal.S12.title": "Pulls you into a private group",
  "signal.S12.why":
    "Inside a closed group nobody else can see what is said, so pressure is easy.",
  "signal.S12.basis": "Basis: SEBI investor caution",

  "signal.S13.title": "Claims inside information",
  "signal.S13.why":
    "Trading on such information is illegal, and very often there is no information at all.",
  "signal.S13.basis": "Basis: SEBI insider trading rules",

  "signal.S14.title": "Money asked for into a personal UPI or account",
  "signal.S14.why":
    "A registered firm takes money into its own account. SEBI provides @valid UPI handles so you can check.",
  "signal.S14.basis": "Basis: SEBI's @valid UPI arrangement",

  "signal.S15.title": "The registration number does not add up",
  "signal.S15.why":
    "The number is the wrong shape, is not in our snapshot, does not match the name, or is the wrong category for this work.",
  "signal.S15.basis": "Basis: SEBI's list of intermediaries",

  "signal.S16.title": "Something is wrong with the link",
  "signal.S16.why":
    "A lookalike address, a bare IP, a shortened link or a brand-new domain are all ways of hiding.",
  "signal.S16.basis": "Basis: cybercrime portal caution",

  "signal.S17.title": "Asks you to keep it to yourself",
  "signal.S17.why":
    "Pressure only survives when you are alone. Honest work has nothing to hide.",
  "signal.S17.basis": "Basis: SEBI investor education material",

  "signal.S20.title": "Rushes you",
  "signal.S20.why": "Few seats and little time are there so you cannot think.",
  "signal.S20.basis": "Basis: SEBI investor education material",

  "signal.S21.title": "Shows proof of profits",
  "signal.S21.why": "Screenshots are easy to make, so they are not evidence.",
  "signal.S21.basis": "Basis: SEBI investor education material",

  "signal.S22.title": "Leans on a big name",
  "signal.S22.why":
    "A famous name is there to borrow trust. It is not a substitute for checking.",
  "signal.S22.basis": "Basis: SEBI investor education material",

  "signal.S23.title": "Advice in the shape of a tip, from an unchecked source",
  "signal.S23.why":
    "Only a registered research analyst or investment adviser may tell you to buy or sell.",
  "signal.S23.basis": "Basis: SEBI's list of intermediaries",

  "signal.S24.title": "Big earnings from a small amount",
  "signal.S24.why":
    "Starting small is the first step; the amount is raised afterwards.",
  "signal.S24.basis": "Basis: SEBI investor education material",

  "signal.S25.title": "Crypto, a bot or forex signals",
  "signal.S25.why":
    "Several of these are outside the regulated space in India, so there is nowhere to complain.",
  "signal.S25.basis": "Basis: SEBI investor caution",

  "signal.S26.title": "Asks you to borrow and invest",
  "signal.S26.why":
    "If borrowed money is lost, the damage is twice over: the loss and the loan.",
  "signal.S26.basis": "Basis: SEBI investor education material",

  "signal.S27.title": "A service call from an ordinary mobile number",
  "signal.S27.why":
    "Registered firms make service calls to existing customers from numbers starting 1600. Sales calls are not covered, so this is only a mild sign.",
  "signal.S27.basis": "Basis: the 1600 number series arrangement",

  "signal.S28.title": "Profit sharing or a fee up front",
  "signal.S28.why":
    "Promising a share of profits and charging a fee in advance both go against the advice rules.",
  "signal.S28.basis": "Basis: SEBI investment adviser rules",

  "positive.P01.title": "The UPI ID is a @valid one",
  "positive.P02.title": "The registration is in our snapshot and the name matches",
  "positive.P03.title": "The number is from the 1600 series",
  "positive.P04.title": "The link is on the official list",

  "verified.P01.title": "The UPI ID is a @valid one",
  "verified.P02.title": "The registration is in our snapshot and the name matches",
  "verified.P03.title": "The number is from the 1600 series",
  "verified.P04.title": "The link is on the official list",
  "verified.registrationIsNotPerformance":
    "Registration does not guarantee performance or returns.",

  "unverifiable.sender": "Who really sent this, we cannot know",
  "unverifiable.sender.how": "Look for the number in your own contacts, or ask the firm on its official number.",
  "unverifiable.linksNotOpened": "We never open links, so we cannot say what is inside",
  "unverifiable.linksNotOpened.how": "If you must go, type the firm's name yourself and reach it from its official site.",
  "unverifiable.registrationNotInSnapshot":
    "The registration number is not in our snapshot, which does not mean it is wrong",
  "unverifiable.registrationNotInSnapshot.how": "Enter the number on SEBI's site and see for yourself.",
  "unverifiable.snapshotStale": "Our snapshot is more than thirty days old",
  "unverifiable.snapshotStale.how": "Check the current status on SEBI's site.",
  "unverifiable.registrationCategory":
    "We cannot say what kind of registration this number is",
  "unverifiable.registrationCategory.how":
    "Enter the number on SEBI's site and read the category there yourself.",
  "unverifiable.domainAgeNeedsInternet": "How old the domain is cannot be checked without the internet",
  "unverifiable.domainAgeNeedsInternet.how": "Check again once you are online.",
  "unverifiable.contextNotAsked": "The three small questions were not answered",
  "unverifiable.contextNotAsked.how": "Go back to the check page and answer all three.",
  "unverifiable.voiceAndVideo": "We do not analyse voice or video",
  "unverifiable.voiceAndVideo.how": "A face and a voice can both be faked in a video; do not trust them.",

  "claim.status.AGAINST_RULES": "Against the rules",
  "claim.status.CANNOT_BE_VERIFIED": "Cannot be verified",
  "claim.status.CHECK_ELSEWHERE": "Check here",
  "claim.status.NEEDS_CONTEXT": "Needs context",

  "claim.C_GUARANTEE.claim": "A promise of sure profit",
  "claim.C_GUARANTEE.evidence": "Nobody can promise returns, so no evidence can exist for this.",
  "claim.C_GUARANTEE.where": "SEBI's investor material",

  "claim.C_SEBI_APPROVED.claim": "A claim of SEBI approval",
  "claim.C_SEBI_APPROVED.evidence": "SEBI registers advisers; it does not approve a group or a tip.",
  "claim.C_SEBI_APPROVED.where": "Look the number up in SEBI's list of intermediaries",

  "claim.C_INSIDER.claim": "A claim of inside information",
  "claim.C_INSIDER.evidence": "Trading on such information is illegal.",
  "claim.C_INSIDER.where": "SEBI's insider trading rules",

  "claim.C_DOUBLE_MONEY.claim": "A claim of doubling money",
  "claim.C_DOUBLE_MONEY.evidence": "Market returns vary and can be negative.",
  "claim.C_DOUBLE_MONEY.where": "Ask a registered adviser for their disclosures",

  "claim.C_RETURN_FIGURE.claim": "A fixed return figure",
  "claim.C_RETURN_FIGURE.evidence": "Market returns vary and can be negative.",
  "claim.C_RETURN_FIGURE.where": "Ask a registered adviser for their disclosures",

  "claim.C_FAKE_PROOF.claim": "Screenshots of profits",
  "claim.C_FAKE_PROOF.evidence": "Screenshots are easy to fake, so they are not evidence.",
  "claim.C_FAKE_PROOF.where": "Ask for a real broker statement",

  "claim.C_SMALL_CAPITAL.claim": "Big earnings from a small amount",
  "claim.C_SMALL_CAPITAL.evidence": "A small amount carries exactly the same market risk.",
  "claim.C_SMALL_CAPITAL.where": "SEBI's investor material",

  "claim.C_URGENCY.claim": "Hurry, or only a few seats",
  "claim.C_URGENCY.evidence": "Being made to decide fast is a common trap.",
  "claim.C_URGENCY.where": "Wait a day and look again",

  "claim.C_SECRECY.claim": "Asked to tell nobody",
  "claim.C_SECRECY.evidence": "Honest work has nothing to hide.",
  "claim.C_SECRECY.where": "Show it to someone at home",

  "claim.C_BORROWED.claim": "Asked to borrow and invest",
  "claim.C_BORROWED.evidence": "If borrowed money is lost, the damage is twice over.",
  "claim.C_BORROWED.where": "SEBI's investor material",

  "claim.C_CRYPTO_BOT.claim": "A crypto, bot or forex claim",
  "claim.C_CRYPTO_BOT.evidence": "Several of these sit outside the regulated space.",
  "claim.C_CRYPTO_BOT.where": "SEBI's investor material",

  "claim.C_AUTHORITY_NAME.claim": "Leaning on a big name",
  "claim.C_AUTHORITY_NAME.evidence": "Mentioning a name is not the same as being registered.",
  "claim.C_AUTHORITY_NAME.where": "SEBI's list of intermediaries",

  "claim.C_REGISTRATION.claim": "A registration claim",
  "claim.C_REGISTRATION.evidence": "The number, the name and the category must all match.",
  "claim.C_REGISTRATION.where": "Enter the number on SEBI's site",

  "claim.C_TIP.claim": "Advice to buy or sell",
  "claim.C_TIP.evidence": "Giving advice needs a research analyst or investment adviser registration.",
  "claim.C_TIP.where": "SEBI's list of intermediaries",
};
