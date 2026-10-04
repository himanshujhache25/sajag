import type { Concept } from "./types";

/* English, written by hand alongside the Hindi. Not a machine translation:
   the pictures are the same, the sentences are built for English. */
export const LEARN_EN: Concept[] = [
  {
    id: "sebi-registration",
    n: 1,
    title: "SEBI registration",
    line: "Who is allowed to advise",
    everyday:
      "Like a doctor's licence. It says they are allowed to practise. It does not say they will never be wrong.",
    meaning: [
      "Being registered with SEBI means that person or firm is inside the rules and can be held to them.",
      "It does not mean their calls will be right, and it never means a profit is promised.",
    ],
    trap: [
      "Scammers lift a real firm's name and registration number and paste them into their own message.",
      "Check the number on SEBI's own site, not on the screenshot they sent you.",
    ],
    quiz: {
      q: "Someone sends you their INA number. What is the best thing to do?",
      options: [
        "Trust it, the number looks real",
        "Search that number on SEBI's site and see if the name matches",
        "Ask them whether the number is really theirs",
      ],
      answer: 1,
      why: [
        "A real-looking number can belong to someone else entirely.",
        "Yes. The number and the name have to match before it means anything.",
        "Someone who is cheating you will not tell you the truth about themselves.",
      ],
    },
    search: ["sebi", "registration", "ina", "inh", "licence", "license"],
    related: { href: "/check", label: "Check a message" },
  },
  {
    id: "demat",
    n: 2,
    title: "Demat account",
    line: "Where your shares sit",
    everyday:
      "A locker with your name on it. The difference is that it holds shares in electronic form, not paper.",
    meaning: [
      "A demat account holds your shares and some other investments in your own name.",
      "The account sits with a depository (NSDL or CDSL); your broker opens it for you.",
    ],
    trap: [
      "You do not buy shares by sending money to a person's or an app's account. Shares must arrive in your own demat account.",
      "Your statement comes from the depository itself. Read that, not the number an app paints on its screen.",
    ],
    quiz: {
      q: "An app shows your profit climbing. What is the real check?",
      options: [
        "The balance shown inside the app",
        "Your own statement from NSDL or CDSL",
        "Screenshots other people post in the group",
      ],
      answer: 1,
      why: [
        "Any number at all can be written on an app's screen.",
        "Yes. The statement reaches you from the depository directly.",
        "A screenshot is the easiest thing in the world to make.",
      ],
    },
    search: ["demat", "nsdl", "cdsl", "locker", "shares", "depository"],
  },
  {
    id: "nominee",
    n: 3,
    title: "Nominee",
    line: "Who gets the locker after you",
    everyday:
      "You write down in advance who should receive what is in the locker if you are gone.",
    meaning: [
      "A nominee is the person your investments are handed to after you.",
      "Naming one takes a few minutes and costs nothing.",
    ],
    trap: [
      "With no nominee the family can spend months on paperwork, sometimes in court.",
      "People forget to update the name after a marriage, a separation or a death.",
    ],
    quiz: {
      q: "When should you check the nominee name?",
      options: [
        "When you open the account, and after any big change at home",
        "Only when you want to withdraw money",
        "Never; the bank fills it in for you",
      ],
      answer: 0,
      why: [
        "Yes. Writing it once and forgetting it is not enough.",
        "By then it is too late for the people who need it.",
        "Nobody fills it in for you. You have to give the name.",
      ],
    },
    search: ["nominee", "nomination", "heir", "family"],
  },
  {
    id: "nav",
    n: 4,
    title: "NAV",
    line: "The price of one unit",
    everyday:
      "Ten people farm one field together. Take the field's worth, subtract costs, divide by the shares: that is what one share is worth. NAV works the same way.",
    meaning: [
      "NAV is the value of one unit of a mutual fund after its costs are taken out.",
      "It is set once after each trading day; it does not tick up and down all day.",
    ],
    trap: [
      "A low NAV does not mean a cheap fund. A ten-rupee unit and a hundred-rupee unit can rise by the same percentage.",
      "\"The NAV is low right now, buy quickly\" is a line meant to hurry you.",
    ],
    quiz: {
      q: "Is a fund with NAV ₹10 cheaper than one with NAV ₹100?",
      options: [
        "Yes, ten times cheaper",
        "No. You simply get more units for the same money",
        "Yes, so it will earn more",
      ],
      answer: 1,
      why: [
        "₹1,000 buys you the same amount of fund either way.",
        "Yes. 100 units against 10 units; the money is the same.",
        "Earnings come from how the fund does, not from the size of the number.",
      ],
    },
    search: ["nav", "mutual fund", "unit", "net asset value"],
  },
  {
    id: "sip",
    n: 5,
    title: "SIP",
    line: "A fixed amount every month",
    everyday:
      "Like the habit of a recurring deposit. A fixed amount goes in every month. The difference is that here the value moves with the market.",
    meaning: [
      "A SIP is not a product; it is a way of investing: the same amount on the same date, again and again.",
      "It averages out your buying price. It does not promise you anything.",
    ],
    trap: [
      "\"A SIP cannot lose money\" is false. In a falling market its value falls too.",
      "Anyone saying \"so many percent every month, guaranteed\" is not selling a SIP.",
    ],
    quiz: {
      q: "Someone says \"start a SIP, 3% guaranteed every month\". What is this?",
      options: [
        "A good chance, because a SIP cannot lose money",
        "A scam signal, because a SIP guarantees nothing",
        "Fine, as long as the company is large",
      ],
      answer: 1,
      why: [
        "A SIP is a habit, not a guarantee.",
        "Yes. The promise of a sure return is the loudest signal there is.",
        "A large company cannot promise a return either.",
      ],
    },
    search: ["sip", "monthly", "instalment", "systematic"],
    related: { href: "/simulate", label: "See the loss maths" },
  },
  {
    id: "risk-return",
    n: 6,
    title: "Risk and return",
    line: "They travel together",
    everyday:
      "The road that gets you there fastest also has the most potholes. Someone who talks only about the speed and never about the potholes is selling you something.",
    meaning: [
      "Where there is more to gain, there is more to lose.",
      "The two cannot be separated, however confidently someone says otherwise.",
    ],
    trap: [
      "\"High returns, no risk\" does not exist in any real investment.",
      "How plainly someone talks about losses tells you what they are after.",
    ],
    quiz: {
      q: "\"Up to 18%, and it can fall\" against \"18% guaranteed\". Which is more trustworthy?",
      options: [
        "The second; it gives a clear number",
        "The first; it is not hiding the loss",
        "They are the same",
      ],
      answer: 1,
      why: [
        "A clear promised number is the biggest warning sign of all.",
        "Yes. Someone who names the loss is telling you the whole thing.",
        "No. One stays inside the rules; the other does not.",
      ],
    },
    search: ["risk", "return", "guarantee", "assured"],
  },
  {
    id: "volatility",
    n: 7,
    title: "Volatility",
    line: "Prices moving day to day",
    everyday:
      "The monsoon does not behave the same every day. A downpour, then a dry afternoon. Prices swing the same way.",
    meaning: [
      "Volatility is how far and how fast a price moves around.",
      "Things that move a lot feel frightening over short stretches, whatever happens over long ones.",
    ],
    trap: [
      "Selling in panic after one bad day and jumping in after one good day are the same mistake wearing two faces.",
      "A loss caused by a swing is still a real loss, if you sold during it.",
    ],
    quiz: {
      q: "A price fell 8% in one day. What does that tell you for certain?",
      options: [
        "The company is going under",
        "It will bounce back tomorrow",
        "Nothing certain. Only that this thing moves sharply",
      ],
      answer: 2,
      why: [
        "One day's move cannot tell you that.",
        "Nobody knows. Stay away from anyone who claims to.",
        "Yes. One day's move is just one day's move.",
      ],
    },
    search: ["volatility", "swing", "fall", "crash"],
  },
  {
    id: "diversification",
    n: 8,
    title: "Spreading out",
    line: "Not all the grain in one sack",
    everyday:
      "Keep the whole harvest in one sack, let damp get into it, and the year is gone. So people use several sacks.",
    meaning: [
      "Spreading money across different kinds of places means one thing going wrong does not take everything.",
      "It is not a way to earn more; it is a way to avoid losing all of it.",
    ],
    trap: [
      "Ten funds with ten different names are not spread out if all ten hold the same kind of thing.",
      "\"Put it all in this one, this is the one\" is pointing you in exactly the wrong direction.",
    ],
    quiz: {
      q: "Someone says \"put your whole savings into this one\". How does that sound?",
      options: [
        "Fine, if they are confident",
        "A warning, because one thing going wrong takes everything",
        "Fine, if the amount is small",
      ],
      answer: 1,
      why: [
        "Their confidence will not pay for your loss.",
        "Yes. It is the whole harvest in one sack.",
        "A small amount is still your money.",
      ],
    },
    search: ["diversification", "spread", "portfolio", "sack"],
  },
  {
    id: "leverage",
    n: 9,
    title: "Leverage and margin",
    line: "Borrowed weight",
    everyday:
      "Pushing with your own shoulder is one thing. Pushing with a heavy borrowed cart is another: more force, but it can roll back over you.",
    meaning: [
      "Borrowing to invest makes the gain and the loss bigger by the same multiple.",
      "At 5× leverage, a 20% fall can wipe out everything you put in.",
    ],
    trap: [
      "\"Margin\" and \"leverage\" sound technical, but the plain fact is simple: the money is borrowed and the interest keeps running.",
      "If money borrowed from a friend, a relative or an app is lost, the debt is still there.",
    ],
    quiz: {
      q: "₹10,000 at 10× leverage. The price falls 10%. What happened?",
      options: [
        "A loss of ₹1,000",
        "Almost the whole capital is gone",
        "Nothing; the lender takes the hit",
      ],
      answer: 1,
      why: [
        "That would be the case with no leverage at all.",
        "Yes. At 10×, a 10% move equals your entire capital.",
        "Losses always come out of your capital first.",
      ],
    },
    search: ["leverage", "margin", "borrowed", "f&o", "futures", "options"],
    related: { href: "/simulate", label: "Run the borrowing balance" },
  },
  {
    id: "compounding",
    n: 10,
    title: "Compounding",
    line: "Interest on interest",
    everyday:
      "Think of a moneylender's book. Interest is charged on the interest too, and the balance grows quietly.",
    meaning: [
      "Compounding means your earnings start earning as well. Time does most of the work.",
      "The same rule runs on debt and on fees, at the same speed, only against you.",
    ],
    trap: [
      "\"2% compounded daily\" is impossible even as arithmetic. No real investment does that.",
      "Card and app borrowings compound too. That side is rarely shown to you.",
    ],
    quiz: {
      q: "Which way does compounding work?",
      options: [
        "Only on savings",
        "On savings and on debt, both",
        "Only in the stock market",
      ],
      answer: 1,
      why: [
        "The same arithmetic runs on a loan.",
        "Yes. That is why investing borrowed money is doubly dangerous.",
        "It is not a rule of one market; it is arithmetic.",
      ],
    },
    search: ["compounding", "interest", "compound"],
  },
  {
    id: "fees",
    n: 11,
    title: "Fees and expense ratio",
    line: "A small cut, every year",
    everyday:
      "The commission agent's cut at the mandi. It looks small once, but it is taken every year and it adds up.",
    meaning: [
      "The expense ratio is the slice a fund takes out of your money each year to run itself.",
      "The gap between 1% and 2% looks tiny and becomes a large sum over twenty years.",
    ],
    trap: [
      "Fees usually live at the bottom of the page. Read that part first.",
      "\"Pay a fee to release your money\" never happens at a real place. It is a well-known scam.",
    ],
    quiz: {
      q: "Someone wants a \"processing fee\" before releasing your money. What now?",
      options: [
        "Pay it; the amount at stake is large",
        "Stop. This is a well-known scam",
        "Pay half and see what happens",
      ],
      answer: 1,
      why: [
        "Once you pay one fee, the next fee is asked for.",
        "Yes. A real place never asks for money to give you your own money.",
        "Paying anything at all puts your foot in the same trap.",
      ],
    },
    search: ["fees", "expense ratio", "commission", "charges"],
    related: { href: "/madad", label: "Money gone? Start here" },
  },
  {
    id: "bonus-split",
    n: 12,
    title: "Bonus and split",
    line: "More pieces of the same roti",
    everyday:
      "Cutting one roti into eight pieces instead of four does not give you more roti. The pieces just get smaller.",
    meaning: [
      "In a bonus or a split the number of your shares goes up and the price of one share comes down to match.",
      "The total value in your hands at that moment stays the same.",
    ],
    trap: [
      "\"There is a split, the price is halving, buy quickly\" sells the feeling of a bargain, not a bargain.",
      "\"Free shares\" sounds like a gift, but no new money arrives from anywhere.",
    ],
    quiz: {
      q: "After a 1:1 bonus you hold twice as many shares. What is the total worth?",
      options: [
        "Twice as much",
        "About the same, at that moment",
        "Half as much",
      ],
      answer: 1,
      why: [
        "The count doubled; the value did not.",
        "Yes. The price of one share halves.",
        "Your share has not shrunk; the pieces are just smaller.",
      ],
    },
    search: ["bonus", "split", "free shares", "stock split"],
  },
];
