import { Component, Prop, State, Watch } from '@stencil/core';
import { Page } from '../../definitions';
import apiReferenceTemplate from './templates/api-reference';
import defaultTemplate from './templates/default';
import apiTemplate from './templates/api';
import errorTemplate from './templates/error';

@Component({
  tag: 'docs-page',
  styleUrl: 'page.css'
})
export class DocsPage {
  @Prop() path: string;
  @Prop({ context: 'document' }) private document: HTMLDocument;
  @State() badFetch: Response = null;
  @State() page: Page = { title: null, body: null };

  componentWillLoad() {
    return this.fetchPage(this.path);
  }

  @Watch('path')
  fetchPage(path, oldPath?) {
    if (path == null || path === oldPath) return;

    const promises = [this.fetchPageData(path)];
    if(path.indexOf('/api/') > -1) {
      promises.push(this.fetchUsage(path));
    }

    return Promise.all(promises)
      .then(this.handleNewPage)
      .catch(this.handleBadFetch);
  }

  fetchPageData = (path) => {
    return fetch(path).then((response) => {
      if (!response.ok) throw response;
      return response.json();
    });
  }

  fetchUsage = (path) => {
    const usagePath = path.replace(/pages\/api/, 'usage');
    return fetch(usagePath)
      .then((response) => {
        return response.ok ? response.json() : []
      })
      .catch(() => []);
  }

  handleNewPage = ([pageData, usageData]) => {
    pageData.usage = usageData;
    this.badFetch = null;
    this.page = pageData;
  }

  handleBadFetch = (error: Response) => {
    this.badFetch = error;
    this.page = {
      title: error.statusText,
      body: null
    };
  }

  @Watch('page')
  setDocumentTitle(page: Page) {
    const { title, meta = {} } = page;
    const pageTitle = meta.title || `${title} - Documentation`;
    this.document.title = pageTitle;
  }

  hostData() {
    return {
      class: {
        [this.page.pageClass]: typeof this.page.pageClass === 'string'
      }
    };
  }

  render() {
    const { page } = this;
    if (this.badFetch) {
      return errorTemplate(this.badFetch);
    }

    return (
      <stencil-route-switch>
        <stencil-route url="/docs/api" routeRender={apiReferenceTemplate} componentProps={{ page }} exact={ true} />
        <stencil-route url="/docs/api/(.+)" routeRender={apiTemplate} componentProps={{ page }}/>
        <stencil-route url="/docs" routeRender={defaultTemplate} componentProps={{ page }}/>
      </stencil-route-switch>
    );
  }
}
