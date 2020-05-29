import request from "@/utils/request";
export default {
  getList(category1Id, category2Id, category3Id) {
    return request(
      `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    );
  },
  remove(id) {
    return request.delete(`/admin/product/deleteAttr/${id}`);
  },
  getValueList(attrId) {
    return request(`/admin/product/getAttrValueList/${attrId}`);
  },
  addOrUpdate(attrInfo) {
    return request.post("/admin/product/saveAttrInfo", attrInfo);
  }
};
