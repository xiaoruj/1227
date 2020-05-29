<template>
  <el-form label-width="100px">
    <el-form-item label="SPU 名称">
      <span>{{spu.spuName}}</span>
    </el-form-item>

    <el-form-item label="SKU 名称">
      <el-input type="text" placeholder="SKU 名称" v-model="skuInfo.skuName"></el-input>
    </el-form-item>

    <el-form-item label="价格">
      <el-input type="number" placeholder="SKU 价格" v-model="skuInfo.price"></el-input>
    </el-form-item>

    <el-form-item label="重量(千克)">
      <el-input type="number" placeholder="SKU 重量" v-model="skuInfo.weight"></el-input>
    </el-form-item>

    <el-form-item label="规格描述">
      <el-input type="textarea" placeholder="SKU 规格描述" rows="4" v-model="skuInfo.skuDesc"></el-input>
    </el-form-item>

    <el-form-item label="平台属性">
      <el-form inline label-width="100px">
        <el-form-item :label="attr.attrName" style="margin: 5px" v-for="attr in attrList" :key="attr.id">
          <el-select v-model="attr.attrIdValueId">
            <el-option :label="value.valueName" :value="attr.id + ':' + value.id" v-for="value in attr.attrValueList" :key="value.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-form inline label-width="100px">
        <el-form-item :label="attr.saleAttrName" style="margin: 5px" v-for="attr in spuSaleAttrList" :key="attr.id">
          <el-select v-model="attr.saleAttrValueId">
            <el-option :label="value.saleAttrValueName" :value="value.id" v-for="value in attr.spuSaleAttrValueList" :key="value.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <el-form-item label="图片列表">
      <el-table border :data="spuImageList" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{row}">
            <img :src="row.imgUrl" alt="" style="width:100px;height:100px;">
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row, $index}">
            <el-tag v-if="row.isDefault==='1'" type="success">默认</el-tag>
            <el-button v-else type="primary" size="mini" @click="setDefaultImg(row)">设为默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="back">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SkuForm',
  props:{
    saveSuccess:Function,
  },
  data(){
    return{
      spu:{},
      skuInfo:{
        category3Id: null,
        spuId: null,
        tmId: null,
        skuName: null,
        skuDesc: '',
        price: null,
        weight: null,
        skuDefaultImg: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: [],
      },
      attrList:[],
      spuSaleAttrList:[],
      spuImageList:[],
      selectedSpuImageList: [],
    }
  },
  methods:{
    async save(){
      const {skuInfo, attrList, spuSaleAttrList, selectedSpuImageList} = this
      skuInfo.skuAttrValueList = attrList.reduce((pre, attr) => {
        if (attr.attrIdValueId) {
          const [attrId, valueId] = attr.attrIdValueId.split(':')
          pre.push({
            attrId,
            valueId
          })
        }
        return pre
      }, [])
      skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((pre, attr) => {
        if (attr.saleAttrValueId) {
          pre.push({
            saleAttrValueId: attr.saleAttrValueId
          })
        }
        return pre
      }, [])
      skuInfo.skuImageList = selectedSpuImageList.map(image => ({
        imgName: image.imgName,
        imgUrl: image.imgUrl,
        spuImgId: image.id,
        isDefault: image.isDefault
      }))
      const result = await this.$API.sku.addUpdate(skuInfo)
      if(result.code===200){
        this.$message.success('保存SKU成功')
        this.resetData()
        this.saveSuccess()
      }else{
        this.$message.error('保存SKU信息失败')
      }

    },
    setDefaultImg(spuImg){
      this.spuImageList.forEach(item => item.isDefault = '0')
      spuImg.isDefault = '1'
      this.skuInfo.skuDefaultImg = spuImg.imgUrl
    },
    handleSelectionChange(value){
      this.selectedSpuImageList = value
    },
    initLoadAddData(spu){
      this.spu = spu
      this.skuInfo.category3Id = spu.category3Id
      this.skuInfo.spuId = spu.id
      this.skuInfo.tmId = spu.tmId
      this.getData()
    },
    async getData(){
      const {category1Id, category2Id, category3Id, id} = this.spu
      const promise1 = this.$API.attr.getList(category1Id, category2Id, category3Id)
      const promise2 = this.$API.sku.getSpuImageList(id)
      const promise3 = this.$API.sku.getSpuSaleAttrList(id)
      const results = await Promise.all([promise1, promise2, promise3])
      this.attrList = results[0].data
      const spuImageList = results[1].data.map(item => ({...item, isDefault: '0'}))
      this.spuImageList = spuImageList
      this.spuSaleAttrList = results[2].data
    },
    back(){
      this.resetData()
      this.$emit('cancel')
    },
    resetData(){
       this.skuInfo = {
        category3Id: '',
        spuId: '',
        tmId: '',
        skuName: '',
        skuDesc: '',
        price: '',
        weight: '',
        skuDefaultImg: '',
        skuAttrValueList: [],
        skuSaleAttrValueList: [],
        skuImageList: [],
      },
      this.spu = {},
      this.attrList = []
      this.spuImageList = []
      this.spuSaleAttrList = []
      this.selectedImageList = []
    },
  }
}
</script>

<style>

</style>

