<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
  >
    <div class="drawerFrom">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="抬头类型：">
          <el-radio-group v-model="form.titleType">
            <el-radio :label="1">公司抬头</el-radio>
            <el-radio :label="2">个人/非企业抬头</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票类型：">
          <el-radio-group v-model="form.invoiceType">
            <el-radio :label="1">电子发票 </el-radio>
            <el-radio :label="2">纸质发票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头：">
          <el-input
            v-model="form.invoiceTitle"
            placeholder="请输入"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="发票税号：">
          <el-input
            v-model="form.invoiceTaxNo"
            placeholder="请输入"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="发票内容：">
          <el-input
            v-model="form.invoiceContent"
            placeholder="请输入"
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="开票金额：">
          <el-input
            v-model="form.amount"
            placeholder="请输入"
            style="width: 300px"
            disabled
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="form.remark" style="width: 300px" />
        </el-form-item>
        <el-form-item label="接收方式：">
          <el-input
            v-model="form.email"
            placeholder="请输入"
            style="width: 300px"
          />
        </el-form-item>
        <div class="drawerBut">
          <el-button @click="handleClose">取消</el-button>
          <el-button
            type="primary"
            :loading="loadings"
            @click="onSubmit"
          >确定</el-button>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>
<script>
import { getToken } from '@/utils/auth' // get token from cookie
import { multiUpload, getAmountByOrderNo } from '@/api/lumpsum/test'
import { getInvoiceTitleAndTaxNo } from '@/api/settlement/test'
export default {
  name: '',
  props: {
    title: {
      type: String,
      require: true,
      default: null
    },
    contractCode: {
      type: String,
      require: true,
      default: null
    },
    id: {
      type: String,
      require: true,
      default: null
    },
    visible: {
      type: Boolean,
      require: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fileList: [],
      form: {
        titleType: 1,
        invoiceType: 1,
        invoiceTitle: '',
        invoiceTaxNo: '',
        invoiceContent: '',
        amount: '',
        remark: '',
        email: ''
      },
      loadings: false,
      upload: {
        // 设置上传的请求头部
        headers: {
          access_token: getToken()
        },
        // 上传的地址
        url:
          process.env.VUE_APP_BASE_API +
          '/multi-service/supplier/invoice/upload'
        // 上传内容
      }
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          this.getAmountByOrderNo()
          this.getFormData()
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    getFormData() {
      getInvoiceTitleAndTaxNo({ contractCode: this.contractCode }).then((res) => {
        if (res.status === 200) {
          this.form.invoiceTaxNo = res.data.registerNo
          this.form.invoiceTitle = res.data.name
        }
      })
    },
    // 保存
    onSubmit() {
      if (this.fileList.length === 0) {
        this.$message({
          message: '请上传文件,在进行操作!',
          type: 'warning'
        })
        return
      }
      this.loadings = true
      this.form.orderNo = this.id
      multiUpload(this.form)
        .then((res) => {
          if (res.status === 200) {
            this.$message('操作成功')
            this.loadings = false
            this.handleClose()
          }
        })
        .catch(() => {
          this.loadings = false
        })
    },
    // 根据结算单编号获取开票金额
    getAmountByOrderNo() {
      getAmountByOrderNo(this.id).then((res) => {
        if (res.status === 200) {
          var amount = res.data
          this.$set(this.form, 'amount', amount)
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = []
      this.form.fileUrl = ''
    },
    // 上传接口返回
    handleChange(response, file, fileList) {
      this.fileList = fileList
      this.form.fileUrl = response.data
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    // 图片上传前
    beforeAvatarUpload(file) {
      const fileType = [
        'bmp',
        'jpg',
        'jpeg',
        'gif',
        'png',
        'doc',
        'docx',
        'excel',
        'pdf',
        'txt'
      ]
      if (file) {
        console.log(file)
        const addTypeArray = file.name.split('.')
        const addType = addTypeArray[addTypeArray.length - 1] // 文件格式
        console.log(
          addType,
          fileType.findIndex((item) => item === addType)
        )
        if (fileType.findIndex((item) => item === addType) >= 0) {
          return true
        } else {
          this.$message.error(`上传${file.name}文件格式错误`)
          return false
        }
      }
      const ISjpeg = file.type === 'image/jpeg'
      const ISjpg = file.type === 'image/jpg'
      const ISpng = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!ISpng && !ISjpg && !ISjpeg) {
        this.$message.error(
          '上传文件格式错误,上传图片必须是 JPG/PNG/JPEG 格式!'
        )
      } else if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!')
      }
      if (ISjpeg && !ISjpg && !ISpng) {
        return ISjpeg && isLt2M
      } else if (!ISjpeg && ISjpg && !ISpng) {
        return ISjpg && isLt2M
      } else if (!ISjpeg && !ISjpg && ISpng) {
        return ISpng && isLt2M
      } else {
        return false && isLt2M
      }
    },
    handleClose() {
      this.form = {}
      this.fileList = []
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>
.footer {
  width: 100%;
  margin-top: 16px;
  /* padding-left: 40px; */
  padding-right: 24px;
  box-sizing: border-box;
  height: 64px;
  justify-content: space-between;
  /* background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08); */
  display: flex;
  align-items: center;
}
.drawerFrom {
  display: flex;
  justify-content: center;
  align-content: center;
}
.drawerBut {
  float: right;
  margin-top: 36px;
}
</style>
