'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Clamp3DSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;

    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      try {
        const [THREE, { GLTFLoader }] = await Promise.all([
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader'),
        ]);
        if (cancelled) return;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute('aria-hidden', 'true');
        renderer.domElement.className = 'h-full w-full';
        stage.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.65, 6.4);
        camera.lookAt(0, 0, 0);
        scene.add(new THREE.AmbientLight(0xffffff, 1.8));
        const key = new THREE.DirectionalLight(0xffffff, 3.2);
        key.position.set(-3, 5, 6);
        scene.add(key);
        const rim = new THREE.DirectionalLight(0xa7fff1, 2);
        rim.position.set(4, 2, -4);
        scene.add(rim);

        const model = await new GLTFLoader().loadAsync('/models/clamp-standard.glb');
        if (cancelled) {
          renderer.dispose();
          renderer.domElement.remove();
          return;
        }
        const clamp = model.scene;
        scene.add(clamp);

        const resize = () => {
          const { width, height } = stage.getBoundingClientRect();
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
          renderer.render(scene, camera);
        };
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let frame = 0;
        const update = () => {
          const total = section.offsetHeight - window.innerHeight;
          const progress = !reduceMotion && total > 0 ? Math.min(1, Math.max(0, -section.getBoundingClientRect().top / total)) : 0;
          const degrees = Math.round(progress * 360);
          clamp.rotation.y = -0.32 + progress * Math.PI * 2;
          setAngle(degrees);
          renderer.render(scene, camera);
        };
        const onScroll = () => {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(update);
        };
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(stage);
        if (!reduceMotion) window.addEventListener('scroll', onScroll, { passive: true });
        resize();
        update();
        setReady(true);

        dispose = () => {
          window.removeEventListener('scroll', onScroll);
          cancelAnimationFrame(frame);
          resizeObserver.disconnect();
          clamp.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (error) {
        console.error('Unable to load clamp 3D model', error);
      }
    }, { rootMargin: '300px' });

    observer.observe(section);
    return () => {
      cancelled = true;
      observer.disconnect();
      dispose?.();
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="clamp-3d-title" className="relative h-[210vh] bg-[#f1f6f3] motion-reduce:h-screen">
      <div className="bg-blueprint sticky top-0 flex h-screen items-center overflow-hidden px-4 py-20 sm:px-8">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="relative z-10 text-center lg:text-left">
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-primary-light">360° PRODUCT VIEW</p>
            <h2 id="clamp-3d-title" className="mt-4 text-3xl font-bold leading-tight text-primary-dark sm:text-5xl">
              แคลมป์รัดท่อ<br />มองครบทุกมุม
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-slate-600 sm:text-base lg:mx-0">
              เลื่อนหน้าจอเพื่อดูโครงสร้างตัวแคลมป์ ช่องรัดท่อ และแผ่นยึดโลหะรอบด้าน
            </p>
            <div className="mt-7 flex items-center justify-center gap-3 lg:justify-start">
              <span className="font-mono text-3xl font-bold text-primary sm:text-4xl">{angle}°</span>
              <span className="text-sm text-slate-500">เลื่อนเพื่อหมุนโมเดล</span>
            </div>
            <p className="mt-4 text-xs text-slate-500">โมเดลภาพประกอบอ้างอิงจากรูปสินค้าจริง</p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[590px] overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-br from-white via-[#e9f3ee] to-[#cbded4] shadow-[0_30px_80px_rgba(11,68,47,0.16)]">
            <div className="pointer-events-none absolute inset-x-10 bottom-8 h-20 rounded-full bg-primary/15 blur-2xl" />
            {!ready && (
              <Image src="/product/st/st-1.jpg" alt="แคลมป์รัดท่อไฮดรอลิกสีเขียวพร้อมแผ่นยึดโลหะ" fill sizes="(max-width: 1024px) 90vw, 590px" className="object-cover" />
            )}
            <div ref={stageRef} className="absolute inset-0" aria-label="โมเดลแคลมป์รัดท่อไฮดรอลิกหมุน 360 องศาตามการเลื่อนหน้าจอ" role="img" />
            <div className="font-mono pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 text-[11px] font-bold tracking-widest text-primary backdrop-blur">
              SCROLL TO ROTATE · 360°
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
