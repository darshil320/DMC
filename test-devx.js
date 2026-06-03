const https = require('https');
https.get('https://www.devxlabs.ai/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const cssMatches = data.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
    const linkMatches = data.match(/<link[^>]*rel="stylesheet"[^>]*>/gi);
    console.log("CSS blocks:", cssMatches ? cssMatches.length : 0);
    console.log("CSS links:", linkMatches ? linkMatches.length : 0);
    if(linkMatches) {
        linkMatches.forEach(l => console.log(l));
    }
  });
});
