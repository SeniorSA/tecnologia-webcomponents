import { Component, h, Host, Prop } from '@stencil/core';
import { defaultTheme } from '../../defaultTheme';
import { TecnologiaTheme } from '../interfaces';
import { ButtonPosition } from './bottom-bar.model';

@Component({
  tag: 'tec-bottom-bar',
  styleUrl: 'bottom-bar.scss',
  shadow: true,
})
export class BottomBar {
  @Prop({ reflect: true }) theme: TecnologiaTheme = defaultTheme;

  @Prop() text: string;

  @Prop() buttonPosition: ButtonPosition = ButtonPosition.left;

  @Prop({ mutable: false, reflect: false })
  useAnimation = true;

  private handleButtonPositionStyle(position: ButtonPosition) {
    const isLeft = position === ButtonPosition.left;
    return {
      flexDirection: isLeft ? 'row-reverse' : 'row',
    };
  }

  render() {
    return (
      <Host>
        <div class={`container ${this.useAnimation && 'use-animation'}`}>
          <div
            style={this.handleButtonPositionStyle(this.buttonPosition)}
            class={`wrapper ${!this.text && 'flex-align-center'}`}
          >
            {this.text && (
              <div
                class="text"
                style={{
                  margin:
                    this.buttonPosition === ButtonPosition.left
                      ? '0 0 0 20px'
                      : '0 20px 0 0',
                }}
              >
                <span class="text-sans text-base">{this.text}</span>
              </div>
            )}

            <div class="button">
              <slot name="button"></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
