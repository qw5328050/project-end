<template>
  <div class="materialsNeeded_container">
    <!-- <div class="materialsNeededTop">
      <div class="title">
        {{ headerTitle }}
      </div>
    </div> -->
    <el-card class="table_box" style="margin-bottom: -2px !important">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">变更税率</span>
      </div>
      <!-- <div class="table_content"> -->
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="margin-top: 20px"
        :label-position="labelPosition"
      >
        <div class="text item">
          <!-- <hr style="width:100%;"> -->
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="新税率" prop="features">
                <el-input
                  v-model="form.features"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                >
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="新税率生效时间" prop="address">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="原税率失效时间" prop="features">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="说明" prop="accessAuthorityId">
                <el-input
                  v-model="form.accessAuthorityId"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <p>变更合同金额</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="补充金额" prop="accessAuthorityId">
                  <el-input
                    v-model="form.accessAuthorityId"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="补充说明" prop="features">
                  <el-input
                    v-model="form.features"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <p>变更结算周期</p>
            <el-row>
              <el-col :span="8">
                <el-form-item label="结算周期" prop="accessAuthorityId">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="生效时间" prop="accessAuthorityId">
                  <el-date-picker
                    v-model="value1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="使用方" prop="features">
                  <el-input
                    v-model="form.features"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row> -->
        </div>
      </el-form>
      <!-- </div> -->
    </el-card>
    <el-card
      class="table_box"
      style="margin-top: -2px !important; margin-bottom: -2px !important"
    >
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">变更合同金额</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="margin-top: 20px"
      >
        <div class="text item">
          <!-- <p>变更合同金额</p> -->
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="补充金额" prop="accessAuthorityId">
                <el-input
                  v-model="form.accessAuthorityId"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="补充说明" prop="features">
                <el-input
                  v-model="form.features"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-card>
    <el-card class="table_box" style="margin-top: -2px !important">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">变更结算周期</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="margin-top: 20px"
      >
        <div class="text item">
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="结算周期" prop="accessAuthorityId">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="生效时间" prop="accessAuthorityId">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  placeholder="选择日期"
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="使用方" prop="features">
                <el-input
                  v-model="form.features"
                  placeholder="请输入"
                  clearable
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div style="margin-left: 90%; margin-bottom: 16px">
          <el-button size="small" @click="addButton(3)">导入</el-button>
          <el-button size="small" @click="addButton(3)">下载模板</el-button>
        </div>
        <el-table
          :data="list"
          max-height="200"
          style="width: 100%; margin-top: 10px"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column type="selection" width="50" align="left" />
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="物资大类">
            <template slot-scope="{ row }">
              <el-input v-model="row.type" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="物资小类">
            <template slot-scope="{ row }">
              <el-input v-model="row.type" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="物料名称">
            <template slot-scope="{ row }">
              <el-input v-model="row.type" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="规格型号">
            <template slot-scope="{ row }">
              <el-input v-model="row.type" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="单价/元">
            <template slot-scope="{ row }">
              <el-input v-model="row.type" clearable />
            </template>
          </el-table-column>
          <el-table-column prop="type" label="备注">
            <template slot-scope="{ row }">
              <el-input v-model="row.type" clearable />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="{ row, $index }">
              <el-button
                size="mini"
                type="text"
                @click="handelCopy(row)"
              >复制</el-button>
              <el-popconfirm
                title="确定要删除这一行吗？"
                style="margin-left: 10px"
                @onConfirm="handelDelete(row, $index)"
              >
                <el-button
                  slot="reference"
                  size="mini"
                  type="text"
                >删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <div class="addTableline" @click="addTable">
          <i class="el-icon-plus" />
          新增一行
        </div>
      </el-form>
    </el-card>

    <div class="footer">
      <div class="select_box">
        <div class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <div class="time">2分钟前</div>
        </div>
        <div class="action_buttons">
          <el-button>取消</el-button>
          <el-button>保存</el-button>
          <el-button type="primary">提交</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- </el-dialog> -->
</template>

<script>
// import {
//   AddPedestrianAreaInfo,
//   UpdatePedestrianAreaInfo,
//   CheckPedestrianAreaInfo
//   } from '@/api/pedestrianManagement/district'
export default {
  name: 'AddAndAdit',
  data() {
    return {
      labelPosition: 'top',
      value1: '',
      headerTitle: '', // 头部标题
      list: [{ type: '测试1' }, { type: '测试2' }, { type: '测试3' }],
      disabled: false,
      rules: {
        // 规则
        name: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        address: [{ required: true, message: '请输入位置', trigger: 'blur' }],
        features: [{ required: true, message: '请输入功能', trigger: 'blur' }],
        accessAuthorityId: [
          { required: true, message: '请输入权限', trigger: 'blur' }
        ],
        identity: [{ required: true, message: '请选择身份', trigger: 'blur' }]
      },
      form: {}
    }
  },
  created() {},
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '新增合同'
  },
  methods: {
    // getDetail(id) {
    //   this.loading = true;
    //   CheckPedestrianAreaInfo(this.id).then((res) => {
    //     this.form = { ...res.data };
    //     this.loading = false;
    //   });
    // },
    // 新增行
    addTable() {
      this.list.push({ type: '' })
    },
    // 复制行
    handelCopy(row) {
      this.list.push({ ...row })
    },
    // 删除行
    handelDelete(row, index) {
      this.list.splice(index, 1)
    },
    // 关闭
    handleClose() {
      this.form = {}
      this.$emit('update:visible', false)
      if (this.$refs['form']) {
        this.$refs['form'].clearValidate()
      }
    }
    // 提交按钮
    // submitForm() {
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       if (this.form.id) {
    //         UpdatePedestrianAreaInfo(this.form).then((res) => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.handleClose();
    //           this.$emit("submitForm");
    //         });
    //       } else {
    //         AddPedestrianAreaInfo(this.form).then((res) => {
    //           this.$modal.msgSuccess("添加成功");
    //           this.handleClose();
    //           this.$emit("submitForm");
    //         });
    //       }
    //     }
    //   });
    // },
  }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
<style lang="scss" scoped>
::v-deep .el-card.is-always-shadow,
.el-card.is-hover-shadow:focus,
.el-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 0px 0px 0 rgb(0 0 0 / 0%);
  box-shadow: 0 0px 0px 0 rgb(0 0 0 / 0%);
}
::v-deep .el-card__body {
  padding: 0;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.materialsNeeded_container {
  .materialsNeededTop {
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 0 0 16px 32px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .table_box {
    margin: 16px;
    background: #fff;
    .table_content {
      padding: 19px 24px 24px 24px;
      box-sizing: border-box;
      margin-bottom: 16px;
      .addTableline {
        margin-top: 16px;
        width: 100%;
        height: 40px;
        border: 1px dashed#BFBFBF;
        font-size: 14px;
        font-weight: 400;
        color: #595959;
        line-height: 40px;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .addTableline {
    margin-top: 16px;
    margin-bottom: 16px;
    width: 100%;
    height: 40px;
    border: 1px dashed#BFBFBF;
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    line-height: 40px;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
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
    .select_box {
      display: flex;
      float: right;
      .prompt_information {
        display: flex;
        align-items: center;
        .information {
          font-size: 14px;
          font-weight: 400;
          color: #595959;
          padding-left: 16px;
          padding-right: 8px;
          box-sizing: border-box;
        }
        .time {
          font-size: 12px;
          font-weight: 400;
          color: #bfbfbf;
        }
      }
      .action_buttons {
        box-sizing: border-box;
        padding-left: 16px;
      }
    }
  }
}
</style>
