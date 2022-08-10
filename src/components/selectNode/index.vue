<template>
  <div class="selectNode">
    <el-card shadow="never">
      <div slot="header" class="clearfix">
        <span>{{title}}</span>
      </div>
      <div v-if="!activities">审批流程配置有误,请联系管理员</div>
      <el-timeline v-else-if="activities.length > 0">
        <el-timeline-item v-for="(activity, index) in activities" :key="index">
          <div class="titmeLineItem">
            <div class="top">
              <el-row :gutter="20">
                <el-col :span="2">
                  <div class="title">{{ pageName ? pageName : activity.nodeName }}</div>
                </el-col>
                <el-col :span="22">
                  <div class="btns">
                    <div class="button">
                      <el-button
                        @click="showDialog(index, activity.personnel)"
                      >添加审批人</el-button>
                    </div>
                    <div class="tag">
                      <el-tag
                        v-for="(tag, tagIndex) in activity.personnel"
                        :key="tag.name"
                        class="tagTop"
                        closable
                        color="1791ff"
                        type=""
                        @close="closeTag(index, tag, tagIndex)"
                      >
                        {{ tag.name }}
                      </el-tag>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div v-else class="prompt">当前暂无审批节点,请提交</div>
      <div v-if="pageTip">{{pageTip}}</div>
    </el-card>
    <ApproverRadioDialog
      v-if="isRadio"
      title="选择人员"
      :select-all="selectAll"
      :visible.sync="isShowApproverDialog"
      @selectSubmit="selectSubmit"
      @handleClose="handleClose"
    />
    <ApproverDialog
      v-else
      title="选择人员"
      :select-all="selectAll"
      :visible.sync="isShowApproverDialog"
      @selectSubmit="selectSubmit"
      @handleClose="handleClose"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { flowNodeList } from '@/api/plan/mad'
import ApproverDialog from '@/components/approverDialog'
import ApproverRadioDialog from '@/components/approverRadioDialog'
export default {
  name: 'SelectNode',
  components: { ApproverDialog, ApproverRadioDialog },
  props: {
    processKey: {
      type: String,
      require: true,
      default: ''
    },
    isRadio: {
      type: Boolean,
      require: false,
      default: true
    },
    alteration: {
      type: Number,
      require: false,
      default: 0
    },
    processInstanceId: {
      type: String,
      require: false,
      default: null
    },
    allPerson: {
      type: Object,
      require: false,
      default: null
    },
    title: {
      type: String,
      require: false,
      default: "指定审批人"
    },
    pageTip: {
      type: String,
      require: false,
      default: ""
    },
    pageName: {
      type: String,
      require: false,
      default: ""
    }
  },
  data() {
    return {
      index: 0,
      isShowApproverDialog: false,
      selectAll: [],
      activities: []
    }
  },
  watch: {
    processKey: {
      handler() {
        if (this.processKey) {
          this.getNodeData(this.processKey)
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  methods: {
    getNodeData(key) {
      flowNodeList({
        ...this.projectInformation,
        processKey: key,
        processInstanceId: this.processInstanceId
      })
        .then((res) => {
          if (res.data) {
            if (res.data.length > 0) {
              if (this.alteration) {
                this.activities = res.data
              } else {
                const arr = res.data
                arr.forEach((item) => {
                  if (!item.hasExtensionElement) {
                    this.activities.push(item)
                  }
                })
              }
              if (this.allPerson) {
                this.activities.forEach((item) => {
                  item.personnel = this.allPerson[item.assignee].map((val) => {
                    return {
                      name: val.personName,
                      mainCode: val.personCode
                    }
                  })
                })
              }
            } else {
              this.$emit('selectPersonnel', [], true)
            }
          }
          this.$emit('selectPersonnel', this.activities)
        })
        .catch(() => {
          this.activities = null
        })
    },
    selectSubmit(data) {
      this.activities.forEach((item, index) => {
        if (index === this.index) {
          this.$set(item, 'personnel', data)
        }
      })
      this.$emit('selectPersonnel', this.activities)
    },
    closeTag(key, data, itemIndex) {
      this.activities.forEach((item, index) => {
        if (index === key) {
          item.personnel.splice(itemIndex, 1)
        }
      })
      this.$emit('selectPersonnel', this.activities)
    },
    handleClose() {
      this.selectAll = []
    },
    showDialog(index, data) {
      this.selectAll = data
      this.isShowApproverDialog = true
      this.index = index
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-timeline {
  margin-top: 60px;
  .el-timeline-item {
    padding-bottom: 0px;
    height: 120px;
    .el-timeline-item__tail {
      border-left: 2px solid #1791ff;
    }
    .el-timeline-item__node {
      background: #1791ff;
    }
  }
}
::v-deep .el-tag {
  margin-right: 8px;
  color: #1791ff;
}
::v-deep .btns {
  .el-button {
    height: 32px;
    line-height: 0px;
    font-size: 14px;
    font-weight: 400;
    color: #595959;
  }
}
.prompt {
  text-align: center;
}
.titmeLineItem {
  .top {
    .btns {
      margin-left: 30px;
      .tagTop {
        margin-top: 16px;
      }
      .tag {
        width: 100%;
        display: flex;
      }
    }
  }
}
</style>
