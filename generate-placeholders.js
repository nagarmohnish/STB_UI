const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'assets', 'images');

function makeSVG(w, h, text, bgColor = '#1a1d24', textColor = '#00bcd4', fontSize = 14) {
    const lines = text.split('\\n');
    const lh = fontSize * 1.5;
    const startY = h / 2 - ((lines.length - 1) * lh) / 2;
    const els = lines.map((l, i) =>
        `<text fill="${textColor}" font-family="Arial,sans-serif" font-size="${fontSize}" font-weight="600" text-anchor="middle" x="${w/2}" y="${startY + i * lh}" dy=".35em">${l}</text>`
    ).join('\n  ');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect fill="${bgColor}" width="${w}" height="${h}"/>
  ${els}
</svg>`;
}

const images = [
    // Shared
    { name: 'logo.svg', w: 120, h: 60, text: 'SHARK TANK\\nBLOG', bg: '#1a1d24', fs: 12 },
    { name: 'footer-logo.svg', w: 100, h: 80, text: 'STB', bg: '#1a1d24', fs: 22 },
    { name: 'hero-bg.svg', w: 1200, h: 400, text: '', bg: '#0a2a4a', fs: 1 },
    { name: 'hero-cast.svg', w: 560, h: 300, text: 'SHARK TANK\\nCAST', bg: '#0a2a3d', fs: 28 },

    // Homepage episodes
    { name: 'episode-s17e14.svg', w: 530, h: 340, text: 'Season 17\\nEpisode 14', bg: '#1a237e', fs: 22 },
    { name: 'episode-s17e13.svg', w: 530, h: 260, text: 'Season 17\\nEpisode 13', bg: '#283593', fs: 18 },
    { name: 'episode-s17e12.svg', w: 530, h: 260, text: 'Season 17\\nEpisode 12', bg: '#303f9f', fs: 18 },

    // Homepage products
    { name: 'product-chompshop.svg', w: 260, h: 200, text: 'ChompShop', bg: '#1b5e20', fs: 14 },
    { name: 'product-ring.svg', w: 260, h: 200, text: 'Ring', bg: '#4e342e', fs: 14 },
    { name: 'product-sheets.svg', w: 260, h: 200, text: 'Sheets\\nLaundry', bg: '#4a148c', fs: 14 },

    // Homepage videos
    { name: 'video-1.svg', w: 530, h: 300, text: 'Shark Tank\\nShopping List', bg: '#2c1810', fs: 20 },
    { name: 'video-2.svg', w: 530, h: 300, text: 'Daymond John\\nFunny Moments', bg: '#1a1a2e', fs: 20 },

    // Homepage companies
    { name: 'company-nhie.svg', w: 250, h: 170, text: 'Never Have\\nI Ever', bg: '#c62828', fs: 14 },
    { name: 'company-gob.svg', w: 250, h: 170, text: 'GOB', bg: '#ad1457', fs: 14 },
    { name: 'company-remplenish.svg', w: 250, h: 170, text: 'REMplenish', bg: '#4527a0', fs: 14 },
    { name: 'company-beergirl.svg', w: 250, h: 170, text: 'Beer Girl', bg: '#e65100', fs: 14 },

    // Homepage blogs
    { name: 'blog-1.svg', w: 260, h: 180, text: 'ChompShop\\nBlog', bg: '#1b5e20', fs: 16 },
    { name: 'blog-2.svg', w: 260, h: 180, text: 'Shark Tank\\nStatistics', bg: '#0d47a1', fs: 16 },
    { name: 'blog-3.svg', w: 260, h: 180, text: 'Whiskey\\nEmpire', bg: '#3e2723', fs: 16 },

    // Episodes page - season thumbnails
    { name: 'season-1.svg', w: 280, h: 210, text: 'Season 1', bg: '#1a237e', fs: 18 },
    { name: 'season-2.svg', w: 280, h: 210, text: 'Season 2', bg: '#283593', fs: 18 },
    { name: 'season-3.svg', w: 280, h: 210, text: 'Season 3', bg: '#303f9f', fs: 18 },
    { name: 'season-4.svg', w: 280, h: 210, text: 'Season 4', bg: '#3949ab', fs: 18 },
    { name: 'season-5.svg', w: 280, h: 210, text: 'Season 5', bg: '#1a237e', fs: 18 },
    { name: 'season-6.svg', w: 280, h: 210, text: 'Season 6', bg: '#283593', fs: 18 },
    { name: 'season-7.svg', w: 280, h: 210, text: 'Season 7', bg: '#303f9f', fs: 18 },
    { name: 'season-8.svg', w: 280, h: 210, text: 'Season 8', bg: '#3949ab', fs: 18 },
    { name: 'season-9.svg', w: 280, h: 210, text: 'Season 9', bg: '#1a237e', fs: 18 },
    { name: 'season-10.svg', w: 280, h: 210, text: 'Season 10', bg: '#283593', fs: 18 },
    { name: 'season-11.svg', w: 280, h: 210, text: 'Season 11', bg: '#303f9f', fs: 18 },
    { name: 'season-12.svg', w: 280, h: 210, text: 'Season 12', bg: '#3949ab', fs: 18 },
    { name: 'season-13.svg', w: 280, h: 210, text: 'Season 13', bg: '#1a237e', fs: 18 },
    { name: 'season-14.svg', w: 280, h: 210, text: 'Season 14', bg: '#283593', fs: 18 },
    { name: 'season-15.svg', w: 280, h: 210, text: 'Season 15', bg: '#303f9f', fs: 18 },
    { name: 'season-16.svg', w: 280, h: 210, text: 'Season 16', bg: '#3949ab', fs: 18 },
    { name: 'season-17.svg', w: 280, h: 210, text: 'Season 17', bg: '#1a237e', fs: 18 },
    { name: 'beyond-the-tank.svg', w: 280, h: 210, text: 'Beyond\\nthe Tank', bg: '#0d47a1', fs: 18 },

    // Blog page - individual blog post images
    { name: 'blog-whiskey-empire.svg', w: 400, h: 250, text: 'Whiskey\\nEmpire', bg: '#3e2723', fs: 18 },
    { name: 'blog-herjavec-millionaires.svg', w: 400, h: 250, text: 'Robert\\nHerjavec', bg: '#1565c0', fs: 18 },
    { name: 'blog-corcoran-passive.svg', w: 400, h: 250, text: 'Barbara\\nCorcoran', bg: '#6a1b9a', fs: 18 },
    { name: 'blog-ring-exit.svg', w: 400, h: 250, text: 'Ring\\n$1B Exit', bg: '#4e342e', fs: 18 },
    { name: 'blog-oleary-ai.svg', w: 400, h: 250, text: 'O\'Leary\\nAI Economy', bg: '#0d47a1', fs: 18 },
    { name: 'blog-cuban-berkshire.svg', w: 400, h: 250, text: 'Cuban vs\\nBerkshire', bg: '#1b5e20', fs: 18 },
    { name: 'blog-cuban-costplus.svg', w: 400, h: 250, text: 'Cost Plus\\nHealthcare', bg: '#e65100', fs: 18 },
    { name: 'blog-corcoran-housing.svg', w: 400, h: 250, text: 'Housing\\nForecast', bg: '#ad1457', fs: 18 },
    { name: 'blog-cuban-insurance.svg', w: 400, h: 250, text: 'Insurance\\nValue', bg: '#283593', fs: 18 },
    { name: 'blog-oleary-couples.svg', w: 400, h: 250, text: 'Financial\\nCouples', bg: '#4527a0', fs: 18 },
    { name: 'blog-cuban-wealth.svg', w: 400, h: 250, text: 'Path to\\nWealth', bg: '#1a237e', fs: 18 },
    { name: 'blog-sheets-laundry.svg', w: 400, h: 250, text: 'Sheets\\nLaundry', bg: '#00695c', fs: 18 },

    // Startup list page - listing images
    { name: 'listing-nhie.svg', w: 250, h: 170, text: 'Never Have\\nI Ever', bg: '#c62828', fs: 14 },
    { name: 'listing-gob.svg', w: 250, h: 170, text: 'GOB', bg: '#ad1457', fs: 14 },
    { name: 'listing-remplenish.svg', w: 250, h: 170, text: 'REMplenish', bg: '#4527a0', fs: 14 },
    { name: 'listing-beergirl.svg', w: 250, h: 170, text: 'Beer Girl', bg: '#e65100', fs: 14 },
    { name: 'listing-riptiehair.svg', w: 250, h: 170, text: 'Rip Tie Hair', bg: '#00695c', fs: 14 },
    { name: 'listing-screenskinz.svg', w: 250, h: 170, text: 'Screen Skinz', bg: '#1565c0', fs: 14 },
    { name: 'listing-leftfield.svg', w: 250, h: 170, text: 'Left Field', bg: '#6a1b9a', fs: 14 },
    { name: 'listing-crowdcompass.svg', w: 250, h: 170, text: 'Crowd\\nCompass', bg: '#283593', fs: 14 },

    // Sidebar thumbnails (kept for compatibility)
    { name: 'thumb-1.svg', w: 100, h: 70, text: 'T1', bg: '#1b5e20', fs: 12 },
    { name: 'thumb-2.svg', w: 100, h: 70, text: 'T2', bg: '#1a237e', fs: 12 },
    { name: 'thumb-3.svg', w: 100, h: 70, text: 'T3', bg: '#283593', fs: 12 },
    { name: 'thumb-4.svg', w: 100, h: 70, text: 'T4', bg: '#303f9f', fs: 12 },
    { name: 'thumb-5.svg', w: 100, h: 70, text: 'T5', bg: '#0277bd', fs: 12 },
];

images.forEach(({ name, w, h, text, bg, fs: fontSize }) => {
    fs.writeFileSync(path.join(dir, name), makeSVG(w, h, text, bg, '#00bcd4', fontSize || 14));
});

console.log(`Generated ${images.length} SVG placeholders.`);
