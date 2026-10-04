/* English for /learn and /simulate. Same keys as hi-learn.ts. */
export const enLearn: Record<string, string> = {
  "learn.title": "Understand",
  "learn.sub": "Twelve ideas, in everyday pictures.",
  "learn.searchLabel": "Search",
  "learn.searchPlaceholder": "try: margin, NAV, fees",
  "learn.noResult": "Nothing matched those words.",
  "learn.noResultLine": "Try another word, or read the list below.",
  "learn.showAll": "Show all twelve",
  "learn.found": "{n} found",
  "learn.beta":
    "These cards are still in Hindi. The translation into your language has not been checked yet.",
  "learn.askTitle": "Ask in your own words",
  "learn.askLine": "The answer comes from these twelve cards. This is not a chat.",
  "learn.askPlaceholder": "for example: what does margin mean?",
  "learn.ask": "Ask",
  "learn.askOffline": "The net is off, so the search below answered instead.",
  "learn.askLocal": "Answered on your own phone.",
  "learn.askNone": "These twelve cards do not answer that.",

  "learn.everyday": "An everyday picture",
  "learn.meaning": "What it means",
  "learn.trap": "Where the trap is",
  "learn.try": "Try it yourself",
  "learn.tryAgain": "Try again",
  "learn.right": "Right",
  "learn.wrong": "Not this one",
  "learn.noScore": "No marks are kept. This is only to think it through.",
  "learn.infoNotAdvice": "This is information, not advice.",

  /* The ask box. Only appears when a model is configured. The ask keys above
     are from Phase 4 and are reused rather than duplicated. */
  "learn.asking": "Asking…",
  "learn.machineWrote": "Written by a computer. It can be wrong.",
  "learn.askFailed":
    "No answer this time. The card above says the same thing in our own words.",
  "learn.askNote":
    "The question goes over the internet. Reading the card works without it.",
  "learn.readAloud": "Read aloud",
  "learn.stop": "Stop",
  "learn.related": "Related",
  "learn.prev": "Previous",
  "learn.next": "Next",
  "learn.backToIndex": "Back to the list",
  "learn.ofTwelve": "{n} / 12",

  "sim.title": "Run the numbers",
  "sim.sub": "Made-up numbers, no real money.",
  "sim.tabLoss": "The maths of a loss",
  "sim.tabLeverage": "The borrowing balance",
  "sim.notReal":
    "These are made-up numbers, not a forecast. No real money is involved.",

  "sim.loss.lead": "Say you have ₹10,000.",
  "sim.loss.slider": "How much was lost",
  "sim.loss.after": "₹{start} → ₹{left} ({pct}%)",
  "sim.loss.need": "To get back to ₹{start} you need +{gain}%",
  "sim.loss.barNow": "Left now",
  "sim.loss.barNeed": "Needed to get back",
  "sim.loss.point":
    "Losing half and then gaining half is not enough. You have to double.",
  "sim.loss.aria":
    "After a {pct} percent loss, ₹{left} is left, and getting back to ₹{start} needs a gain of {gain} percent.",

  "sim.lev.capital": "Your capital",
  "sim.lev.leverage": "Borrowing multiple",
  "sim.lev.move": "Daily move",
  "sim.lev.moveCalm": "Normal",
  "sim.lev.moveFast": "Fast",
  "sim.lev.costs": "Include daily costs and interest",
  "sim.lev.days": "20 days",
  "sim.lev.run": "Run it again",
  "sim.lev.seed": "Seed: {seed}",
  "sim.lev.chartTitle": "20 of the 200 paths",
  "sim.lev.startLine": "Starting capital",
  "sim.lev.result":
    "Out of 200 runs, {half} lost more than half the capital and {zero} lost all of it.",
  "sim.lev.median": "Middle outcome: ₹{median}",
  "sim.lev.best": "Best: ₹{best}",
  "sim.lev.worst": "Worst: ₹{worst}",
  "sim.lev.aria":
    "At {lev} times leverage over 20 days, run 200 times, {half} runs lost more than half the capital and {zero} lost all of it. The middle outcome was ₹{median}.",
  "sim.lev.point":
    "The bigger the borrowing multiple, the more often everything goes. The gains grow too, but being wiped out does not undo itself.",
  "sim.lev.costsNote":
    "Interest and costs come off every day, whether the price moves or not.",
  "sim.noInstruments": "No real share or fund is named here.",
};
