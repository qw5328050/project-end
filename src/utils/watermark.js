import Vue from 'vue'
import store from '@/store'

Vue.directive('watermark', (el, binding) => {
  const text = store.getters.watermark || ''
  const font = binding.value.font || '16px Microsoft JhengHei'
  const textColor = binding.value.textColor || 'rgba(215, 215, 215, 0.1)'
  const width = binding.value.width || 400
  const height = binding.value.height || 200
  const textRotate = binding.value.textRotate || -20

  function addWaterMarker(parentNode) {
    var can = document.createElement('canvas')
    parentNode.appendChild(can)
    can.width = width
    can.height = height
    can.style.display = 'none'
    var cans = can.getContext('2d')
    cans.rotate((textRotate * Math.PI) / 180)
    cans.font = font
    cans.fillStyle = textColor
    cans.textAlign = 'left'
    cans.textBaseline = 'Middle'
    cans.fillText(text, 0, can.height)
    parentNode.style.backgroundImage =
      'url(' + can.toDataURL('image/png') + ')'
  }
  addWaterMarker(el)
})
