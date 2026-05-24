import urllib.request
import re
import os

html_path = r'c:\VS_StudioLocal\Abtec\abtec.html'
img_dir = r'c:\VS_StudioLocal\Abtec\apps\web\public\images'
os.makedirs(img_dir, exist_ok=True)

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

urls = re.findall(r'src=\"(https://www\.abtec\.com\.mx/[^\"]+)\"', content)
urls_bg = re.findall(r'url\([\'\"]?(https://www\.abtec\.com\.mx/[^\'\")]+)[\'\"]?\)', content)
urls.extend(urls_bg)
urls = list(set(urls))

for url in urls:
    # Get base url without query params
    base_url = url.split('?')[0]
    filename = base_url.split('/')[-1]
    # Decode URL encoded filename
    import urllib.parse
    filename = urllib.parse.unquote(filename)
    
    save_path = os.path.join(img_dir, filename)
    if not os.path.exists(save_path) and not filename.endswith('.js') and not filename.endswith('.css'):
        try:
            print(f'Downloading {filename}...')
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(save_path, 'wb') as out_file:
                out_file.write(response.read())
        except Exception as e:
            print(f'Failed {filename}: {e}')
print('Done!')
