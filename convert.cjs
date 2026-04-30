const fs = require('fs');
const path = require('path');

const screens = [
    { in: '1_Login.html', out: 'Login' },
    { in: '2_Cadastro.html', out: 'Cadastro' },
    { in: '3_Dashboard.html', out: 'Dashboard' },
    { in: '4_Transacoes.html', out: 'Transacoes' },
    { in: '5_Nova_Transacao.html', out: 'NovaTransacao' },
    { in: '6_Categorias.html', out: 'Categorias' },
    { in: '7_Calendario.html', out: 'Calendario' }
];

const inDir = path.join(__dirname, 'stitch_screens');
const outDir = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

for (const screen of screens) {
    const filePath = path.join(inDir, screen.in);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract body
    const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (!bodyMatch) continue;
    let body = bodyMatch[1];

    // Simple React conversions
    body = body.replace(/class=/g, 'className=');
    body = body.replace(/for=/g, 'htmlFor=');
    body = body.replace(/tabindex=/g, 'tabIndex=');
    body = body.replace(/stroke-width=/g, 'strokeWidth=');
    body = body.replace(/stroke-linecap=/g, 'strokeLinecap=');
    body = body.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
    body = body.replace(/fill-rule=/g, 'fillRule=');
    body = body.replace(/clip-rule=/g, 'clipRule=');
    body = body.replace(/viewbox=/g, 'viewBox=');
    body = body.replace(/stroke-dasharray=/g, 'strokeDasharray=');

    // Self closing tags
    const selfClosing = ['input', 'img', 'hr', 'br'];
    for (const tag of selfClosing) {
        const regex = new RegExp(`<${tag}([^>]*?)>`, 'g');
        body = body.replace(regex, (match, p1) => {
            if (p1.trim().endsWith('/')) return match;
            return `<${tag}${p1} />`;
        });
    }

    // Remove comments
    body = body.replace(/<!--[\s\S]*?-->/g, '');

    // Note: Inline styles like style="width: 50%" are not easily converted by regex. 
    // We will do a simple regex for style="..."
    body = body.replace(/style="([^"]*)"/g, (match, css) => {
        const props = css.split(';').filter(Boolean).map(p => {
            const [key, value] = p.split(':').map(s => s.trim());
            // Camel case
            const camelKey = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
            return `${camelKey}: '${value}'`;
        });
        return `style={{ ${props.join(', ')} }}`;
    });

    const componentCode = `import React from 'react';\nimport { Link } from 'react-router-dom';\n\nexport function ${screen.out}() {\n  return (\n    <>\n${body}\n    </>\n  );\n}\n`;

    // Optionally handle any <a> href="#" replacing them with Links?
    // body = body.replace(/<a([^>]*)href="#"([^>]*)>/g, '<Link$1to="/"$2>');
    
    fs.writeFileSync(path.join(outDir, `${screen.out}.tsx`), componentCode);
    console.log(`Converted ${screen.in} -> ${screen.out}.tsx`);
}
