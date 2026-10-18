// Renders the Fratelanza explainer video (1080x1920, 30 fps) frame-by-frame from an HTML timeline.
import path from 'node:path'
import { mkdirSync, rmSync, writeFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { chromium } from 'playwright-core'
import { C, LOGO, ROOT, icon, fontCss, qrTile, fileUrl } from '../lib.mjs'
import { ill } from '../illustrations.mjs'
import { scenes, TOTAL } from './scenes.mjs'

const FPS = 30, W = 1080, H = 1920
const OUT = path.join(ROOT, 'output/video')
const TMP = path.join(ROOT, 'build/video')
const quick = process.argv.includes('--quick') // low-res preview
const ffmpeg = (() => { try { return execFileSync('python3', ['-c', 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())']).toString().trim() } catch { return 'ffmpeg' } })()

const big = (svg, w) => svg.replace('<svg ', `<svg style="width:${w}px;display:block" `)
const words = (s) => s.text.split(/\s+/)
const capHtml = (s) => {
  // wrap words; highlight phrases from s.hl
  let html = s.text
  for (const h of s.hl) html = html.replace(h, `\u0001${h}\u0002`)
  const parts = []
  let inEm = false
  for (const w of html.split(' ')) {
    let cls = ''
    if (w.includes('\u0001')) inEm = true
    cls = inEm ? 'hl' : ''
    parts.push(`<span class="w ${cls}">${w.replace(/[\u0001\u0002]/g, '')}</span>`)
    if (w.includes('\u0002')) inEm = false
  }
  return parts.join(' ')
}
const appItems = [['Calculator', 'حسابات', 'linear-gradient(135deg,#22d3ee,#10b981)', '#fff'], ['Package', 'مخازن', 'linear-gradient(135deg,#f2d89a,#d4a03a)', C.navy], ['ShoppingCart', 'مبيعات', 'linear-gradient(135deg,#12395f,#0a1f3a)', '#fff'],
  ['Users', 'موظفين', 'linear-gradient(135deg,#10b981,#0e7490)', '#fff'], ['CalendarDays', 'مواعيد', 'linear-gradient(135deg,#0e7490,#0a1f3a)', '#fff'], ['Smartphone', 'تطبيق موبايل', 'linear-gradient(135deg,#d4a03a,#f2d89a)', C.navy],
  ['ChartColumn', 'تقارير', 'linear-gradient(135deg,#0a1f3a,#0e7490)', '#fff'], ['Pill', 'صيدليات وعيادات', 'linear-gradient(135deg,#22d3ee,#0e7490)', '#fff'], ['Building2', 'عقارات', 'linear-gradient(135deg,#f2d89a,#10b981)', C.navy]]
const chaos = [['FileSpreadsheet', 90, 360, -9, '#10b981'], ['FileText', 640, 330, 8, '#22d3ee'], ['Phone', 360, 520, -4, C.gold], ['ClipboardList', 120, 700, 7, '#ef6c6c'], ['Mail', 650, 720, -8, '#22d3ee'], ['Calculator', 380, 880, 5, C.goldLight]]

const sceneHtml = {
  hook: `<div class="title" style="top:250px">شغلك <em>لخبطة</em>؟</div>${chaos.map(([n, x, y, r, c], i) => `<div class="paper" data-i="${i}" data-x="${x}" data-y="${y}" data-r="${r}" style="left:${x}px;top:${y}px;transform:rotate(${r}deg)"><div class="ph" style="background:${c}">${icon(n, 54, '#0a1f3a', 2)}</div><div class="pl" style="width:70%"></div><div class="pl" style="width:45%"></div><div class="pl" style="width:85%"></div></div>`).join('')}<div class="qm">؟</div>`,
  intro: `<div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div><img class="logo" src="${LOGO}"><div class="brandname">فراتيلانزا</div><div class="brandsub">FRATELANZA · نبني الغد معاً</div>`,
  apps: `<div class="title" style="top:210px;font-size:92px;white-space:nowrap">كل اللي شغلك <em>محتاجه</em></div><div class="tiles">${appItems.map(([n, l, bg, col], i) => `<div class="tile" data-i="${i}"><div class="ti" style="background:${bg}">${icon(n, 96, col, 1.8)}</div><div class="tl">${l}</div></div>`).join('')}</div>`,
  tailor: `<div class="title" style="top:230px">على <em>مقاس</em> شغلك</div><div class="art" id="tailorArt" style="top:420px">${big(ill.tailor, 940)}</div><div class="tape"><div class="tapefill"></div></div>`,
  source: `<div class="title" style="top:230px">الكود <em>ملكك</em></div><div class="art" id="srcArt" style="top:430px">${big(ill.code, 940)}</div><div class="badge" id="ownBadge">${icon('BadgeCheck', 64, '#0a1f3a', 2)}<span>الكود المصدري ليك</span></div>`,
  nosub: `<div class="title" style="top:230px">من غير <em>اشتراكات</em></div><div class="art" id="nsArt" style="top:430px">${big(ill.nosub, 940)}</div><div class="pills"><div class="pill" data-i="0">اشتراك شهري</div><div class="pill" data-i="1">رخصة سنوية</div><div class="pill" data-i="2">رسوم تجديد</div></div>`,
  support: `<div class="title" style="top:230px">دعم فني <em>مجاني</em></div><div class="art" id="supArt" style="top:430px">${big(ill.support, 940)}</div><div class="badge" id="supBadge">${icon('Headphones', 64, '#0a1f3a', 2)}<span>٣ شهور بعد التسليم</span></div>`,
  grow: `<div class="title" style="top:230px">بيكبر <em>معاك</em></div><div class="art" id="growArt" style="top:430px">${big(ill.grow, 940)}</div><div class="badge" id="growBadge">${icon('TrendingUp', 64, '#0a1f3a', 2)}<span>أي تطوير في أي وقت</span></div>`,
  cta: `<img class="logo2" src="${LOGO}"><div class="title" style="top:410px;font-size:84px">كلّمنا <em>دلوقتي</em></div><div class="phone" id="ph"><div class="pi">${icon('MessageCircle', 68, '#25d366', 2.2)}</div><div class="pn" dir="ltr">0109 713 8338</div><div class="pc">واتساب · اتصال</div></div><div class="qrbox" id="qrb">${qrTile('video', 270, { caption: false })}<div class="qrc">امسح وادخل على موقعنا</div><div class="web" dir="ltr">www.fratelanza.com</div></div><div class="addr">${icon('MapPin', 36, C.goldLight, 2)} ٦ أكتوبر، الحي الرابع، عمارة ٢٦١، شقة ٨</div>`,
}

const css = `${fontCss()}
*{box-sizing:border-box;margin:0;padding:0}html,body{width:${W}px;height:${H}px;overflow:hidden;background:#0a1f3a;font-family:'Tajawal',sans-serif;direction:rtl}
#stage{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(circle at 80% 8%,rgba(34,211,238,.30),transparent 42%),radial-gradient(circle at 5% 95%,rgba(212,160,58,.26),transparent 40%),linear-gradient(165deg,#0a1f3a,#0f2f55 58%,#0b3b5c)}
#grid{position:absolute;inset:-200px;opacity:.07;background-image:linear-gradient(#fff 2px,transparent 2px),linear-gradient(90deg,#fff 2px,transparent 2px);background-size:120px 120px}
.dot{position:absolute;border-radius:50%;background:#f2d89a}
#prog{position:absolute;top:0;right:0;height:10px;background:linear-gradient(270deg,#d4a03a,#22d3ee);z-index:9}
#wm{position:absolute;top:60px;right:60px;display:flex;align-items:center;gap:18px;color:#fff;font-weight:800;font-size:40px;z-index:8}#wm img{width:84px;height:84px;border-radius:50%;box-shadow:0 0 0 3px rgba(242,216,154,.75)}
.scene{position:absolute;inset:0;opacity:0}
.title{position:absolute;left:0;right:0;text-align:center;color:#fff;font-weight:800;font-size:104px;line-height:1.15;text-shadow:0 8px 30px rgba(0,0,0,.35)}.title em,.hl{font-style:normal;color:#f2d89a}
.art{position:absolute;left:70px;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35));background:linear-gradient(160deg,#eaf6fd,#f8fbff);border-radius:60px;padding:30px;width:940px}
.cap{position:absolute;left:70px;right:70px;bottom:150px;text-align:center;color:#fff;font-weight:800;font-size:60px;line-height:1.5;z-index:7;min-height:300px;display:flex;align-items:center;justify-content:center}
.cap>div{background:rgba(10,31,58,.62);backdrop-filter:blur(6px);border:2px solid rgba(255,255,255,.14);border-radius:46px;padding:34px 46px;box-shadow:0 20px 50px rgba(0,0,0,.3)}
.cap .w{display:inline-block;opacity:.28;transition:none}.cap .w.hl{color:#f2d89a}
.paper{position:absolute;width:300px;height:220px;background:#fff;border-radius:26px;padding:22px;box-shadow:0 24px 50px rgba(0,0,0,.35);display:grid;gap:14px;align-content:start}.ph{width:84px;height:84px;border-radius:22px;display:flex;align-items:center;justify-content:center}.pl{height:14px;border-radius:7px;background:#dbe7f0}
.qm{position:absolute;left:0;right:0;top:620px;text-align:center;font-size:520px;font-weight:800;color:rgba(242,216,154,.18);line-height:1}
.ring{position:absolute;left:50%;top:640px;border-radius:50%;border:4px solid rgba(34,211,238,.5)}.logo{position:absolute;left:290px;top:390px;width:500px;height:500px;border-radius:50%;box-shadow:0 0 0 8px rgba(242,216,154,.75),0 40px 90px rgba(0,0,0,.5)}
.brandname{position:absolute;left:0;right:0;top:960px;text-align:center;font-size:150px;font-weight:800;color:#f2d89a;line-height:1.1}.brandsub{position:absolute;left:0;right:0;top:1130px;text-align:center;font-size:44px;font-weight:700;letter-spacing:.1em;color:#c5d6e8;direction:ltr}
.tiles{position:absolute;left:155px;top:390px;width:770px;display:grid;grid-template-columns:repeat(3,230px);gap:34px 40px}.tile{text-align:center}.ti{width:230px;height:230px;border-radius:56px;display:flex;align-items:center;justify-content:center;box-shadow:0 24px 50px rgba(0,0,0,.35)}.tl{margin-top:14px;font-size:42px;font-weight:800;color:#fff;line-height:1.2}
.tape{position:absolute;left:100px;top:1250px;width:880px;height:70px;border-radius:35px;background:rgba(255,255,255,.1);overflow:hidden}.tapefill{height:100%;width:0;background:#d4a03a;background-image:repeating-linear-gradient(90deg,transparent 0 18px,rgba(10,31,58,.55) 18px 21px);border-radius:35px}
.badge{position:absolute;left:50%;top:1190px;display:flex;align-items:center;gap:22px;background:linear-gradient(135deg,#f2d89a,#d4a03a);color:#0a1f3a;font-weight:800;font-size:56px;padding:26px 52px;border-radius:70px;white-space:nowrap;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.pills{position:absolute;left:0;right:0;top:1190px;display:flex;justify-content:center;gap:26px}.pill{font-size:44px;font-weight:800;color:#fff;background:rgba(239,108,108,.9);padding:18px 38px;border-radius:50px;text-decoration:line-through;text-decoration-thickness:5px;white-space:nowrap}
.logo2{position:absolute;left:340px;top:200px;width:400px;height:400px;border-radius:50%;box-shadow:0 0 0 7px rgba(242,216,154,.75),0 30px 80px rgba(0,0,0,.5)}
.phone{position:absolute;left:90px;right:90px;top:560px;text-align:center;background:rgba(255,255,255,.1);border:3px solid rgba(255,255,255,.22);border-radius:70px;padding:40px 20px 34px}.pi{display:flex;justify-content:center}.pn{font-size:128px;font-weight:800;color:#fff;letter-spacing:.04em;line-height:1.15;direction:ltr}.pc{font-size:46px;color:#f2d89a;font-weight:700}
.qrbox{position:absolute;left:0;right:0;top:1010px;text-align:center;color:#fff}.qrbox>div:first-child{display:inline-block}.qrc{font-size:50px;font-weight:800;color:#f2d89a;margin-top:18px}.web{font-size:48px;font-weight:700;color:#c5d6e8;margin-top:6px}
.addr{position:absolute;left:0;right:0;top:1640px;text-align:center;color:#c5d6e8;font-size:40px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:14px}
`

const js = `
const SC=${JSON.stringify(scenes.map((s) => ({ id: s.id, start: s.start, dur: s.dur })))}, TOTAL=${TOTAL}
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x))
const E={out:t=>1-Math.pow(1-t,3),back:t=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2)},inout:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,lin:t=>t}
const P=(t,d,u,e=E.out)=>e(clamp((t-d)/u))
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)]
function put(el,{o=1,x=0,y=0,s=1,r=0}={}){el.style.opacity=o;el.style.transform='translate('+x+'px,'+y+'px) rotate('+r+'deg) scale('+s+')'}
const els={}; SC.forEach(s=>els[s.id]=document.getElementById('s_'+s.id))
const dots=$$('.dot')
const anim={
 hook(l,d,r){ $$('.paper',r).forEach((p,i)=>{const a=P(l,.15+i*.12,.5,E.back),out=P(l,d-.8,.6,E.inout);const wob=Math.sin(l*3+i)*6;put(p,{o:a*(1-out),s:(.2+.8*a)*(1-out*.8),r:+p.dataset.r+wob+out*40,y:Math.sin(l*2+i*1.3)*14,x:out*(540-(+p.dataset.x+150))*0.6})}); const q=$('.qm',r);put(q,{o:P(l,.3,.6)*(1-P(l,d-.8,.5)),s:1+Math.sin(l*4)*.04}); put($('.title',r),{o:P(l,0,.5),y:(1-P(l,0,.6,E.back))*-60}) },
 intro(l,d,r){ $$('.ring',r).forEach((g,i)=>{const k=((l*.5+i*.33)%1);const sz=520+k*760;g.style.width=sz+'px';g.style.height=sz+'px';g.style.marginLeft=(-sz/2)+'px';g.style.marginTop=(-sz/2+110)+'px';g.style.opacity=(1-k)*.8}); const lg=$('.logo',r);put(lg,{o:P(l,0,.4),s:.3+.7*P(l,0,.8,E.back),r:(1-P(l,0,.9))*-200}); put($('.brandname',r),{o:P(l,.5,.5),y:(1-P(l,.5,.6,E.back))*70}); put($('.brandsub',r),{o:P(l,.8,.5),y:(1-P(l,.8,.5))*40}) },
 apps(l,d,r){ put($('.title',r),{o:P(l,0,.5),y:(1-P(l,0,.6,E.back))*-60}); $$('.tile',r).forEach((t,i)=>{const a=P(l,.5+i*(d*.62/9),.45,E.back);put(t,{o:clamp(a*2),s:.2+.8*a,y:(1-clamp(a))*60})}) },
 tailor(l,d,r){ put($('.title',r),{o:P(l,0,.5),y:(1-P(l,0,.6,E.back))*-60}); const a=$('#tailorArt');put(a,{o:P(l,.2,.5),s:.8+.2*P(l,.2,.8,E.back),y:(1-P(l,.2,.7))*80}); $('.tapefill',r).style.width=(P(l,.8,d*.55,E.inout)*100)+'%' },
 source(l,d,r){ put($('.title',r),{o:P(l,0,.5),y:(1-P(l,0,.6,E.back))*-60}); put($('#srcArt'),{o:P(l,.2,.5),s:.85+.15*P(l,.2,.8,E.back),y:(1-P(l,.2,.7))*80}); const b=$('#ownBadge');const a=P(l,d*.45,.5,E.back);b.style.opacity=a;b.style.transform='translate(-50%,0) scale('+(.3+.7*a)+')' },
 nosub(l,d,r){ put($('.title',r),{o:P(l,0,.5),y:(1-P(l,0,.6,E.back))*-60}); put($('#nsArt'),{o:P(l,.2,.5),s:.85+.15*P(l,.2,.8,E.back),y:(1-P(l,.2,.7))*80}); $$('.pill',r).forEach((p,i)=>{const a=P(l,1+i*.7,.4,E.back);put(p,{o:a,s:.4+.6*a,y:(1-a)*40})}) },
 support(l,d,r){ put($('.title',r),{o:P(l,0,.5),y:(1-P(l,0,.6,E.back))*-60}); put($('#supArt'),{o:P(l,.2,.5),s:.85+.15*P(l,.2,.8,E.back),y:(1-P(l,.2,.7))*80+Math.sin(l*3)*8}); const b=$('#supBadge');const a=P(l,d*.5,.5,E.back);b.style.opacity=a;b.style.transform='translate(-50%,0) scale('+(.3+.7*a)+')' },
 grow(l,d,r){ put($('.title',r),{o:P(l,0,.5),y:(1-P(l,0,.6,E.back))*-60}); const a=$('#growArt');put(a,{o:P(l,.2,.5),y:(1-P(l,.2,.7))*80}); const rev=P(l,.6,d*.6,E.inout);a.querySelector('svg').style.clipPath='inset('+((1-rev)*100)+'% 0 0 0)'; const b=$('#growBadge');const k=P(l,d*.55,.5,E.back);b.style.opacity=k;b.style.transform='translate(-50%,0) scale('+(.3+.7*k)+')' },
 cta(l,d,r){ put($('.logo2',r),{o:P(l,0,.4),s:.4+.6*P(l,0,.7,E.back)}); put($('.title',r),{o:P(l,.2,.5),y:(1-P(l,.2,.6,E.back))*-50}); put($('#ph'),{o:P(l,.5,.5),s:.7+.3*P(l,.5,.7,E.back)+Math.sin(l*5)*.008}); put($('#qrb'),{o:P(l,2.6,.5),s:.6+.4*P(l,2.6,.7,E.back)}); put($('.addr',r),{o:P(l,3.6,.5)}) },
}
// cinematic bg
dots.forEach((el,i)=>{el.dataset.sx=(i*137.5)%1080;el.dataset.sy=(i*271.3)%1920;el.dataset.sp=20+(i%5)*10})
window.setT=function(t){
  $('#grid').style.transform='translate('+((t*20)%120)+'px,'+((t*14)%120)+'px)'
  dots.forEach(el=>{const y=(+el.dataset.sy-t*el.dataset.sp+1920*3)%1920;el.style.left=el.dataset.sx+'px';el.style.top=y+'px';el.style.opacity=.15+.25*Math.sin(t+(+el.dataset.sx))*.5+.1})
  $('#prog').style.width=(t/TOTAL*100)+'%'
  let cur=null
  SC.forEach(s=>{const el=els[s.id];const l=t-s.start;const on=l>=-.001&&l<s.dur;if(!on){el.style.opacity=0;el.style.visibility='hidden';return}
    cur=s;el.style.visibility='visible';const fade=Math.min(P(l,0,.25,E.lin),1-P(l,s.dur-.25,.25,E.lin));el.style.opacity=clamp(fade,0,1)
    anim[s.id](l,s.dur,el)
    // captions: words light up as spoken
    const ws=$$('.w',el.querySelector('.cap')); const sp=clamp((l-.25)/(s.dur-1.0)); ws.forEach((w,i)=>{w.style.opacity=(i/ws.length<=sp+.02)?1:.28})
    const cp=el.querySelector('.cap');cp.style.transform='translateY('+((1-P(l,.05,.4,E.back))*40)+'px)'
  })
}
setT(0)
`

const html = `<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>${css}</style></head><body><div id="stage"><div id="grid"></div>
${Array.from({ length: 26 }, (_, i) => `<div class="dot" style="width:${6 + (i % 4) * 3}px;height:${6 + (i % 4) * 3}px"></div>`).join('')}
<div id="prog"></div><div id="wm"><img src="${LOGO}"><span>فراتيلانزا</span></div>
${scenes.map((s) => `<div class="scene" id="s_${s.id}">${sceneHtml[s.id]}<div class="cap"><div>${capHtml(s)}</div></div></div>`).join('')}
</div><script>${js}</script></body></html>`

async function main() {
  rmSync(TMP, { recursive: true, force: true }); mkdirSync(path.join(TMP, 'frames'), { recursive: true }); mkdirSync(OUT, { recursive: true })
  writeFileSync(path.join(TMP, 'video.html'), html)
  const total = Math.round(TOTAL * FPS)
  const workers = 4
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--no-sandbox'] })
  const pages = await Promise.all(Array.from({ length: workers }, async () => {
    const p = await browser.newPage({ viewport: { width: W, height: H } })
    await p.goto(fileUrl(path.join(TMP, 'video.html')), { waitUntil: 'networkidle' })
    await p.evaluate(() => document.fonts.ready)
    return p
  }))
  const step = process.argv.includes('--still') ? Math.round(FPS * 1.5) : 1
  let done = 0
  await Promise.all(pages.map(async (p, w) => {
    for (let i = w; i < total; i += workers) {
      if (step > 1 && i % step !== 0) continue
      await p.evaluate((t) => window.setT(t), i / FPS)
      await p.screenshot({ path: path.join(TMP, 'frames', String(i).padStart(5, '0') + '.jpg'), type: 'jpeg', quality: 88 })
      if (++done % 150 === 0) console.log('frames', done, '/', total)
    }
  }))
  await browser.close()
  if (step > 1) { console.log('stills done'); return }
  // music
  const music = path.join(OUT, 'music.wav')
  execFileSync('python3', [path.join(ROOT, 'video/music.py'), music, String(TOTAL + 1)])
  const silent = path.join(OUT, 'Fratelanza-Video-no-audio.mp4')
  execFileSync(ffmpeg, ['-y', '-framerate', String(FPS), '-i', path.join(TMP, 'frames', '%05d.jpg'), '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', silent], { stdio: 'inherit' })
  execFileSync(ffmpeg, ['-y', '-i', silent, '-i', music, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', path.join(OUT, 'Fratelanza-Video.mp4')], { stdio: 'inherit' })
  console.log('video done')
}
main()
