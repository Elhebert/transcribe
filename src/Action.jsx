export default {
  name: 'Action',

  props: {
    fn: { required: true, type: Function },
    params: { required: true, type: Object },
  },

  methods: {
    trigger() {
      this.fn(this.params.prefix || '', this.params.suffix || '')
    },
  },

  /* eslint-disable no-unused-vars */
  render(h) {
    return this.$scopedSlots.default({
      eventsHandler: {
        click: () => {
          this.trigger()
        },
      },
    })
  },
}
