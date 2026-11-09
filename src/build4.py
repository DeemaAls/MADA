import re
t=open('tpl.html',encoding='utf8').read();a=open('assets_line.txt',encoding='utf8').read()
out=t.replace('/*@@ASSETS@@*/',a)
open('mada_v4.html','w',encoding='utf8').write(out)
open('chk4.js','w').write(re.findall(r'<script>(.*?)</script>',out,re.S)[-1])
html='<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}</style><link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#5B3FE0"><link rel="icon" href="icons/icon-192.png"><link rel="apple-touch-icon" href="icons/apple-touch-icon.png"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="مدى"><script src="config.js"></script></head><body>'+out+'</body></html>'
import os;os.makedirs('mada-site',exist_ok=True);open('mada-site/index.html','w',encoding='utf8').write(html)
print(len(out)//1024,'KB')
