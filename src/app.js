import { Component } from "./core/component/Component";
import { Router } from "./core/router/router";
import { routes } from "./routes/routes";

export class App extends Component {
  constructor($target) {
    super($target);
  }

  setup() {
    this.router = new Router(this.$target, routes);
  }

  template() {
    return html`<div id="app"></div>`;
  }
}
