import "./globals/html-global.js";
import { HomePage } from "./pages/home/HomePage.js";
import { modalStore } from "./stores/modal-store.js";

const enableMocking = () =>
  import("./mocks/browser.js").then(({ worker }) =>
    worker.start({
      onUnhandledRequest: "bypass",
    }),
  );

function main() {
  new HomePage().mount("#root");
  modalStore.init();
}

// 애플리케이션 시작
if (import.meta.env.MODE !== "test") {
  enableMocking().then(main);
} else {
  main();
}
