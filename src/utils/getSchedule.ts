import type { Sheet, WorkBook } from 'xlsx';
import xlsx from 'xlsx';
import { FOLDER_ID, MAI_FILE_ID } from '../config';
import { drive } from '../init';
import Lesson from '../types/Lesson';
import getExternalSchedule from './getExternalSchedule';

// * downloads sheet from google drive using arrayBuffer
export async function getSheet(fildeId: string, pageNum = 0): Promise<Sheet> {
  const res = await fetch(
    `https://docs.google.com/spreadsheets/d/${fildeId}/export`
  );
  const arrayBuffer = await res.arrayBuffer();

  const array: Uint8Array = new Uint8Array(arrayBuffer);
  const workbook: WorkBook = xlsx.read(array, { type: 'array' });
  const sheet: Sheet = workbook.Sheets[workbook.SheetNames[pageNum]];

  return sheet;
}

// * function for parsing day schedule by 3 field for each iteration; takes: downloaded sheet buffer, day number(0-6)
function tableParse(sheet: Sheet, rawDay: number): Lesson[] | null {
  const data: Lesson[] = [];
  let day = rawDay;

  if (day === 7) day = 1;

  for (
    let rowNum = 2 + 12 * (day - 1);
    rowNum <= 10 + 12 * (day - 1);
    rowNum++
  ) {
    const title: string = sheet[xlsx.utils.encode_cell({ r: rowNum, c: 1 })]?.v;
    const group: string = sheet[xlsx.utils.encode_cell({ r: rowNum, c: 2 })]?.v; // ?.v can be undefined, not string
    const room: string = sheet[xlsx.utils.encode_cell({ r: rowNum, c: 4 })]?.v;

    if (title === 'Московский авиационный институт') return null;

    data.push({
      title: title || 'Окно',
      group: group ?? '',
      number: rowNum - 1,
      room: String(room ?? ''),
    });
  }

  return data;
}

// * main schedule function
export default async function getSchedule(query: string): Promise<Lesson[]> {
  const name: string = query.slice(1, -2);
  const cls: number = +query.slice(-2);
  const day: number = +query.slice(0, 1);
  console.log(name, cls, day);

  const classFolder = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and name = '${cls} класс'`,
  });
  if (!classFolder?.data?.files?.[0]?.id) {
    throw new Error('error folder');
  }

  const filesList = await drive.files.list({
    q: `'${classFolder.data.files[0].id}' in parents and name contains '${name}'`,
  });
  if (!filesList?.data?.files?.[0]?.id) {
    throw new Error('error file');
  }
  const fileId = filesList.data.files[0].id;

  const sheet: Sheet = await getSheet(fileId);

  let data: Lesson[] | null = tableParse(sheet, day || new Date().getDay() + 1);

  if (data === null) {
    let pageNum: number;
    switch (cls) {
      case 8:
        pageNum = 3;
        break;
      case 9:
        pageNum = 1;
        break;
      case 10:
        pageNum = 0;
        break;
      case 11:
        pageNum = 2;
        break;
      default:
        throw new Error('unknown class value with nullish data');
    }

    const externalSheet: Sheet = await getSheet(MAI_FILE_ID, pageNum);
    data = await getExternalSchedule(externalSheet, name);
  }

  return data;
}
