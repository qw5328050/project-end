<template>
  <div class="upload-file">
    <el-upload
      ref="upload"
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limitNum"
      :data="fileData"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      disabled
    >
      <!-- <div v-if="showTip" slot="tip" class="el-upload__tip">
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
        </template>
        的文件
      </div> -->
      <!-- 文件列表 -->
      <transition-group
        class="upload-file-list el-upload-list el-upload-list--text"
        name="el-fade-in-linear"
        tag="ul"
      >
        <li
          v-for="(file, index) in fileList"
          :key="file.uid"
          class="el-upload-list__item ele-upload-list__item-content"
        >
          <el-link :href="file.url" :underline="false" target="_blank">
            <span class="el-icon-document"> {{ getFileName(file) }} </span>
          </el-link>
        </li>
      </transition-group>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    limitNum: {
      type: Number,
      default: 1
    },
    // 值
    value: [String, Object, Array],
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ['doc', 'xls', 'ppt', 'txt', 'pdf']
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      uploadFileUrl:
        process.env.VUE_APP_BASE_API + '/purchase-service/file/upload', // 上传的图片服务器地址
      headers: {
        access_token: this.getTokens()
      },
      fileList: [],
      fileData: {}
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize)
    },
    // 列表
    list() {
      let temp = 1
      if (this.value) {
        // 首先将值转为数组
        const list = Array.isArray(this.value) ? this.value : [this.value]
        // 然后将数组转为对象数组
        return list.map((item) => {
          if (typeof item === 'string') {
            item = { name: item, url: item }
          }
          item.uid = item.uid || new Date().getTime() + temp++
          return item
        })
      } else {
        this.fileList = []
        return []
      }
    }
  },
  watch: {
    value: {
      handler() {
        this.listValue()
      },
      immediate: true
    }
  },
  created() {
    this.fileList = this.list
  },
  methods: {
    // 列表
    listValue() {
      let temp = 1
      if (this.value) {
        // 首先将值转为数组
        const list = Array.isArray(this.value) ? this.value : [this.value]
        list.forEach((item) => {
          item.uid = item.uid || new Date().getTime() + temp++
        })
        this.fileList = list
      } else {
        this.fileList = []
        return []
      }
    },
    getTokens() {
      const obj = getToken()
      return obj
    },
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        let fileExtension = ''
        if (file.name.lastIndexOf('.') > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true
          if (fileExtension && fileExtension.indexOf(type) > -1) return true
          return false
        })
        if (!isTypeOk) {
          this.$message.error(
            `文件格式不正确, 请上传${this.fileType.join('/')}格式文件!`
          )
          return false
        }
        this.fileData.fileName = file.name
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`)
          return false
        }
      }
      return true
    },
    // 文件个数超出
    handleExceed() {
      this.$message.error(`只允许上传单个文件`)
    },
    // 上传失败
    handleUploadError(err) {
      this.$message.error('上传失败, 请重试')
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      file.url = file.response.data
      this.$message.success('上传成功')
      this.fileList.push(file)
      this.$emit('input', res.data)
      this.$emit('getFileList', this.fileList)
    },
    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1)
      this.$emit('delFile', this.fileList)
    },
    // 获取文件名称
    getFileName(file) {
      if (file.name) {
        return file.name
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.upload-file-uploader {
  // margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  // margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
.el-icon-document{
  width: 250px;
}
</style>
