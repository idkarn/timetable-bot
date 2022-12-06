// import { InlineKeyboardButton } from ".pnpm/typegram@3.4.3/node_modules/typegram";

import { InlineKeyboardButton } from 'grammy/out/types.node';

// import { InlineKeyboardButton } from "grammy/out/platform.node"

export const weekdays: string[] = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
];
export const classEmoji: string[] = ['0️⃣8️⃣', '0️⃣9️⃣', '1️⃣0️⃣', '1️⃣1️⃣'];

export interface User {
  name: string | null | undefined;
  classNumber: string | null | undefined;
}

export interface Break {
  start: string;
  end: string;
  duration: string;
}

// export interface State {
//     user: {
//         name: string,
//         classNumber: string
//     }
// }

// export interface Lesson {
//     number: number,
//     name: string,
//     group: string,
//     teacher?: string,
//     room?: number // todo: add required room number
// }

export function getWeekdayBtns(
  query: string,
  classNumber: string
): InlineKeyboardButton[][] {
  const btns: InlineKeyboardButton[][] = [];

  for (let i = 0; i < 3; i++) {
    btns.push([]);
    for (let j = 0; j < 2; j++) {
      btns[i].push({
        text: weekdays[i * 2 + j],
        callback_data: `${i * 2 + j + 1}${query}${classNumber.padStart(
          2,
          '0'
        )}`,
      });
    }
  }

  return btns;
}

export function getClassNumberBtns(data: User[]): InlineKeyboardButton[][] {
  const btns: InlineKeyboardButton[][] = [];

  for (let i = 0; i < data.length / 2; i++) {
    btns.push([]);
    for (let j = 0; j < data.length - i - 1; j++) {
      const usr = data[i * 2 + j];
      if (usr.classNumber) {
        // FIXME: THIS CRUTCH

        const cls = usr.classNumber;
        btns[i].push({
          text: classEmoji[+cls - 8],
          callback_data: `${cls.padStart(2, '0')}${usr.name}`,
        });
      }
    }
  }

  return btns;
}

function checkTime(expected: string) {
  const actualDate = new Date();
  return actualDate >= new Date(String(actualDate).slice(0, 16) + expected);
}
function getTimeDifferent(time: string): number {
  const actualDate = new Date();
  return (
    (new Date(String(actualDate).slice(0, 16) + time).getTime() -
      actualDate.getTime()) /
    1000 /
    60
  );
}
// returns [isItLessonTime, lessonIndex]
export function getIndexByTime(): [boolean, number, number] {
  if (checkTime('17:45')) return [false, -1, 0];
  if (checkTime('17:00')) return [true, 8, getTimeDifferent('17:45')];
  if (checkTime('16:50')) return [false, 7, getTimeDifferent('17:00')];
  if (checkTime('16:05')) return [true, 7, getTimeDifferent('16:50')];
  if (checkTime('15:55')) return [false, 6, getTimeDifferent('16:05')];
  if (checkTime('15:10')) return [true, 6, getTimeDifferent('15:55')];
  if (checkTime('14:50')) return [false, 5, getTimeDifferent('15:10')];
  if (checkTime('14:05')) return [true, 5, getTimeDifferent('14:50')];
  if (checkTime('13:45')) return [false, 4, getTimeDifferent('14:05')];
  if (checkTime('13:00')) return [true, 4, getTimeDifferent('13:45')];
  if (checkTime('12:50')) return [false, 3, getTimeDifferent('13:00')];
  if (checkTime('12:05')) return [true, 3, getTimeDifferent('12:50')];
  if (checkTime('11:45')) return [false, 2, getTimeDifferent('12:05')];
  if (checkTime('11:00')) return [true, 2, getTimeDifferent('11:45')];
  if (checkTime('10:40')) return [false, 1, getTimeDifferent('11:00')];
  if (checkTime('09:55')) return [true, 1, getTimeDifferent('10:40')];
  if (checkTime('09:45')) return [false, 0, getTimeDifferent('09:55')];
  if (checkTime('09:00')) return [true, 0, getTimeDifferent('09:45')];
  return [false, -1, 0];
}

/*
9:00	9:45
9:55	10:40
11:00	11:45
12:05	12:50
13:00	13:45
14:05	14:50
15:10	15:55
16:05	16:50
17:00	17:45	
*/
