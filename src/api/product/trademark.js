import request from "@/utils/request";
const api_name = "/admin/product/baseTrademark";
export default {
  getById(id) {
    return request.get(`${api_name}/get/${id}`);
  },
  getList(page, limit) {
    if (page && limit) {
      return request(`/admin/product/baseTrademark/${page}/${limit}`);
    } else {
      return request(`/admin/product/baseTrademark/getTrademarkList`);
    }
  },
  remove(id){
    return request.delete(`/admin/product/baseTrademark/remove/${id}`)
  },
  add(trademark) {
    return request.post(`${api_name}/save`, trademark);
  },
  update(trademark) {
    return request.put(`${api_name}/update`, trademark);
  }
};
