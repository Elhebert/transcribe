import marked from 'marked'

export default class MarkdownParser {
  constructor() {
    this.renderer = new marked.Renderer()
    this.parser = marked
  }

  setRenderer(renderer) {
    Object.entries(renderer).map(([element, fn]) => {
      this.renderer[element] = fn
    })

    this.parser.setOptions({ renderer: this.renderer })
  }

  render(markdown) {
    return this.parser(markdown)
  }
}
