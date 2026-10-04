# Evaluation

Run on 2026-10-04 with engine `1.0.0` and ruleset `2026-10-05`.

**This corpus is synthetic and written by the team.** Every message was invented for testing, with fictional handles and `.example`, `.invalid` or `.top` demo domains. The numbers below say whether the rules behave as we intended. They are not field accuracy and should not be read as such.

## Corpus

120 messages: 60 scam-pattern, 0 multiple-flag, 18 borderline, 42 clean.

## Confusion matrix

```
label \ state | NOT_ENOUGH_ | NO_STRONG_F | SOME_CONCER | MULTIPLE_RE | HIGH_RISK   | n          
--------------|-------------|-------------|-------------|-------------|-------------|------------
high          | 0           | 0           | 3           | 22          | 35          | 60         
multiple      | 0           | 0           | 0           | 0           | 0           | 0          
some          | 0           | 13          | 4           | 1           | 0           | 18         
none          | 0           | 38          | 3           | 1           | 0           | 42         
```

## Targets

| measure | target | result | met |
| --- | --- | --- | --- |
| recall at MULTIPLE_RED_FLAGS or above, on high and multiple | 0.90 or more | 95.0% | yes |
| false alarm at MULTIPLE_RED_FLAGS or above, on clean | 0.05 or less | 2.4% | yes |
| false alarm at SOME_CONCERNS or above, on clean | 0.15 or less | 9.5% | yes |

## Golden messages

9 of 9 match the expected state.

- G1: expected `HIGH_RISK`, got `HIGH_RISK`
- G2: expected `HIGH_RISK`, got `HIGH_RISK`
- G3: expected `HIGH_RISK`, got `HIGH_RISK`
- G4: expected `HIGH_RISK`, got `HIGH_RISK`
- G5: expected `NO_STRONG_FLAGS`, got `NO_STRONG_FLAGS`
- G6: expected `NO_STRONG_FLAGS`, got `NO_STRONG_FLAGS`
- G7: expected `NO_STRONG_FLAGS`, got `NO_STRONG_FLAGS`
- G8: expected `HIGH_RISK`, got `HIGH_RISK`
- G9: expected `NO_STRONG_FLAGS`, got `NO_STRONG_FLAGS`

## Where it disagreed with the label

- `high` -> `MULTIPLE_RED_FLAGS` (hinglish): insider — "Insider news hai, kal is stock me upper circuit lagega, pehle hi le li…"
- `high` -> `SOME_CONCERNS` (hinglish): payment to individual upi — "Membership fee Rs 2999 bhejiye is UPI par trader.demo@okdemo, phir pre…"
- `high` -> `MULTIPLE_RED_FLAGS` (hinglish): urgency plus guarantee plus payment — "Sirf 10 seat bachi hain, aaj raat tak guaranteed profit plan band ho j…"
- `high` -> `MULTIPLE_RED_FLAGS` (hinglish): crypto bot plus guarantee — "Crypto arbitrage bot laga dijiye, roz 3% pakka, koi loss nahi hota"
- `high` -> `MULTIPLE_RED_FLAGS` (hinglish): small capital — "Kam paise me zyada profit, 10 hazar se 1 lakh banaiye, expiry day jack…"
- `high` -> `MULTIPLE_RED_FLAGS` (hinglish): fake proof plus guarantee — "Aaj ka profit dekho members ka, screenshot bhej raha hoon, aap bhi jud…"
- `high` -> `MULTIPLE_RED_FLAGS` (hinglish): secrecy plus guarantee — "Kisi ko mat batana, ye call sirf aapke liye hai, guaranteed profit mil…"
- `high` -> `MULTIPLE_RED_FLAGS` (hinglish): binary options — "Binary options me 90% accuracy, forex signal lijiye, loss ka sawal hi …"
- `high` -> `MULTIPLE_RED_FLAGS` (en): insider — "We receive insider information from the company before results are ann…"
- `high` -> `SOME_CONCERNS` (en): individual upi — "Pay the registration fee of Rs 7500 to profits.demo@okdemo and your ca…"
- `high` -> `MULTIPLE_RED_FLAGS` (en): crypto bot — "Our crypto trading bot gives a guaranteed 4 percent every single day w…"
- `high` -> `MULTIPLE_RED_FLAGS` (en): fake proof — "Look at yesterday's profit screenshots of our members, join now for th…"
- `high` -> `MULTIPLE_RED_FLAGS` (en): secrecy — "Do not tell anyone about this call, it is confidential and only for se…"
- `high` -> `MULTIPLE_RED_FLAGS` (en): registration plus guarantee — "Our research analyst registration is INH000888111, we promise 12 perce…"
- `high` -> `MULTIPLE_RED_FLAGS` (en): small capital — "Turn 10000 into 1 lakh this expiry with our hero zero strategy, no ris…"
- `high` -> `MULTIPLE_RED_FLAGS` (hi): false approval — "सेबी अप्रूव्ड ग्रुप है, कोई जोखिम नहीं, पक्का मुनाफा मिलेगा"
- `high` -> `MULTIPLE_RED_FLAGS` (hi): insider plus secrecy — "अंदर की खबर है, कल इस शेयर में तेजी आएगी, किसी को मत बताना"
- `high` -> `SOME_CONCERNS` (hi): individual upi — "सदस्यता शुल्क 3000 रुपये इस यूपीआई पर भेजिए demo.trader@okdemo"
- `high` -> `MULTIPLE_RED_FLAGS` (hi): crypto bot — "क्रिप्टो डबल स्कीम में लगाइए, ट्रेडिंग बॉट रोज़ तीन प्रतिशत देता है, न…"
- `high` -> `MULTIPLE_RED_FLAGS` (hi): urgency — "सिर्फ दस सीट बची हैं, आज रात तक पक्का मुनाफा वाला प्लान बंद हो जाएगा"
- `high` -> `MULTIPLE_RED_FLAGS` (hi): small capital — "कम पूंजी में ज्यादा कमाई, दस हजार से एक लाख, गारंटीड"
- `high` -> `MULTIPLE_RED_FLAGS` (hi): fake proof — "आज का मुनाफा देखिए हमारे सदस्यों का, आप भी जुड़िए पक्का फायदा"
- `high` -> `MULTIPLE_RED_FLAGS` (bn): bengali guarantee — "আমাদের ভিআইপি গ্রুপে যোগ দিন, প্রতিদিন নিশ্চিত লাভ, গ্যারান্টি সহ"
- `high` -> `MULTIPLE_RED_FLAGS` (te): telugu guarantee — "మా వీఐపీ గ్రూప్‌లో చేరండి, ప్రతిరోజూ ఖచ్చితమైన లాభం, గ్యారంటీ"
- `high` -> `MULTIPLE_RED_FLAGS` (gu): gujarati guarantee — "અમારા વીઆઈપી ગ્રુપમાં જોડાઓ, રોજ ચોક્કસ નફો, ગેરંટી સાથે"
- `none` -> `MULTIPLE_RED_FLAGS` (en): education with negation — "Nobody can guarantee returns in the securities market. If someone prom…"
- `none` -> `SOME_CONCERNS` (en): warning frame — "Remember that a trading bot promising daily profit is a known trap. Th…"
- `some` -> `NO_STRONG_FLAGS` (en): selling but with disclosure — "Our advisory charges a fee of Rs 1999 per month for research reports. …"
- `some` -> `NO_STRONG_FLAGS` (en): urgency in a mild context — "Join our free webinar this Sunday on how options work. Limited seats, …"
- `none` -> `SOME_CONCERNS` (en): registered and matching — "We are a registered research analyst INH000111222 and publish weekly r…"
- `some` -> `MULTIPLE_RED_FLAGS` (en): suspended registration in snapshot — "Our analyst registration number is INH000222333, subscribe for daily c…"
- `some` -> `NO_STRONG_FLAGS` (hinglish): tip format — "DemoInfra ko 220 ke upar lijiye, target 240, stop loss 212, intraday k…"
- `some` -> `NO_STRONG_FLAGS` (en): fake proof alone — "Our members made good returns last quarter. Screenshots of their state…"
- `some` -> `NO_STRONG_FLAGS` (en): urgency alone — "Hurry, our early bird pricing for the trading course closes tonight at…"
- `some` -> `NO_STRONG_FLAGS` (en): profit sharing — "We share profit with our clients: you keep seventy percent and we take…"
- `some` -> `NO_STRONG_FLAGS` (hi): selling with disclosure — "हमारी सलाह सेवा का शुल्क 1500 रुपये महीना है, पिछला प्रदर्शन भविष्य की…"
- `some` -> `NO_STRONG_FLAGS` (en): service call from a mobile — "Call 9876500011 for customer service regarding your trading account st…"
- `some` -> `NO_STRONG_FLAGS` (en): superlatives — "We are the number one advisory in the country with the highest ever ac…"
- `some` -> `NO_STRONG_FLAGS` (hinglish): urgency plus price — "Hamara naya plan sirf is hafte ke liye hai, course fee 4999, abhi book…"
- `none` -> `SOME_CONCERNS` (en): registered portfolio manager — "Our portfolio manager registration INP000777888 is active. Portfolio m…"
- `some` -> `NO_STRONG_FLAGS` (en): selling plus contact ask — "Learn intraday trading from our mentor, limited batch, fee Rs 15000, D…"
- `some` -> `NO_STRONG_FLAGS` (hi): selling plus contact — "निवेश सलाह के लिए हमसे व्हाट्सऐप पर संपर्क कीजिए, शुल्क 999 रुपये महीन…"
- `some` -> `NO_STRONG_FLAGS` (hinglish): soft assurance plus tip — "Yeh stock abhi lijiye, bada move aane wala hai, mujhe pakka bharosa ha…"

## Known limitations

These are understood, not mysteries. They are written here rather than
chased, because narrowing a rule until one corpus row passes is a good way
to make the engine worse on messages nobody has written yet.

- A scam phrase inside a conditional still counts. "If someone promises
  assured profit, that itself is the warning sign" reads as a promise,
  because the engine checks negation and warning frames but does not parse
  clauses. The sentence before it, "Nobody can guarantee returns", is
  correctly ignored. This costs one false alarm on the clean set.
- A warning frame has to open the sentence. A warning that arrives at the
  end, as in "...that itself is the warning sign", is not recognised.
- The corpus is synthetic and written by the team, so every number above is
  indicative. It says the engine behaves as designed on messages we thought
  of. It does not say how it behaves in the field, and the two should never
  be confused.
