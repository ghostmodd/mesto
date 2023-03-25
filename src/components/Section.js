export class Section {
  constructor (containerSelector, renderer) {
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
    this._renderer = renderer;
  }

  renderItems (items) {
    items.forEach(item => {
      this._renderer(item, this._container);
    });
  }

  addItem (element) {
    this._renderer(element, this._container);
  }
}
