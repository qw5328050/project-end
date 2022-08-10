import request from '@/utils/request'

// 获取待办列表
export function taskList(params) {
    return request({
        url: '/bpm-service/flowable/task/todoList',
        method: 'get',
        params
    })
}
// 审批任务
export function approveTask(params) {
    return request({
        url: '/bpm-service/flowable/task/complete',
        method: 'post',
        data: params
    })
}
// 审批流程
export function approvalProgress(params) {
    return request({
        // url: '/bpm-service/flowable/definition/approvalProgress',
        url: 'bpm-service/flowable/task/flowRecord',
        method: 'get',
        params
    })
}
// 审批流程
export function batchComplete(params) {
    return request({
        url: '/bpm-service/flowable/task/batchComplete',
        method: 'post',
        data: params
    })
}
/** 已办任务列表 */
export function finishedList(params) {
    return request({
        url: '/bpm-service/flowable/task/finishedList',
        method: 'get',
        params
    })
}
/** 提交的任务列表 */
export function myProcess(params) {
    return request({
        url: '/bpm-service/flowable/task/myProcess',
        method: 'get',
        params
    })
}
/** 退回任务 */
export function returnTask(params) {
    return request({
        url: '/bpm-service/flowable/task/return',
        method: 'post',
        data: params
    })
}
/** 批量退回任务 */
export function batchReturn(params) {
    return request({
        url: '/bpm-service/flowable/task/batchReturn',
        method: 'post',
        data: params
    })
}
/** 跳转总计划，获取参数 */
export function overallPlanDetaiil(params) {
    return request({
        url: '/plan-service/overallPlan/detailPlan',
        method: 'get',
        params
    })
}
/** 撤回流程 */
export function revokeProcess(params) {
    return request({
        url: '/bpm-service/flowable/task/revokeProcess',
        method: 'post',
        data: params
    })
}
/** 编辑跳转前请求接口 */
export function checkConcreteType(params) {
    return request({
        url: '/plan-service/needPlan/checkConcreteType',
        method: 'get',
        params
    })
}




