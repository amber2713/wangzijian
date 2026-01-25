export const translations = {
  en: {
    gameTitle: "USTC Stadium Mysteries",
    gameSubtitle: "An Interactive Literary Journey",
    gameDescription: "Explore the mystical stadium, create poetry, and uncover hidden secrets",
    startGame: "Begin Journey",
    enterStadium: "Enter the Stadium",
    
    prologue: {
      title: "The Freshman's First Step",
      content: [
        "As a new freshman at USTC, you stand before the imposing stadium gates. The morning mist swirls around the towering structure, and something feels... different.",
        "Local legends speak of students who discovered more than just athletic prowess within these walls. Some say the stadium holds secrets that blur the line between reality and dreams.",
        "With your student ID in hand and curiosity in your heart, you're about to embark on a journey that will test not just your physical abilities, but your creativity and wit."
      ]
    },

    areas: {
      entrance: "Stadium Entrance",
      billiards: "Billiards Room",
      tabletennis: "Table Tennis Area",
      badminton: "Badminton Court",
      gym: "Fitness Center",
      boxing: "Boxing Studio"
    },

    entrance: {
      description: "The grand entrance to USTC Stadium. Sunlight streams through tall windows, casting geometric patterns on the polished floor.",
      intro: "The massive doors swing open with a resonant creak. Before you lies a labyrinth of sporting venues, each holding its own mysteries and challenges. The air hums with the energy of countless athletes who have trained here.",
      explorationHint: "Choose an area to begin your exploration. Each venue offers unique challenges and hidden poetry."
    },

    billiards: {
      description: "The billiards room exudes an atmosphere of precision and strategy. Green felt tables stretch across the dimly lit space.",
      hint: "Strike the balls in the correct strategic sequence to unlock the poem of precision",
      talkToMaster: "Talk to Billiards Master"
    },

    tabletennis: {
      description: "Fast-paced energy fills the air. The sound of paddle hits ball creates a rhythmic symphony.",
      hint: "Create the perfect rhythm to unlock the poem of flow and transience",
      talkToChampion: "Talk to Ping Pong Champion",
      intensity: ["Light Touch", "Medium Hit", "Power Smash"]
    },

    badminton: {
      description: "Graceful movement and elevated play define this space. Shuttlecocks dance through the air like poetry in motion.",
      hint: "Master the four shot sequence to unlock the poem of grace and elevation",
      talkToCoach: "Talk to Badminton Coach",
      shots: {
        high: "High Clear",
        low: "Drop Shot", 
        cross: "Cross Court",
        smash: "Power Smash"
      }
    },

    gym: {
      description: "The weight room embodies determination and growth. Iron meets will in this temple of strength.",
      hint: "Build your stats to 80% in all areas to unlock the poem of inner strength",
      talkToTrainer: "Talk to Gym Trainer",
      exercises: {
        pushups: "Push-ups",
        running: "Cardio",
        meditation: "Focus Training"
      },
      stats: {
        title: "Your Progress",
        strength: "Strength",
        endurance: "Endurance", 
        focus: "Mental Focus"
      }
    },

    boxing: {
      description: "Rhythm and power converge in this space. Each punch tells a story of determination and heart.",
      hint: "Find the perfect boxing rhythm to unlock the final poem and discover your escape",
      talkToMaster: "Talk to Boxing Master",
      escapeAvailable: "The Portal is Open!",
      escape: "Escape the Stadium",
      beats: {
        light: "Light Jab",
        medium: "Cross Hook", 
        heavy: "Power Punch"
      }
    },

    poems: {
      billiardsTitle: "Precision's Dance",
      tabletennisTitle: "Flowing Moments", 
      badmintonTitle: "Elevated Grace",
      gymTitle: "Inner Strength",
      boxingTitle: "Rhythmic Heart"
    },

    progress: {
      title: "Journey Progress",
      poems: "Poems",
      clues: "Clues",
      story: "Story"
    },

    common: {
      reset: "Reset",
      close: "Close",
      next: "Next"
    }
  },

  zh: {
    gameTitle: "中科大体育馆之谜",
    gameSubtitle: "互动文学之旅",
    gameDescription: "探索神秘体育馆，创作诗歌，揭开隐藏的秘密",
    startGame: "开始旅程",
    enterStadium: "进入体育馆",
    
    prologue: {
      title: "新生的第一步",
      content: [
        "作为中科大的新生，你站在宏伟的体育馆门前。晨雾在高耸的建筑周围旋转，有些东西感觉...不同寻常。",
        "当地传说中提到，有学生在这些墙壁内发现的不仅仅是运动才能。有人说体育馆藏着模糊现实与梦境界限的秘密。",
        "手握学生证，心怀好奇，你即将踏上一段不仅考验你身体能力，更考验你创造力和智慧的旅程。"
      ]
    },

    areas: {
      entrance: "体育馆入口",
      billiards: "台球室",
      tabletennis: "乒乓球区",
      badminton: "羽毛球场",
      gym: "健身中心", 
      boxing: "拳击室"
    },

    entrance: {
      description: "中科大体育馆的宏伟入口。阳光透过高大的窗户洒下，在光滑的地板上投下几何图案。",
      intro: "巨大的门扉发出共鸣的吱嘎声缓缓打开。眼前是一个体育场馆的迷宫，每个都藏着自己的神秘和挑战。空气中弥漫着无数在此训练过的运动员的能量。",
      explorationHint: "选择一个区域开始你的探索。每个场馆都提供独特的挑战和隐藏的诗歌。"
    },

    billiards: {
      description: "台球室散发着精准和策略的氛围。绿色毡桌在昏暗的空间中延伸。",
      hint: "以正确的策略顺序击球，解锁精准之诗",
      talkToMaster: "与台球大师对话"
    },

    tabletennis: {
      description: "快节奏的能量充满空气。球拍击球的声音创造出有节奏的交响乐。",
      hint: "创造完美的节奏，解锁流动与瞬息之诗",
      talkToChampion: "与乒乓球冠军对话",
      intensity: ["轻触", "中等力度", "重击"]
    },

    badminton: {
      description: "优雅的动作和高雅的比赛定义了这个空间。羽毛球在空中起舞，如诗歌般运动。",
      hint: "掌握四种击球顺序，解锁优雅与升华之诗",
      talkToCoach: "与羽毛球教练对话",
      shots: {
        high: "高远球",
        low: "吊球",
        cross: "斜线球", 
        smash: "扣杀"
      }
    },

    gym: {
      description: "重量训练室体现决心和成长。铁与意志在这力量圣殿中相遇。",
      hint: "将所有能力提升至80%以解锁内在力量之诗",
      talkToTrainer: "与健身教练对话",
      exercises: {
        pushups: "俯卧撑",
        running: "有氧训练",
        meditation: "专注训练"
      },
      stats: {
        title: "你的进展",
        strength: "力量",
        endurance: "耐力",
        focus: "专注力"
      }
    },

    boxing: {
      description: "节奏与力量在这个空间汇聚。每一拳都诉说着决心和内心的故事。",
      hint: "找到完美的拳击节奏，解锁最终诗篇并发现你的出路",
      talkToMaster: "与拳击大师对话",
      escapeAvailable: "传送门已开启！",
      escape: "逃离体育馆",
      beats: {
        light: "轻拳",
        medium: "勾拳",
        heavy: "重拳"
      }
    },

    poems: {
      billiardsTitle: "精准之舞",
      tabletennisTitle: "流动时刻",
      badmintonTitle: "升华优雅", 
      gymTitle: "内在力量",
      boxingTitle: "节拍之心"
    },

    progress: {
      title: "旅程进度",
      poems: "诗歌",
      clues: "线索", 
      story: "故事"
    },

    common: {
      reset: "重置",
      close: "关闭",
      next: "下一个"
    }
  }
};