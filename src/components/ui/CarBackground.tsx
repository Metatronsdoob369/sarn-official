"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * CarBackground
 * Full-viewport WebGL background. JOSTLE Stealth car — right-aligned, left-edge fade.
 *
 * Effects:
 *   - Copper shimmer sweep (diagonal, on a slow loop)
 *   - Flashlight on hover — mechanic's torch, post-podium inspection
 *     Warm white core → copper bleed at edge. Catches the copper geometry.
 *   - Scroll drift — car pulls away slowly as page scrolls
 *   - Barely-there wave distortion (heat shimmer, not shake)
 *   - Vignette
 */
export default function CarBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // ── Texture ───────────────────────────────────────────────────────────────
    const texture = new THREE.TextureLoader().load("/jostle-stealth.png");
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    // ── Shaders ───────────────────────────────────────────────────────────────
    const vertexShader = /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform sampler2D uTexture;
      uniform float     uTime;
      uniform vec2      uMouse;        // [-0.5, 0.5] screen-normalised cursor delta
      uniform vec2      uMouseScreen;  // [0, 1] cursor position in screen space
      uniform vec2      uResolution;
      uniform float     uScroll;       // 0..1 scroll progress
      varying vec2      vUv;

      vec2 carUV(vec2 uv) {
        float aspect    = uResolution.x / uResolution.y;
        float imgAspect = 2.0;

        vec2 scale   = vec2(imgAspect / aspect, 1.0);
        vec2 offset  = vec2(-0.25, 0.0);                       // push right

        // barely-there parallax drift
        vec2 parallax = uMouse * vec2(0.008, 0.005);

        // scroll: car drifts slightly upward as you scroll (pulling away)
        vec2 scrollDrift = vec2(0.0, uScroll * -0.06);

        // heat shimmer — imperceptible movement
        float wave = sin(uv.y * 6.0 + uTime * 0.18) * 0.0008
                   + sin(uv.x * 4.0 + uTime * 0.11) * 0.0006;

        vec2 p = (uv - 0.5) * scale + 0.5 + offset + parallax + scrollDrift;
        p.x += wave;
        p.y += wave * 0.5;
        return p;
      }

      void main() {
        vec2 p = carUV(vUv);

        vec4 car = vec4(0.0);
        if (p.x >= 0.0 && p.x <= 1.0 && p.y >= 0.0 && p.y <= 1.0) {
          car = texture2D(uTexture, p);
        }

        // ── left-edge fade ────────────────────────────────────────────────────
        float leftFade = smoothstep(0.0, 0.42, vUv.x);
        car.a *= leftFade;

        // ── diagonal copper shimmer sweep ─────────────────────────────────────
        float shimmerPos  = mod(uTime * 0.28, 2.2) - 0.6;
        float shimmerDiag = vUv.x * 0.7 + vUv.y * 0.3;
        float shimmer     = smoothstep(shimmerPos, shimmerPos + 0.04, shimmerDiag)
                          * (1.0 - smoothstep(shimmerPos + 0.04, shimmerPos + 0.12, shimmerDiag));
        shimmer *= 0.18;

        vec3 copperTint = vec3(0.722, 0.424, 0.165); // #b86c2a
        car.rgb = mix(car.rgb, copperTint, shimmer * car.a);

        // ── flashlight — mechanic's torch post-podium ─────────────────────────
        // Tight radial beam following cursor.
        // Warm white core, copper bleed at the halo edge.
        // Aspect-corrected so it stays circular on any viewport.
        float asp = uResolution.x / uResolution.y;
        vec2  toLight = (vUv - uMouseScreen) * vec2(asp, 1.0);
        float dist    = length(toLight);

        float beamRadius = 0.07;              // tight torch — mechanic not helicopter
        float core       = 0.02;             // pinpoint bright centre

        // Inner core — near-white warm light
        float innerSpot = 1.0 - smoothstep(core, beamRadius, dist);
        // Outer copper halo — edge of the beam catches the metallic bodywork
        float outerHalo = (1.0 - smoothstep(beamRadius * 0.6, beamRadius, dist))
                        * smoothstep(core, beamRadius * 0.6, dist);

        vec3 torchWhite  = vec3(1.0, 0.97, 0.90);  // warm white
        vec3 torchCopper = vec3(0.85, 0.5, 0.18);  // copper at the halo edge

        // Only light where the car actually is (alpha mask)
        float lit = car.a;
        car.rgb += torchWhite  * innerSpot * 0.22 * lit;
        car.rgb += torchCopper * outerHalo * 0.10 * lit;

        // copper geometry flare — subtle warmth where beam hits metallic paint
        float warmth = dot(car.rgb, vec3(0.6, 0.3, 0.1));
        car.rgb += torchCopper * warmth * innerSpot * 0.12 * lit;

        // ── vignette ──────────────────────────────────────────────────────────
        vec2  vigUv   = vUv * (1.0 - vUv.yx);
        float vignette = pow(vigUv.x * vigUv.y * 16.0, 0.35);
        vignette = clamp(vignette, 0.0, 1.0);
        car.rgb *= mix(0.55, 1.0, vignette);

        gl_FragColor = car;
      }
    `;

    const uniforms = {
      uTexture:     { value: texture },
      uTime:        { value: 0 },
      uMouse:       { value: new THREE.Vector2(0, 0) },
      uMouseScreen: { value: new THREE.Vector2(0.75, 0.5) }, // default: right-centre
      uResolution:  { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
      uScroll:      { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const targetMouse       = new THREE.Vector2(0, 0);
    const currentMouse      = new THREE.Vector2(0, 0);
    const targetMouseScreen = new THREE.Vector2(0.75, 0.5);
    const currentMouseScreen = new THREE.Vector2(0.75, 0.5);

    const onMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      targetMouse.set(nx - 0.5, -(ny - 0.5));
      targetMouseScreen.set(nx, 1.0 - ny); // flip Y for GL
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Scroll tracking ───────────────────────────────────────────────────────
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      uniforms.uScroll.value = maxScroll > 0
        ? Math.min(window.scrollY / maxScroll, 1)
        : 0;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      uniforms.uResolution.value.set(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Render loop ───────────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      uniforms.uTime.value = clock.getElapsedTime();

      // ease mouse parallax
      currentMouse.lerp(targetMouse, 0.03);
      uniforms.uMouse.value.copy(currentMouse);

      // ease flashlight position — slightly faster so it tracks intentionally
      currentMouseScreen.lerp(targetMouseScreen, 0.07);
      uniforms.uMouseScreen.value.copy(currentMouseScreen);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      material.dispose();
      texture.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
