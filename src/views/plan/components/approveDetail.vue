<template>
  <div>
    <el-card v-if="xmlData.length > 0" class="box-card" shadow="never">
      <process-viewer
        v-if="xmlData.length > 0"
        :key="`designer-${loadIndex}`"
        :style="'height:' + height"
        :xml="xmlData"
        :finished-info="finishedInfo"
        :all-comment-list="null"
      />
    </el-card>
  </div>
</template>

<script>
import ProcessViewer from './processViewer.vue'
import { readXml, readNode } from '@/api/plan/mad'
export default {
  name: 'ApproveDetail',
  components: {
    ProcessViewer
  },
  props: ['info'],
  data() {
    return {
      deployId: '',
      procInsId: '',
      // height: document.documentElement.clientHeight - 100 + 'px;',
      height: (screen.height - 500) + 'px',
      // 模型xml数据
      loadIndex: 0,
      xmlData: '',
      finishedInfo: {
        finishedSequenceFlowSet: [],
        finishedTaskSet: [],
        unfinishedTaskSet: [],
        rejectedTaskSet: []
      }
    }
  },
  created() {
    this.initAction()
  },
  mounted() {
    // this.initData()
  },
  methods: {
    initAction() {
      // const {deployId,procInsId} = this.$route.query
      const { processInstanceId, processDefinitionId } = this.info
      this.deployId = processDefinitionId
      this.procInsId = processInstanceId
      this.initData()
    },
    async getFlowViewer() {
      return new Promise(resolve => {
        readNode(this.procInsId).then(res => {
          if (res.status === 200) {
            const data = res.data
            // this.finishedInfo.finishedTaskSet = data.finishedTaskSet;
            // this.finishedInfo.unfinishedTaskSet = data.unfinishedTaskSet;
            // this.finishedInfo.rejectedTaskSet = data.rejectedTaskSet;
            // this.finishedInfo.finishedSequenceFlowSet = data.finishedSequenceFlowSet;
            resolve(data)
          } else {
            this.$message.error('请求失败')
            return
          }
        })
      })
    },
    /** xml 文件 */
    async getModelDetail() {
      return new Promise(resolve => {
        // 发送请求，获取xml
        readXml(this.deployId).then(res => {
          if (res.status === 200) {
            // this.xmlData = res.data
            resolve(res.data)
          } else {
            this.$message.error('请求失败')
            return
          }
        })
      })
    },
    initData() {
      Promise.all([this.getModelDetail(), this.getFlowViewer()]).then((res) => {
        const xmlData = res[0]
        const data = res[1]
        this.xmlData = xmlData
        this.finishedInfo.finishedTaskSet = data.finishedTaskSet
        this.finishedInfo.unfinishedTaskSet = data.unfinishedTaskSet
        this.finishedInfo.rejectedTaskSet = data.rejectedTaskSet
        this.finishedInfo.finishedSequenceFlowSet = data.finishedSequenceFlowSet
      })
      // this.xmlData ='<?xml version="1.0" encoding="UTF-8"?><bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" id="diagram_purchaseOrderPlacing" targetNamespace="http://flowable.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">  <bpmn2:process id="purchaseOrderPlacing" name="业务流程_1655273691427" isExecutable="true">    <bpmn2:startEvent id="Event_10mis0a">      <bpmn2:outgoing>Flow_1dwkl8k</bpmn2:outgoing>    </bpmn2:startEvent>    <bpmn2:userTask id="Activity_0ca0lo9" name="发起人" flowable:dataType="INITIATOR" flowable:assignee="${initiator}" flowable:text="流程发起人">      <bpmn2:incoming>Flow_1dwkl8k</bpmn2:incoming>      <bpmn2:outgoing>Flow_16e4xrm</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_1dwkl8k" sourceRef="Event_10mis0a" targetRef="Activity_0ca0lo9" />    <bpmn2:userTask id="Activity_0ziontp" name="项目经理" flowable:dataType="dynamic" flowable:assignee="${projectManagerApproval}">      <bpmn2:extensionElements>        <flowable:taskListener delegateExpression="${businessTaskListener}" event="complete" id="ashdasdas">          <flowable:field name="callBack">            <flowable:string>/purchase-service/FeignCallBack/orderApprovalCallback</flowable:string>          </flowable:field>        </flowable:taskListener>      </bpmn2:extensionElements>      <bpmn2:incoming>Flow_16e4xrm</bpmn2:incoming>      <bpmn2:outgoing>Flow_12wt6ll</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_16e4xrm" sourceRef="Activity_0ca0lo9" targetRef="Activity_0ziontp" />    <bpmn2:endEvent id="Event_15x1nbp">      <bpmn2:incoming>Flow_12wt6ll</bpmn2:incoming>    </bpmn2:endEvent>    <bpmn2:sequenceFlow id="Flow_12wt6ll" sourceRef="Activity_0ziontp" targetRef="Event_15x1nbp" />  </bpmn2:process>  <bpmndi:BPMNDiagram id="BPMNDiagram_1">    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="purchaseOrderPlacing">      <bpmndi:BPMNEdge id="Flow_12wt6ll_di" bpmnElement="Flow_12wt6ll">        <di:waypoint x="620" y="190" />        <di:waypoint x="682" y="190" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_16e4xrm_di" bpmnElement="Flow_16e4xrm">        <di:waypoint x="460" y="190" />        <di:waypoint x="520" y="190" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_1dwkl8k_di" bpmnElement="Flow_1dwkl8k">        <di:waypoint x="308" y="190" />        <di:waypoint x="360" y="190" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="Event_10mis0a_di" bpmnElement="Event_10mis0a">        <dc:Bounds x="272" y="172" width="36" height="36" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_0ca0lo9_di" bpmnElement="Activity_0ca0lo9">        <dc:Bounds x="360" y="150" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_0ziontp_di" bpmnElement="Activity_0ziontp">        <dc:Bounds x="520" y="150" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Event_15x1nbp_di" bpmnElement="Event_15x1nbp">        <dc:Bounds x="682" y="172" width="36" height="36" />      </bpmndi:BPMNShape>    </bpmndi:BPMNPlane>  </bpmndi:BPMNDiagram></bpmn2:definitions>'
      // const data = {
      //     "finishedTaskSet": [
      //         "Activity_07bjs0u",
      //         "Activity_13v3q0y",
      //         "Event_1bki9pa",
      //         "Activity_1iza0d2"
      //     ],
      //     "finishedSequenceFlowSet": [
      //         "Flow_0mspxv3",
      //         "Flow_0xkmqcy",
      //         "Flow_1tcn68c"
      //     ],
      //     "unfinishedTaskSet": [
      //         "Activity_07bjs0u"
      //     ],
      //     "rejectedTaskSet": []
      //     };
      // this.finishedInfo.finishedTaskSet = data.finishedTaskSet;
      // this.finishedInfo.unfinishedTaskSet = data.unfinishedTaskSet;
      // this.finishedInfo.rejectedTaskSet = data.rejectedTaskSet;
      // this.finishedInfo.finishedSequenceFlowSet = data.finishedSequenceFlowSet;
    },
    testData() {
      // this.xmlData = '<?xml version="1.0" encoding="UTF-8"?><bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" id="diagram_process_xa2gg3vg" targetNamespace="http://flowable.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">  <bpmn2:process id="process_xa2gg3vg" name="业务流程_1655255753799" isExecutable="true">    <bpmn2:startEvent id="Event_1bki9pa" name="开始">      <bpmn2:outgoing>Flow_0xkmqcy</bpmn2:outgoing>    </bpmn2:startEvent>    <bpmn2:userTask id="Activity_1iza0d2" name="项目商务部申请" flowable:dataType="INITIATOR" flowable:assignee="${initiator}" flowable:text="流程发起人">      <bpmn2:incoming>Flow_0xkmqcy</bpmn2:incoming>      <bpmn2:outgoing>Flow_1tcn68c</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_0xkmqcy" sourceRef="Event_1bki9pa" targetRef="Activity_1iza0d2" />    <bpmn2:userTask id="Activity_13v3q0y" name="项目经理审批" flowable:dataType="dynamic" flowable:assignee="${pmApprove}">      <bpmn2:incoming>Flow_1tcn68c</bpmn2:incoming>      <bpmn2:outgoing>Flow_0mspxv3</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_1tcn68c" sourceRef="Activity_1iza0d2" targetRef="Activity_13v3q0y" />    <bpmn2:userTask id="Activity_07bjs0u" name="项目物资部审批" flowable:dataType="dynamic" flowable:assignee="${materialApprove}">      <bpmn2:extensionElements>        <flowable:taskListener delegateExpression="${businessTaskListener}" event="complete" id="businessTaskListener">          <flowable:field name="callBack">            <flowable:string>:8005/plan-service/overall/updateStatus</flowable:string>          </flowable:field>        </flowable:taskListener>      </bpmn2:extensionElements>      <bpmn2:incoming>Flow_0mspxv3</bpmn2:incoming>      <bpmn2:outgoing>Flow_151stdn</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_0mspxv3" sourceRef="Activity_13v3q0y" targetRef="Activity_07bjs0u" />    <bpmn2:endEvent id="Event_08qm66v" name="结束">      <bpmn2:incoming>Flow_151stdn</bpmn2:incoming>    </bpmn2:endEvent>    <bpmn2:sequenceFlow id="Flow_151stdn" sourceRef="Activity_07bjs0u" targetRef="Event_08qm66v" />  </bpmn2:process>  <bpmndi:BPMNDiagram id="BPMNDiagram_1">    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process_xa2gg3vg">      <bpmndi:BPMNEdge id="Flow_0xkmqcy_di" bpmnElement="Flow_0xkmqcy">        <di:waypoint x="318" y="170" />        <di:waypoint x="370" y="170" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_1tcn68c_di" bpmnElement="Flow_1tcn68c">        <di:waypoint x="470" y="170" />        <di:waypoint x="530" y="170" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_0mspxv3_di" bpmnElement="Flow_0mspxv3">        <di:waypoint x="630" y="170" />        <di:waypoint x="690" y="170" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_151stdn_di" bpmnElement="Flow_151stdn">        <di:waypoint x="790" y="170" />        <di:waypoint x="852" y="170" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="Event_1bki9pa_di" bpmnElement="Event_1bki9pa">        <dc:Bounds x="282" y="152" width="36" height="36" />        <bpmndi:BPMNLabel>          <dc:Bounds x="289" y="195" width="22" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_1iza0d2_di" bpmnElement="Activity_1iza0d2">        <dc:Bounds x="370" y="130" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_13v3q0y_di" bpmnElement="Activity_13v3q0y">        <dc:Bounds x="530" y="130" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_07bjs0u_di" bpmnElement="Activity_07bjs0u">        <dc:Bounds x="690" y="130" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Event_08qm66v_di" bpmnElement="Event_08qm66v">        <dc:Bounds x="852" y="152" width="36" height="36" />        <bpmndi:BPMNLabel>          <dc:Bounds x="859" y="195" width="22" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>    </bpmndi:BPMNPlane>  </bpmndi:BPMNDiagram></bpmn2:definitions>'
      this.xmlData = '<?xml version="1.0" encoding="UTF-8"?><bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:flowable="http://flowable.org/bpmn" id="diagram_process_xa2gg3vg" targetNamespace="http://flowable.org/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">  <bpmn2:process id="process_xa2gg3vg" name="业务流程_1655255753799" isExecutable="true">    <bpmn2:startEvent id="Event_1bki9pa" name="开始">      <bpmn2:outgoing>Flow_0xkmqcy</bpmn2:outgoing>    </bpmn2:startEvent>    <bpmn2:userTask id="Activity_1iza0d2" name="项目商务部申请" flowable:dataType="INITIATOR" flowable:assignee="${initiator}" flowable:text="流程发起人">      <bpmn2:incoming>Flow_0xkmqcy</bpmn2:incoming>      <bpmn2:outgoing>Flow_1tcn68c</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_0xkmqcy" sourceRef="Event_1bki9pa" targetRef="Activity_1iza0d2" />    <bpmn2:userTask id="Activity_13v3q0y" name="项目经理审批" flowable:dataType="dynamic" flowable:assignee="${pmApprove}">      <bpmn2:incoming>Flow_1tcn68c</bpmn2:incoming>      <bpmn2:outgoing>Flow_0mspxv3</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_1tcn68c" sourceRef="Activity_1iza0d2" targetRef="Activity_13v3q0y" />    <bpmn2:userTask id="Activity_07bjs0u" name="项目物资部审批" flowable:dataType="dynamic" flowable:assignee="${materialApprove}">      <bpmn2:extensionElements>        <flowable:taskListener delegateExpression="${businessTaskListener}" event="complete" id="businessTaskListener">          <flowable:field name="callBack">            <flowable:string>/plan-service/overallPlan/updateStatus</flowable:string>          </flowable:field>        </flowable:taskListener>      </bpmn2:extensionElements>      <bpmn2:incoming>Flow_0mspxv3</bpmn2:incoming>      <bpmn2:outgoing>Flow_151stdn</bpmn2:outgoing>      <bpmn2:outgoing>Flow_0h4igdv</bpmn2:outgoing>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_0mspxv3" sourceRef="Activity_13v3q0y" targetRef="Activity_07bjs0u" />    <bpmn2:endEvent id="Event_08qm66v" name="结束">      <bpmn2:incoming>Flow_151stdn</bpmn2:incoming>    </bpmn2:endEvent>    <bpmn2:sequenceFlow id="Flow_151stdn" name="否" sourceRef="Activity_07bjs0u" targetRef="Event_08qm66v" />    <bpmn2:userTask id="Activity_1rm8eiu" name="分公司总经济师审批" flowable:dataType="dynamic" flowable:assignee="${companyApprove}">      <bpmn2:extensionElements>        <flowable:taskListener delegateExpression="${businessTaskListener}" event="complete" id="businessTaskListener">          <flowable:field name="callBack">            <flowable:string>/plan-service/overallPlan/updateChangeStatus</flowable:string>          </flowable:field>        </flowable:taskListener>        <flowable:properties>          <flowable:property name="isChange" value="true" />        </flowable:properties>      </bpmn2:extensionElements>      <bpmn2:incoming>Flow_0h4igdv</bpmn2:incoming>    </bpmn2:userTask>    <bpmn2:sequenceFlow id="Flow_0h4igdv" name="是否变更" sourceRef="Activity_07bjs0u" targetRef="Activity_1rm8eiu">      <bpmn2:conditionExpression xsi:type="bpmn2:tFormalExpression">${isChange==true}</bpmn2:conditionExpression>    </bpmn2:sequenceFlow>  </bpmn2:process>  <bpmndi:BPMNDiagram id="BPMNDiagram_1">    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process_xa2gg3vg">      <bpmndi:BPMNEdge id="Flow_151stdn_di" bpmnElement="Flow_151stdn">        <di:waypoint x="790" y="170" />        <di:waypoint x="852" y="170" />        <bpmndi:BPMNLabel>          <dc:Bounds x="816" y="152" width="11" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_0mspxv3_di" bpmnElement="Flow_0mspxv3">        <di:waypoint x="630" y="170" />        <di:waypoint x="690" y="170" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_1tcn68c_di" bpmnElement="Flow_1tcn68c">        <di:waypoint x="470" y="170" />        <di:waypoint x="530" y="170" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_0xkmqcy_di" bpmnElement="Flow_0xkmqcy">        <di:waypoint x="318" y="170" />        <di:waypoint x="370" y="170" />      </bpmndi:BPMNEdge>      <bpmndi:BPMNEdge id="Flow_0h4igdv_di" bpmnElement="Flow_0h4igdv">        <di:waypoint x="740" y="210" />        <di:waypoint x="740" y="280" />        <bpmndi:BPMNLabel>          <dc:Bounds x="733" y="242" width="44" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNEdge>      <bpmndi:BPMNShape id="Event_1bki9pa_di" bpmnElement="Event_1bki9pa">        <dc:Bounds x="282" y="152" width="36" height="36" />        <bpmndi:BPMNLabel>          <dc:Bounds x="289" y="195" width="22" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_1iza0d2_di" bpmnElement="Activity_1iza0d2">        <dc:Bounds x="370" y="130" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_13v3q0y_di" bpmnElement="Activity_13v3q0y">        <dc:Bounds x="530" y="130" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_07bjs0u_di" bpmnElement="Activity_07bjs0u">        <dc:Bounds x="690" y="130" width="100" height="80" />      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Event_08qm66v_di" bpmnElement="Event_08qm66v">        <dc:Bounds x="852" y="152" width="36" height="36" />        <bpmndi:BPMNLabel>          <dc:Bounds x="859" y="195" width="22" height="14" />        </bpmndi:BPMNLabel>      </bpmndi:BPMNShape>      <bpmndi:BPMNShape id="Activity_1rm8eiu_di" bpmnElement="Activity_1rm8eiu">        <dc:Bounds x="690" y="280" width="100" height="80" />      </bpmndi:BPMNShape>    </bpmndi:BPMNPlane>  </bpmndi:BPMNDiagram></bpmn2:definitions>'
      const data = { 'finishedTaskSet': ['Activity_07bjs0u', 'Activity_13v3q0y', 'Event_1bki9pa', 'Activity_1iza0d2'], 'finishedSequenceFlowSet': ['Flow_0mspxv3', 'Flow_0xkmqcy', 'Flow_1tcn68c'], 'unfinishedTaskSet': ['Activity_1iza0d2'], 'rejectedTaskSet': ['Flow_0mspxv3', 'Activity_07bjs0u', 'Activity_13v3q0y', 'Flow_1tcn68c'] }
      this.finishedInfo.finishedTaskSet = data.finishedTaskSet
      this.finishedInfo.unfinishedTaskSet = data.unfinishedTaskSet
      this.finishedInfo.rejectedTaskSet = data.rejectedTaskSet
      this.finishedInfo.finishedSequenceFlowSet = data.finishedSequenceFlowSet
    }
  }

}
</script>
