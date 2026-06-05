(async () => {
  const { default: puppeteer } = await import("puppeteer");
  const browser = await puppeteer.launch({headless: "new"});
  const page = await browser.newPage();
  await page.goto('https://www.dmctech.in/');
  
  // find the scrolling text "Contact us"
  const elements = await page.$$eval('*', els => els.filter(e => e.textContent.includes('Contact us')).map(e => ({
      tag: e.tagName,
      class: e.className,
      mixBlendMode: window.getComputedStyle(e).mixBlendMode,
      color: window.getComputedStyle(e).color,
      zIndex: window.getComputedStyle(e).zIndex,
      opacity: window.getComputedStyle(e).opacity
  })));
  
  // also find the image
  const img = await page.$$eval('img', imgs => imgs.filter(i => i.src.includes('Union')).map(i => ({
      mixBlendMode: window.getComputedStyle(i).mixBlendMode,
      zIndex: window.getComputedStyle(i).zIndex
  })));
  
  console.log(JSON.stringify({ elements: elements.slice(-5), img }, null, 2));
  await browser.close();
})();
