import request from "@/utils/request";
export default {
  cancelSale(skuId) {
    return request.get(`/admin/product/cancelSale/${skuId}`);
  },
  onSale(skuId) {
    return request.get(`/admin/product/onSale/${skuId}`);
  },
  remove(skuId) {
    return request.delete(`/admin/product/deleteSku/${skuId}`);
  },
  getListBySpuId(spuId) {
    return request.get(`/admin/product/findBySpuId/${spuId}`);
  },
  get(skuId) {
    return request.get(`/admin/product/getSkuById/${skuId}`);
  },

  getList(page, limit) {
    return request.get(`/admin/product/list/${page}/${limit}`);
  },
  addUpdate(skuInfo) {
    return request.post(
      `/admin/product/${skuInfo.id ? "update" : "save"}SkuInfo`,
      skuInfo
    );
  },
  getSpuImageList(spuId) {
    return request.get(`/admin/product/spuImageList/${spuId}`);
  },
  getSpuSaleAttrList(spuId) {
    return request.get(`/admin/product/spuSaleAttrList/${spuId}`);
  }
};
