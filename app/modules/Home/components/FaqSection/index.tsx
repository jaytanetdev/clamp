import Reveal from '../../../../components/Reveal';

export const faqs = [
  {
    q: 'แคลมป์รัดท่อไฮดรอลิกคืออะไร?',
    a: 'แคลมป์รัดท่อไฮดรอลิก (บางคนเรียก แคล้มรัดท่อ หรือ แคล้มรัดท่อไฮดรอลิค) คืออุปกรณ์สำหรับยึดและจับท่อในระบบไฮดรอลิกให้แน่นและมั่นคง ช่วยลดการสั่นสะเทือนและรองรับแรงดันสูง ผลิตตามมาตรฐาน DIN 3015 ใช้ได้ทั้งงานอุตสาหกรรม เครื่องจักร และระบบท่อแรงดัน',
  },
  {
    q: 'แคลมป์ท่อ JTL Hydraulic มีวัสดุและรุ่นอะไรให้เลือกบ้าง?',
    a: 'มีให้เลือกทั้งแคลมป์ท่อพลาสติกและแคลมป์ท่ออลูมิเนียม รุ่น Standard และ Heavy Duty รองรับทั้งแบบ 1 รูและ 2 รู พร้อมฐานหลายแบบ ได้แก่ ฐานปกติ ฐานตีนเป็ด และเพลทยาว ครบทุกความต้องการของงานไฮดรอลิก',
  },
  {
    q: 'แคลมป์รัดท่อรองรับท่อขนาดเท่าไหร่?',
    a: 'รองรับท่อตั้งแต่ Ø6 มม. ถึง Ø168 มม. มีครบทุกซีรีส์ขนาด สามารถเลือกขนาดที่ตรงกับเส้นผ่านศูนย์กลางภายนอกของท่อได้โดยตรงผ่านระบบเลือกสเปกบนหน้าเว็บ',
  },
  {
    q: 'แคลมป์รัดท่อไฮดรอลิกราคาเท่าไหร่ สั่งซื้ออย่างไร?',
    a: 'ราคาโรงงานเริ่มต้นที่ 70 บาท ไปจนถึงรุ่นใหญ่ สั่งซื้อได้ผ่าน LINE, Shopee, Lazada หรือโทรสอบถามโดยตรงที่ 098-284-6992 จัดส่งทั่วประเทศ',
  },
  {
    q: 'แคลมป์ท่อใช้งานกับงานประเภทใดได้บ้าง?',
    a: 'เหมาะกับระบบท่อไฮดรอลิกแรงดันสูง เครื่องจักรอุตสาหกรรม โรงงาน งานติดตั้งท่อน้ำมัน/ท่อลม และงานที่ต้องการยึดท่อให้มั่นคงทนทาน รองรับการสั่นสะเทือนได้ดี',
  },
];

const FaqSection = () => {
  return (
    <div className="container mx-auto flex flex-col gap-10 px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24">
      <Reveal className="flex flex-col items-center space-y-3 text-center">
        <span className="font-mono inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
          <span className="h-px w-8 bg-secondary" />
          FAQ
          <span className="h-px w-8 bg-secondary" />
        </span>
        <h2 className="text-3xl font-bold text-gray-900 lg:text-5xl">คำถามที่พบบ่อย</h2>
        <p className="mx-auto max-w-xl text-gray-500">
          รวมข้อมูลเกี่ยวกับแคลมป์รัดท่อไฮดรอลิก การเลือกขนาด วัสดุ และการสั่งซื้อ
        </p>
      </Reveal>

      <div className="mx-auto w-full max-w-3xl space-y-4">
        {faqs.map((faq, i) => (
          <Reveal key={faq.q} delay={i * 80}>
            <details className="group rounded-2xl border border-primary/15 bg-white p-5 shadow-sm transition-shadow duration-300 open:shadow-lg open:shadow-primary/5 sm:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-gray-800 sm:text-lg">
                <span className="flex items-start gap-3">
                  <span className="font-mono mt-0.5 text-sm text-secondary">Q</span>
                  {faq.q}
                </span>
                <span className="shrink-0 text-primary transition-transform duration-300 group-open:rotate-45">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </summary>
              <p className="mt-4 pl-7 leading-relaxed text-gray-600">{faq.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
