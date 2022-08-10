<template>
  <div>
    <SelectNode
      :is-radio="true"
      :alteration="alteration"
      :process-key="processKey"
      @selectPersonnel="selectPersonnel"
    />
    <div class="footer">
      <div class="but">
        <el-button @click="toBack">取消</el-button>
        <el-button
          type="primary"
          @click="handlerSubmit"
        >提交
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { unlockReceiptToApproval } from '@/api/contractManagement/material'
import SelectNode from '@/components/selectNode'

export default {
  name: 'Index',
  components: { SelectNode },
  data() {
    return {
      alteration: 1,
      processKey: 'unlockReceiving'
    }
  },
  methods: {
    // 提交
    handlerSubmit() {
      const approver = {}
      approver.id = this.$route.query.id
      approver.variable = this.ObjList
      unlockReceiptToApproval(approver).then((res) => {
        history.go(-1)
      })
    },
    // 取消
    toBack() {
      history.go(-1)
    },
    // 选中的审批人列表
    selectPersonnel(data, isSelectNode) {
      this.isSelectNode = isSelectNode
      this.personnelList = data
      if (this.personnelList.length > 0 || this.isSelectNode) {
        const isMeet = this.personnelList.every((item) => {
          return item.personnel && item.personnel.length > 0
        })
        if (isMeet) {
          const obj = {}
          this.personnelList.forEach((item) => {
            const arr = item.personnel.map((items) => items.mainCode)
            obj[item.assignee] = arr.join(',')
          })
          this.ObjList = obj
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 64px;
    line-height: 64px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
  }

  .but {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
</style>

