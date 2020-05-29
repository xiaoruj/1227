import request from "@/utils/request";
export default {
  getSaleList() {
    return request.get("/admin/product/baseSaleAttrList");
  },
  remove(id) {
    return request.delete(`/admin/product/deleteSpu/${id}`);
  },
  get(id) {
    return request.get(`/admin/product/getSpuById/${id}`);
  },
  addUpdate(spuInfo) {
    return request.post(
      `/admin/product/${spuInfo.id ? "update" : "save"}SpuInfo`,
      spuInfo
    );
  },
  getList(page, limit, category3Id) {
    return request.get(`/admin/product/${page}/${limit}`, {
      params: { category3Id }
    });
  }
};
