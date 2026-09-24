import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const root = 'https://hydraulic.techhousesoft.com';
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const sitemap = read('../.next/server/app/sitemap.xml.body');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

test('ทุกหน้าสินค้าใน sitemap มี HTML และ canonical ของตัวเอง', () => {
  assert.equal(urls.length, 6);
  assert.equal(new Set(urls).size, urls.length);
  const home = read('../.next/server/app/index.html');

  for (const url of urls) {
    const slug = url === root ? '' : url.slice(`${root}/products/`.length);
    const html = slug
      ? read(`../.next/server/app/products/${slug}.html`)
      : home;

    assert.ok(html.includes(`<link rel="canonical" href="${url}"`), url);
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, url);
    if (slug) assert.ok(home.includes(`href="/products/${slug}"`), slug);
  }
});
