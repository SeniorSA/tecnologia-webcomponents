import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'tec-card-message',
  styleUrl: 'card-message.scss',
  shadow: true,
})
export class CardMessage {
  /**
   * Message passed to show in the card
   */
  @Prop() message: string;

  /**
   * Options to custom the css
   */
  @Prop() options: string;

  private getStyle(): any {
    console.log(this.options);
    return (this.options) ? this.options : {};
  }

  render() {
    return (
      <Host>
        <div class="card-message" style={this.getStyle()}>
          <div class="card-icon">
            <slot></slot>
          </div>
          <div>{this.message}</div>
        </div>
      </Host>
    )
  }
}
