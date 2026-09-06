import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
addEventListener("load", () => setTimeout(() => $("#preloader")?.classList.add("hide"), 350));
const header = $("#header"), toggle = $(".mobile-toggle"), nav = $(".nav-links");
const closeNav = () => { nav?.classList.remove("open"); toggle?.setAttribute("aria-expanded", "false"); toggle?.setAttribute("aria-label", "Open navigation menu"); };
toggle?.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", open); toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu"); });
$$('.nav-links a').forEach(link => link.addEventListener("click", closeNav));
$$('.drop>button').forEach(button => button.addEventListener("click", () => { if (innerWidth > 880) return; button.parentElement.classList.toggle("open"); }));
addEventListener("scroll", () => header?.classList.toggle("scrolled", scrollY > 25), { passive: true });
let toastTimer;
function showToast(message) { const element = $("#toast"); if (!element) return; element.textContent = message; element.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => element.classList.remove("show"), 4500); }
$$('.js-toast').forEach(button => button.addEventListener("click", () => showToast(button.dataset.message)));
function makeRenderer(canvas) { const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" }); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.08; return renderer; }

const iconPaths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/><path d="M7 21h10"/>',
  building: '<path d="M4 21V5a2 2 0 0 1 2-2h7v18M13 8h5a2 2 0 0 1 2 2v11M7 7h2M7 11h2M7 15h2M16 12h2M16 16h2M2 21h20"/>',
  wifi: '<path d="M2 8.5a15 15 0 0 1 20 0M5 12a10.5 10.5 0 0 1 14 0M8.5 15.5a6 6 0 0 1 7 0M12 20h.01"/>',
  network: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v5M10.5 13.5 6.5 17M13.5 13.5l4 3.5"/>',
  camera: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
  cloud: '<path d="M7 19h11a4 4 0 0 0 .5-8A6.5 6.5 0 0 0 6 9.5 4.5 4.5 0 0 0 7 19z"/>',
  speed: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 13 4-4M6 17h.01M18 17h.01"/>',
  shield: '<path d="M12 3 20 6v5c0 5-3.4 8.1-8 10-4.6-1.9-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
  users: '<circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0M15 16a5 5 0 0 1 6 4"/>',
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v6H5a1 1 0 0 1-1-1zM20 14h-3v6h2a1 1 0 0 0 1-1z"/><path d="M17 20h-2"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  arrow: '<path d="M4 12h15M14 7l5 5-5 5"/>',
  user: '<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>',
  bolt: '<path d="m13 2-8 11h6l-1 9 8-11h-6z"/>'
};
function icon(name, size = "1em") { return `<svg class="line-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name]}</svg>`; }
function standardizeIcons() {
  const groups = [
    [".service>div", ["home", "building", "wifi", "network", "camera", "cloud"]],
    [".metric>span", ["speed", "shield", "users", "headset"]],
    [".numbers-grid span", ["wifi", "building", "pin", "clock"]],
    [".serve-strip strong", ["home", "building"]]
  ];
  groups.forEach(([selector, names]) => $$(selector).forEach((element, index) => { element.innerHTML = icon(names[index]); element.setAttribute("aria-hidden", "true"); }));
  $$(".cta-icon").forEach(element => element.innerHTML = icon("headset", "2.1em"));
  $$(".portal").forEach(element => element.innerHTML = `${icon("user")} Customer Portal`);
  $$(".actions .outline").forEach(element => element.innerHTML = `${icon("building")} For Businesses`);
  $$("#coverageForm .btn").forEach(element => element.innerHTML = `${icon("pin")} Check Coverage`);
  $$(".btn.gold b").forEach(element => element.innerHTML = icon("arrow"));
  $$(".cta .outline").forEach(element => element.innerHTML = `${icon("headset")} Contact Us`);
  $$(".eyebrow").forEach(element => element.innerHTML = `${icon("bolt")} FAST. RELIABLE. SECURE.`);
  $$(".ticks li").forEach(element => { element.innerHTML = `${icon("shield")} ${element.textContent}`; });
  $$(".plan li").forEach(element => { element.innerHTML = `${icon("shield")} ${element.textContent}`; });
  $$(".footer-grid>div:last-child p").forEach(element => { const text = element.innerHTML; element.innerHTML = text.replace(/^☎/, icon("headset")).replace(/^✉/, icon("cloud")).replace(/^⌖/, icon("pin")); });
}
standardizeIcons();

function init3D() {
  if (reduced || !window.WebGLRenderingContext) return;
  try {
    const hero = $("#hero3d"), globeCanvas = $("#globe3d"); if (!hero || !globeCanvas) return;
    const renderer = makeRenderer(hero); renderer.setPixelRatio(Math.min(devicePixelRatio, 2.5));
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(52, 1, .1, 100); camera.position.z = 8;
    const particleGeometry = new THREE.BufferGeometry(), particlePositions = new Float32Array(620 * 3);
    for (let i = 0; i < 620; i++) { particlePositions[i * 3] = (Math.random() - .5) * 21; particlePositions[i * 3 + 1] = (Math.random() - .5) * 10; particlePositions[i * 3 + 2] = (Math.random() - .5) * 6; }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const stars = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0xffc32b, size: .024, transparent: true, opacity: .72 })); scene.add(stars);
    const arcs = new THREE.Group(); scene.add(arcs); const arcMaterial = new THREE.LineBasicMaterial({ color: 0xf6bd22, transparent: true, opacity: .42 });
    for (let arcIndex = 0; arcIndex < 5; arcIndex++) { const points = []; for (let pointIndex = 0; pointIndex < 74; pointIndex++) { const angle = pointIndex / 73 * Math.PI, radius = 3.2 + Math.random() * 4.2; points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * (1 + Math.random() * 2.5), Math.sin(angle) * radius * .24)); } const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), arcMaterial); line.rotation.y = arcIndex * Math.PI / 5 - 1.05; arcs.add(line); }

    const network = new THREE.Group(), networkLines = new THREE.Group(), networkNodes = []; network.add(networkLines); network.position.y = -1.05; scene.add(network);
    const towerMaterial = new THREE.LineBasicMaterial({ color: 0xffc52b, transparent: true, opacity: .68 }), nodeMaterial = new THREE.PointsMaterial({ color: 0xffd45a, size: .075, transparent: true, opacity: .95 });
    const towerLevels = [[-.72, -1.95, .12], [-.55, -1.42, .22], [-.4, -.7, .3], [-.27, .12, .4], [-.18, .8, .28], [-.1, 1.55, .16], [0, 2.3, .08]];
    for (let level = 0; level < towerLevels.length - 1; level++) { const [x, y, width] = towerLevels[level], [nextX, nextY, nextWidth] = towerLevels[level + 1]; for (const side of [-1, 1]) networkLines.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x + side * width, y, 0), new THREE.Vector3(nextX + side * nextWidth, nextY, 0)]), towerMaterial)); networkLines.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x - width, y, 0), new THREE.Vector3(x + width, y, 0)]), towerMaterial)); }
    networkLines.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 2.3, 0), new THREE.Vector3(0, 2.85, 0)]), towerMaterial));
    towerLevels.forEach(([x, y, width]) => networkNodes.push(x - width, y, 0, x + width, y, 0, x, y, 0)); const towerNodeGeometry = new THREE.BufferGeometry(); towerNodeGeometry.setAttribute("position", new THREE.Float32BufferAttribute(networkNodes, 3)); network.add(new THREE.Points(towerNodeGeometry, nodeMaterial));
    const cityNodes = []; for (let i = 0; i < 15; i++) cityNodes.push(new THREE.Vector3(-3.5 + i * .52 + (Math.random() - .5) * .18, -1.95 + Math.random() * 1.35, .02)); const cityNodeGeometry = new THREE.BufferGeometry().setFromPoints(cityNodes); network.add(new THREE.Points(cityNodeGeometry, new THREE.PointsMaterial({ color: 0xffb51b, size: .055, transparent: true, opacity: .8 })));
    const linkMaterial = new THREE.LineBasicMaterial({ color: 0xffbf2e, transparent: true, opacity: .38 }), pulseCurves = [];
    for (let i = 0; i < cityNodes.length; i += 2) { const target = towerLevels[Math.min(3 + Math.floor(i / 5), towerLevels.length - 1)], start = cityNodes[i], end = new THREE.Vector3(target[0], target[1], .02), midpoint = new THREE.Vector3((start.x + end.x) / 2, start.y + .65 + Math.random() * .35, .08), curve = new THREE.QuadraticBezierCurve3(start, midpoint, end); pulseCurves.push(curve); networkLines.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(28)), linkMaterial)); }
    const pulseGeometry = new THREE.BufferGeometry(); pulseGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(pulseCurves.length * 3), 3)); const pulses = new THREE.Points(pulseGeometry, new THREE.PointsMaterial({ color: 0xfff1a3, size: .12, transparent: true, opacity: 1 })); network.add(pulses);
    const setNetworkPosition = () => { network.position.x = innerWidth > 880 ? -1.15 : -.35; };

    const globeRenderer = makeRenderer(globeCanvas); globeRenderer.setPixelRatio(Math.min(devicePixelRatio, 2.5)); const globeScene = new THREE.Scene(), globeCamera = new THREE.PerspectiveCamera(38, 1, .1, 100); globeCamera.position.z = 7; const world = new THREE.Group(); globeScene.add(world);
    const globeRadius = 1.88, sphere = new THREE.SphereGeometry(globeRadius, 64, 40);
    const mapCanvas = document.createElement("canvas"); mapCanvas.width = 1024; mapCanvas.height = 512; const mapContext = mapCanvas.getContext("2d"); mapContext.fillStyle = "#071923"; mapContext.fillRect(0, 0, 1024, 512); mapContext.strokeStyle = "#173442"; mapContext.lineWidth = 1;
    for (let longitude = 0; longitude <= 360; longitude += 30) { const x = longitude / 360 * 1024; mapContext.beginPath(); mapContext.moveTo(x, 0); mapContext.lineTo(x, 512); mapContext.stroke(); }
    for (let latitude = -60; latitude <= 60; latitude += 30) { const y = (90 - latitude) / 180 * 512; mapContext.beginPath(); mapContext.moveTo(0, y); mapContext.lineTo(1024, y); mapContext.stroke(); }
    const continents = [[[-168,72],[-140,70],[-125,55],[-105,48],[-95,28],[-80,25],[-88,12],[-110,18],[-120,30],[-140,40]], [[-80,12],[-62,8],[-48,-5],[-55,-24],[-70,-55],[-80,-45],[-75,-20]], [[-10,35],[20,38],[38,28],[55,20],[48,5],[35,-10],[20,-35],[5,-35],[-8,-5],[-18,15]], [[35,70],[80,65],[130,55],[170,45],[160,20],[120,5],[90,10],[70,25],[45,35]], [[110,-5],[155,-8],[150,-35],[125,-40],[112,-25]], [[-45,82],[-20,75],[-25,60],[-48,62]]];
    mapContext.fillStyle = "#b77a08"; mapContext.globalAlpha = .88; continents.forEach(continent => { mapContext.beginPath(); continent.forEach(([longitude, latitude], index) => { const x = (longitude + 180) / 360 * 1024, y = (90 - latitude) / 180 * 512; index ? mapContext.lineTo(x, y) : mapContext.moveTo(x, y); }); mapContext.closePath(); mapContext.fill(); }); mapContext.globalAlpha = 1;
    const mapTexture = new THREE.CanvasTexture(mapCanvas); mapTexture.colorSpace = THREE.SRGBColorSpace; world.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ map: mapTexture, transparent: true, opacity: .92 })));
    world.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffc52b, wireframe: true, transparent: true, opacity: .12 })));
    const globeLineMaterial = new THREE.LineBasicMaterial({ color: 0xf1b51b, transparent: true, opacity: .2 });
    const latLonToVector = (latitude, longitude, radius = globeRadius + .025) => { const lat = THREE.MathUtils.degToRad(latitude), lon = THREE.MathUtils.degToRad(longitude); return new THREE.Vector3(radius * Math.cos(lat) * Math.sin(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.cos(lon)); };
    for (let latitude = -60; latitude <= 60; latitude += 30) { const points = []; for (let i = 0; i <= 72; i++) points.push(latLonToVector(latitude, -180 + i * 5)); world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), globeLineMaterial)); }
    for (let longitude = -150; longitude <= 180; longitude += 30) { const points = []; for (let i = 0; i <= 36; i++) points.push(latLonToVector(-90 + i * 5, longitude)); world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), globeLineMaterial)); }
    const regions = [[6, 3], [51, -1], [25, 55], [35, 105], [1, 103], [-1, 37], [-23, 133], [40, -100], [-23, -46], [19, -99], [34, -118]];
    const regionPoints = regions.map(([latitude, longitude]) => latLonToVector(latitude, longitude, globeRadius + .075)); const regionGeometry = new THREE.BufferGeometry().setFromPoints(regionPoints); world.add(new THREE.Points(regionGeometry, new THREE.PointsMaterial({ color: 0xffd45a, size: .09, transparent: true, opacity: 1 })));
    const globeCurves = [], globeConnections = new THREE.Group(); world.add(globeConnections); const connectionMaterial = new THREE.LineBasicMaterial({ color: 0xffbd27, transparent: true, opacity: .48 });
    [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[0,7],[7,8],[8,9],[9,10],[10,1],[6,4]].forEach(([from, to]) => { const start = regionPoints[from], end = regionPoints[to], midpoint = start.clone().add(end).multiplyScalar(.5).normalize().multiplyScalar(globeRadius + .72); const curve = new THREE.QuadraticBezierCurve3(start, midpoint, end); globeCurves.push(curve); globeConnections.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(32)), connectionMaterial)); });
    const globePulseGeometry = new THREE.BufferGeometry(); globePulseGeometry.setAttribute("position", new THREE.Float32BufferAttribute(new Float32Array(globeCurves.length * 3), 3)); const globePulses = new THREE.Points(globePulseGeometry, new THREE.PointsMaterial({ color: 0xffffb0, size: .13, transparent: true, opacity: 1 })); world.add(globePulses);

    const resize = () => { for (const [canvas, render, activeCamera, fallback] of [[hero, renderer, camera, 720], [globeCanvas, globeRenderer, globeCamera, 400]]) { const width = canvas.clientWidth || innerWidth, height = canvas.clientHeight || fallback; render.setSize(width, height, false); activeCamera.aspect = width / height; activeCamera.updateProjectionMatrix(); } setNetworkPosition(); }; resize(); addEventListener("resize", resize, { passive: true }); let visible = true; const activeScenes = new Set(); const visibilityObserver = new IntersectionObserver(entries => { entries.forEach(entry => entry.isIntersecting ? activeScenes.add(entry.target) : activeScenes.delete(entry.target)); visible = activeScenes.size > 0; }, { threshold: 0 }); visibilityObserver.observe(hero); visibilityObserver.observe(globeCanvas);
    let time = 0, frame; const loop = () => { frame = requestAnimationFrame(loop); if (!visible) return; time += .004; stars.rotation.y = time * .35; arcs.rotation.y = time * .42; arcs.position.x = innerWidth > 880 ? 1.8 : 1; network.rotation.y = Math.sin(time * .4) * .06; network.position.z = Math.sin(time * .6) * .05; const cityPositions = cityNodeGeometry.attributes.position.array; for (let index = 0; index < cityNodes.length; index++) cityPositions[index * 3 + 1] = cityNodes[index].y + Math.sin(time * 1.8 + index * .7) * .045; cityNodeGeometry.attributes.position.needsUpdate = true; const towerPositions = towerNodeGeometry.attributes.position.array; for (let index = 0; index < networkNodes.length / 3; index++) towerPositions[index * 3 + 1] = networkNodes[index * 3 + 1] + Math.sin(time * 2.2 + index * .8) * .025; towerNodeGeometry.attributes.position.needsUpdate = true; pulseCurves.forEach((curve, index) => { const point = curve.getPoint((time * .7 + index * .17) % 1), positions = pulseGeometry.attributes.position.array; positions[index * 3] = point.x; positions[index * 3 + 1] = point.y; positions[index * 3 + 2] = point.z + .04; }); pulseGeometry.attributes.position.needsUpdate = true; globeCurves.forEach((curve, index) => { const point = curve.getPoint((time * .52 + index * .09) % 1), positions = globePulseGeometry.attributes.position.array; positions[index * 3] = point.x; positions[index * 3 + 1] = point.y; positions[index * 3 + 2] = point.z + .03; }); globePulseGeometry.attributes.position.needsUpdate = true; world.rotation.y = time * 1.45; world.rotation.x = Math.sin(time * .6) * .07; renderer.render(scene, camera); globeRenderer.render(globeScene, globeCamera); }; loop(); addEventListener("pagehide", () => cancelAnimationFrame(frame), { once: true });
  } catch (error) { console.warn("3D presentation unavailable", error); }
}
init3D();

const numbers = $(".numbers"); let counted = false; if (numbers) new IntersectionObserver(entries => { if (!entries[0].isIntersecting || counted) return; counted = true; $$('[data-count]').forEach(element => { const target = Number(element.dataset.count), start = performance.now(); const tick = now => { const progress = Math.min((now - start) / 1300, 1), eased = 1 - (1 - progress) ** 3; element.textContent = target % 1 ? (target * eased).toFixed(1) + "%" : Math.floor(target * eased).toLocaleString() + "+"; if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }); }, { threshold: .35 }).observe(numbers);
$("#coverageForm")?.addEventListener("submit", event => { event.preventDefault(); const input = $("#coverageInput"), output = $("#coverageResult"), area = input.value.trim(); if (area.length < 3) { output.textContent = "Please enter at least three characters so we can check your area."; input.focus(); return; } output.textContent = `Thanks — we’ve received “${area}”. An Empire Networks advisor will confirm coverage and next steps shortly.`; event.currentTarget.reset(); });
$$('.faq-grid details').forEach(detail => detail.addEventListener("toggle", () => { if (detail.open) $$('.faq-grid details').forEach(other => { if (other !== detail) other.open = false; }); }));
const reveal = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); reveal.unobserve(entry.target); } }), { threshold: .1 }); $$('.service,.plan,.testimonial-grid article,.faq-grid details,.about-copy,.globe-wrap').forEach((element, index) => { element.style.opacity = "0"; element.style.transform = "translateY(18px)"; element.style.setProperty("--delay", `${index % 6 * 55}ms`); reveal.observe(element); });