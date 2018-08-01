import FineUploader from 'fine-uploader-wrappers'

export default class MediaUploader {
  constructor(options, replaceUploadingString) {
    this.replaceUploadingString = replaceUploadingString
    this.uploader = new FineUploader({ options })

    this.mounted()
  }

  mounted() {
    this.uploader.on('complete', (id, name, { media }) => {
      this.replaceUploadingString(name, media)
    })
  }

  uploadMedia(file) {
    this.uploader.methods.addFiles([file])
  }
}
