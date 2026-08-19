import * as THREE from 'https://esm.sh/three@0.179.1';

const palette={Turtle:0x4fd35f,Clownfish:0xff7a00,Seahorse:0xffbf3c,Jellyfish:0xc58cff,Dolphin:0x39bdf2,Octopus:0xb456ff,Shark:0x8fa5b8,Whale:0x3178d8,Stingray:0x746bff,Angelfish:0xff59ca};

export function mountAquarium(el,state,aquarium){
  if(!el || el.dataset.threeMounted) return;
  el.dataset.threeMounted='true';
  const scene=new THREE.Scene();
  scene.fog=new THREE.Fog(0x043957,7,24);
  const camera=new THREE.PerspectiveCamera(45,1,.1,60);
  camera.position.set(0,4.4,12);
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
  renderer.setClearColor(0x000000,0);
  renderer.domElement.style.cssText='position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none';
  el.prepend(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xbff8ff,0x063828,2.6));
  const sun=new THREE.DirectionalLight(0xffffff,2.1);sun.position.set(-5,8,7);scene.add(sun);
  const sand=new THREE.Mesh(new THREE.CylinderGeometry(8.8,9.8,.45,64),new THREE.MeshStandardMaterial({color:0xd5a35f,roughness:.65,metalness:.05}));
  sand.position.y=-3.1;sand.scale.z=.42;scene.add(sand);
  const group=new THREE.Group();scene.add(group);
  (aquarium.decorations||[]).forEach((d,i)=>{const mat=new THREE.MeshStandardMaterial({color:[0xff6b8a,0xffcc66,0x65e68a,0x7dd3fc,0xb084ff][i%5],roughness:.38,metalness:.12});const geo=d.includes('Rock')?new THREE.DodecahedronGeometry(.45+Math.random()*.25):new THREE.ConeGeometry(.25,.9+Math.random()*.8,8);const m=new THREE.Mesh(geo,mat);m.position.set(-6+(i*1.45)%12,-2.65,-1.5-Math.random()*2);m.rotation.set(Math.random(),Math.random(),Math.random());group.add(m)});
  for(let i=0;i<22;i++){const mat=new THREE.MeshStandardMaterial({color:i%3?0x26d07c:0x14a6a1,roughness:.5});const blade=new THREE.Mesh(new THREE.CapsuleGeometry(.035,.9+Math.random()*1.4,4,8),mat);blade.position.set(-7+Math.random()*14,-2.55,-3+Math.random()*3.5);blade.rotation.z=(-.35+Math.random()*.7);group.add(blade)}
  const pets=(state.pets||[]).map((p,i)=>makePet(p,i));pets.forEach(o=>group.add(o.root));
  const bubbles=Array.from({length:38},()=>makeBubble());bubbles.forEach(b=>group.add(b));
  function makePet(p,i){const root=new THREE.Group(),color=palette[p.type]||0x20d6ff;const body=new THREE.Mesh(new THREE.SphereGeometry(.48,32,20),new THREE.MeshStandardMaterial({color,roughness:.32,metalness:.08,emissive:color,emissiveIntensity:.05}));body.scale.set(1.7,.72,.55);root.add(body);const finMat=new THREE.MeshStandardMaterial({color,transparent:true,opacity:.82});const tail=new THREE.Mesh(new THREE.ConeGeometry(.35,.65,3),finMat);tail.position.x=-.9;tail.rotation.z=Math.PI/2;root.add(tail);const eye=new THREE.Mesh(new THREE.SphereGeometry(.055,12,8),new THREE.MeshBasicMaterial({color:0x001725}));eye.position.set(.58,.13,.34);root.add(eye);root.position.set(-5+((p.x||20)/100)*10,-1.6+((p.y||40)/100)*4,-1-i*.12);root.userData={p,speed:.55+Math.random()*.55,phase:Math.random()*6};return {root}}
  function makeBubble(){const b=new THREE.Mesh(new THREE.SphereGeometry(.035+Math.random()*.08,12,8),new THREE.MeshPhysicalMaterial({color:0xdffbff,transparent:true,opacity:.45,roughness:0,transmission:.4}));b.position.set(-7+Math.random()*14,-3+Math.random()*6,-3+Math.random()*4);b.userData.v=.008+Math.random()*.018;return b}
  function resize(){const r=el.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()}resize();addEventListener('resize',resize,{passive:true});let t=0;
  renderer.setAnimationLoop(()=>{t+=.016;group.rotation.y=Math.sin(t*.22)*.08;pets.forEach(({root},i)=>{root.position.x+=Math.sin(t*root.userData.speed+root.userData.phase)*.006;root.position.y+=Math.cos(t*.9+root.userData.phase)*.004;root.rotation.y=Math.sin(t*.7+i)*.22});bubbles.forEach(b=>{b.position.y+=b.userData.v;if(b.position.y>3.4){b.position.y=-3;b.position.x=-7+Math.random()*14}});renderer.render(scene,camera)});
}
