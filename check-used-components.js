const fs = require('fs');
const path = require('path');
const glob = require('glob');

const COMPONENT_DIR = path.resolve(__dirname, 'src/components/ui');
const PROJECT_ROOT = path.resolve(__dirname, 'src');

const componentFiles = fs.readdirSync(COMPONENT_DIR).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

const findUsages = (componentFile) => {
  const name = path.basename(componentFile, path.extname(componentFile));
  const searchPattern = `**/*.{ts,tsx}`;
  const regex = new RegExp(`['"]@?/?.*components/ui/${name}['"]`, 'i');

  const files = glob.sync(searchPattern, {
    cwd: PROJECT_ROOT,
    absolute: true,
    ignore: [`components/ui/${name}.*`] // ignore the component file itself
  });

  const usedIn = files.filter(file => {
    const content = fs.readFileSync(file, 'utf8');
    return regex.test(content);
  });

  return usedIn.length > 0;
};

console.log('\n🔎 Component Usage Report:\n');

componentFiles.forEach(file => {
  const used = findUsages(file);
  const status = used ? ' USED' : ' UNUSED';
  console.log(`${status} — ${file}`);
});
