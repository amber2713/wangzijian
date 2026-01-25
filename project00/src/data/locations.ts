export interface Location {
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  interactables: Array<{
    id: string;
    name: { zh: string; en: string };
    description: { zh: string; en: string };
    type: 'search' | 'read' | 'puzzle' | 'poetry';
    reward?: string;
    discovered?: boolean;
  }>;
  characters?: string[];
  connections: Array<{
    to: string;
    name: { zh: string; en: string };
    requiresItem?: string;
  }>;
}

export const locations: Record<string, Location> = {
  'dormitory-entrance': {
    name: { 
      zh: '宿舍大门', 
      en: 'Dormitory Entrance' 
    },
    description: { 
      zh: '科大中区宿舍楼的主入口。红砖墙面在夕阳下泛着温暖的光芒，门口的梧桐叶片正黄，秋风轻抚过脸颊。这里是你大学生活的起点，也是无数故事的开端。', 
      en: 'The main entrance to USTC Central District dormitory building. Red brick walls glow warmly in the sunset, with golden sycamore leaves at the entrance swaying in the autumn breeze. This is the starting point of your university life and countless stories to come.' 
    },
    interactables: [
      {
        id: 'entrance-notice-board',
        name: { zh: '公告栏', en: 'Notice Board' },
        description: { zh: '查看宿舍管理规定和最新通知', en: 'Check dormitory regulations and latest announcements' },
        type: 'read',
        reward: 'dormitory-rules'
      },
      {
        id: 'mailbox-cluster',
        name: { zh: '信箱群', en: 'Mailbox Cluster' },
        description: { zh: '寻找可能遗落的信件或物品', en: 'Search for any lost letters or items' },
        type: 'search',
        reward: 'basement-key'
      }
    ],
    characters: ['manager-liu'],
    connections: [
      { to: 'hallway-first-floor', name: { zh: '进入一楼走廊', en: 'Enter First Floor Hallway' } }
    ]
  },

  'hallway-first-floor': {
    name: { 
      zh: '一楼走廊', 
      en: 'First Floor Hallway' 
    },
    description: { 
      zh: '宽敞的走廊两侧是宿舍房间，墙上贴着各种社团海报和学术讲座通知。走廊尽头的窗户透进温暖的阳光，地板被打扫得一尘不染。空气中弥漫着淡淡的清洁剂味道和青春的气息。', 
      en: 'A spacious hallway with dormitory rooms on both sides, walls covered with club posters and academic lecture announcements. Warm sunlight streams through windows at the end of the corridor, and the spotless floor reflects the overhead lights. The air carries a faint scent of cleaning products and youthful energy.' 
    },
    interactables: [
      {
        id: 'vending-machine',
        name: { zh: '自动售货机', en: 'Vending Machine' },
        description: { zh: '古老的售货机，也许隐藏着什么秘密', en: 'An old vending machine that might hide some secrets' },
        type: 'puzzle',
        reward: 'snack-tokens'
      },
      {
        id: 'bulletin-board',
        name: { zh: '学生留言板', en: 'Student Message Board' },
        description: { zh: '读取其他学生留下的神秘信息', en: 'Read mysterious messages left by other students' },
        type: 'read'
      }
    ],
    characters: ['roommate-chen'],
    connections: [
      { to: 'dormitory-entrance', name: { zh: '返回大门', en: 'Return to Entrance' } },
      { to: 'room-204', name: { zh: '204室', en: 'Room 204' } },
      { to: 'study-room', name: { zh: '自习室', en: 'Study Room' } },
      { to: 'basement-archives', name: { zh: '地下档案室', en: 'Basement Archives' }, requiresItem: 'basement-key' }
    ]
  },

  'room-204': {
    name: { 
      zh: '204室', 
      en: 'Room 204' 
    },
    description: { 
      zh: '你的宿舍房间。四张床铺整齐排列，每张床下都有书桌。墙上贴着各种海报和时间表，书桌上散落着教科书和笔记。窗外可以看到校园的梧桐大道，偶尔有学生骑车经过。', 
      en: 'Your dormitory room. Four beds are neatly arranged, each with a desk underneath. The walls are decorated with posters and schedules, while textbooks and notes are scattered on the desks. Through the window, you can see the campus sycamore avenue with students occasionally cycling by.' 
    },
    interactables: [
      {
        id: 'under-bed-exploration',
        name: { zh: '床底探索', en: 'Under-bed Exploration' },
        description: { zh: '在床底下寻找前任住客留下的物品', en: 'Search under beds for items left by previous residents' },
        type: 'search',
        reward: 'old-diary'
      },
      {
        id: 'desk-drawer-puzzle',
        name: { zh: '书桌抽屉', en: 'Desk Drawer' },
        description: { zh: '解开抽屉的密码锁', en: 'Solve the combination lock on the drawer' },
        type: 'puzzle',
        reward: 'rooftop-key'
      },
      {
        id: 'window-poetry',
        name: { zh: '窗台诗意', en: 'Window Poetry' },
        description: { zh: '凝视窗外，灵感涌现', en: 'Gaze out the window and find inspiration' },
        type: 'poetry'
      }
    ],
    characters: ['roommate-chen'],
    connections: [
      { to: 'hallway-first-floor', name: { zh: '返回走廊', en: 'Return to Hallway' } },
      { to: 'rooftop-garden', name: { zh: '天台花园', en: 'Rooftop Garden' } }
    ]
  },

  'study-room': {
    name: { 
      zh: '自习室', 
      en: 'Study Room' 
    },
    description: { 
      zh: '安静的自习空间，书桌上放着台灯和各种学习资料。墙上的时钟滴答作响，偶尔能听到翻书声和轻微的笔迹声。空气中弥漫着书香和专注学习的氛围。', 
      en: 'A quiet study space with desk lamps and various study materials on the tables. The wall clock ticks rhythmically, occasionally interrupted by the sound of turning pages and gentle writing. The air is filled with the scent of books and focused learning.' 
    },
    interactables: [
      {
        id: 'ancient-textbook',
        name: { zh: '古籍', en: 'Ancient Textbook' },
        description: { zh: '一本神秘的古代典籍，封面已经泛黄', en: 'A mysterious ancient text with a yellowed cover' },
        type: 'read',
        reward: 'passage-key'
      },
      {
        id: 'study-meditation',
        name: { zh: '学习冥想', en: 'Study Meditation' },
        description: { zh: '在宁静中寻找内心的平静和灵感', en: 'Find inner peace and inspiration in the tranquility' },
        type: 'poetry'
      }
    ],
    characters: ['scholar-wu'],
    connections: [
      { to: 'hallway-first-floor', name: { zh: '返回走廊', en: 'Return to Hallway' } },
      { to: 'hidden-passage', name: { zh: '隐秘通道', en: 'Hidden Passage' }, requiresItem: 'passage-key' }
    ]
  },

  'rooftop-garden': {
    name: { 
      zh: '天台花园', 
      en: 'Rooftop Garden' 
    },
    description: { 
      zh: '宿舍楼顶的秘密花园。这里种植着各种花草，在月光下显得格外神秘。远处可以看到整个校园的灯火，星空在头顶闪烁。这里是思考和创作的绝佳之地。', 
      en: 'A secret garden on the dormitory rooftop. Various flowers and plants grow here, appearing especially mysterious under the moonlight. You can see the lights across the entire campus in the distance, with stars twinkling overhead. This is an excellent place for contemplation and creation.' 
    },
    interactables: [
      {
        id: 'moonlight-inspiration',
        name: { zh: '月光灵感', en: 'Moonlight Inspiration' },
        description: { zh: '在月光下感受诗意的涌现', en: 'Feel poetry emerging under the moonlight' },
        type: 'poetry'
      },
      {
        id: 'hidden-treasure',
        name: { zh: '隐藏宝藏', en: 'Hidden Treasure' },
        description: { zh: '在花园深处寻找埋藏的秘密', en: 'Search for buried secrets deep in the garden' },
        type: 'search',
        reward: 'master-key'
      }
    ],
    characters: ['night-wanderer'],
    connections: [
      { to: 'room-204', name: { zh: '返回宿舍', en: 'Return to Room' } }
    ]
  },

  'basement-archives': {
    name: { 
      zh: '地下档案室', 
      en: 'Basement Archives' 
    },
    description: { 
      zh: '宿舍楼地下的神秘档案室。这里保存着学校的历史文献和前学生的记录。昏暗的灯光下，书架上排列着无数的文件夹和古老的书籍。空气中弥漫着纸张和时间的味道。', 
      en: 'A mysterious archive room in the basement of the dormitory. It houses historical documents and records of former students. Under dim lighting, countless folders and ancient books line the shelves. The air carries the scent of paper and time.' 
    },
    interactables: [
      {
        id: 'historical-records',
        name: { zh: '历史档案', en: 'Historical Records' },
        description: { zh: '查阅关于这栋宿舍楼的历史记录', en: 'Review historical records about this dormitory building' },
        type: 'read',
        reward: 'historical-knowledge'
      },
      {
        id: 'secret-compartment',
        name: { zh: '密室机关', en: 'Secret Compartment' },
        description: { zh: '寻找隐藏的机关和密室', en: 'Search for hidden mechanisms and secret chambers' },
        type: 'puzzle',
        reward: 'archive-key'
      }
    ],
    characters: [],
    connections: [
      { to: 'hallway-first-floor', name: { zh: '返回走廊', en: 'Return to Hallway' } },
      { to: 'hidden-passage', name: { zh: '隐秘通道', en: 'Hidden Passage' }, requiresItem: 'archive-key' }
    ]
  },

  'hidden-passage': {
    name: { 
      zh: '隐秘通道', 
      en: 'Hidden Passage' 
    },
    description: { 
      zh: '一条连接现实与幻想的神秘通道。墙壁上刻着古老的诗句，空气中回响着历代学子的诗歌朗诵声。这里是灵魂升华的圣地，也是你完成蜕变的最后一站。', 
      en: 'A mysterious passage connecting reality and fantasy. Ancient verses are carved on the walls, and the air echoes with poetry recitations from generations of students. This is a sacred place for spiritual sublimation and your final transformation.' 
    },
    interactables: [
      {
        id: 'final-revelation',
        name: { zh: '最终启示', en: 'Final Revelation' },
        description: { zh: '在此处完成你的精神升华之旅', en: 'Complete your spiritual sublimation journey here' },
        type: 'poetry',
        reward: 'enlightenment'
      }
    ],
    characters: [],
    connections: [
      { to: 'study-room', name: { zh: '返回自习室', en: 'Return to Study Room' } },
      { to: 'basement-archives', name: { zh: '返回档案室', en: 'Return to Archives' } }
    ]
  }
};