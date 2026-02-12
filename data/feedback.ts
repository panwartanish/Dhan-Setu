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
  'y1_s_choice4': {
    outcome: { en: "You bought the new textbook. This set you back financially when cheaper options were available.", hi: "आपने नई पाठ्यपुस्तक खरीदी। जब सस्ते विकल्प उपलब्ध थे, तब इसने आपको आर्थिक रूप से पीछे धकेल दिया।" },
    betterOption: { en: "Look for a second-hand copy or use the library. This is a key skill for student budgeting.", hi: "सेकेंड-हैंड कॉपी देखें या पुस्तकालय का उपयोग करें। यह छात्र बजट के लिए एक महत्वपूर्ण कौशल है।" }
  },
  'y1_s_choice6': {
    outcome: { en: "Buying the new phone on EMI felt easy, but it created a long-term debt obligation that reduced your monthly saving capacity.", hi: "ईएमआई पर नया फोन खरीदना आसान लगा, लेकिन इसने एक दीर्घकालिक ऋण दायित्व बनाया जिसने आपकी मासिक बचत क्षमता को कम कर दिया।" },
    betterOption: { en: "Resist temptation for non-essential items. Delaying gratification is key to building wealth.", hi: "गैर-जरूरी वस्तुओं के लिए प्रलोभन का विरोध करें। धन निर्माण के लिए संतुष्टि में देरी करना महत्वपूर्ण है।" }
  },
   // --- Student Year 2 ---
  'y2_s_choice3': {
    outcome: { en: "You lent money to a friend. This is a kind gesture, but it put your own finances at risk and could have strained the friendship.", hi: "आपने एक दोस्त को पैसे उधार दिए। यह एक दयालु इशारा है, लेकिन इसने आपके अपने वित्त को जोखिम में डाल दिया और दोस्ती में तनाव पैदा कर सकता था।" },
    betterOption: { en: "Politely refuse when your own budget is tight. It's important to secure your own finances first.", hi: "जब आपका अपना बजट तंग हो तो विनम्रता से मना कर दें। पहले अपने वित्त को सुरक्षित करना महत्वपूर्ण है।" }
  },
  // --- Student Year 3 ---
  'y3_s_choice2': {
    outcome: { en: "You invested in individual tech stocks. This was a high-risk move that can lead to significant losses without proper research.", hi: "आपने व्यक्तिगत टेक शेयरों में निवेश किया। यह एक उच्च जोखिम वाला कदम था जो उचित शोध के बिना महत्वपूर्ण नुकसान का कारण बन सकता है।" },
    betterOption: { en: "Invest in a diversified mutual fund. It spreads risk and is much safer for core savings.", hi: "एक विविध म्यूचुअल फंड में निवेश करें। यह जोखिम फैलाता है और मुख्य बचत के लिए बहुत सुरक्षित है।" }
  },
  'y3_s_choice4': {
    outcome: { en: "You invested in a 'get-rich-quick' scheme and lost your money. These schemes are almost always scams.", hi: "आपने 'जल्दी-अमीर-बनो' योजना में निवेश किया और अपना पैसा खो दिया। ये योजनाएं लगभग हमेशा घोटाले होती हैं।" },
    betterOption: { en: "Always stick to regulated investment options like mutual funds or fixed deposits from reputable institutions.", hi: "हमेशा प्रतिष्ठित संस्थानों से म्यूचुअल फंड या सावधि जमा जैसे विनियमित निवेश विकल्पों पर टिके रहें।" }
  },
  // --- Student Year 4 ---
  'y4_s_choice4': {
    outcome: { en: "You skipped health insurance. This is a massive financial risk. One accident could lead to debt that takes years to repay.", hi: "आपने स्वास्थ्य बीमा छोड़ दिया। यह एक बहुत बड़ा वित्तीय जोखिम है। एक दुर्घटना से ऐसा कर्ज हो सकता है जिसे चुकाने में सालों लग सकते हैं।" },
    betterOption: { en: "Buy a basic health plan. The premium is a small price to pay for protection against catastrophic medical bills.", hi: "एक बुनियादी स्वास्थ्य योजना खरीदें। प्रीमियम विनाशकारी चिकित्सा बिलों से सुरक्षा के लिए भुगतान करने के लिए एक छोटी सी कीमत है।" }
  },
  // --- Student Year 5 ---
  'y5_s_choice3': {
    outcome: { en: "You chose to celebrate without a financial plan. This can set a dangerous precedent for future earnings.", hi: "आपने बिना किसी वित्तीय योजना के जश्न मनाने का विकल्प चुना। यह भविष्य की कमाई के लिए एक खतरनाक मिसाल कायम कर सकता है।" },
    betterOption: { en: "Create a detailed monthly budget or start an emergency fund first. This sets a powerful foundation for financial success.", hi: "पहले एक विस्तृत मासिक बजट बनाएं या एक आपातकालीन निधि शुरू करें। यह वित्तीय सफलता के लिए एक शक्तिशाली नींव रखता है।" }
  },
  // --- Farmer Year 1 ---
  'y1_f_choice4': {
    outcome: { en: "You kept your cash at home. This exposed your hard-earned money to risks like theft and offered no benefits.", hi: "आपने अपनी नकदी घर पर रखी। इसने आपकी मेहनत की कमाई को चोरी जैसे जोखिमों के लिए उजागर किया और कोई लाभ नहीं दिया।" },
    betterOption: { en: "Open a bank account. It provides safety, earns interest, and gives access to government schemes and loans.", hi: "एक बैंक खाता खोलें। यह सुरक्षा प्रदान करता है, ब्याज अर्जित करता है, और सरकारी योजनाओं और ऋणों तक पहुंच प्रदान करता है।" }
  },
  // --- Farmer Year 2 ---
  'y2_f_choice1': {
    outcome: { en: "You took a high-interest loan from a moneylender. This provided immediate cash but can create a long-term debt trap.", hi: "आपने एक साहूकार से उच्च-ब्याज वाला ऋण लिया। इसने तत्काल नकदी प्रदान की लेकिन एक दीर्घकालिक ऋण जाल बना सकता है।" },
    betterOption: { en: "Look for government schemes or other official support. This is less risky and avoids predatory interest rates.", hi: "सरकारी योजनाओं या अन्य आधिकारिक सहायता की तलाश करें। यह कम जोखिम भरा है और शिकारी ब्याज दरों से बचाता है।" }
  },
  // --- Farmer Year 4 ---
  'y4_f_choice2': {
    outcome: { en: "You skipped crop insurance. This saved a small amount on the premium but exposed you to massive financial risk.", hi: "आपने फसल बीमा छोड़ दिया। इससे प्रीमियम पर एक छोटी राशि की बचत हुई लेकिन आपको बड़े पैमाने पर वित्तीय जोखिम का सामना करना पड़ा।" },
    betterOption: { en: "Enroll in the insurance scheme. It is a small price to pay for security against a catastrophic loss.", hi: "बीमा योजना में नामांकन करें। यह एक विनाशकारी नुकसान के खिलाफ सुरक्षा के लिए भुगतान करने के लिए एक छोटी सी कीमत है।" }
  },
  // --- Farmer Year 5 ---
  'y5_f_choice4': {
    outcome: { en: "You delayed retirement planning. This is a common but dangerous mistake, as it makes it much harder to build a secure future.", hi: "आपने सेवानिवृत्ति योजना में देरी की। यह एक आम लेकिन खतरनाक गलती है, क्योंकि यह एक सुरक्षित भविष्य बनाना बहुत कठिन बना देता है।" },
    betterOption: { en: "Start a pension plan or recurring deposit as early as possible. Even small amounts grow significantly over time.", hi: "जितनी जल्दी हो सके एक पेंशन योजना या आवर्ती जमा शुरू करें। समय के साथ छोटी मात्रा भी काफी बढ़ जाती है।" }
  }
};
