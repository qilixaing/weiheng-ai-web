import json, math, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
root=Path(__file__).resolve().parents[2]/'photo-expansion'
category='--category' in sys.argv
rows=json.loads((root/('category-downloaded.json' if category else 'downloaded.json')).read_text(encoding='utf-8'))
out=root/'review';out.mkdir(exist_ok=True)
font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',13)
start=int(sys.argv[1]) if len(sys.argv)>1 else 0
end=min(len(rows),int(sys.argv[2]) if len(sys.argv)>2 else len(rows))
for base in range(start,end,60):
 sheet=Image.new('RGB',(1200,1680),'white');d=ImageDraw.Draw(sheet)
 for n,row in enumerate(rows[base:min(base+60,end)]):
  x=(n%6)*200;y=(n//6)*168
  try:
   im=Image.open(root/('category-downloads' if category else 'downloads')/row['filename']);im=ImageOps.exif_transpose(im);im.thumbnail((196,124))
   sheet.paste(im,(x+(196-im.width)//2,y))
   label=f"{base+n:03d} {row['subject']}"
   d.text((x+3,y+125),label,font=font,fill='black')
   d.text((x+3,y+145),row['title'].removeprefix('File:')[:23],font=font,fill='black')
  except Exception as e:d.text((x+3,y+120),f'{base+n} BAD',font=font,fill='red')
 sheet.save(out/f'{"cat" if category else "sheet"}-{base:03d}.jpg',quality=90)
print(json.dumps({'downloaded':len(rows),'sheets':list(range(start,end,60))}))
