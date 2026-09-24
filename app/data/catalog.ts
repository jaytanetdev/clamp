import { baseImages1Hole, baseImages2Hole } from './product';
import type { MaterialType, VariantType } from '../types/product.type';

type SingleClamp = {
  slug: string;
  title: string;
  description: string;
  image: string;
  material: MaterialType;
  variant: VariantType;
  detail: string;
};

type TwinClamp = {
  slug: string;
  title: string;
  description: string;
  image: string;
  twin: true;
  detail: string;
};

export type CatalogItem = SingleClamp | TwinClamp;

export const catalog: CatalogItem[] = [
  {
    slug: 'plastic-standard',
    title: 'แคลมป์รัดท่อพลาสติก รุ่น Standard',
    description: 'แคลมป์ท่อพลาสติกแบบ 1 รู รุ่น Standard ซีรีส์ L1–L8 สำหรับท่อ OD 6–102 มม. เลือกฐานปกติ ฐานตีนเป็ด หรือเพลทยาวได้',
    image: baseImages1Hole.normal.plastic.standard[0],
    material: 'plastic',
    variant: 'standard',
    detail: 'รุ่น Standard แบบพลาสติกมีขนาดให้เลือกตั้งแต่ซีรีส์ L1 ถึง L8 เหมาะเมื่อคุณต้องการจับท่อหนึ่งเส้นและเลือกขนาดตามเส้นผ่านศูนย์กลางภายนอก (OD) ของท่อ ตารางด้านล่างแสดงขนาดที่มีในแต่ละซีรีส์และราคาฐานปกติ เพื่อช่วยเทียบสเปกก่อนสอบถามสั่งซื้อ',
  },
  {
    slug: 'aluminum-standard',
    title: 'แคลมป์รัดท่ออลูมิเนียม รุ่น Standard',
    description: 'แคลมป์ท่ออลูมิเนียมแบบ 1 รู รุ่น Standard ซีรีส์ L1–L8 สำหรับท่อ OD 6–102 มม. พร้อมตัวเลือกฐานหลายแบบ',
    image: baseImages1Hole.normal.aluminum.standard[0],
    material: 'aluminum',
    variant: 'standard',
    detail: 'ตัวเลือกอลูมิเนียมรุ่น Standard ใช้ช่วงขนาด L1–L8 เช่นเดียวกับรุ่นพลาสติก แต่มีราคาต่างกันตามวัสดุ เลือก OD ของท่อให้ตรงกับค่าที่ระบุในตาราง และเลือกประเภทฐานในตัวเลือกสเปกบนหน้าแรกก่อนสั่งซื้อ',
  },
  {
    slug: 'plastic-heavy',
    title: 'แคลมป์รัดท่อพลาสติก รุ่น Heavy',
    description: 'แคลมป์ท่อพลาสติกแบบ 1 รู รุ่น Heavy ซีรีส์ H1–H7 สำหรับท่อ OD 6–168 มม. ฐานตีนเป็ดและเพลทยาวมีเฉพาะบางซีรีส์',
    image: baseImages1Hole.normal.plastic.heavy[0],
    material: 'plastic',
    variant: 'heavy',
    detail: 'รุ่น Heavy แบบพลาสติกครอบคลุมซีรีส์ H1–H7 และขนาด OD สูงสุด 168 มม. หากต้องการฐานตีนเป็ดหรือเพลทยาว ให้เลือกเฉพาะ H1–H4; ซีรีส์ H5–H7 มีตัวเลือกฐานปกติในตัวเลือกสเปกของเว็บไซต์',
  },
  {
    slug: 'aluminum-heavy',
    title: 'แคลมป์รัดท่ออลูมิเนียม รุ่น Heavy',
    description: 'แคลมป์ท่ออลูมิเนียมแบบ 1 รู รุ่น Heavy ซีรีส์ H1–H7 สำหรับท่อ OD 6–168 มม. ตรวจสอบราคาแยกตามซีรีส์',
    image: baseImages1Hole.normal.aluminum.heavy[0],
    material: 'aluminum',
    variant: 'heavy',
    detail: 'รุ่น Heavy แบบอลูมิเนียมมีขนาดตั้งแต่ H1 ถึง H7 เลือกขนาดตาม OD ของท่อ ไม่ใช่ขนาดเกลียวหรือเส้นผ่านศูนย์กลางด้านใน ฐานตีนเป็ดและเพลทยาวมีใน H1–H4 เท่านั้น ส่วน H5–H7 ใช้ฐานปกติ',
  },
  {
    slug: 'plastic-twin',
    title: 'แคลมป์รัดท่อพลาสติกแบบ 2 รู',
    description: 'แคลมป์ท่อพลาสติกแบบ 2 รู ซีรีส์ L1–L5 สำหรับท่อคู่ขนาด OD 6/6 ถึง 42/42 มม. เลือกฐานปกติหรือฐานตีนเป็ด',
    image: baseImages2Hole.normal[0],
    twin: true,
    detail: 'แคลมป์แบบ 2 รูใช้ยึดท่อสองเส้นในชิ้นเดียว ขนาดในตารางเขียนเป็น D1/D2 เช่น 12/12 หมายถึงท่อ OD 12 มม. ทั้งสองเส้น รุ่นนี้มีซีรีส์ L1–L5 และมีฐานปกติหรือฐานตีนเป็ดให้เลือก',
  },
];
