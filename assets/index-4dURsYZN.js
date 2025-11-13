var e=function(exports){function t(e){"@babel/helpers - typeof";return t=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},t(e)}function n(e,n){if(t(e)!=`object`||!e)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var i=r.call(e,n||`default`);if(t(i)!=`object`)return i;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(n===`string`?String:Number)(e)}function r(e){var r=n(e,`string`);return t(r)==`symbol`?r:r+``}function i(e,t,n){return(t=r(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}return exports.defineProperty=i,exports}({}),t;(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e){if(t.type!==`childList`)continue;for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();const n=`modulepreload`,r=function(e){return`/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=function(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))},s=document.getElementsByTagName(`link`),c=document.querySelector(`meta[property=csp-nonce]`),l=c?.nonce||c?.getAttribute(`nonce`);o=e(t.map(e=>{if(e=r(e,a),e in i)return;i[e]=!0;let t=e.endsWith(`.css`),o=t?`[rel="stylesheet"]`:``,c=!!a;if(c)for(let n=s.length-1;n>=0;n--){let r=s[n];if(r.href===e&&(!t||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${e}"]${o}`))return;let u=document.createElement(`link`);if(u.rel=t?`stylesheet`:n,t||(u.as=`script`),u.crossOrigin=``,u.href=e,l&&u.setAttribute(`nonce`,l),document.head.appendChild(u),t)return new Promise((t,n)=>{u.addEventListener(`load`,t),u.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${e}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[]){if(e.status!==`rejected`)continue;s(e.reason)}return e().catch(s)})};var o=class{static get(e){try{let t=localStorage.getItem(e);return t?JSON.parse(t):null}catch(t){return console.error(`LocalStorage 데이터 읽기 실패 (key: ${e}):`,t),null}}static set(e,t){try{let n=JSON.stringify(t);return localStorage.setItem(e,n),!0}catch(t){return t instanceof DOMException&&t.name===`QuotaExceededError`&&console.error(`LocalStorage 저장 용량 초과 (key: ${e}):`,t),console.error(t),!1}}static remove(e){try{return localStorage.removeItem(e),!0}catch(t){return console.error(`LocalStorage 데이터 삭제 실패 (key: ${e}):`,t),!1}}},s=class{constructor(){this.subscribers=[]}subscribe(e){return this.subscribers.push(e),()=>{this.unsubscribe(e)}}unsubscribe(e){this.subscribers=this.subscribers.filter(t=>t!==e)}notify(e){this.subscribers.forEach(t=>t(e))}clearSubscribers(){this.subscribers=[]}};const c=`shopping_cart`;var l=class extends s{constructor(){super(),this.cartItems=[],this.selectedItemIds=[],this.init()}init(){let e=o.get(c)||{cartItems:[],selectedItemIds:[]},{cartItems:t,selectedItemIds:n}=e;this.cartItems=t??[],this.selectedItemIds=n??[]}saveToStorage(){o.set(c,{cartItems:this.cartItems,selectedItemIds:this.selectedItemIds})}getItems(){return[...this.cartItems]}addItem(e,t=1){let n=this.cartItems.find(t=>t.productId===e.productId);n?n.quantity+=t:this.cartItems.push({...e,quantity:t}),this.saveToStorage(),this.notify(this.cartItems)}addQuantity(e){let t=this.cartItems.find(t=>t.productId===e);t&&(t.quantity+=1,this.saveToStorage(),this.notify(this.cartItems))}minusQuantity(e){let t=this.cartItems.find(t=>t.productId===e);t&&(t.quantity<=1||(--t.quantity,this.saveToStorage(),this.notify(this.cartItems)))}toggleSelectItem(e){console.log(`1`,this.selectedItemIds),this.selectedItemIds.includes(e)?this.selectedItemIds=this.selectedItemIds.filter(t=>t!==e):this.selectedItemIds.push(e),console.log(`2`,this.selectedItemIds),this.saveToStorage(),this.notify(this.cartItems)}toggleSelectAll(){this.selectedItemIds.length===this.cartItems.length?this.selectedItemIds=[]:this.selectedItemIds=this.cartItems.map(e=>e.productId),this.saveToStorage(),this.notify(this.cartItems)}removeItem(e){this.cartItems=this.cartItems.filter(t=>t.productId!==e),this.selectedItemIds=this.selectedItemIds.filter(t=>t!==e),this.saveToStorage(),this.notify(this.cartItems)}removeSelectedItems(){this.cartItems=this.cartItems.filter(e=>!this.selectedItemIds.includes(e.productId)),this.selectedItemIds=[],this.saveToStorage(),this.notify(this.cartItems)}clearCart(){this.cartItems=[],this.selectedItemIds=[],this.saveToStorage(),this.notify(this.cartItems)}getTotalCount(){return this.cartItems.reduce((e,t)=>e+t.quantity,0)}getSelectedItemsSize(){return this.selectedItemIds.length}isAllSelected(){return this.selectedItemIds.length===this.cartItems.length}isSelected(e){return this.selectedItemIds.includes(e)}getItemsSize(){return this.cartItems.length}getTotalPrice(){return this.cartItems.reduce((e,t)=>e+t.lprice*t.quantity,0)}getItemPrice(e){let t=this.cartItems.find(t=>t.productId===e);return t?t.lprice*t.quantity:0}getSelectedItemsPrice(){return this.cartItems.filter(e=>this.selectedItemIds.includes(e.productId)).reduce((e,t)=>e+t.lprice*t.quantity,0)}};const u=new l,d=String.raw;function f(){return html` <div
    class="flex min-h-full w-full cart-modal-overlay  items-end justify-center p-0 sm:items-center sm:p-4 max-w-lg w-full"
  >
    <div
      class="relative bg-white cart-modal rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-hidden"
    >
      <!-- 헤더 -->
      <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-900 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
            ></path>
          </svg>
          장바구니
        </h2>

        <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- 컨텐츠 -->
      <div class="flex flex-col max-h-[calc(90vh-120px)]">
        <!-- 빈 장바구니 -->
        <div class="flex-1 flex items-center justify-center p-8">
          <div class="text-center">
            <div class="text-gray-400 mb-4">
              <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">장바구니가 비어있습니다</h3>
            <p class="text-gray-600">원하는 상품을 담아보세요!</p>
          </div>
        </div>
      </div>
    </div>
  </div>`}function p(e){return`${Number(e).toLocaleString(`ko-KR`)}원`}function m({item:e,isSelected:t}){return html`
    <div class="flex items-center py-3 border-b border-gray-100 cart-item" data-product-id="${e.productId}">
      <!-- 선택 체크박스 -->
      <label class="flex items-center mr-3">
        <input
          type="checkbox"
          ${t?`checked`:``}
          class="cart-item-checkbox w-4 h-4 text-blue-600 border-gray-300 rounded
                      focus:ring-blue-500"
          data-product-id="${e.productId}"
        />
      </label>
      <!-- 상품 이미지 -->
      <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden mr-3 flex-shrink-0">
        <img
          src="${e.image}"
          alt="${e.title}"
          class="w-full h-full object-cover cursor-pointer cart-item-image"
          data-product-id="${e.productId}"
        />
      </div>
      <!-- 상품 정보 -->
      <div class="flex-1 min-w-0">
        <h4
          class="text-sm font-medium text-gray-900 truncate cursor-pointer cart-item-title"
          data-product-id="${e.productId}"
        >
          ${e.title}
        </h4>
        <p class="text-sm text-gray-600 mt-1">${p(e.lprice)}</p>
        <!-- 수량 조절 -->
        <div class="flex items-center mt-2">
          <button
            class="quantity-decrease-btn w-7 h-7 flex items-center justify-center
                       border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
            data-product-id="${e.productId}"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
            </svg>
          </button>
          <input
            type="number"
            value="${e.quantity}"
            min="1"
            class="quantity-input w-12 h-7 text-center text-sm border-t border-b
                      border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            disabled=""
            data-product-id="${e.productId}"
          />
          <button
            class="quantity-increase-btn w-7 h-7 flex items-center justify-center
                       border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
            data-product-id="${e.productId}"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- 가격 및 삭제 -->
      <div class="text-right ml-3">
        <p class="text-sm font-medium text-gray-900">${(e.lprice*e.quantity).toLocaleString()}원</p>
        <button
          class="cart-item-remove-btn mt-1 text-xs text-red-600 hover:text-red-800"
          data-product-id="${e.productId}"
        >
          삭제
        </button>
      </div>
    </div>
  `}function h({type:e,message:t}){return e===`success`?html` <div
      class="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm"
    >
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <p class="text-sm font-medium">${t}</p>
      <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>`:e===`info`?html` <div
      class="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm"
    >
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p class="text-sm font-medium">${t}</p>
      <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>`:e===`error`?html` <div class="bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-sm">
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <p class="text-sm font-medium">${t}</p>
      <button id="toast-close-btn" class="flex-shrink-0 ml-2 text-white hover:text-gray-200">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>`:null}function g({type:e,message:t}){let n=document.getElementById(`toast-container`);n||(n=document.createElement(`div`),n.id=`toast-container`,n.className=`fixed bottom-4 right-4 z-50`,document.body.appendChild(n)),n.innerHTML=``;let r=document.createElement(`div`);r.innerHTML=h({type:e,message:t});let i=r.firstElementChild;i.style.opacity=`0`,n.appendChild(i),setTimeout(()=>{i.style.transition=`opacity 300ms`,i.style.opacity=`1`},10);let a=()=>{i.style.opacity=`0`,setTimeout(()=>i.remove(),300)},o=i.querySelector(`#toast-close-btn`);o?.addEventListener(`click`,a),setTimeout(a,3e3)}function _(e,t){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`)return!1;let n=Object.keys(e),r=Object.keys(t);return n.length===r.length?n.every(n=>e[n]===t[n]):!1}var v=class{constructor(e,t={}){this.props=t,this.$target=e,this._effects=[],this._isMounted=!1,this._eventListeners=[],this.setup(),this.render(),this.setEvents(),this.mount()}setup(){}mount(){this._runEffects(),this._isMounted=!0}setState(e){let t={...this.state},n=typeof e==`function`?e(t):e;this.state={...t,...n},this.render(),this._runEffects(t)}addEventListener(e,t,n){if(!this.$target)throw Error(`DOM 요소를 찾을 수 없습니다.`);let r=e=>{e.target.closest(t)&&n(e)};this.$target.addEventListener(e,r),this._eventListeners.push({eventType:e,listener:r})}useEffect(e,t=[]){this._effects.push({callback:e,deps:t,cleanup:null,prevDeps:void 0})}_runEffects(e={}){this._effects.forEach(t=>{let{deps:n,prevDeps:r,callback:i,cleanup:a}=t,o=!r||n.some((t,n)=>{let i=typeof t==`function`?t(this.state,this.props):t,a=typeof r?.[n]==`function`?r[n](e,this.props):r?.[n];return y(i)&&y(a)?!_(i,a):i!==a});if(o){typeof a==`function`&&a();let e=i();t.cleanup=typeof e==`function`?e:null,t.prevDeps=[...n]}})}unmount(){this._effects.forEach(e=>e.cleanup&&e.cleanup()),this._eventListeners.forEach(({eventType:e,listener:t})=>{this.$target.removeEventListener(e,t)}),this._eventListeners=[],this.$target&&(this.$target.innerHTML=``,this.$target=null),this._isMounted=!1}render(){this.$target&&(this.$target.innerHTML=this.template())}template(){return``}setEvents(){}};function y(e){return typeof e==`object`&&!!e}var ee=class{constructor(){this.modals=new Map,this.portal=null,this.currentOpenModal=null}init(){this.portal||this.createPortal(),this.events()}register(e,t){this.modals.set(e,t)}createPortal(){this.portal=document.createElement(`div`),this.portal.id=`modal-portal`,this.portal.classList.add(`fixed`,`inset-0`,`z-50`,`hidden`,`flex`,`items-center`,`justify-center`,`bg-black`,`bg-opacity-50`),document.querySelector(`#root`).appendChild(this.portal)}open(e){var t;if((t=this.currentOpenModal)?.name===e)return;let n=this.modals.get(e);if(!n)throw Error(`"모달이 등록되어 있지 않습니다.`);let r=new n(this.portal);this.currentOpenModal={name:e,instance:r},this.portal.classList.remove(`hidden`),document.body.style.overflow=`hidden`,r.mount(`#modal-portal`)}close(){var e;if(!this.currentOpenModal)return;let{instance:t}=this.currentOpenModal;this.portal.classList.add(`hidden`),document.body.style.overflow=`auto`,(e=t.unmount)?.call(t),this.portal.innerHTML=``,this.currentOpenModal=null}events(){document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.close()})}getPortal(){return this.portal}};const b=new ee;var x=class extends v{setup(){this.update=()=>this.render()}formatPrice(e){return p(e)}handleIncreaseQuantity(e){let t=e.target.closest(`.quantity-increase-btn`).dataset.productId;u.addQuantity(t)}handleDecreaseQuantity(e){let t=e.target.closest(`.quantity-decrease-btn`).dataset.productId;u.minusQuantity(t)}handleToggleSelectItem(e){let t=e.target.dataset.productId;u.toggleSelectItem(t)}handleToggleSelectAll(){u.toggleSelectAll()}handleRemoveItem(e){let t=e.target.dataset.productId;u.removeItem(t),g({type:`info`,message:`상품이 삭제되었습니다`})}handleRemoveSelectedItems(){u.removeSelectedItems(),g({type:`info`,message:`선택된 상품들이 삭제되었습니다`})}handleClearCart(){u.clearCart(),g({type:`info`,message:`장바구니가 비워졌습니다`})}handleCloseModal(e){e.target.classList.contains(`cart-modal-overlay`)&&b.close(),e.target.closest(`#cart-modal-close-btn`)&&b.close()}setEvents(){this.addEventListener(`click`,`.quantity-increase-btn`,this.handleIncreaseQuantity),this.addEventListener(`click`,`.quantity-decrease-btn`,this.handleDecreaseQuantity),this.addEventListener(`click`,`.cart-item-remove-btn`,this.handleRemoveItem),this.addEventListener(`change`,`.cart-item-checkbox`,this.handleToggleSelectItem),this.addEventListener(`change`,`[id="cart-modal-select-all-checkbox"]`,this.handleToggleSelectAll),this.addEventListener(`click`,`[id="cart-modal-remove-selected-btn"]`,this.handleRemoveSelectedItems),this.addEventListener(`click`,`[id="cart-modal-clear-cart-btn"]`,this.handleClearCart),this.addEventListener(`click`,`[id="cart-modal-close-btn"]`,this.handleCloseModal),this.addEventListener(`click`,`.cart-modal-overlay`,this.handleCloseModal)}mount(e){super.mount(e),u.subscribe(this.update)}unmount(){super.unmount(),u.unsubscribe(this.update)}template(){let e=u.getItems(),t=u.getTotalPrice(),n=u.getSelectedItemsSize(),r=u.getSelectedItemsPrice(),i=u.isAllSelected();return e.length===0?f():d`
      <div
        class="flex min-h-full w-full cart-modal-overlay  w-full items-end justify-center p-0 sm:items-center sm:p-4"
      >
        <div
          class="relative bg-white cart-modal rounded-t-lg sm:rounded-lg shadow-xl w-full max-w-md sm:max-w-l  g max-h-[90vh] overflow-hidden"
        >
          <!-- 헤더 -->
          <div class="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 class="text-lg font-bold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              장바구니
              <span class="text-sm font-normal text-gray-600 ml-1">(${e.length})</span>
            </h2>
            <button id="cart-modal-close-btn" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <!-- 컨텐츠 -->
          <div class="flex flex-col max-h-[calc(90vh-120px)]">
            <!-- 전체 선택 섹션 -->
            <div class="p-4 border-b border-gray-200 bg-gray-50">
              <label class="flex items-center text-sm text-gray-700">
                <input
                  type="checkbox"
                  id="cart-modal-select-all-checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mr-2"
                  ${i?`checked`:``}
                />
                전체선택 (${e.length}개)
              </label>
            </div>
            <!-- 아이템 목록 -->
            <div class="flex-1 overflow-y-auto">
              <div class="p-4 space-y-4">
                ${e.map(e=>{let t=u.isSelected(e.productId);return m({item:e,isSelected:t})}).join(``)}
              </div>
            </div>
          </div>
          <!-- 하단 액션 -->
          <div class="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <!-- 선택된 아이템 정보 -->
            <div class="flex justify-between items-center mb-3 text-sm">
              <span class="text-gray-600">선택한 상품 (${n}개)</span>
              <span class="font-medium">${this.formatPrice(r)}</span>
            </div>
            <!-- 총 금액 -->
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-bold text-gray-900">총 금액</span>
              <span class="text-xl font-bold text-blue-600">${this.formatPrice(t)}</span>
            </div>
            <!-- 액션 버튼들 -->
            <div class="space-y-2">
              ${n>0?d`
                    <button
                      id="cart-modal-remove-selected-btn"
                      class="w-full bg-red-600 text-white py-2 px-4 rounded-md
                       hover:bg-red-700 transition-colors text-sm"
                    >
                      선택한 상품 삭제 (${n}개)
                    </button>
                  `:``}
              <div class="flex gap-2">
                <button
                  id="cart-modal-clear-cart-btn"
                  class="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md
                       hover:bg-gray-700 transition-colors text-sm"
                >
                  전체 비우기
                </button>
                <button
                  id="cart-modal-checkout-btn"
                  class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md
                       hover:bg-blue-700 transition-colors text-sm"
                >
                  구매하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}},S=(t=class e{constructor(t,n){this.$target=t,this.routes=n,this.currentComponent=null,e._instance=this,this.init()}static getInstance(){return e._instance}init(){window.addEventListener(`popstate`,()=>this.route()),document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-link]`);if(!t)return;e.preventDefault();let n=t.getAttribute(`href`);history.pushState(null,``,n),this.route()}),this.route()}matchRoute(e){for(let t of this.routes){let n=[],r=t.path.replace(/\*/g,`.*`).replace(/:([^/]+)/g,(e,t)=>(n.push(t),`([^/]+)`)),i=RegExp(`^${r}$`),a=e.match(i);if(a){let e=n.reduce((e,t,n)=>(e[t]=a[n+1],e),{});return{...t,params:e}}}return null}route(){var e;let t=location.pathname,n=this.matchRoute(t);if((e=this.currentComponent)?.unmount&&this.currentComponent.unmount(),this.$target.innerHTML=``,n){let{layout:e,component:t}=n;if(e){let n=e;this.currentComponent=new n(this.$target,{children:t})}else{let e=t;this.currentComponent=new e(this.$target)}}}getParams(){let e=this.matchRoute(location.pathname);return e?.params||{}}getParam(e){let t=this.getParams();return t[e]}},e.defineProperty(t,`_instance`,null),t);typeof window<`u`&&window.html===void 0&&(window.html=String.raw);var te=class extends v{setup(){this.useEffect(()=>(u.subscribe(this.boundRender),()=>{u.unsubscribe(this.boundRender)}),[])}template(){return html`
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="text-center my-4 py-20 shadow-md p-6 bg-white rounded-lg">
          <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#4285f4;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#1a73e8;stop-opacity:1" />
              </linearGradient>
              <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="2" stdDeviation="8" flood-color="#000000" flood-opacity="0.1" />
              </filter>
            </defs>

            <!-- 404 Numbers -->
            <text
              x="160"
              y="85"
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              font-size="48"
              font-weight="600"
              fill="url(#blueGradient)"
              text-anchor="middle"
            >
              404
            </text>

            <!-- Icon decoration -->
            <circle cx="80" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
            <circle cx="240" cy="60" r="3" fill="#e8f0fe" opacity="0.8" />
            <circle cx="90" cy="45" r="2" fill="#4285f4" opacity="0.5" />
            <circle cx="230" cy="45" r="2" fill="#4285f4" opacity="0.5" />

            <!-- Message -->
            <text
              x="160"
              y="110"
              font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              font-size="14"
              font-weight="400"
              fill="#5f6368"
              text-anchor="middle"
            >
              페이지를 찾을 수 없습니다
            </text>

            <!-- Subtle bottom accent -->
            <rect x="130" y="130" width="60" height="2" rx="1" fill="url(#blueGradient)" opacity="0.3" />
          </svg>

          <a
            href="/"
            data-link
            class="inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >홈으로</a
          >
        </div>
      </main>
    `}};const C=`category1-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50`,ne=`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-white border-gray-300 text-gray-700 hover:bg-gray-50`,w=`category2-filter-btn text-left px-3 py-2 text-sm rounded-md border transition-colors bg-blue-100 border-blue-300 text-blue-800`;var T=class extends v{setEvents(){let{onCategory1Filter:e,onCategory2Filter:t,onResetFilter:n,onCategory1Click:r}=this.props;this.addEventListener(`click`,`.category1-filter-btn`,t=>e(t.target.dataset.category1)),this.addEventListener(`click`,`.category2-filter-btn`,e=>t(e.target.dataset.category2)),this.addEventListener(`click`,`[data-breadcrumb="reset"]`,()=>n()),this.addEventListener(`click`,`[data-breadcrumb="category1"]`,()=>r())}template(){let{category1:e,category2:t}=this.props,n=e?html` <span class="text-xs text-gray-500">&gt;</span>
          <button
            data-breadcrumb="category1"
            data-category1="${e}"
            class="text-xs hover:text-blue-800 hover:underline"
          >
            ${e}
          </button>`:``,r=t?html`<span class="text-xs text-gray-500">&gt;</span>
          <span class="text-xs text-gray-600 cursor-default">${t}</span>`:``;return html`
      <div class="space-y-2">
        <div class="flex items-center gap-2">
          <label class="text-sm text-gray-600">카테고리:</label>
          <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
          ${n} ${r}
        </div>
        <div class="space-y-2">${e?D({category1:e,category2:t}):E()}</div>
      </div>
    `}};const E=()=>html`
    <div class="flex flex-wrap gap-2">
      <button data-category1="생활/건강" class="${C}">생활/건강</button>
      <button data-category1="디지털/가전" class="${C}">디지털/가전</button>
    </div>
  `,D=({category1:e,category2:t})=>{let n=e=>e===t?w:ne;return e===`생활/건강`?html`
      <div class="flex flex-wrap gap-2">
        ${[`생활용품`,`주방용품`,`문구/사무용품`,`자동차용품`,`구강위생용품`,`수납/정리용품`,`욕실용품`,`세탁용품`,`공구`,`청소용품`,`정원/원예용품`,`수집품`,`관상어용품`,`반려동물`].map(e=>html`
              <button data-category1="생활/건강" data-category2="${e}" class="${n(e)}">
                ${e}
              </button>
            `).join(``)}
      </div>
    `:e===`디지털/가전`?html`
      <div class="flex flex-wrap gap-2">
        <button data-category1="디지털/가전" data-category2="노트북" class="${n(`노트북`)}">노트북</button>
        <button data-category1="디지털/가전" data-category2="태블릿PC" class="${n(`태블릿PC`)}">태블릿PC</button>
      </div>
    `:null};var O=class extends v{setEvents(){this.addEventListener(`change`,`[id="limit-select"]`,e=>this.props.onLimitChange(Number(e.target.value)))}template(){let{limit:e=20}=this.props;return html`
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">개수:</label>
        <select
          id="limit-select"
          class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="10" ${String(e)===`10`?`selected`:``}>10개</option>
          <option value="20" ${String(e)===`20`?`selected`:``}>20개</option>
          <option value="50" ${String(e)===`50`?`selected`:``}>50개</option>
          <option value="100" ${String(e)===`100`?`selected`:``}>100개</option>
        </select>
      </div>
    `}},k=class extends v{setEvents(){this.addEventListener(`keydown`,`[id="search-input"]`,e=>{e.key===`Enter`&&this.props.onSearch(e.target.value.trim())})}template(){let{search:e}=this.props;return html`
      <div class="relative">
        <input
          type="text"
          id="search-input"
          placeholder="상품명을 검색해보세요..."
          value="${e}"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
      </div>
    `}},A=class extends v{setEvents(){this.addEventListener(`change`,`[id="sort-select"]`,e=>this.props.onSortChange(e.target.value))}template(){let{sort:e=`price_asc`}=this.props;return html`
      <div class="flex items-center gap-2">
        <label class="text-sm text-gray-600">정렬:</label>
        <select
          id="sort-select"
          class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="price_asc" ${e===`price_asc`?`selected`:``}>가격 낮은순</option>
          <option value="price_desc" ${e===`price_desc`?`selected`:``}>가격 높은순</option>
          <option value="name_asc" ${e===`name_asc`?`selected`:``}>이름순</option>
          <option value="name_desc" ${e===`name_desc`?`selected`:``}>이름 역순</option>
        </select>
      </div>
    `}},j=class extends v{template(){return html`
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <!-- 검색창 -->
          <div class="mb-4">
            <div class="relative">
              <input
                type="text"
                id="search-input"
                placeholder="상품명을 검색해보세요..."
                value=""
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <!-- 필터 옵션 -->
          <div class="space-y-3">
            <!-- 카테고리 필터 -->
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">카테고리:</label>
                <button data-breadcrumb="reset" class="text-xs hover:text-blue-800 hover:underline">전체</button>
              </div>
              <!-- 1depth 카테고리 -->
              <div class="flex flex-wrap gap-2">
                <div class="text-sm text-gray-500 italic">카테고리 로딩 중...</div>
              </div>
              <!-- 2depth 카테고리 -->
            </div>
            <!-- 기존 필터들 -->
            <div class="flex gap-2 items-center justify-between">
              <!-- 페이지당 상품 수 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">개수:</label>
                <select
                  id="limit-select"
                  class="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="10">10개</option>
                  <option value="20" selected="">20개</option>
                  <option value="50">50개</option>
                  <option value="100">100개</option>
                </select>
              </div>
              <!-- 정렬 -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">정렬:</label>
                <select
                  id="sort-select"
                  class="text-sm border border-gray-300 rounded px-2 py-1
                             focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="price_asc" selected="">가격 낮은순</option>
                  <option value="price_desc">가격 높은순</option>
                  <option value="name_asc">이름순</option>
                  <option value="name_desc">이름 역순</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <!-- 상품 목록 -->
        <div class="mb-6">
          <div>
            <!-- 상품 그리드 -->
            <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
              <!-- 로딩 스켈레톤 -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div class="aspect-square bg-gray-200"></div>
                <div class="p-3">
                  <div class="h-4 bg-gray-200 rounded mb-2"></div>
                  <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                  <div class="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            <div class="text-center py-4">
              <div class="inline-flex items-center">
                <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    `}};function M(){return{push:e=>{history.pushState(null,``,e),S.getInstance().route()},replace:e=>{history.replaceState(null,``,e),S.getInstance().route()}}}function N({product:e}){let t=p(e.lprice);return html`
    <div
      class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden product-card"
      data-product-id="${e.productId}"
    >
      <!-- 상품 이미지 -->
      <div class="aspect-square bg-gray-100 overflow-hidden cursor-pointer product-image">
        <img
          src="${e.image}"
          alt="${e.title}"
          class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
      </div>
      <!-- 상품 정보 -->
      <div class="p-3">
        <div class="cursor-pointer product-info mb-3">
          <h3 class="text-sm font-medium text-gray-900 line-clamp-2 mb-1">${e.title}</h3>
          <p class="text-xs text-gray-500 mb-2">${e.brand}</p>
          <p class="text-lg font-bold text-gray-900">${t}</p>
        </div>
        <!-- 장바구니 버튼 -->
        <button
          class="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md
                         hover:bg-blue-700 transition-colors add-to-cart-btn"
          data-product-id="${e.productId}"
        >
          장바구니 담기
        </button>
      </div>
    </div>
  `}function P({repeat:e=4}){return html` <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
    <div class="aspect-square bg-gray-200"></div>
    <div class="p-3">
      <div class="h-4 bg-gray-200 rounded mb-2"></div>
      <div class="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
      <div class="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
      <div class="h-8 bg-gray-200 rounded"></div>
    </div>
  </div>`.repeat(e)}var F=class extends v{setup(){this.navigate=M()}setEvents(){this.addEventListener(`click`,`.product-card`,e=>{if(e.target.closest(`.add-to-cart-btn`))return;let t=e.target.closest(`.product-card`).dataset.productId;this.navigate.push(`/product/${t}`)}),this.addEventListener(`click`,`.add-to-cart-btn`,e=>this.props.onAddToCart(e.target.dataset.productId))}template(){let{products:e,isFetching:t,hasNext:n,total:r}=this.props;return html`
     <div>
      <!-- 상품 개수 정보 -->
      <div class="mb-4 text-sm text-gray-600">총 <span class="font-medium text-gray-900">${r}개</span>의 상품</div>
      <!-- 상품 그리드 -->
      <div class="grid grid-cols-2 gap-4 mb-6" id="products-grid">
        ${e.map(e=>N({product:e})).join(``)} ${t?P(4):``}
      </div>

      ${t?I():``} ${n?``:L()}
    </div>
  
  </div>`}};function I(){return html`<div class="text-center py-4">
    <div class="inline-flex items-center">
      <svg class="animate-spin h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span class="text-sm text-gray-600">상품을 불러오는 중...</span>
    </div>
  </div>`}function L(){return html` <div class="text-center py-4 text-sm text-gray-500">모든 상품을 확인했습니다</div> `}var R=class extends s{constructor(){super()}get(e){let t=new URLSearchParams(window.location.search);if(e)return t.get(e);let n={};return t.forEach((e,t)=>{n[t]=e}),n}set(e){let t=new URLSearchParams(window.location.search);Object.entries(e).forEach(([e,n])=>{n==null?t.delete(e):t.set(e,String(n))});let n=`${window.location.pathname}?${t.toString()}`;window.history.pushState({},``,n),this.notify()}delete(e){let t=new URLSearchParams(window.location.search);t.delete(e),window.history.pushState({},``,`${window.location.pathname}?${t.toString()}`),this.notify()}reset(){window.history.pushState({},``,window.location.pathname),this.notify()}};const z=new R;var B=class{constructor(e,t={}){let{root:n=null,rootMargin:r=`0px`,threshold:i=0}=t;this.callback=e,this.observer=new IntersectionObserver(e=>{this.callback(e)},{root:n,rootMargin:r,threshold:i}),this.observedElements=new Set}observe(e){e&&(this.observer.observe(e),this.observedElements.add(e))}unobserve(e){e&&(this.observer.unobserve(e),this.observedElements.delete(e))}disconnect(){this.observer.disconnect(),this.observedElements.clear()}};async function V(e={}){let{limit:t=20,search:n=``,category1:r=``,category2:i=``,sort:a=`price_asc`}=e,o=e.current??e.page??1,s=new URLSearchParams({page:o.toString(),limit:t.toString(),...n&&{search:n},...r&&{category1:r},...i&&{category2:i},sort:a}),c=await fetch(`/api/products?${s}`);return await c.json()}async function H(e){let t=await fetch(`/api/products/${e}`);return await t.json()}var U=class{constructor(){this.state={products:[],isLoading:!0,isFetching:!0,pagination:{page:1,hasNext:!0,total:0},error:null},this.observers=[]}subscribe(e){this.observers.push(e)}unsubscribe(e){this.observers=this.observers.filter(t=>t!==e)}notify(){this.observers.forEach(e=>e(this.state))}setState(e){this.state={...this.state,...e},this.notify()}async init(){try{let e=await V({...z.get(),page:1});this.setState({products:e.products,isLoading:!1,isFetching:!1,error:null,pagination:{...e.pagination}})}catch(e){this.setState({isLoading:!1,isFetching:!1,error:e}),g({type:`error`,message:`상품을 불러올 수 없습니다`})}}async fetchNextPage(){if(!(this.state.isFetching||!this.state.pagination.hasNext))try{let e=this.state.pagination.page+1;this.setState({isFetching:!0,pagination:{...this.state.pagination,page:e}});let t=await V({...z.get(),page:e});this.setState({products:[...this.state.products,...t.products],pagination:{...t.pagination},isFetching:!1})}catch(e){console.error(e),this.setState({isFetching:!1,error:e}),g({type:`error`,message:`다음 페이지를 불러올 수 없습니다`})}}resetPagination(){this.setState({pagination:{...this.state.pagination,page:1}})}handleRetry(){this.init()}handleLimitChange(e){z.set({limit:e})}handleSortChange(e){z.set({sort:e})}handleSearch(e){z.set({search:e})}handleAddToCart(e){let t=this.state.products.find(t=>t.productId===e);return t?(u.addItem(t),g({type:`success`,message:`장바구니에 추가되었습니다`}),!0):!1}handleCategory1Filter(e){z.set({category1:e})}handleCategory2Filter(e){z.set({category2:e})}handleResetFilter(){z.set({category1:null,category2:null})}handleCategory1Click(){z.set({category2:null})}shouldLoadNextPage(){let{isLoading:e,isFetching:t,pagination:n}=this.state;return n.hasNext&&!t&&!e}},re=class extends v{setup(){this.addEventListener(`click`,`[data-action="retry"]`,()=>this.props.handleRetry())}template(){return html`
      <main class="max-w-md mx-auto px-4 py-4">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 text-center">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">상품을 불러올 수 없습니다</h3>
          <p class="text-gray-600 mb-4">네트워크 연결을 확인하고 다시 시도해주세요.</p>
          <button
            data-action="retry"
            class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            다시 시도
          </button>
        </div>
      </main>
    `}},W=class extends v{setup(){this.vm=new U,this.state=this.vm.state,this.vm.subscribe(e=>{this.state=e,this.render()}),this.observer=new B(e=>{let t=e[0];t.isIntersecting&&this.vm.shouldLoadNextPage()&&this.vm.fetchNextPage()},{root:null,rootMargin:`100px`,threshold:.1}),this.useEffect(()=>{this.vm.init();let e=()=>this.vm.init(),t=()=>this.render();return u.subscribe(t),z.subscribe(e),()=>{var n;u.unsubscribe(t),z.unsubscribe(e),(n=this.observer)?.disconnect()}},[])}observeSentinel(){let e=this.$target.querySelector(`#load-more-sentinel`);e&&this.observer.observe(e)}render(){super.render(),this.observeSentinel(),this.renderComponents()}renderComponents(){if(this.state.error){let e=this.$target.querySelector(`[data-component="home-page-error-fallback"]`);new re(e,{handleRetry:this.vm.handleRetry.bind(this)});return}if(this.state.isLoading){let e=this.$target.querySelector(`[data-component="home-page-loading-fallback"]`);new j(e);return}let{category1:e=null,category2:t=null,limit:n=20,sort:r=`price_asc`,search:i=``}=z.get(),{products:a,isFetching:o,pagination:s}=this.state,{hasNext:c,total:l}=s,u=this.$target.querySelector(`[data-component="home-page-search-bar"]`),d=this.$target.querySelector(`[data-component="home-page-category-filter"]`),f=this.$target.querySelector(`[data-component="home-page-limit-select"]`),p=this.$target.querySelector(`[data-component="home-page-sort-select"]`),m=this.$target.querySelector(`[data-component="home-page-product-list"]`);new k(u,{search:i,onSearch:this.vm.handleSearch.bind(this)}),new O(f,{limit:n,onLimitChange:this.vm.handleLimitChange.bind(this)}),new A(p,{sort:r,onSortChange:this.vm.handleSortChange.bind(this)}),new T(d,{category1:e,category2:t,onCategory1Click:this.vm.handleCategory1Click.bind(this),onCategory1Filter:this.vm.handleCategory1Filter.bind(this),onCategory2Filter:this.vm.handleCategory2Filter.bind(this),onResetFilter:this.vm.handleResetFilter.bind(this)}),new F(m,{products:a,isFetching:o,hasNext:c,total:l,onAddToCart:this.vm.handleAddToCart.bind(this)})}template(){return this.state.isLoading?d`<div data-component="home-page-loading-fallback"></div>`:this.state.error?d`<div data-component="home-page-error-fallback"></div>`:d`
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 검색 및 필터 -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div class="mb-4" data-component="home-page-search-bar"></div>
          <div class="space-y-3">
            <div data-component="home-page-category-filter"></div>
            <div class="flex gap-2 items-center justify-between">
              <div data-component="home-page-limit-select"></div>
              <div data-component="home-page-sort-select"></div>
            </div>
          </div>
        </div>

        <!-- 상품 목록 -->
        <div data-component="home-page-product-list"></div>
        <div id="load-more-sentinel" class="h-10"></div>
      </main>
    `}};function G(){return S.getInstance().getParams()}function K(){return html`
    <main class="max-w-md mx-auto px-4 py-4">
      <div class="py-20 bg-gray-50 flex items-center justify-center">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">상품 정보를 불러오는 중...</p>
        </div>
      </div>
    </main>
  `}var q=class{constructor(e){this.productId=e,this.state={product:null,quantity:1,relatedProducts:[],isLoading:!0,error:null},this.observers=[]}subscribe(e){this.observers.push(e)}unsubscribe(e){this.observers=this.observers.filter(t=>t!==e)}notify(){this.observers.forEach(e=>e(this.state))}setState(e){this.state={...this.state,...e},this.notify()}async init(){try{let e=await H(this.productId);this.setState({product:e,isLoading:!1}),await this.initRelatedProducts()}catch(e){this.setState({isLoading:!1,error:e})}}async initRelatedProducts(){if(this.state.product)try{let e=await V({category2:this.state.product.category2});this.setState({relatedProducts:e.products.filter(e=>e.productId!==this.state.product.productId)})}catch(e){this.setState({error:e})}}handleQuantityIncrease(){this.setState({quantity:this.state.quantity+1})}handleQuantityDecrease(){this.setState({quantity:Math.max(1,this.state.quantity-1)})}handleAddToCart(){let e=this.state.product;u.addItem(e,this.state.quantity),this.setState({quantity:1}),g({type:`success`,message:`장바구니에 추가되었습니다`})}handleRelatedProductClick(e){return e}handleGoToHome(){}handleCategoryFilter(e,t){return{category1:e,category2:t}}},J=class extends v{setEvents(){this.navigate=M(),this.addEventListener(`click`,`.breadcrumb-link`,e=>{let{category1:t,category2:n}=this.props;e.target.dataset.category2&&this.navigate.push(`/?category1=${t}&category2=${n}`),e.target.dataset.category1&&this.navigate.push(`/?category1=${t}`)})}template(){let{category1:e,category2:t}=this.props;return d`
      <nav class="mb-4">
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <a href="/" data-link="" class="hover:text-blue-600 transition-colors">홈</a>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <button class="breadcrumb-link" data-category1="${e}">${e}</button>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          <button class="breadcrumb-link" data-category2="${t}">${t}</button>
        </div>
      </nav>
    `}},Y=class extends v{template(){let{image:e,title:t,rating:n,reviewCount:r,lprice:i,stock:a,description:o,brand:s}=this.props.product;return html`
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <!-- 상품 이미지 -->
        <div class="p-4">
          <div class="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img src="${e}" alt="${t}" class="w-full h-full object-cover product-detail-image" />
          </div>
          <!-- 상품 정보 -->
          <div>
            <p class="text-sm text-gray-600 mb-1">${s}</p>
            <h1 class="text-xl font-bold text-gray-900 mb-3">${t}</h1>

            <!-- 평점 및 리뷰 -->
            <div class="flex items-center mb-3">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
              </div>
              <span class="ml-2 text-sm text-gray-600">${n.toFixed(1)} (${r}개 리뷰)</span>
            </div>
            <!-- 가격 -->
            <div class="mb-4">
              <span class="text-2xl font-bold text-blue-600">${p(i)}</span>
            </div>
            <!-- 재고 -->
            <div class="text-sm text-gray-600 mb-4">재고 ${a}개</div>
            <!-- 설명 -->
            <div class="text-sm text-gray-700 leading-relaxed mb-6">${o}</div>
          </div>
        </div>
      </div>
    `}},X=class extends v{setEvents(){this.addEventListener(`click`,`#quantity-decrease`,()=>{this.props.onQuantityDecrease()}),this.addEventListener(`click`,`#quantity-increase`,()=>{this.props.onQuantityIncrease()})}template(){let{quantity:e}=this.props;return d` <div class="flex items-center justify-between mb-4">
      <span class="text-sm font-medium text-gray-900">수량</span>
      <div class="flex items-center">
        <button
          id="quantity-decrease"
          class="w-8 h-8 flex items-center justify-center border border-gray-300
                   rounded-l-md bg-gray-50 hover:bg-gray-100"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
          </svg>
        </button>
        <input
          type="number"
          id="quantity-input"
          value="${e}"
          min="1"
          max="107"
          class="w-16 h-8 text-center text-sm border-t border-b border-gray-300
                  focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          id="quantity-increase"
          class="w-8 h-8 flex items-center justify-center border border-gray-300
                   rounded-r-md bg-gray-50 hover:bg-gray-100"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </div>`}},ie=class extends v{setEvents(){this.addEventListener(`click`,`#add-to-cart-btn`,()=>{this.props.onAddToCart()})}template(){let{productId:e}=this.props;return d`
      <button
        id="add-to-cart-btn"
        data-product-id="${e}"
        class="w-full bg-blue-600 text-white py-3 px-4 rounded-md
                 hover:bg-blue-700 transition-colors font-medium"
      >
        장바구니 담기
      </button>
    `}},ae=class extends v{setup(){this.navigate=M(),this.addEventListener(`click`,`.go-to-product-list`,()=>{this.navigate.push(`/`)})}template(){return d`
      <button
        class="block w-full text-center bg-gray-100 text-gray-700 py-3 px-4 rounded-md
            hover:bg-gray-200 transition-colors go-to-product-list"
      >
        상품 목록으로 돌아가기
      </button>
    `}},oe=class extends v{setEvents(){this.navigate=M(),this.addEventListener(`click`,`.related-product-card`,e=>{let t=e.target.closest(`.related-product-card`).dataset.productId;this.navigate.push(`/product/${t}`)})}template(){let{relatedProducts:e}=this.props;return d`
      <div class="bg-white rounded-lg shadow-sm">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-bold text-gray-900">관련 상품</h2>
          <p class="text-sm text-gray-600">같은 카테고리의 다른 상품들</p>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3 responsive-grid">
            ${e.map(e=>d`<div
                    class="bg-gray-50 rounded-lg p-3 related-product-card cursor-pointer"
                    data-product-id="${e.productId}"
                  >
                    <div class="aspect-square bg-white rounded-md overflow-hidden mb-2">
                      <img
                        src="${e.image}"
                        alt="${e.title}"
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">${e.title}</h3>
                    <p class="text-sm font-bold text-blue-600">${p(e.lprice)}</p>
                  </div>`).join(``)}
          </div>
        </div>
      </div>
    `}},se=class extends v{setup(){let{productId:e}=G();this.vm=new q(e),this.state=this.vm.state,this.navigate=M(),this.vm.subscribe(e=>{this.state=e,this.render()}),this.useEffect(()=>{this.vm.init();let e=()=>this.render();return u.subscribe(e),()=>{u.unsubscribe(e)}},[])}render(){super.render(),this.renderComponents()}renderComponents(){if(this.state.isLoading)return;let{product:e,quantity:t,relatedProducts:n}=this.state,{productId:r}=e,i=this.$target.querySelector(`[data-component="product-detail-breadcrumb"]`),a=this.$target.querySelector(`[data-component="product-detail-card"]`),o=this.$target.querySelector(`[data-component="product-quantity-select"]`),s=this.$target.querySelector(`[data-component="add-cart-button"]`),c=this.$target.querySelector(`[data-component="navigate-home-button"]`),l=this.$target.querySelector(`[data-component="related-product-list"]`);new J(i,{category1:e.category1,category2:e.category2}),new Y(a,{product:e}),new X(o,{quantity:t,onQuantityDecrease:this.vm.handleQuantityDecrease.bind(this),onQuantityIncrease:this.vm.handleQuantityIncrease.bind(this)}),new ie(s,{productId:r,onAddToCart:this.vm.handleAddToCart.bind(this)}),new ae(c),new oe(l,{relatedProducts:n})}template(){let{isLoading:e}=this.state;return e?K():d`
      <main class="max-w-md mx-auto px-4 py-4">
        <!-- 브레드크럼 -->
        <div data-component="product-detail-breadcrumb"></div>

        <!-- 상품 상세 정보 -->
        <div data-component="product-detail-card"></div>

        <!-- 수량 선택 및 액션 -->
        <div class="border-t border-gray-200 p-4 bg-white rounded-lg shadow-sm mb-6">
          <div data-component="product-quantity-select"></div>
          <!-- 액션 버튼 -->
          <div data-component="add-cart-button"></div>
        </div>

        <!-- 상품 목록으로 이동 -->
        <div class="mb-6">
          <div data-component="navigate-home-button"></div>
        </div>

        <!-- 관련 상품 -->
        <div data-component="related-product-list"></div>
      </main>
    `}};function Z(){return`
     <footer class="bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-md mx-auto py-8 text-center text-gray-500">
          <p>© 2025 항해플러스 프론트엔드 쇼핑몰</p>
        </div>
      </footer>
    `}var Q=class extends v{setup(){this.boundRender=()=>this.render(),this.useEffect(()=>(u.subscribe(this.boundRender),()=>{u.unsubscribe(this.boundRender)}),[])}setEvents(){document.addEventListener(`click`,e=>{e.target.closest(`#cart-icon-btn`)&&b.open(`cart`)})}template(){let e=u.getItemsSize();return html`
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <h1 class="text-xl font-bold text-gray-900">
            <a href="/" data-link="">쇼핑몰</a>
          </h1>
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              ${e>0?html`
                    <span
                      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      >${e}</span
                    >
                  `:``}
            </button>
          </div>
        </div>
      </div>
    `}},$=class extends v{mount(){super.mount();let e=this.$target.querySelector(`[data-component="header"]`),t=this.$target.querySelector(`[data-component="children"]`);new Q(e),new this.props.children(t)}unmount(){var e,t;super.unmount(),(e=this.header)?.unmount(),(t=this.children)?.unmount()}template(){return html`
      <div class="bg-gray-50">
        <header class="bg-white shadow-sm sticky top-0 z-40" data-component="header"></header>
        <div data-component="children"></div>
          ${Z()}
        </div>
      </div>
    `}},ce=class extends v{setup(){this.boundRender=()=>this.render(),this.useEffect(()=>(u.subscribe(this.boundRender),()=>{u.unsubscribe(this.boundRender)}),[])}setEvents(){document.addEventListener(`click`,e=>{e.target.closest(`#cart-icon-btn`)&&b.open(`cart`)})}template(){let e=u.getItemsSize();return html`
      <div class="max-w-md mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <button onclick="window.history.back()" class="p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h1 class="text-lg font-bold text-gray-900">상품 상세</h1>
          </div>
          <div class="flex items-center space-x-2">
            <!-- 장바구니 아이콘 -->
            <button id="cart-icon-btn" class="relative p-2 text-gray-700 hover:text-gray-900 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 2H3m4 11v6a1 1 0 001 1h1a1 1 0 001-1v-6M13 13v6a1 1 0 001 1h1a1 1 0 001-1v-6"
                ></path>
              </svg>
              ${e>0?html`
                    <span
                      class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                      >${e}</span
                    >
                  `:``}
            </button>
          </div>
        </div>
      </div>
    `}},le=class extends v{mount(){super.mount();let e=this.$target.querySelector(`[data-component="header"]`),t=this.$target.querySelector(`[data-component="children"]`);new ce(e),new this.props.children(t)}unmount(){var e,t;super.unmount(),(e=this.header)?.unmount(),(t=this.children)?.unmount()}template(){return html`
      <div class="bg-gray-50">
        <header class="bg-white shadow-sm sticky top-0 z-40" data-component="header"></header>
        <div data-component="children"></div>
          ${Z()}
        </div>
      </div>
    `}};const ue=[{path:`/`,component:W,layout:$},{path:`/product/:productId`,component:se,layout:le},{path:`/*`,component:te,layout:$}],de=()=>a(async()=>{let{worker:e}=await import(`./browser-CcyfQrG1.js`);return{worker:e}},[]).then(({worker:e})=>e.start({onUnhandledRequest:`bypass`}));function fe(){let e=document.querySelector(`#root`),t=document.createElement(`div`);t.id=`app`,e.appendChild(t),new S(t,ue),b.init(),b.register(`cart`,x)}de().then(fe);