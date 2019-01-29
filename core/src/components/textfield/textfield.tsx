import { Component, Prop, EventEmitter, Event, Element } from "@stencil/core";
import { InputConfig } from "./interfaces";

@Component({
  tag: "sh-textfield",
  styleUrl: "./textfield.scss",
  shadow: true
})
export class TextFieldComponent {
  @Element()
  hostEle: HTMLElement;
  /**
   * Input type
  */
  @Prop()
  type: string = "text";

  /**
   * Label of the textfield.
   * If not supplied then it will not render any label
   */
  @Prop()
  label: string;

  /**
   * Textfield placeholder
   */
  @Prop()
  placeholder: string;

  @Prop()
  config: InputConfig;

  @Prop()
  testArray: any[];

  @Prop()
  isRequired: boolean = false;

  @Prop()
  maxlength: number;

  @Prop()
  value: string;

  @Event()
  change: EventEmitter;

  handleInputChange(e) {
    this.change.emit(e.target.value);
  }

  render() {
    console.log("type", this.type);
    console.log("label", this.label);
    console.log("placeholder", this.placeholder);
    console.log("config", this.config);
    console.log("testArray", this.testArray);
    console.log("isRequired", this.isRequired);
    console.log("maxlength", this.maxlength);
    console.log("value", this.value);
    return (
      <div class="form-group">
        {this.label && <label>{this.label}</label>}
        <input
          type={this.type}
          placeholder={this.placeholder}
          required={this.isRequired}
          maxlength={this.maxlength || 100}
          value={this.value}
          onInput={this.handleInputChange.bind(this)}
        />
      </div>
    );
  }
}
