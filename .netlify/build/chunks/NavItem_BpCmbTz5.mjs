import { c as createComponent, a as createAstro, m as maybeRenderHead, h as addAttribute, b as renderTemplate } from './astro/server_D19AQUrQ.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro();
const $$NavItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NavItem;
  const { href, title, body } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="flex h-auto text-white hover:text-[#51E4B8] text-md  cursor-pointer font-light"${addAttribute(href, "href")}> ${title} </a>`;
}, "/Users/chuy/Desktop/MyPortfolioDev/src/components/NavItem.astro", void 0);

export { $$NavItem as $ };
