<template>
  <el-dialog
    title="领用"
    :visible.sync="dialogVisible"
    width="560px"
  >
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="资产名称:">
            戴尔笔记本
        </el-form-item>
        <el-form-item label="规格型号:">
            G400
        </el-form-item>
        <el-form-item label="领用数量:">
            <el-input v-model="form.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="领用人:">
            <el-input v-model="form.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="领用时间:">
            <el-date-picker
                v-model="form.returnDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 80%"
              />
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
        form: {},
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    submit() {},
  }
}
</script>

