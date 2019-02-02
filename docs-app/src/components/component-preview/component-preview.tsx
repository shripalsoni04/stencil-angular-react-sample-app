import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'docs-component-preview',
  styleUrl: './component-preview.css',
  shadow: true
})
export class ComponentPreview {
  @Prop() componentHTML: string;

  render() {
    return (
      <div innerHTML={this.componentHTML}></div>
    )
  }
}
