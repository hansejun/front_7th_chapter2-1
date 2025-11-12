import { Router } from "./core/router/router";

export class App {
  constructor(selector = "#root", routes) {
    this.root = document.querySelector(selector);

    this.render();

    this.router = new Router({
      outlet: "#app",
      routes,
    });
  }

  render() {
    this.root.innerHTML = html`<div id="app"></div>`;
  }
}
