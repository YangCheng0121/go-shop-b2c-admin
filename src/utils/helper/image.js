import { IMAGE_PREFIX } from '@/config/axios.config.js'
import { deepClone } from '@/utils/util'

/**
 * 设置 图片的前缀
 * @param images
 * @returns {*}
 */
export function setImagePrefix(images) {
  const clone = deepClone(images)

  clone.forEach((image) => {
    image['_url'] = image['url']
    image['url'] = IMAGE_PREFIX + image['url']
    image['large'] = IMAGE_PREFIX + image['large']
    image['medium'] = IMAGE_PREFIX + image['medium']
    image['thumbUrl'] = IMAGE_PREFIX + image['thumbUrl']
    image['source'] = IMAGE_PREFIX + image['source']
  })

  return clone
}
