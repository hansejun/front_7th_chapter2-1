import { App } from "./app.js";
import { CartModal } from "./components/cart/CartModal.js";
import "./globals/html-global.js";
import { modalStore } from "./stores/modal-store.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

function main() {
  const $root = document.querySelector("#root");
  new App($root);

  modalStore.init();
  modalStore.register("cart", CartModal);
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
