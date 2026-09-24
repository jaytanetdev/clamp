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
    <section ref={sectionRef} aria-labelledby="clamp-3d-title" className="relative h-[210vh] bg-[#0a3028] motion-reduce:h-screen">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-4 pb-4 pt-24 sm:px-8 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'linear-gradient(rgba(177, 231, 205, .07) 1px, transparent 1px), linear-gradient(90deg, rgba(177, 231, 205, .07) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="pointer-events-none absolute -left-48 top-1/4 h-[35rem] w-[35rem] rounded-full bg-[#2a795e]/30 blur-[110px]" />
        <div className="pointer-events-none absolute -right-24 top-[-15rem] h-[42rem] w-[42rem] rounded-full bg-[#d9ae5f]/15 blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="relative z-10 text-center lg:text-left">
            <p className="font-mono hidden text-xs font-bold tracking-[0.16em] text-[#f4c66d] sm:block">JTL-HYD / 360°</p>
            <h2 id="clamp-3d-title" className="mt-5 text-3xl font-bold leading-tight text-white sm:text-5xl">
              แคลมป์รัดท่อ<br />มองครบทุกมุม
            </h2>
            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/75 sm:text-base lg:mx-0">
              เลื่อนหน้าจอเพื่อดูโครงสร้างตัวแคลมป์ ช่องรัดท่อ และแผ่นยึดโลหะรอบด้าน
            </p>
            <div className="mx-auto mt-8 max-w-sm lg:mx-0">
              <div className="flex items-baseline justify-between text-white">
                <span className="font-mono text-3xl font-bold text-[#f4c66d] sm:text-4xl">{angle}°</span>
                <span className="text-sm text-white/70 motion-reduce:hidden">เลื่อนเพื่อหมุนโมเดล</span>
                <span className="hidden text-sm text-white/70 motion-reduce:inline">มุมมองโมเดล</span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
                <div className="h-full rounded-full bg-[#f4c66d]" style={{ width: `${(angle / 360) * 100}%` }} />
              </div>
            </div>
            <p className="mt-5 text-xs text-white/55">โมเดลภาพประกอบอ้างอิงจากรูปสินค้าจริง</p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[34svh] overflow-hidden rounded-[2rem] border border-white/40 bg-[radial-gradient(circle_at_48%_38%,#ffffff_0%,#e9f4ed_53%,#a9cabb_100%)] shadow-[0_35px_100px_rgba(0,0,0,0.35),inset_0_0_60px_rgba(255,255,255,0.6)] sm:max-w-[590px]">
            <div className="pointer-events-none absolute inset-[10%] rounded-full border border-primary/10" />
            <div className="pointer-events-none absolute inset-[18%] rounded-full border border-dashed border-primary/20" style={{ transform: `rotate(${angle}deg)` }}>
              <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#d8aa4b] shadow-[0_0_18px_#d8aa4b]" />
            </div>
            <div className="pointer-events-none absolute inset-x-[20%] bottom-[9%] h-14 rounded-full bg-primary/25 blur-xl" />
            <div className="pointer-events-none absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            {!ready && (
              <Image src="/product/st/st-1.jpg" alt="แคลมป์รัดท่อไฮดรอลิกสีเขียวพร้อมแผ่นยึดโลหะ" fill sizes="(max-width: 1024px) 90vw, 590px" className="object-cover" />
            )}
            <div ref={stageRef} className="absolute inset-0" aria-label="โมเดลแคลมป์รัดท่อไฮดรอลิกหมุน 360 องศาตามการเลื่อนหน้าจอ" role="img" />
            <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-primary/10 bg-white/85 px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur motion-reduce:hidden">
              เลื่อนเพื่อหมุน 360°
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
