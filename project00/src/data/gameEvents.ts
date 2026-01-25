import { GameState } from '../context/GameContext';

export interface GameEvent {
  id: string;
  trigger: {
    type: 'location' | 'item' | 'character' | 'poem' | 'progress';
    value: string | number;
  };
  description: { zh: string; en: string };
  effect: {
    type: 'unlock_location' | 'add_item' | 'increase_progress' | 'reveal_secret';
    value: string | number;
  };
}

export const gameEvents: GameEvent[] = [
  {
    id: 'first-poem-creation',
    trigger: { type: 'poem', value: 1 },
    description: {
      zh: '你的第一首诗歌解锁了新的可能性...',
      en: 'Your first poem unlocks new possibilities...'
    },
    effect: { type: 'increase_progress', value: 20 }
  },
  {
    id: 'meet-all-characters',
    trigger: { type: 'character', value: 4 },
    description: {
      zh: '与所有人物的相遇让你对这栋楼有了更深的理解...',
      en: 'Meeting all characters gives you deeper understanding of this building...'
    },
    effect: { type: 'increase_progress', value: 25 }
  },
  {
    id: 'collect-ancient-artifacts',
    trigger: { type: 'item', value: 'master-key' },
    description: {
      zh: '神秘钥匙揭示了宿舍楼的真正秘密...',
      en: 'The mysterious key reveals the true secret of the dormitory...'
    },
    effect: { type: 'increase_progress', value: 30 }
  },
  {
    id: 'final-enlightenment',
    trigger: { type: 'item', value: 'enlightenment' },
    description: {
      zh: '你已经完成了精神的蜕变，准备踏入新的境界...',
      en: 'You have completed your spiritual transformation, ready to enter a new realm...'
    },
    effect: { type: 'increase_progress', value: 100 }
  }
];

export function checkGameEvents(state: GameState): GameEvent[] {
  const triggeredEvents: GameEvent[] = [];

  gameEvents.forEach(event => {
    switch (event.trigger.type) {
      case 'poem':
        if (state.poems.length >= (event.trigger.value as number)) {
          triggeredEvents.push(event);
        }
        break;
      case 'item':
        if (state.inventory.includes(event.trigger.value as string)) {
          triggeredEvents.push(event);
        }
        break;
      case 'character':
        const metCharacters = Object.values(state.characters).filter(char => char.met).length;
        if (metCharacters >= (event.trigger.value as number)) {
          triggeredEvents.push(event);
        }
        break;
      case 'progress':
        if (state.gameProgress >= (event.trigger.value as number)) {
          triggeredEvents.push(event);
        }
        break;
    }
  });

  return triggeredEvents;
}