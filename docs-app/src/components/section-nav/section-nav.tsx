import { Component } from '@stencil/core';

@Component({
  tag: 'docs-section-nav',
  styleUrl: 'section-nav.css'
})
export class DocsSectionNav {
  render() {
    return (
      <stencil-route url="/docs/" routeRender={mainLinks}/>
    );
  }
}

const mainLinks = () => (
  <nav class="SectionNav">
    <stencil-route-link url="/docs/" urlMatch={[/^\/docs\/(?!(api|components)).*$/]}>Guide</stencil-route-link>
    <stencil-route-link url="/docs/api" urlMatch={['/docs/api', '/docs/components']}>Components</stencil-route-link>
  </nav>
);
