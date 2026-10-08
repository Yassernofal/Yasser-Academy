// ==========================================
// 📝 بنك أسئلة Unit 3: Truth vs. Lies
// أولى ثانوي - Term 1
// ==========================================

const UNIT3_QUESTIONS = {
  // ==========================================
  // 📚 Section 1: Vocabulary (10 أسئلة)
  // ==========================================
  vocabulary: [
    {
      id: 1,
      question: "Some people try to ___ others by pretending to be their friends.",
      options: ["deceive", "deception", "deceptive", "deceit"],
      correct: 0,
      explanation: "deceive (verb) = يخدع - بعد to نحتاج مصدر"
    },
    {
      id: 2,
      question: "He felt deeply ___ when his best friend shared his secret.",
      options: ["betray", "betrayal", "betrayed", "betraying"],
      correct: 2,
      explanation: "betrayed (adj) = مُخان - تصف حالة الشخص"
    },
    {
      id: 3,
      question: "She has a very good ___ because she always keeps her promises.",
      options: ["reputation", "reputable", "repute", "reputably"],
      correct: 0,
      explanation: "reputation (noun) = سمعة - بعد good نحتاج اسم"
    },
    {
      id: 4,
      question: "The scammer tried to ___ the elderly woman's personal data.",
      options: ["explore", "exploit", "export", "expose"],
      correct: 1,
      explanation: "exploit = يستغل - المعنى المناسب للسياق"
    },
    {
      id: 5,
      question: "We must raise ___ about fake news among teenagers.",
      options: ["aware", "awareness", "awaring", "awares"],
      correct: 1,
      explanation: "awareness (noun) = وعي - بعد raise نحتاج اسم"
    },
    {
      id: 6,
      question: "The ___ spread quickly through social media before being denied.",
      options: ["rumor", "rumored", "rumoring", "rumors"],
      correct: 0,
      explanation: "rumor (noun) = شائعة - مفرد مع The"
    },
    {
      id: 7,
      question: "Don't share any news without ___ it first.",
      options: ["check", "checking", "checked", "checks"],
      correct: 1,
      explanation: "بعد without نستخدم gerund (v+ing)"
    },
    {
      id: 8,
      question: "The internet can sometimes have ___ about health.",
      options: ["misleading", "misfortune", "misinformation", "mistake"],
      correct: 2,
      explanation: "misinformation (noun) = معلومات مضللة"
    },
    {
      id: 9,
      question: "It's important to be ___ when dealing with strangers online.",
      options: ["caution", "cautious", "cautiously", "cautioning"],
      correct: 1,
      explanation: "cautious (adj) = حذر - بعد be نحتاج صفة"
    },
    {
      id: 10,
      question: "The company lost many customers due to a false ___ about its products.",
      options: ["claim", "claims", "claiming", "claimed"],
      correct: 0,
      explanation: "claim (noun) = ادعاء - مفرد مع false a"
    }
  ],

  // ==========================================
  // 📖 Section 2: Reading Comprehension (8 أسئلة)
  // ==========================================
  reading: [
    {
      id: 11,
      question: "What does the idiom 'wolves in sheep's clothing' mean?",
      options: [
        "Animals that disguise themselves",
        "People who love animals",
        "Dangerous people who appear kind",
        "Brave individuals"
      ],
      correct: 2,
      explanation: "المعنى: أشخاص خطرون يظهرون بمظهر الطيبين"
    },
    {
      id: 12,
      question: "What is one danger of fake online platforms mentioned in the text?",
      options: [
        "They always offer genuine prizes",
        "They can exploit personal data",
        "They provide free services without risk",
        "They never use pressure to act"
      ],
      correct: 1,
      explanation: "من النص: 'exploit our personal data'"
    },
    {
      id: 13,
      question: "In the passage, 'caught in a trap' means:",
      options: [
        "Being physically stuck",
        "Being tricked into a bad situation",
        "Catching an animal",
        "Finding something by accident"
      ],
      correct: 1,
      explanation: "المعنى المجازي: الوقوع في فخ (خُدعة)"
    },
    {
      id: 14,
      question: "What is the 'war of the new generation' mainly about?",
      options: [
        "Using advanced weapons in a battle",
        "Using lies and rumors to cause harm",
        "Fighting over natural resources",
        "Attacking computer systems"
      ],
      correct: 1,
      explanation: "من النص: 'It uses words — lies, half-truths, and rumors'"
    },
    {
      id: 15,
      question: "According to the text, what is damaged most in this type of war?",
      options: ["Buildings", "Trust", "Natural resources", "Roads"],
      correct: 1,
      explanation: "من النص: 'the goal is not to destroy buildings, but to damage trust'"
    },
    {
      id: 16,
      question: "Which is the best defense against misinformation?",
      options: [
        "Believing quickly",
        "Asking critical questions",
        "Avoiding the internet",
        "Fighting with weapons"
      ],
      correct: 1,
      explanation: "من النص: 'the most powerful defense is a careful and questioning mind'"
    },
    {
      id: 17,
      question: "Why is it difficult to fight against lies once they are online?",
      options: [
        "They travel faster than the truth",
        "They are always true",
        "No one cares about them",
        "They are protected by law"
      ],
      correct: 0,
      explanation: "من النص: 'it can travel faster than the truth'"
    },
    {
      id: 18,
      question: "What advice does Dr. Sarah give about exploitation?",
      options: [
        "Always ask for payment",
        "Guard your time, energy, and trust",
        "Avoid speaking to strangers",
        "Write down your feelings every day"
      ],
      correct: 1,
      explanation: "من النص: 'Guard your time, energy, and trust'"
    }
  ],

  // ==========================================
  // 📚 Section 3: Grammar (8 أسئلة)
  // ==========================================
  grammar: [
    {
      id: 19,
      question: "If you mix red and blue, you ___ purple.",
      options: ["gets", "would get", "get", "got"],
      correct: 2,
      explanation: "Zero Conditional: If + present simple, present simple"
    },
    {
      id: 20,
      question: "If water boils, it ___ to steam.",
      options: ["turns", "turned", "would turn", "turn"],
      correct: 0,
      explanation: "Zero Conditional: حقيقة علمية → present simple"
    },
    {
      id: 21,
      question: "If it rains tomorrow, we ___ at home.",
      options: ["could stay", "stayed", "will stay", "would stay"],
      correct: 2,
      explanation: "First Conditional: If + present simple, will + inf"
    },
    {
      id: 22,
      question: "If I had enough money, I ___ a new car.",
      options: ["would buy", "bought", "buy", "buys"],
      correct: 0,
      explanation: "Second Conditional: If + past simple, would + inf"
    },
    {
      id: 23,
      question: "If you eat too much sugar, you ___ weight.",
      options: ["gain", "gained", "would gain", "will gain"],
      correct: 3,
      explanation: "First Conditional: real future possibility"
    },
    {
      id: 24,
      question: "If she ___ his phone number, she would call him.",
      options: ["knows", "knew", "know", "known"],
      correct: 1,
      explanation: "Second Conditional: If + past simple (knew), would + inf"
    },
    {
      id: 25,
      question: "If you press this button, the light ___ on.",
      options: ["comes", "came", "will come", "would come"],
      correct: 2,
      explanation: "First Conditional: real future possibility → will come"
    },
    {
      id: 26,
      question: "Which sentence is structurally correct?",
      options: [
        "If I had knew, I would come.",
        "If I known, I would have come.",
        "If I knew, I would come.",
        "If I had knew, I would have come."
      ],
      correct: 2,
      explanation: "Second Conditional الصحيح: If + past simple, would + inf"
    }
  ],

  // ==========================================
  // ✍️ Section 4: Writing (4 أسئلة)
  // ==========================================
  writing: [
    {
      id: 27,
      question: "What is the purpose of the introduction in an essay?",
      options: [
        "List references",
        "Present the topic and thesis statement",
        "Summarize the conclusion",
        "Include dialogue"
      ],
      correct: 1,
      explanation: "المقدمة تعرض الموضوع و thesis statement"
    },
    {
      id: 28,
      question: "Where is the thesis statement usually found?",
      options: [
        "At the end of the body",
        "In the middle of the essay",
        "At the end of the introduction",
        "In the conclusion only"
      ],
      correct: 2,
      explanation: "thesis statement في نهاية المقدمة"
    },
    {
      id: 29,
      question: "The function of the conclusion is to:",
      options: [
        "Introduce a new idea",
        "Repeat the first sentence",
        "Summarize main points and restate the thesis",
        "List all sources"
      ],
      correct: 2,
      explanation: "الخاتمة تلخص وتعيد صياغة thesis"
    },
    {
      id: 30,
      question: "What is a topic sentence?",
      options: [
        "A sentence that ends the essay",
        "The first sentence of a body paragraph that states its main idea",
        "A sentence in the conclusion only",
        "A sentence with no purpose"
      ],
      correct: 1,
      explanation: "الجملة الافتتاحية للفقرة تحدد فكرتها الرئيسية"
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = UNIT3_QUESTIONS;
}