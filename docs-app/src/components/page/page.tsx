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
    return fetch(path)
      .then(this.validateFetch)
      .then(this.handleNewPage)
      .catch(this.handleBadFetch);
  }

  validateFetch = (response) => {
    if (!response.ok) throw response;
    return response.json();
  }

  handleNewPage = (page) => {
    this.badFetch = null;
    this.page = page;
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
