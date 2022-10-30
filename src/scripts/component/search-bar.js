class SearchBar extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  // eslint-disable-next-line accessor-pairs
  set clickEvent (event) {
    this._clickEvent = event
    this.render()
  }

  // eslint-disable-next-line accessor-pairs
  set changeEvent (event) {
    this._changeEvent = event
    this.render()
  }

  get value () {
    return this.querySelector('#searchElement').value
  }

  set value (val) {
    this.querySelector('#searchElement').value = val
  }

  render () {
    this.innerHTML = `    
      <div id="search-container" class="search-container">
          <input placeholder="Cari Restaurant" id="searchElement" type="search">
          <button id="searchButtonElement" type="submit"><i class="fa fa-search"></i></button>
      </div>`

    this.querySelector('#searchButtonElement').addEventListener('click', this._clickEvent)
    this.querySelector('#searchButtonElement').addEventListener('change', this._changeEvent)
  }
}
customElements.define('search-bar', SearchBar)
