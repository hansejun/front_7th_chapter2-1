export class ProductListQueryParams {
  constructor() {
    this.limit = 20;
    this.search = null;
    this.category1 = null;
    this.category2 = null;
    this.sort = "price_asc";
  }

  getQueryParams() {
    const params = new URLSearchParams(window.location.search);

    return {
      limit: Number(params.get("limit")) || this.limit,
      search: params.get("search") ?? this.search,
      category1: params.get("category1") ?? this.category1,
      category2: params.get("category2") ?? this.category2,
      sort: params.get("sort") ?? this.sort,
    };
  }

  updateQueryParams(newParams) {
    const currentParams = this.getQueryParams();
    const updatedParams = { ...currentParams, ...newParams };

    const searchParams = new URLSearchParams();

    Object.entries(updatedParams).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else {
        searchParams.set(key, value);
      }
    });

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  }

  resetParams() {
    this.updateQueryParams({
      limit: 20,
      search: null,
      category1: null,
      category2: null,
      sort: "price_asc",
    });
  }
}
