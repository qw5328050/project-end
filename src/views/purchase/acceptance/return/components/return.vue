<template>
  <div>
    <el-dialog :visible.sync="showModal" v-bind="modalProps">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="退回原因" prop="resaon" label-width="80px">
          <el-input
            v-model="form.resaon"
            style="width: 300px"
            placeholder="请输入"
          />
        </el-form-item>

        <p style="color: #262626">退回物资明细</p>
        <!-- 表格 -->
        <el-table v-bind="tableProps" style="width: 100%">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column prop="a" label="物资名称" width="140" />
          <el-table-column prop="b" label="规格型号" width="140" />
          <el-table-column prop="c" label="单位" width="140" />
          <el-table-column :prop="`form.count`" label="数量">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`tableData.${$index}.count`"
                :rules="[
                  { required: true, message: '请输入数量', trigger: 'blur' }
                ]"
              >
                <el-input
                  v-model="row.count"
                  style="width: 140px"
                  placeholder="请输入"
                />
              </el-form-item>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel()">取 消</el-button>
        <el-button type="primary" @click="handleOk()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  model: {
    prop: 'visible', // 指向props的参数名
    event: 'update' // 事件名称
  },
  props: {
    visible: Boolean,
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        tableData: new Array(4).fill({
          a: '带编头钢丝绳',
          b: '16*8M',
          c: '条',
          count: ''
        })
      },
      rules: {
        resaon: [{ required: true, message: '请输入退回原因', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showModal: {
      get() {
        // if (this.visible) this.initData()
        return this.visible
      },
      set(val) {
        this.$emit('update', val)
      }
    },
    modalProps() {
      const { title = '退回', width = '748px' } = this.config
      return {
        width,
        title,
        'close-on-click-modal': false,
        'close-on-press-escape': false,
        'destroy-on-close': true
      }
    },
    tableProps() {
      return {
        data: this.form.tableData
        // 'row-key': 'name',
      }
    }
  },
  mounted() {},
  methods: {
    handleOk() {
      console.log(this.form.tableData)
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
          this.handleCancel()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel() {
      this.showModal = false
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped></style>
