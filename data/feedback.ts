
// This file contains feedback for specific choices made by the player.
// The key is the 'choiceId' from the scenarios.

interface Feedback {
  outcome: { en: string; hi: string };
  betterOption: { en: string; hi: string };
}

export const decisionFeedback: Record<string, Feedback> = {
  // --- Student Year 1 ---
  'y1_s_choice1': {
    outcome: { en: "You chose to splurge on the party. While fun, this significantly reduced your early savings, making later financial goals harder.", hi: "आपने पार्टी पर खुलकर खर्च करने का विकल्प चुना। हालांकि यह मजेदार था, लेकिन इसने आपकी शुरुआती बचत को काफी कम कर दिया, जिससे बाद के वित्तीय लक्ष्यों को प्राप्त करना कठिन हो गया।" },
    betterOption: { en: "Suggest a smaller, budget-friendly celebration. This balances social life with financial responsibility.", hi: "एक छोटे, बजट-अनुकूल उत्सव का सुझाव दें। यह सामाजिक जीवन को वित्तीय जिम्मेदारी के साथ संतुलित करता है।" }
  },
  'y1_s_choice2': {
    outcome: { en: "You chose a budget-friendly celebration. This was a great decision that balanced social life with financial responsibility.", hi: "आपने एक बजट-अनुकूल उत्सव चुना। यह एक महान निर्णय था जिसने सामाजिक जीवन को वित्तीय जिम्मेदारी के साथ संतुलित किया।" },
    betterOption: { en: "This was an excellent choice! It preserved your savings while still allowing you to celebrate with your friend.", hi: "यह एक उत्कृष्ट विकल्प था! इसने आपके दोस्त के साथ जश्न मनाते हुए भी आपकी बचत को संरक्षित रखा।" }
  },
  'y1_s_choice4': {
    outcome: { en: "You bought the new textbook. This set you back financially when cheaper options were available.", hi: "आपने नई पाठ्यपुस्तक खरीदी। जब सस्ते विकल्प उपलब्ध थे, तब इसने आपको आर्थिक रूप से पीछे धकेल दिया।" },
    betterOption: { en: "Look for a second-hand copy or use the library. This is a key skill for student budgeting.", hi: "सेकेंड-हैंड कॉपी देखें या पुस्तकालय का उपयोग करें। यह छात्र बजट के लिए एक महत्वपूर्ण कौशल है।" }
  },
  'y1_s_choice5': {
    outcome: { en: "You found a cheaper textbook. This resourcefulness is excellent for maintaining a budget.", hi: "आपको एक सस्ती पाठ्यपुस्तक मिली। यह साधन संपन्नता बजट बनाए रखने के लिए उत्कृष्ट है।" },
    betterOption: { en: "This was the best financial move. You acquired the necessary materials without overspending.", hi: "यह सबसे अच्छा वित्तीय कदम था। आपने अधिक खर्च किए बिना आवश्यक सामग्री प्राप्त कर ली।" }
  },
  // --- Student Year 3 ---
  'y3_s_choice1': {
    outcome: { en: "You invested in a mutual fund. This is a very prudent choice for a new investor, offering growth while reducing risk.", hi: "आपने एक म्यूचुअल फंड में निवेश किया। यह एक नए निवेशक के लिए एक बहुत ही विवेकपूर्ण विकल्प है, जो जोखिम को कम करते हुए विकास प्रदान करता है।" },
    betterOption: { en: "For a beginner, this is an ideal strategy to enter the market safely.", hi: "एक शुरुआती के लिए, यह बाजार में सुरक्षित रूप से प्रवेश करने के लिए एक आदर्श रणनीति है।" }
  },
  'y3_s_choice2': {
    outcome: { en: "You invested in individual tech stocks. This was a high-risk move that can lead to significant losses.", hi: "आपने व्यक्तिगत टेक शेयरों में निवेश किया। यह एक उच्च जोखिम वाला कदम था जो महत्वपूर्ण नुकसान का कारण बन सकता है।" },
    betterOption: { en: "Invest in a diversified mutual fund. It spreads risk and is much safer for core savings.", hi: "एक विविध म्यूचुअल फंड में निवेश करें। यह जोखिम फैलाता है और मुख्य बचत के लिए बहुत सुरक्षित है।" }
  },
  // --- Student Year 5 ---
  'y5_s_choice2': {
    outcome: { en: "You purchased health insurance. An exceptionally wise decision that protects against unexpected health crises.", hi: "आपने स्वास्थ्य बीमा खरीदा। एक असाधारण बुद्धिमानी भरा निर्णय जो अप्रत्याशित स्वास्थ्य संकटों से बचाता है।" },
    betterOption: { en: "This is a cornerstone of financial security and a fantastic first step with a new salary.", hi: "यह वित्तीय सुरक्षा का एक आधारशिला है और एक नए वेतन के साथ एक शानदार पहला कदम है।" }
  },
  'y5_s_choice3': {
    outcome: { en: "You chose to celebrate without a financial plan. This can set a dangerous precedent for future earnings.", hi: "आपने बिना किसी वित्तीय योजना के जश्न मनाने का विकल्प चुना। यह भविष्य की कमाई के लिए एक खतरनाक मिसाल कायम कर सकता है।" },
    betterOption: { en: "Create a detailed monthly budget first. This sets a powerful foundation for future financial success.", hi: "पहले एक विस्तृत मासिक बजट बनाएं। यह भविष्य की वित्तीय सफलता के लिए एक शक्तिशाली नींव रखता है।" }
  },
  // --- Farmer Year 2 ---
  'y2_f_choice1': {
    outcome: { en: "You took a high-interest loan from a moneylender. This provided immediate cash but can create a long-term debt trap.", hi: "आपने एक साहूकार से उच्च-ब्याज वाला ऋण लिया। इसने तत्काल नकदी प्रदान की लेकिन एक दीर्घकालिक ऋण जाल बना सकता है।" },
    betterOption: { en: "Look for government schemes or other official support. This is less risky and avoids predatory interest rates.", hi: "सरकारी योजनाओं या अन्य आधिकारिक सहायता की तलाश करें। यह कम जोखिम भरा है और शिकारी ब्याज दरों से बचाता है।" }
  },
  'y2_f_choice2': {
    outcome: { en: "You looked for government support instead of a private loan. A difficult but wise choice to avoid high-interest debt.", hi: "आपने एक निजी ऋण के बजाय सरकारी सहायता की तलाश की। उच्च-ब्याज वाले ऋण से बचने के लिए एक कठिन लेकिन बुद्धिमानी भरा विकल्प।" },
    betterOption: { en: "This was the right call for long-term stability, even if it was harder in the short term.", hi: "यह दीर्घकालिक स्थिरता के लिए सही कॉल था, भले ही यह अल्पावधि में कठिन था।" }
  },
  // --- Farmer Year 4 ---
  'y4_f_choice1': {
    outcome: { en: "You enrolled in crop insurance. This is a vital tool for a farmer, providing a safety net against unpredictable weather.", hi: "आपने फसल बीमा में नामांकन किया। यह एक किसान के लिए एक महत्वपूर्ण उपकरण है, जो अप्रत्याशित मौसम के खिलाफ एक सुरक्षा जाल प्रदान करता है।" },
    betterOption: { en: "A crucial and correct decision to protect your income and capital from risks beyond your control.", hi: "आपकी आय और पूंजी को आपके नियंत्रण से परे जोखिमों से बचाने के लिए एक महत्वपूर्ण और सही निर्णय।" }
  },
  'y4_f_choice2': {
    outcome: { en: "You skipped crop insurance. This saved a small amount on the premium but exposed you to massive financial risk.", hi: "आपने फसल बीमा छोड़ दिया। इससे प्रीमियम पर एक छोटी राशि की बचत हुई लेकिन आपको बड़े पैमाने पर वित्तीय जोखिम का सामना करना पड़ा।" },
    betterOption: { en: "Enroll in the insurance scheme. It is a small price to pay for security against a catastrophic loss.", hi: "बीमा योजना में नामांकन करें। यह एक विनाशकारी नुकसान के खिलाफ सुरक्षा के लिए भुगतान करने के लिए एक छोटी सी कीमत है।" }
  },
};
