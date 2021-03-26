import { uploadImage } from '@/api/upload'
import { ERR_OK } from '@/api/config'

const upload = {
  state: {},
  mutations: {},
  actions: {
    /**
     * 上传图片
     * @param commit
     * @param file
     * @private
     */
    UploadImage({ commit }, file) {
      const formData = new FormData()
      formData.append('upload', file, file.name)

      return new Promise((resolve, reject) => {
        uploadImage(formData).then((res) => {
          if (res.err_code === ERR_OK) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        })
      })
    }
  }
}

export default upload
