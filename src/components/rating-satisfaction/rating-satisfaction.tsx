import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'rating-satisfaction',
  styleUrl: 'rating-satisfaction.scss',
  shadow: true,
})
export class RatingSatisfaction {

  @Prop({ attribute: 'rate', mutable: true })
  rate: number;

  @Prop({ attribute: 'icon-prefix', mutable: true })
  iconPrefix = 'fas';

  allGrades = [1, 2, 3, 4, 5]

  getContainerClass(grade: number) {
    if (grade <= this.rate) {
      return this.getClassByGrade(grade)
    }
    return ''
  }

  getClassByGrade(grade: number) {
    switch (grade) {
      case 0:
      case 1:
        return 'one'
      case 2:
        return 'two'
      case 3:
        return 'three'
      case 4:
        return 'four'
      case 5:
        return 'five'
    }
  }

  getRatingIcon(): string {
    const rate = Math.round(this.rate)
    switch (rate) {
      case 0:
      case 1:
        return 'fa-frown-open';
      case 2:
        return 'fa-frown';
      case 3:
        return 'fa-meh';
      case 4:
        return 'fa-smile';
      case 5:
        return 'fa-laugh-beam';
    }
  }

  render() {
    return (
      <Host>
        <div class="container">
          {this.allGrades.map(grade => (<div class={`grade ${this.getContainerClass(grade)}`}></div>))}
          <div class="icon">
            <i class={`${this.iconPrefix} ${this.getRatingIcon()}`}></i>
            <div class="icon-background"></div>
          </div>
        </div>
      </Host>
    );
  }

}
