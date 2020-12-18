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

  render() {
    return (
      <Host>
        <div class="container">
          {this.allGrades.map(grade => (<div class={`grade ${this.getContainerClass(grade)}`}></div>))}
          <div class="icon">
            <i class={`${this.iconPrefix} fa-smile`}></i>
          </div>
        </div>
      </Host>
    );
  }

}
