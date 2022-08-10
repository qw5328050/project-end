<template>
  <el-dialog :visible.sync="visibleEdit" v-bind="modalProps">
    <el-form ref="form" :model="form" :rules="rules" label-width="85px">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          v-model="form.oldPassword"
          type="password"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          type="password"
          placeholder="请输入新密码（字母、数字、特殊字符三种，长度8-64位）"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="newPasswordHash">
        <el-input
          v-model="form.newPasswordHash"
          type="password"
          placeholder="确认新密码（字母、数字、特殊字符三种，长度8-64位）"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel()">取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="handleSubmit()"
      >确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import md5 from 'js-md5'
import { changePassword } from '@/api/workbench'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.form.newPasswordHash !== '') {
          this.$refs.form.validateField('newPasswordHash')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      form: { oldPassword: '', newPassword: '', newPasswordHash: '' },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [{ validator: validatePass, trigger: 'blur' }],
        newPasswordHash: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    modalProps() {
      return {
        width: '560px',
        title: '修改密码',
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'destroy-on-close': true,
        'append-to-body': true
      }
    },
    visibleEdit: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },
    userId() {
      return this.$store.getters.userInfo.id
    }
  },
  methods: {
    handleSubmit() {
      const regCompose = /(?=.*[A-z])(?=.*[0-9])(?=.*[\W_]).{8,64}/
      this.$refs.form.validate((vaild) => {
        if (!vaild) return
        this.loading = true
        if (
          regCompose.test(this.form.newPasswordHash) &&
          regCompose.test(this.form.newPassword)
        ) {
          const data = Object.assign(
            { userId: this.userId },
            {
              newPassword: this.form.newPassword,
              newPasswordHash: md5(this.form.newPasswordHash),
              oldPassword: md5(this.form.oldPassword)
            }
          )
          changePassword(data)
            .then(() => {
              this.$message.success('修改成功！')
              // 可以通过该回调更新用户信息
              this.$emit('success')
              this.handleCancel()
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          this.loading = false
          this.$message({
            message: '密码格式不正确',
            type: 'warning'
          })
        }
      })
    },
    handleCancel() {
      this.visibleEdit = false
      Object.assign(this.form, this.$options.data().form)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 450px;
}
</style>
