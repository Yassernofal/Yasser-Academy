// ==========================================
// 📝 بنك أسئلة Unit 2: Hands Help, Hearts Care
// أولى ثانوي - Term 1
// ==========================================

const UNIT2_QUESTIONS = {
  // ==========================================
  // 📚 Section 1: Vocabulary (10 أسئلة)
  // ==========================================
  vocabulary: [
    {
      id: 1,
      question: "The community center provides ___ for families in need.",
      options: ["support", "supportive", "supported", "supporter"],
      correct: 0,
      explanation: "support (noun) = دعم - نحتاج اسم بعد provides"
    },
    {
      id: 2,
      question: "She felt ___ after helping her elderly neighbor.",
      options: ["transform", "transformed", "transforming", "transformation"],
      correct: 1,
      explanation: "transformed (adjective) = متغير - تصف حالة الشخص"
    },
    {
      id: 3,
      question: "Volunteers ___ their time to help others without payment.",
      options: ["give", "take", "make", "do"],
      correct: 0,
      explanation: "give time = يعطي وقته - collocation صحيحة"
    },
    {
      id: 4,
      question: "The old man showed great ___ when he rescued the child.",
      options: ["brave", "bravely", "bravery", "braveness"],
      correct: 2,
      explanation: "bravery (noun) = شجاعة - بعد great نحتاج اسم"
    },
    {
      id: 5,
      question: "Kindness is a quality that can ___ a person's life.",
      options: ["transform", "transforms", "transformed", "transforming"],
      correct: 0,
      explanation: "بعد can نحتاج المصدر (transform) بدون إضافات"
    },
    {
      id: 6,
      question: "The team worked ___ to complete the project on time.",
      options: ["independent", "independently", "independence", "depend"],
      correct: 1,
      explanation: "independently (adverb) = بشكل مستقل - يصف الفعل worked"
    },
    {
      id: 7,
      question: "We should ___ public property and keep it clean.",
      options: ["protect", "protects", "protected", "protecting"],
      correct: 0,
      explanation: "بعد should نحتاج المصدر (protect)"
    },
    {
      id: 8,
      question: "The firefighters acted quickly to ___ the family.",
      options: ["rescue", "rescueing", "rescued", "rescues"],
      correct: 0,
      explanation: "بعد to (infinitive) نحتاج المصدر (rescue)"
    },
    {
      id: 9,
      question: "It's our ___ to help those in need.",
      options: ["obligate", "obligation", "obligated", "obliging"],
      correct: 1,
      explanation: "obligation (noun) = واجب - بعد our نحتاج اسم"
    },
    {
      id: 10,
      question: "The community ___ together to clean the park.",
      options: ["join", "joins", "joined", "joining"],
      correct: 2,
      explanation: "الماضي البسيط (joined) - الحدث خلص"
    }
  ],

  // ==========================================
  // 📖 Section 2: Reading Comprehension (8 أسئلة)
  // ==========================================
  reading: [
    {
      id: 11,
      question: "Why was Sama having a difficult week?",
      options: [
        "She moved to a new city",
        "Her grades were slipping and she felt overwhelmed",
        "She lost her pet",
        "She was preparing for a celebration"
      ],
      correct: 1,
      explanation: "من النص: 'Her grades were slipping, and she felt overwhelmed'"
    },
    {
      id: 12,
      question: "How did Mrs. Aya try to help Sama?",
      options: [
        "She gave her money",
        "She baked fresh bread for her",
        "She did her homework",
        "She called her parents"
      ],
      correct: 1,
      explanation: "من النص: 'I baked some fresh bread this morning'"
    },
    {
      id: 13,
      question: "What change happened in Sama's feelings during the visit?",
      options: [
        "She became angrier",
        "She felt more isolated",
        "Her worries began to fade",
        "She felt tired"
      ],
      correct: 2,
      explanation: "من النص: 'Slowly, Sama felt her worries began to fade'"
    },
    {
      id: 14,
      question: "What lesson did Sama learn from this experience?",
      options: [
        "Kindness can change your own heart",
        "Bread is delicious",
        "Neighbors should always visit",
        "School is difficult"
      ],
      correct: 0,
      explanation: "من النص: 'kindness doesn't just make others feel better; it can change your own heart, too'"
    },
    {
      id: 15,
      question: "In the firefighter's story, what does 'protecting hope itself' mean?",
      options: [
        "Carrying a fire extinguisher",
        "Giving people a reason to believe in the future",
        "Wearing a uniform",
        "Working in the fire station"
      ],
      correct: 1,
      explanation: "المعنى المجازي: مساعدة الآخرين تعطيهم أمل"
    },
    {
      id: 16,
      question: "Why is voluntary work valuable for young students?",
      options: [
        "It provides financial rewards",
        "It builds social connections and skills",
        "It replaces school work",
        "It guarantees a job"
      ],
      correct: 1,
      explanation: "من النص: 'It builds social connections and personal skills'"
    },
    {
      id: 17,
      question: "What did The Water Team do to help their school?",
      options: [
        "They planted trees",
        "They surveyed water sources and checked for leaks",
        "They cleaned the cafeteria",
        "They painted the walls"
      ],
      correct: 1,
      explanation: "من النص: 'Their mission was to survey the school's water sources'"
    },
    {
      id: 18,
      question: "What is the main message of Unit 2?",
      options: [
        "Money is the key to happiness",
        "Small acts of kindness can make a big difference",
        "Sports are important for health",
        "Technology is essential"
      ],
      correct: 1,
      explanation: "الرسالة الأساسية للوحدة: الأعمال الصغيرة تصنع فرقاً كبيراً"
    }
  ],

  // ==========================================
  // 📚 Section 3: Grammar (8 أسئلة)
  // ==========================================
  grammar: [
    {
      id: 19,
      question: "You ___ wear a helmet when riding a motorbike. It's the law.",
      options: ["should", "must", "shouldn't", "mustn't"],
      correct: 1,
      explanation: "must = للقوانين واللوائح الملزمة"
    },
    {
      id: 20,
      question: "You ___ eat so much sugar. It's not healthy.",
      options: ["have to", "must", "should", "shouldn't"],
      correct: 3,
      explanation: "shouldn't = للنصيحة السلبية (لا يجب)"
    },
    {
      id: 21,
      question: "Drivers ___ use their phones while driving.",
      options: ["mustn't", "should", "have to", "must"],
      correct: 0,
      explanation: "mustn't = للتحريم (ممنوع)"
    },
    {
      id: 22,
      question: "You ___ take an umbrella. It's going to rain.",
      options: ["should", "mustn't", "has to", "shouldn't"],
      correct: 0,
      explanation: "should = للنصيحة الإيجابية"
    },
    {
      id: 23,
      question: "I ___ finish this report by 5 pm. My boss ordered me.",
      options: ["have to", "mustn't", "shouldn't", "has to"],
      correct: 0,
      explanation: "have to = للالتزام الخارجي (أمر المدير)"
    },
    {
      id: 24,
      question: "You must ___ a uniform at school. (Choose the correct form)",
      options: ["to wear", "wearing", "wear", "wore"],
      correct: 2,
      explanation: "بعد must نستخدم المصدر بدون to"
    },
    {
      id: 25,
      question: "She should ___ her mother more often.",
      options: ["calling", "to call", "call", "called"],
      correct: 2,
      explanation: "بعد should نستخدم المصدر بدون to"
    },
    {
      id: 26,
      question: "Citizens ___ respect the national laws.",
      options: ["must", "mustn't", "shouldn't", "don't have to"],
      correct: 0,
      explanation: "must = للواجبات الملزمة"
    }
  ],

  // ==========================================
  // ✍️ Section 4: Writing (4 أسئلة)
  // ==========================================
  writing: [
    {
      id: 27,
      question: "Which sentence is correctly punctuated?",
      options: [
        "I love cooking my family and my pets.",
        "I love cooking, my family, and my pets.",
        "I love cooking, my family and my pets.",
        "I love cooking my family, and my pets."
      ],
      correct: 1,
      explanation: "الفاصلة قبل and في القوائم (Oxford Comma)"
    },
    {
      id: 28,
      question: "Which is the correct order for a descriptive essay?",
      options: [
        "Body → Introduction → Conclusion",
        "Introduction → Body → Conclusion",
        "Conclusion → Body → Introduction",
        "Body → Conclusion → Introduction"
      ],
      correct: 1,
      explanation: "الترتيب الصحيح: مقدمة → متن → خاتمة"
    },
    {
      id: 29,
      question: "Which sentence uses sensory details effectively?",
      options: [
        "The bread was good.",
        "The warm bread smelled irresistible and tasted like home.",
        "I ate bread.",
        "The bread was there."
      ],
      correct: 1,
      explanation: "الجملة التانية تستخدم 5 حواس (smell, taste)"
    },
    {
      id: 30,
      question: "What is the purpose of a topic sentence?",
      options: [
        "To end the essay",
        "To state the main idea of a paragraph",
        "To give examples",
        "To summarize the whole essay"
      ],
      correct: 1,
      explanation: "الجملة الافتتاحية تحدد الفكرة الرئيسية للفقرة"
    }
  ]
};

// تصدير البيانات للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = UNIT2_QUESTIONS;
}