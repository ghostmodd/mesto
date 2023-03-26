export class Section {
  constructor (containerSelector, renderer) {
    this._containerSelector = containerSelector;
    this._container = document.querySelector(this._containerSelector);
    this._renderer = renderer;
  }

  renderItems (items) {
    items.forEach(item => {
      this._container.prepend(this._renderer(item));
    });
  }

  addItem (item) {
    this._container.prepend(this._renderer(item));
  }
}
