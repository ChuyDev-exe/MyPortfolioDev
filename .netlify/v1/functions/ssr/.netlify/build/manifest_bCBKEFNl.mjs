import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_D19AQUrQ.mjs';
import 'clsx';
import 'cookie';
import './chunks/shared_B6bdXPNh.mjs';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/chuy/Desktop/MyPortfolioDev/","cacheDir":"file:///Users/chuy/Desktop/MyPortfolioDev/node_modules/.astro/","outDir":"file:///Users/chuy/Desktop/MyPortfolioDev/dist/","srcDir":"file:///Users/chuy/Desktop/MyPortfolioDev/src/","publicDir":"file:///Users/chuy/Desktop/MyPortfolioDev/public/","buildClientDir":"file:///Users/chuy/Desktop/MyPortfolioDev/dist/","buildServerDir":"file:///Users/chuy/Desktop/MyPortfolioDev/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"Blog/Posts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog/posts","isIndex":false,"type":"page","pattern":"^\\/Blog\\/Posts\\/?$","segments":[[{"content":"Blog","dynamic":false,"spread":false}],[{"content":"Posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Blog/Posts.astro","pathname":"/Blog/Posts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"DevBlog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/devblog","isIndex":false,"type":"page","pattern":"^\\/DevBlog\\/?$","segments":[[{"content":"DevBlog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/DevBlog.astro","pathname":"/DevBlog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.lNr2haUB.css"},{"type":"external","src":"/_astro/Posts.BAgW1LWo.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/chuy/Desktop/MyPortfolioDev/src/pages/Blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/Blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/chuy/Desktop/MyPortfolioDev/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/chuy/Desktop/MyPortfolioDev/src/pages/Blog/Posts.astro",{"propagation":"none","containsHead":true}],["/Users/chuy/Desktop/MyPortfolioDev/src/pages/DevBlog.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/Blog/Posts@_@astro":"pages/blog/posts.astro.mjs","\u0000@astro-page:src/pages/Blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/DevBlog@_@astro":"pages/devblog.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_bCBKEFNl.mjs","/Users/chuy/Desktop/MyPortfolioDev/node_modules/astro/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/chuy/Desktop/MyPortfolioDev/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DIjTcjeu.mjs","/Users/chuy/Desktop/MyPortfolioDev/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/chuy/Desktop/MyPortfolioDev/.astro/content-modules.mjs":"chunks/content-modules_DydnCVzB.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Bu-ifteE.mjs","/Users/chuy/Desktop/MyPortfolioDev/src/content/posts/post-01.mdx?astroPropagatedAssets":"chunks/post-01_Ck1vy0-E.mjs","/Users/chuy/Desktop/MyPortfolioDev/src/content/posts/post-03.mdx?astroPropagatedAssets":"chunks/post-03_BeLLn7Lg.mjs","/Users/chuy/Desktop/MyPortfolioDev/src/content/posts/post-02.mdx?astroPropagatedAssets":"chunks/post-02_BXzgARLQ.mjs","/Users/chuy/Desktop/MyPortfolioDev/src/content/posts/post-01.mdx":"chunks/post-01_ozTmPSvh.mjs","/Users/chuy/Desktop/MyPortfolioDev/src/content/posts/post-03.mdx":"chunks/post-03_Be9QITvI.mjs","/Users/chuy/Desktop/MyPortfolioDev/src/content/posts/post-02.mdx":"chunks/post-02_D1SOJnq6.mjs","/Users/chuy/Desktop/MyPortfolioDev/src/components/Items/Skill":"_astro/Skill.CBDtovaw.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","/Users/chuy/Desktop/MyPortfolioDev/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CRJxZ9yk.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/chuy/Desktop/MyPortfolioDev/src/pages/index.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"scroll\",()=>{const e=document.getElementById(\"navbar\");e&&(window.scrollY>90?e.classList.add(\"border\",\"rounded-full\",\"border-white\",\"mt-10\",\"sticky\",\"top-10\",\"py-2\",\"px-10\",\"backdrop-blur-sm\",\"w-auto\"):e.classList.remove(\"border\",\"backdrop-blur-sm\",\"rounded-full\",\"border-white\",\"sticky\",\"top-10\",\"py-2\",\"px-10\",\"w-auto\"))});"]],"assets":["/_astro/onest-cyrillic-wght-normal.DXI_y_WF.woff2","/_astro/onest-latin-ext-wght-normal.CnNj8hVb.woff2","/_astro/onest-latin-wght-normal.CUIqqgP9.woff2","/_astro/Posts.BAgW1LWo.css","/_astro/index.lNr2haUB.css","/Logo.ico","/favicon.svg","/_astro/Skill.CBDtovaw.js","/_astro/client.BPIbHqJh.js","/_astro/index.BVOCwoKb.js","/Blog/Posts/index.html","/DevBlog/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"SfbHZqD+DNycyPX04xR8idwzubIKT8np2tq9BIMIZy0=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/chuy/Desktop/MyPortfolioDev/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
