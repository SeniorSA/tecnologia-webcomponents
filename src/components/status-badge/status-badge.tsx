import { Component, Host, h, Prop } from '@stencil/core';
import { TecStatus } from '../../models/status.model';

@Component({
  tag: 'tec-status-badge',
  styleUrl: 'status-badge.scss',
  shadow: true,
})
export class StatusBadge {
  /**
   * Text to show inside badge
   */
  @Prop({ mutable: true })
  badgeText: string;

  /**
   * The status of badge (color)
   */
  @Prop({ mutable: true })
  status: TecStatus = TecStatus.primary;

  render() {
    return (
      <Host>
        <div class="badge text-sans">
          <span class={`badge-value ${this.status}`}>{this.badgeText}</span>
        </div>
      </Host>
    );
  }
}
