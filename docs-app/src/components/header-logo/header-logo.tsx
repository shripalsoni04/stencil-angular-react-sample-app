import { Component } from '@stencil/core';

@Component({
  tag: 'docs-header-logo',
  styleUrl: 'header-logo.css'
})
export class HeaderLogo {
  render() {
    return (
      <div class="header-logo-container">
        <img class="header-logo" src="/docs/assets/images/logo.png" />
        <span class="brand-name" >UI Docs</span>
      </div>
    );
  }
}
