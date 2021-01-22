# Contribution guide

> If you ever questions, before send a pull requests, open a [topic on Discussions](https://github.com/SeniorSA/tecnologia-webcomponents/discussions/categories/contributing).

## Rename stylesheet files to SCSS

Stencil generate `.css` files for all components, rename this to use a SASS (`.scss`)

## Creating component with icons

If you want to create a component with icons, by default, we are using Font Awesome. Add a property to receive icon prefix following the below usage example:

```tsx
export class MyComponent {
  @Prop() icon: string;

  render() {
    return (
        <i class={this.icon}></i>
    );
  }
}
```

And will be necessary to import FontAwesome stylesheet in component SCSS file:

```css
@import '../../assets/fontawesome/css/all.min.css';
```

Using the component:

```html
<my-component icon="fa fa-car"></my-component>
```

