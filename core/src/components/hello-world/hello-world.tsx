import { Component, Prop } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'sh-hello-world',
  styleUrl: 'hello-world.css',
  shadow: true
})
export class HelloWorldComponent {
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop() middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  /**
   * The last name
   */
  @Prop() lastName: string;

  getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div>Hello, World! I'm {this.getText()}</div>;
  }
}
