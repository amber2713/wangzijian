export interface Character {
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  dialogue: { zh: string[]; en: string[] };
  role: string;
  personality: { zh: string; en: string };
}

export const characters: Record<string, Character> = {
  'manager-liu': {
    name: { zh: '楼管阿姨', en: 'Manager' },
    description: { 
      zh: '宿舍管理员，三十多岁，温柔而睿智。她似乎知道这栋楼的所有秘密，总是在关键时刻给出神秘的提示。', 
      en: 'Dormitory manager in her thirties, kind and wise. She seems to know all the secrets of this building and always gives mysterious hints at crucial moments.' 
    },
    dialogue: { 
      zh: [
        '孩子，这栋楼有很多故事，你要用心去发现。',
        '有些门只有在特定的时候才会打开。',
        '记住，真正的宝藏在你的内心深处。',
        '诗歌是通往真理的钥匙。'
      ],
      en: [
        'Child, this building has many stories. You must discover them with your heart.',
        'Some doors only open at specific times.',
        'Remember, the real treasure is deep within your heart.',
        'Poetry is the key to truth.'
      ]
    },
    role: 'Keeper of secrets and guide',
    personality: { 
      zh: '神秘而慈祥，拥有深邃的智慧', 
      en: 'Mysterious yet kind, possessing profound wisdom' 
    }
  },

  'roommate-chen': {
    name: { zh: '室友小陈', en: 'Roommate Chen' },
    description: { 
      zh: '你的室友，计算机系二年级学生。表面上是个普通的理工男，但实际上对文学和诗歌有着深刻的理解。', 
      en: 'Your roommate, a second-year computer science student. Appears to be an ordinary engineering student but actually has deep understanding of literature and poetry.' 
    },
    dialogue: { 
      zh: [
        '代码和诗歌其实很相似，都是在创造美的东西。',
        '我在床底下发现了一些有趣的东西，你要不要看看？',
        '有时候深夜学习时，我会听到楼里传来奇怪的声音。',
        '你有没有注意到，这栋楼的结构有些不寻常？'
      ],
      en: [
        'Code and poetry are quite similar - both create beautiful things.',
        'I found some interesting things under my bed. Want to take a look?',
        'Sometimes when studying late at night, I hear strange sounds from the building.',
        'Have you noticed that this building\'s structure is somewhat unusual?'
      ]
    },
    role: 'Bridge between technology and literature',
    personality: { 
      zh: '理性中带着浪漫，善于发现细节', 
      en: 'Rational yet romantic, good at noticing details' 
    }
  },

  'scholar-wu': {
    name: { zh: '学者吴老', en: 'Scholar Wu' },
    description: { 
      zh: '物理系退休教授，经常在自习室里研读古典文献。他拥有渊博的学识，能够解读古代文字和符号。', 
      en: 'Retired professor from the Chinese Literature Department, often found studying classical texts in the study room. He possesses vast knowledge and can interpret ancient writings and symbols.' 
    },
    dialogue: { 
      zh: [
        '古人云：读万卷书，行万里路。但有时候，最远的路就在脚下。',
        '这些古文字背后隐藏着深刻的智慧，你需要用心去体会。',
        '真正的学问不在于知识的积累，而在于心灵的觉醒。',
        '我感觉这栋楼里有着非同寻常的能量。'
      ],
      en: [
        'The ancients said: Read ten thousand books, travel ten thousand miles. But sometimes, the farthest journey begins beneath your feet.',
        'These ancient characters hide profound wisdom. You must experience them with your heart.',
        'True learning lies not in accumulating knowledge, but in awakening the soul.',
        'I sense unusual energy within this building.'
      ]
    },
    role: 'Keeper of ancient wisdom',
    personality: { 
      zh: '博学深邃，富有哲理思考', 
      en: 'Erudite and profound, full of philosophical insight' 
    }
  },

  'night-wanderer': {
    name: { zh: '夜行者', en: 'Night Wanderer' },
    description: { 
      zh: '一个神秘的身影，只在深夜出现在天台花园。有人说他是前学生的灵魂，有人说他是守护这栋楼的精灵。', 
      en: 'A mysterious figure who only appears in the rooftop garden at night. Some say he is the soul of a former student, others believe he is a spirit guarding this building.' 
    },
    dialogue: { 
      zh: [
        '在星空下，所有的秘密都会显现。',
        '你来到这里不是偶然，是命运的安排。',
        '诗歌是连接两个世界的桥梁。',
        '当你真正理解这里的意义时，你就能找到回家的路。'
      ],
      en: [
        'Under the starry sky, all secrets will be revealed.',
        'Your arrival here is not coincidental, but arranged by fate.',
        'Poetry is the bridge connecting two worlds.',
        'When you truly understand the meaning of this place, you will find your way home.'
      ]
    },
    role: 'Mystical guide between worlds',
    personality: { 
      zh: '神秘莫测，充满哲学智慧', 
      en: 'Enigmatic and full of philosophical wisdom' 
    }
  }
};