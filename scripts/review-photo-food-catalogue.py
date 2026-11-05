import json,sys,math
from pathlib import Path
from PIL import Image,ImageOps,ImageDraw,ImageFont
app=Path(__file__).resolve().parents[1]; work=app.parent/'photo-food-expansion'
rows=json.loads((work/'downloaded.json').read_text(encoding='utf-8'))
start=int(sys.argv[1]) if len(sys.argv)>1 else 0
end=min(len(rows),int(sys.argv[2]) if len(sys.argv)>2 else len(rows))
out=work/'review';out.mkdir(exist_ok=True)
font=ImageFont.truetype('C:/Windows/Fonts/msyh.ttc',16);small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',12)
for base in range(start,end,60):
 sheet=Image.new('RGB',(1500,2000),'white');d=ImageDraw.Draw(sheet)
 for n,row in enumerate(rows[base:min(base+60,end)]):
  x=n%6*250;y=n//6*200
  path=app/row['localExisting'].lstrip('/') if row.get('localExisting') else work/'downloads'/row['filename']
  try:
   im=ImageOps.exif_transpose(Image.open(path)).convert('RGB');im.thumbnail((244,148));sheet.paste(im,(x+(244-im.width)//2,y))
  except Exception as e:d.text((x,y+40),'BAD IMAGE',fill='red',font=font)
  d.text((x+3,y+150),f"{base+n:04d} {row['name'][:13]}",font=font,fill='black')
  d.text((x+3,y+174),row['title'].removeprefix('File:')[:34],font=small,fill='black')
 sheet.save(out/f'sheet-{base:04d}.jpg',quality=92)
print(json.dumps({'rows':len(rows),'sheets':list(range(start,end,60))}))
