import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { catalog } from '../../data/catalog';
import { calculatePrice, calculateTwinPrice, twinSizes, variantSizes } from '../../data/product';
import { siteConfig } from '../../utils/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalog.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = catalog.find((product) => product.slug === slug);
  if (!item) return {};

  const url = `${siteConfig.url}/products/${slug}`;
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${item.title} | JTL Hydraulic`,
      description: item.description,
      url,
      type: 'website',
      images: [{ url: item.image, alt: item.title }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const item = catalog.find((product) => product.slug === slug);
  if (!item) notFound();

  const isTwin = 'twin' in item;
  const groups = isTwin ? twinSizes : variantSizes[item.variant];
  const baseNote = isTwin
    ? 'เลือกฐานปกติหรือฐานตีนเป็ดได้'
    : item.variant === 'heavy'
      ? 'ฐานตีนเป็ดและเพลทยาวมีเฉพาะซีรีส์ H1–H4'
      : 'เลือกฐานปกติ ฐานตีนเป็ด หรือเพลทยาวได้';

  return (
    <main className="min-h-screen bg-[#f7f9f8] pb-20 pt-28 text-gray-900 sm:pt-32">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <nav aria-label="เส้นทางหน้าเว็บ" className="mb-8 text-sm text-gray-500">
          <Link href="/" className="hover:text-primary">หน้าแรก</Link>
          <span className="mx-2">/</span>
          <span>{item.title}</span>
        </nav>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-secondary">
              JTL Hydraulic / Pipe Clamp
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-primary sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-700">{item.description}</p>
            <p className="mt-4 leading-8 text-gray-600">{item.detail}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/#products" className="rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-light">
                เลือกสเปกและดูราคา
              </Link>
              <Link href="/#contact" className="rounded-xl border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary/5">
                ติดต่อสั่งซื้อ
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-primary/10 bg-white p-3 shadow-xl shadow-primary/5">
            <Image
              src={item.image}
              alt={item.title}
              width={900}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="aspect-square w-full rounded-xl object-cover"
            />
          </div>
        </div>

        <section aria-labelledby="size-heading" className="mt-16 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-8">
          <h2 id="size-heading" className="text-2xl font-bold text-primary sm:text-3xl">ขนาดและราคาแยกตามซีรีส์</h2>
          <p className="mt-3 leading-7 text-gray-600">
            เลือกขนาดจากเส้นผ่านศูนย์กลางภายนอกของท่อ (OD) ราคาด้านล่างเป็นราคาฐานปกติตามตัวเลือกสเปกบนเว็บ
            ฐานแบบอื่นอาจมีราคาเพิ่ม กรุณาตรวจสอบราคาปัจจุบันก่อนสั่งซื้อ
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead className="bg-primary text-white">
                <tr>
                  <th scope="col" className="rounded-tl-lg px-4 py-3">ซีรีส์</th>
                  <th scope="col" className="px-4 py-3">ขนาด OD (มม.)</th>
                  <th scope="col" className="rounded-tr-lg px-4 py-3 text-right">ราคาฐานปกติ (บาท)</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group) => {
                  const price = isTwin
                    ? calculateTwinPrice(group.series, 'normal')
                    : calculatePrice(group.series, item.material, 'normal');
                  return (
                    <tr key={group.series} className="border-b border-gray-100 align-top">
                      <th scope="row" className="px-4 py-4 font-semibold text-primary">{group.series}</th>
                      <td className="px-4 py-4 leading-6">{group.items.join(', ')}</td>
                      <td className="px-4 py-4 text-right font-semibold">{price?.toLocaleString('th-TH') ?? 'สอบถาม'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm text-gray-600">{baseNote}</p>
        </section>

        <section aria-labelledby="more-products" className="mt-14">
          <h2 id="more-products" className="text-2xl font-bold text-primary">ดูกลุ่มสินค้าอื่น</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {catalog.filter((product) => product.slug !== slug).map((product) => (
              <Link key={product.slug} href={`/products/${product.slug}`} className="rounded-xl border border-primary/10 bg-white p-4 font-semibold text-primary hover:border-primary/40 hover:shadow-md">
                {product.title} →
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
