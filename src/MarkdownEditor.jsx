import codemirror from 'codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/lib/codemirror.css'
import './theme.css'

export default {
  name: 'MarkdownEditor',

  props: {
    value: { type: String, default: '' },
  },

  data: () => ({ editor: null }),

  mounted() {
    this.editor = codemirror(this.$el, {
      value: this.value,
      mode: 'markdown',
      lineWrapping: true,
      viewportMargin: Infinity,
      cursorBlinkRate: 0,
      theme: 'neo',
      dragDrop: true,
    })

    this.editor.on('drop', (editor, event) => {
      event.preventDefault()
      this.$emit('drop', event.dataTransfer.files)
    })

    this.editor.on('change', e => {
      this.$emit('change', e.getDoc().getValue())
    })

    this.$emit('ready', {
      replacePattern: this.replacePattern,
      replaceSelection: this.replaceSelection,
      replaceRange: this.replaceRange,
      inlineMarking: this.inlineMarking,
      blockMarking: this.blockMarking,
      focus: this.focus,
    })
  },

  methods: {
    replacePattern(pattern, replacement) {
      const cursor = this.editor.getDoc().getCursor()
      const value = this.editor
        .getDoc()
        .getValue()
        .replace(pattern, replacement)
      this.editor.getDoc().setValue(value)
      this.editor.focus()
      this.editor.getDoc().setCursor(cursor)
    },

    replaceSelection(replacement) {
      this.editor.getDoc().replaceSelection(replacement)
    },

    replaceRange(replacement) {
      const cursor = this.editor.getDoc().getCursor()

      this.editor.getDoc().replaceRange(
        replacement,
        {
          line: cursor.line,
          ch: 0,
        },
        cursor,
      )
      this.editor.focus()
    },

    focus() {
      this.editor.focus()
    },

    inlineMarking(prefix = '', suffix = '') {
      const selection = this.editor.getDoc().getSelection()
      this.replaceSelection(`${prefix}${selection}${suffix}`)
    },

    blockMarking(prefix = '', suffix = '') {
      const cursor = this.editor.getDoc().getCursor()
      const range = this.editor.getDoc().getRange(
        {
          line: cursor.line,
          ch: 0,
        },
        cursor,
      )

      this.replaceRange(`${prefix}${range}${suffix}`)
    },
  },

  /* eslint-disable no-unused-vars */
  render(h) {
    return <div />
  },
}
