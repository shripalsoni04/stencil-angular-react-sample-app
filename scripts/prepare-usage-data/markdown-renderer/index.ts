import marked from 'marked';
import code from './code';
import link from './link';

const renderer = new marked.Renderer();
renderer.code = code;
renderer.link = link;

export default (markdown: string, baseUrl?: string) => marked(markdown, { baseUrl, renderer });
