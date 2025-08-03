import { css, html, LitElement } from "lit"
import { customElement } from "lit/decorators.js"

@customElement("p-select")
class Select extends LitElement {
  constructor() {
    super()
    this.options = []
    this.displayKey = "display"
    this.selectedIndex = null
    this.isOpen = false
    this.value = null
  }

  static properties = {
    options: { type: Array },
    displayKey: { type: String },
    selectedIndex: { type: Number },
    value: { type: String },
    isOpen: { type: Boolean, state: true },
  }

  private _toggle(e) {
    this.isOpen = !this.isOpen
  }

  private _close(e) {
    this.isOpen = false
  }

  private select(e: MouseEvent) {
    e.stopPropagation()

    const target = e.currentTarget as HTMLDivElement
    const indexValue = target.getAttribute("data-index")
    if (!indexValue) {
      this._close(e)
      return
    }
    const index = parseInt(indexValue, 10)
    this.selectedIndex = index

    this._close(e)
  }

  static styles = css`
    .select {
      position: relative;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: 1.5rem;
      background-color: white;
      padding: 0.25rem;
      cursor: pointer;
    }
    .options {
      display: none;
      position: absolute;
      top: 100%;
      box-sizing: border-box;
      left: 0;
      right: 0;
    }

    .options.open {
      display: flex;
      flex-direction: column;
    }

    .option {
      box-sizing: border-box;
      width: 100%;
      background: white;
      padding: 0.75rem;
      cursor: pointer;
    }

    .option:hover {
      background: lightblue;
    }

    .selected {
      flex: 1;
    }

    .icon-button {
      background: none;
      border: none;
    }
  `

  render() {
    const selectedValue = this.selectedIndex ? this.options[this.selectedIndex] : null

    return html`<div data-test-id="select" class="select" @click="${this._toggle}">
      <div class="selected">${selectedValue?.[this.displayKey]}</div>
      <button class="icon-button">down</button>
      <div class="options ${this.isOpen && "open"}">
        ${this.options.map(
          (o, i) =>
            html`<div
              data-test-id="option"
              @click="${this.select}"
              class="option"
              data-index="${i}"
            >
              ${o[this.displayKey]}
            </div>`,
        )}
      </div>
    </div>`
  }
}

export { Select }
