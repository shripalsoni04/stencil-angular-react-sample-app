import { Component } from '@stencil/core';
import componentsTemplate from './templates/components';
import guidesTemplate from './templates/guides';

@Component({
  tag: 'docs-menu',
  styleUrl: 'menu.css'
})
export class DocsMenu {
  render() {
    return [
      <header>
        <stencil-route-link url="/docs/">
          <docs-header-logo />
        </stencil-route-link>
      </header>,
      <stencil-route-switch>
        <stencil-route url="/docs/(components|api)" routeRender={componentsTemplate}/>
        <stencil-route routeRender={guidesTemplate}/>
      </stencil-route-switch>
    ];
  }
}
