"""Publish only explicitly reviewed indices, with attribution and duplicate rejection."""
import json, hashlib
from pathlib import Path
from PIL import Image, ImageOps
app=Path(__file__).resolve().parents[1];work=app.parent/'photo-expansion'
decisions=json.loads((work/'review-decisions.json').read_text(encoding='utf-8'))
def expand(text):
 result=set()
 for part in text.split(','):
  if not part.strip():continue
  bounds=list(map(int,part.strip().split('-')))
  result.update(range(bounds[0],bounds[-1]+1))
 return result
base_urls={x['sourceUrl'].replace('_',' ') for x in json.loads((app/'src/data/foodPhotoSources.json').read_text(encoding='utf-8'))}
manifest=[];rejected=[];hashes=set();phashes=[]
out=app/'assets'/'food-gallery';out.mkdir(parents=True,exist_ok=True)
fix={'Egg dishes':'11','Boiled eggs':'11','Chicken dishes':'09','Chicken as food':'09','Chocolate':'14','Cookies':'14','Cakes':'14','Ice cream':'10','Peanuts':'07'}
for source,dirname in [('search','downloads'),('category','category-downloads')]:
 rows=json.loads((work/('downloaded.json' if source=='search' else 'category-downloaded.json')).read_text(encoding='utf-8'))
 for index in sorted(expand(decisions[source]['accepted'])):
  row=rows[index];path=work/dirname/row['filename']
  if row['sourceUrl'].replace('_',' ') in base_urls:
   rejected.append({'source':source,'index':index,'title':row['title'],'reason':'already present in original photo library'});continue
  try:
   im=ImageOps.exif_transpose(Image.open(path)).convert('RGB');im.thumbnail((640,640))
   if min(im.size)<120:raise ValueError('too small after resize')
   digest=hashlib.sha256(im.tobytes()).hexdigest()
   gray=im.convert('L').resize((9,8));px=list(gray.getdata());dh=sum((px[y*9+x]>px[y*9+x+1])<<(y*8+x) for y in range(8) for x in range(8))
   if digest in hashes or any((dh^h).bit_count()<=2 and row['subject']==sub for h,sub in phashes):
    rejected.append({'source':source,'index':index,'title':row['title'],'reason':'exact/near duplicate visual composition'});continue
   hashes.add(digest);phashes.append((dh,row['subject']))
   overrides=decisions[source].get('overrides',{});subject=overrides.get(str(index),row['subject'])
   name=row['filename'];im.save(out/name,'JPEG',quality=82,optimize=True)
   result={k:row[k] for k in ['title','author','sourceUrl','license','licenseUrl','retrievedAt','article'] if k in row}
   result.update(subject=subject,category=fix.get(row['article'],row['category']),image='/assets/food-gallery/'+name,imageNote='食材或相关菜式实拍参考；具体内容以原图标题为准，不用于识别野生食材可食性、样本营养或食堂在售情况',modifications='EXIF方向校正、等比缩小至最长边640像素并压缩JPEG；未生成或替换食物主体',reviewStatus='visual-reviewed',reviewBatch=source,reviewIndex=index,pixelSha256=digest,width=im.width,height=im.height)
   manifest.append(result)
  except Exception as e:rejected.append({'source':source,'index':index,'title':row['title'],'reason':str(e)})
unique={row['sourceUrl'].replace('_',' '):row for row in manifest};manifest=list(unique.values())
(app/'src/data/foodGallerySources.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
(app/'docs/food-data/photo-review-report.json').write_text(json.dumps({'reviewMethod':'Numbered contact-sheet visual review; explicit selected indices; SHA256 and conservative dHash duplicate removal','decisions':decisions,'published':len(manifest),'rejectedAfterSelection':rejected},ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'newPublished':len(manifest),'subjects':len(set(x['subject']for x in manifest)),'removedDuplicatesOrInvalid':len(rejected),'totalBytes':sum((out/x['image'].split('/')[-1]).stat().st_size for x in manifest)}))
