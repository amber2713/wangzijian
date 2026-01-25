export interface PoemTemplate {
  id: string;
  theme: { zh: string; en: string };
  prompts: { zh: string[]; en: string[] };
  structure: {
    lines: number;
    syllablePattern?: number[];
    rhymeScheme?: string;
  };
}

export const poemTemplates: PoemTemplate[] = [
  {
    id: 'dormitory-life',
    theme: { zh: '宿舍生活', en: 'Dormitory Life' },
    prompts: {
      zh: [
        '描述你第一次进入宿舍的感受',
        '写出室友的一个特点',
        '捕捉夜晚宿舍的静谧时光',
        '表达对未来的憧憬'
      ],
      en: [
        'Describe your feelings when first entering the dormitory',
        'Write about a characteristic of your roommate',
        'Capture the quiet moments of dormitory nights',
        'Express your hopes for the future'
      ]
    },
    structure: {
      lines: 4,
      syllablePattern: [7, 7, 7, 7]
    }
  },
  {
    id: 'campus-seasons',
    theme: { zh: '校园四季', en: 'Campus Seasons' },
    prompts: {
      zh: [
        '秋天梧桐叶片的颜色',
        '冬日雪花飘落的景象',
        '春天新绿的嫩芽',
        '夏日午后的蝉鸣'
      ],
      en: [
        'The colors of autumn sycamore leaves',
        'The sight of winter snowflakes falling',
        'Fresh green buds in spring',
        'Cicada songs on summer afternoons'
      ]
    },
    structure: {
      lines: 4,
      rhymeScheme: 'ABAB'
    }
  },
  {
    id: 'inner-journey',
    theme: { zh: '内心之旅', en: 'Inner Journey' },
    prompts: {
      zh: [
        '描述一个让你深思的瞬间',
        '表达内心的困惑或迷茫',
        '寻找内心的平静和力量',
        '展望精神的升华和成长'
      ],
      en: [
        'Describe a moment that made you contemplate deeply',
        'Express inner confusion or bewilderment',
        'Seek inner peace and strength',
        'Envision spiritual sublimation and growth'
      ]
    },
    structure: {
      lines: 6,
      syllablePattern: [8, 6, 8, 6, 8, 8]
    }
  }
];