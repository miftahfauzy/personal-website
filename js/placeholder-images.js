function generatePlaceholderImage(text, width, height, background) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);

    // Add some design elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(width * 0.8, height * 0.2, width * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(width * 0.2, height * 0.8, width * 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.font = `${width * 0.08}px Inter, system-ui`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Wrap text
    const words = text.split(' ');
    let line = '';
    let lines = [];
    let y = height / 2;
    
    for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width * 0.8) {
            lines.push(line);
            line = word + ' ';
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    // Draw text lines
    lines.forEach((line, i) => {
        const offset = (i - (lines.length - 1) / 2) * (width * 0.1);
        ctx.fillText(line.trim(), width / 2, y + offset);
    });

    return canvas.toDataURL('image/png');
}

// Generate blog post images
const blogImages = {
    'enterprise-arch': generatePlaceholderImage('Enterprise Architecture Future', 800, 400, '#2563eb'),
    'leadership': generatePlaceholderImage('Digital Leadership Transform', 800, 400, '#3b82f6'),
    'innovation': generatePlaceholderImage('Innovation Technology', 800, 400, '#60a5fa')
};

// Generate portfolio images
const portfolioImages = {
    'cloud': generatePlaceholderImage('Cloud Migration Enterprise', 800, 600, '#1e40af'),
    'mobile': generatePlaceholderImage('Mobile Banking Platform', 800, 600, '#1d4ed8'),
    'web': generatePlaceholderImage('Web Development Project', 800, 600, '#2563eb')
};

export { blogImages, portfolioImages };
