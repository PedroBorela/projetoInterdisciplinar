import fs from 'fs';
import path from 'path';

const dir = 'src/pages';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
for (const f of files) {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  
  content = content.replace(/fontVariationSettings: ''FILL' 1'/g, 'fontVariationSettings: "\'FILL\' 1"');
  
  fs.writeFileSync(filePath, content);
}
