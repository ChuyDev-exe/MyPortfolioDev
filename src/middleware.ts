import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const host = context.request.headers.get('host') || '';
  const subdomain = host.split('.')[0]; // asume subdominio.tusitio.com

  context.locals.subdomain = subdomain;
  return next();
};
