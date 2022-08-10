<template>
  <div class="workStack">
    <el-row class="header">
      <el-col :span="24">
        <div class="headerWrap">
          <div class="workTitle">
            Hi，{{ $store.getters.userInfo.name }}，早上好！
          </div>
          <div class="workDesc">中国建筑第八工程局南方公司－信息管理中心</div>
        </div>
        <div class="house" />
      </el-col>
    </el-row>
    <el-row :gutter="24" class="body">
      <el-col :xl="18" :lg="16" :md="14" :xs="16" :sm="16" class="left">
        <div class="bodyNumber">
          <div class="deskTotal">
            <div class="doTotal">待办事项总数</div>
            <div class="doNumber">29</div>
          </div>
          <div class="deskWrap">
            <div class="deskItem">
              <div class="doTotal"><span class="dott" />待办事项1</div>
              <div class="doNumber">9</div>
            </div>
            <div class="deskItem">
              <div class="doTotal">
                <span class="dott orange" />待办事项2
              </div>
              <div class="doNumber">19</div>
            </div>
            <div class="deskItem">
              <div class="doTotal">
                <span class="dott blue" />待办事项3
              </div>
              <div class="doNumber">29</div>
            </div>
            <div class="deskItem">
              <div class="doTotal"><span class="dott red" />待办事项4</div>
              <div class="doNumber">8</div>
            </div>
          </div>
        </div>

        <div class="bodyCard">
          <div class="cartTitle">我的待办</div>
          <div class="cartContent">
            <div class="cartItem">
              <el-row style="display: flex; align-items: center">
                <el-col :span="20">
                  <div class="titles">
                    深圳市龙岗区耳鼻喉医院迁址重建工程：物资
                  </div>
                  <div class="content">
                    <div class="start">
                      <span>申请人：</span>
                      <span>范冰冰</span>
                    </div>
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <div class="end">
                      <span>申请时间：</span>
                      <span>2022-02-06</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="approveBtn">
                    <el-button type="primary">去审批</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="cartItem">
              <div class="titles">深圳市龙岗区耳鼻喉医院迁址重建工程：物资</div>
              <div class="content">
                <div class="start">
                  <span>申请人：</span>
                  <span>范冰冰</span>
                </div>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <div class="end">
                  <span>申请时间：</span>
                  <span>2022-02-06</span>
                </div>
              </div>
            </div>
            <div class="cartItem">
              <div class="titles">深圳市龙岗区耳鼻喉医院迁址重建工程：物资</div>
              <div class="content">
                <div class="start">
                  <span>申请人：</span>
                  <span>范冰冰</span>
                </div>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <div class="end">
                  <span>申请时间：</span>
                  <span>2022-02-06</span>
                </div>
              </div>
            </div>
            <div class="cartItem">
              <div class="titles">深圳市龙岗区耳鼻喉医院迁址重建工程：物资</div>
              <div class="content">
                <div class="start">
                  <span>申请人：</span>
                  <span>范冰冰</span>
                </div>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <div class="end">
                  <span>申请时间：</span>
                  <span>2022-02-06</span>
                </div>
              </div>
            </div>
            <div class="cartItem">
              <div class="titles">深圳市龙岗区耳鼻喉医院迁址重建工程：物资</div>
              <div class="content">
                <div class="start">
                  <span>申请人：</span>
                  <span>范冰冰</span>
                </div>
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                <div class="end">
                  <span>申请时间：</span>
                  <span>2022-02-06</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cartAll">
            <span>查看全部<i class="el-icon-arrow-right" /></span>
          </div>
        </div>
        <div class="bodyCard">
          <div class="cartTitle">我的待办</div>
          <div class="cartContent">
            <div class="policeItem">
              <el-row style="display: flex; align-items: center">
                <el-col :span="20">
                  <div class="content">
                    <div class="start">
                      <i class="el-icon-warning" />
                      <span class="word">结算金额超限</span>
                    </div>
                    <div class="center">
                      <i class="el-icon-folder" />
                      <span class="word">合同管理</span>
                    </div>
                    <div class="end">
                      <i class="el-icon-message" />
                      <span class="word">2022-06-22</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="4">
                  <div class="approveBtn">
                    <el-button type="primary">去查看</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="cartAll">
            <span>查看全部<i class="el-icon-arrow-right" /></span>
          </div>
        </div>
      </el-col>
      <el-col :xl="6" :lg="8" :md="10" :xs="8" :sm="8" class="right">
        <div class="infoWrap">
          <div class="person">
            <div class="avtor">
              <img src="" alt="" class="avtorPic">
            </div>
            <div class="personInfo">
              <div class="name">xxxxx</div>
              <div class="number">
                <span>工号</span>
                <span class="ps">A399</span>
              </div>
              <div class="job">
                <span>职位</span>
                <span class="ps">JAVA开发工程师</span>
              </div>
            </div>
          </div>
          <el-button class="logout">退出账号</el-button>
          <div class="lastLogin">最近一次登录时间为： 2017-09-01</div>
        </div>
        <div class="infoContent">
          <div class="fastInWrap">
            <div class="title">快速入口</div>
            <div class="contents">
              <div class="contentItem">
                <img src="" alt="" class="contIcon">
                <div class="content">供应商管理</div>
              </div>
              <div class="contentItem">
                <img src="" alt="" class="contIcon">
                <div class="content">供应商管理</div>
              </div>
              <div class="contentItem">
                <img src="" alt="" class="contIcon">
                <div class="content">供应商管理</div>
              </div>
              <div class="contentItem">
                <img src="" alt="" class="contIcon">
                <div class="content">供应商管理</div>
              </div>
              <div class="contentItem">
                <img src="" alt="" class="contIcon">
                <div class="content">供应商管理</div>
              </div>
            </div>
          </div>
          <div class="fastInWrap">
            <div class="title">公共网址</div>
            <div class="publicCotent">
              <div class="contentItem">
                <i class="el-icon-folder" />
                <div class="content">中建八局平台</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'WorkStack'
}
</script>

<style lang='scss' scoped>
.workStack {
  .header {
    .headerWrap {
      height: 120px;
      margin: 16px;
      // background:lightBlue;
      background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng90edfd0cd085ffc85587ec858b77737d32817bc2511ec0d1388506e538cf6495) -0.28vw -0.14vw
        no-repeat;
      background-size: 98.33vw 8.88vw;
      .workTitle {
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        padding-top: 24px;
        margin-left: 33px;
      }
      .workDesc {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 16px;
        margin-left: 33px;
      }
    }
    .house {
      z-index: 7;
      position: absolute;
      right: 30px;
      top: 20px;
      width: 30.49vw;
      height: 7.8vw;
      background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPngba08e9bc722b4fc3b5bf16e0c101ce02b34a1273ea49d85ec62859f56d801edd)
        100% no-repeat;
    }
  }
  .body {
    margin: 16px;
    .left {
      .bodyNumber {
        display: flex;
        align-items: center;
        background: #fff;
        margin-left: 16px;
        margin-bottom: 16px;
        padding: 32px 0;
        .deskTotal {
          width: 20%;
          font-size: 14px;
          color: #8c8c8c;
          margin-top: 32px;
          padding-left: 33px;
          border-right: 1px solid #cfcfcf;
          .doNumber {
            font-size: 30px;
            color: #262626;
            margin-top: 16px;
          }
        }
        .deskWrap {
          width: 80%;
          display: flex;
          align-items: center;

          .deskItem {
            width: 25%;
            text-align: center;
            .doTotal {
              font-size: 14px;
              color: #8c8c8c;
              margin-top: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              .dott {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-right: 10px;
                background: #d9d9d9;
              }
              .orange {
                background: #ff9900;
              }
              .blue {
                background: #1791ff;
              }
              .red {
                background: #eb4210;
              }
            }
            .doNumber {
              font-size: 30px;
              color: #262626;
              margin-top: 16px;
            }
          }
        }
      }

      .bodyCard {
        // height: 508px;
        background: #ffffff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
        border-radius: 2px;
        margin-left: 16px;
        .cartTitle {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #262626;
          padding: 19px 0;
          margin-left: 16px;
          border-bottom: 1px solid #cfcfcf;
        }
        .cartContent {
          color: #262626;
          font-size: 14px;
          .cartItem {
            border-bottom: 1px solid #cfcfcf;
            .titles {
              margin-top: 16px;
              margin-left: 16px;
            }
            .content {
              color: #8c8c8c;
              display: flex;
              align-items: center;
              margin-top: 8px;
              margin-left: 16px;
              margin-bottom: 16px;
              .start {
                margin-right: 10px;
              }
              .end {
                margin-left: 10px;
              }
            }
          }

          .policeItem {
            border-bottom: 1px solid #cfcfcf;
            .content {
              color: #262626;
              display: flex;
              align-items: center;
              // margin-top:8px;
              margin-left: 16px;
              // margin-bottom: 16px;
              padding: 17px 0;
              .start {
                margin-right: 10px;
                i {
                  color: #eb4210;
                }
                .word {
                  margin-left: 5px;
                }
              }
              .center {
                color: #8c8c8c;
                margin-right: 10px;
                .word {
                  margin-left: 5px;
                }
              }
              .end {
                color: #8c8c8c;
                margin-right: 10px;
                .word {
                  margin-left: 5px;
                }
              }
            }
          }
        }
        .cartAll {
          height: 48px;
          line-height: 48px;
          background: #f7f7f7;
          text-align: center;
          color: #8c8c8c;
        }
      }
    }
    .right {
      .infoWrap {
        background: #fff;
        padding-top: 16px;
        .person {
          margin-left: 16px;
          display: flex;
          position: relative;
          .avtor {
            .avtorPic {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }
          }
          .personInfo {
            margin-left: 24px;
            font-size: 14px;
            .name {
              font-size: 18px;
              color: #262626;
            }
            .number {
              color: #595959;
              margin-top: 16px;
              .ps {
                color: #262626;
                margin-left: 10px;
              }
            }
            .job {
              color: #595959;
              margin-top: 5px;
              .ps {
                color: #262626;
                margin-left: 10px;
              }
            }
          }
        }
        .logout {
          position: absolute;
          right: 30px;
          top: 10px;
        }
        .lastLogin {
          height: 48px;
          line-height: 48px;
          text-align: center;
          margin-top: 36px;
          background: rgba(28, 147, 255, 0.05);
        }
      }
      .infoContent {
        margin-top: 16px;
        background: #fff;
        .fastInWrap {
          .title {
            font-size: 16px;
            color: #262626;
            margin-left: 16px;
            margin-top: 18px;
            padding: 18px 0;
            border-bottom: 1px solid #f5f5f5;
          }
          .contents {
            color: #000;
            display: flex;
            flex-wrap: wrap;
            padding: 16px;
            .contentItem {
              text-align: center;
              font-size: 14px;
              width: 100px;
              margin-bottom: 16px;
              margin-right: 16px;
              .contIcon {
                display: block;
                width: 24px;
                height: 24px;
                margin: 24px auto 0 auto;
              }
              .content {
                margin-top: 18px;
              }
            }
          }
          .publicCotent {
            color: #000;
            .contIcon {
              margin-left: 32px;
            }
            i {
              margin: 0 10px 0 16px;
            }
            .contentItem {
              display: flex;
              font-size: 14px;
              align-items: center;
              padding: 13px 0;
            }
          }
        }
      }
    }
  }
}
</style>
