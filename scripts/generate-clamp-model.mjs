import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  BoxGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  Path,
  Shape,
  TorusGeometry,
} from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

// Three's exporter uses the browser FileReader API; Blob already exists in Node.
globalThis.FileReader = class {
  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    this.onloadend?.();
  }
};

// A visual model based on the three product photos, not a dimensioned CAD part.
const green = new MeshStandardMaterial({ color: 0x075443, metalness: 0.08, roughness: 0.55, side: DoubleSide });
const steel = new MeshStandardMaterial({ color: 0xb7c6c5, metalness: 0.8, roughness: 0.27 });
const darkSteel = new MeshStandardMaterial({ color: 0x647879, metalness: 0.7, roughness: 0.42 });
const seam = new MeshStandardMaterial({ color: 0x064e43, roughness: 0.8 });
const clamp = new Group();
clamp.name = 'JTL hydraulic pipe clamp — visual reference model';

function box(name, width, height, depth, material, x, y, z) {
  const mesh = new Mesh(new BoxGeometry(width, height, depth), material);
  mesh.name = name;
  mesh.position.set(x, y, z);
  clamp.add(mesh);
  return mesh;
}

// Plastic body, including a true through-hole so it remains open while rotating.
const body = new Shape();
body.moveTo(-1.14, -1.04);
body.lineTo(1.14, -1.04);
body.lineTo(1.14, 1.04);
body.lineTo(-1.14, 1.04);
body.closePath();
const bore = new Path();
bore.absarc(0, 0, 0.49, 0, Math.PI * 2, true);
body.holes.push(bore);
const plastic = new Mesh(new ExtrudeGeometry(body, {
  depth: 1.32,
  curveSegments: 40,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 1,
  bevelSize: 0.045,
  bevelThickness: 0.045,
}), green);
plastic.name = 'Green split clamp body with pipe bore';
plastic.position.z = -0.66;
clamp.add(plastic);

// The real part separates horizontally at the bore; the fine dark gap shows it.
for (const z of [-0.7, 0.7]) {
  for (const x of [-0.82, 0.82]) box('Body split line', 0.67, 0.018, 0.012, seam, x, 0, z);
}
for (const x of [-1.185, 1.185]) box('Side split line', 0.012, 0.018, 1.26, seam, x, 0, 0);

// Raised inner ribs visible in the diagonal reference photo.
for (const z of [-0.49, -0.16, 0.17, 0.5]) {
  const rib = new Mesh(new TorusGeometry(0.49, 0.012, 6, 48), seam);
  rib.name = 'Inner bore rib';
  rib.position.z = z;
  clamp.add(rib);
}

box('Top steel plate', 2.42, 0.13, 1.43, steel, 0, 1.14, 0);
box('Bottom steel mounting plate', 2.53, 0.13, 1.51, steel, 0, -1.15, 0);
box('Plate shadow', 2.35, 0.025, 1.34, darkSteel, 0, -1.07, 0);

for (const x of [-0.76, 0.76]) {
  const washer = new Mesh(new CylinderGeometry(0.175, 0.175, 0.035, 24), darkSteel);
  washer.name = 'Bolt washer';
  washer.position.set(x, 1.23, 0);
  clamp.add(washer);
  const bolt = new Mesh(new CylinderGeometry(0.13, 0.13, 0.125, 6), steel);
  bolt.name = 'Hex bolt head';
  bolt.position.set(x, 1.31, 0);
  bolt.rotation.y = Math.PI / 6;
  clamp.add(bolt);
}

const output = path.resolve('public/models/clamp-standard.glb');
const glb = await new GLTFExporter().parseAsync(clamp, { binary: true, onlyVisible: true });
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, Buffer.from(glb));
console.log(`Wrote ${output} (${glb.byteLength} bytes)`);
