(async () => {
  const { get } = await import("node:https");

  get("https://www.dmctech.in/", (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      const cssMatches = data.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
      const linkMatches = data.match(/<link[^>]*rel="stylesheet"[^>]*>/gi);
      console.log("CSS blocks:", cssMatches ? cssMatches.length : 0);
      console.log("CSS links:", linkMatches ? linkMatches.length : 0);
      if (linkMatches) {
        linkMatches.forEach((link) => console.log(link));
      }
    });
  });
})();
