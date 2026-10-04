import type { Lexicon } from "./concepts";

/* Gujarati, the eight concepts every language pack must cover. Not yet
   reviewed by a second speaker, so the UI marks this pack "(beta)". */
export const gu: Lexicon = {
  lang: "gu",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "ગેરંટી",
      "ગેરંટી સાથે",
      "ચોક્કસ નફો",
      "પાક્કો નફો",
      "નિશ્ચિત નફો",
      "કોઈ જોખમ નથી",
      "નુકસાન નહીં થાય",
      "રિસ્ક ફ્રી",
    ],
    URGENCY: [
      "જલ્દી કરો",
      "આજે જ",
      "આજે જ જોડાઓ",
      "મર્યાદિત બેઠકો",
      "છેલ્લી તક",
      "ઓફર પૂરી",
      "મોડું ન કરો",
    ],
    VIP_GROUP: [
      "વીઆઈપી ગ્રુપ",
      "પ્રીમિયમ ગ્રુપ",
      "ગ્રુપમાં જોડાઓ",
      "ખાનગી ગ્રુપ",
      "ચેનલમાં જોડાઓ",
    ],
    INSIDER: [
      "અંદરની ખબર",
      "અંદરની માહિતી",
      "ગુપ્ત માહિતી",
      "ઓપરેટરનો કોલ",
    ],
    DOUBLE_MONEY: [
      "બમણું",
      "પૈસા બમણા",
      "ડબલ",
      "ત્રણ ગણું",
    ],
    OTP: [
      "ઓટીપી",
      "ઓટીપી કહો",
      "ઓટીપી મોકલો",
      "પિન કહો",
      "પાસવર્ડ કહો",
      "કોડ મોકલો",
    ],
    FEE_TO_WITHDRAW: [
      "પૈસા ઉપાડવા માટે",
      "ટેક્સ ભરો",
      "કર ભરો",
      "પ્રોસેસિંગ ફી",
      "રિલીઝ ચાર્જ",
      "ખાતું હોલ્ડ",
      "પૈસા પાછા અપાવીશું",
    ],
    REMOTE_ACCESS: [
      "એનીડેસ્ક",
      "ટીમવ્યૂઅર",
      "સ્ક્રીન શેર",
      "સ્ક્રીન બતાવો",
      "એપીકે",
      "એપ ઇન્સ્ટોલ કરો",
    ],
    /* Isolation is how the pressure survives: a person who is told to keep
       it to themselves has nobody to ask. The pack carried every other core
       concept but this one. */
    SECRECY: [
      "કોઈને કહેશો નહીં",
      "ગુપ્ત રાખો",
      "ઘરમાં કહેશો નહીં",
      "ફક્ત તમારા માટે",
      "ખાનગી રાખો",
    ],
  },
};
