>**Send your questions here: https://github.com/SeniorSA/tecnologia-webcomponents/discussions/categories/contributing**

# Creating component with icons

If you want to create a component with icons, by default, we are using Font Awesome. Follow the usage example:

```
export class MyComponent {
  @Prop() icon: string;

  render() {
    return (
        <i class={this.icon}></i>
    );
  }
}
```

And will be necessary to import font awesome in CSS file:

```
@import '../../assets/fontawesome/css/all.min.css';
```

Using the component:

```
<my-component icon="fa fa-car"></my-component>
```

