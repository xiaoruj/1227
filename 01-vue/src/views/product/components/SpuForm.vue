<template>
  <el-form label-width="100px" v-show="visible">
    <el-form-item label="SPU名称">
      <el-input type="text" placeholder="SPU名称" v-model="spuInfo.spuName"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-select placeholder="请选择品牌" v-model="spuInfo.tmId">
        <el-option :label="tm.tmName" :value="tm.id" v-for="tm in trademarkList" :key="tm.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input type="textarea" placeholder="SPU描述" rows="4" v-model="spuInfo.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        multiple
        :file-list="spuImageList"
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleSuccess">
        <i class="el-icon-plus"></i>
      </el-upload>
      <!-- 显示大图的dialog -->
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </el-form-item>

    <el-form-item label="销售属性">
      <el-select v-model="attrIdAttrName" :placeholder="unUsedSaleAttrList.length>0 ? `还有${unUsedSaleAttrList.length}个未使用` : '没有啦!!!'" value="">
        <el-option :label="attr.name" :value="attr.id + ':' + attr.name" v-for="attr in unUsedSaleAttrList" :key="attr.id"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" @click="addSpuSaleAttr"
        :disabled="!attrIdAttrName">添加销售属性</el-button>

      <el-table
        style="margin-top: 20px"
        border
        :data="spuInfo.spuSaleAttrList"
      >
        <!-- 序号列 -->
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center">
        </el-table-column>

        <el-table-column label="属性名" prop="saleAttrName" width="150px">
        </el-table-column>
        <el-table-column label="属性值名称列表">
          <template slot-scope="{row, $index}">
            <el-tag
              style="margin-right: 5px"
              v-for=" (value, index) in row.spuSaleAttrValueList"
              :key="value.id"
              closable
              :disable-transitions="false"
              @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
              {{value.saleAttrValueName}}
            </el-tag>
            <el-input
              style="width: 100px"
              placeholder="请输入名称"
              v-if="row.edit"
              v-model="row.saleAttrValueName"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(row)"
              @blur="handleInputConfirm(row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">+ 添加</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="address" label="操作" width="150px">
          <template slot-scope="{row, $index}">
            <el-popconfirm :title="`确定删除属性吗?`" @onConfirm="deleteAttr($index)">
                <HintButton slot="reference" title="删除" type="danger" icon="el-icon-delete" size="mini"></HintButton>
              </el-popconfirm>
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
  props:{
    visible:Boolean
  },
  data(){
    return{
      dialogImageUrl:'',
      dialogVisible:false,
      spuId:'',
      spuInfo:{
        spuName: '',
        description: '',
        tmId: '',
        spuSaleAttrList: [],
        spuImageList: [],
      },
      spuImageList: [],
      trademarkList: [],
      saleAttrList: [],
      attrIdAttrName: '',
    }
  },
  computed:{
    unUsedSaleAttrList(){
      return this.saleAttrList.filter(
        attr => this.spuInfo.spuSaleAttrList.every(spuAttr => spuAttr.saleAttrName!==attr.name)
      )
    }
  },
  methods:{
    async save(){
      const {spuInfo, spuImageList} = this
      spuInfo.spuImageList = spuImageList.map(item => ({
        imgName: item.name,
        imgUrl: item.response ? item.response.data : item.url
      }))
      spuInfo.spuSaleAttrList = spuInfo.spuSaleAttrList.filter((attr) => {
        delete attr.edit
        delete attr.saleAttrValueName
        return attr.spuSaleAttrValueList.length>0
      })
      const result = await this.$API.spu.addUpdate(spuInfo)
      if (result.code===200) {
        this.$message.success('保存SPU成功')
        this.resetData()
        this.$emit('update:visible', false)
         this.$emit('saveSuccess')
      } else {
        this.$message.error('保存SPU失败')
      }
    },
    resetData () {
      this.dialogImageUrl = ''
      this.dialogVisible = false

      this.spuId = null
      this.spuInfo = {
        category3Id: '',
        spuName: '',
        description: '',
        tmId: '',
        spuImageList: [],
        spuSaleAttrList: []
      }
      this.spuImageList = []
      this.trademarkList = []
      this.saleAttrList = []
      this.attrIdAttrName = ''
    },
    handleInputConfirm(spuSaleAttr){
      const {saleAttrValueName, baseSaleAttrId} = spuSaleAttr
      if(!saleAttrValueName){
        spuSaleAttr.edit = false
        return
      }
      const isRepeat = spuSaleAttr.spuSaleAttrValueList.some(value => value.saleAttrValueName===saleAttrValueName)
      if (isRepeat) {
        this.$message.warning('不能重复!')
        return
      }
      spuSaleAttr.spuSaleAttrValueList.push({
        saleAttrValueName,
        baseSaleAttrId
      })
      spuSaleAttr.edit = false
      spuSaleAttr.saleAttrValueName = ''
    },
    showInput(spuSaleAttr){
      if (spuSaleAttr.hasOwnProperty('edit')) {
        spuSaleAttr.edit = true
      } else {
        this.$set(spuSaleAttr, 'edit', true)
      }
      this.$nextTick(() => this.$refs.saveTagInput.focus())
    },
    addSpuSaleAttr(){
      const [baseSaleAttrId, saleAttrName] = this.attrIdAttrName.split(':')
      this.spuInfo.spuSaleAttrList.push({
          baseSaleAttrId,
          saleAttrName,
          spuSaleAttrValueList: []
      })
      this.attrIdAttrName = ''
    },
    initLoadAddData(category3Id){
      this.spuInfo.category3Id = category3Id
      this.getTrademarkList()
      this.getSaleAttrList()
    },
    initLoadUpdateData(spuId){
      this.spuId = spuId
      this.getSpuInfo()
      this.getSpuImageList()
      this.getTrademarkList()
      this.getSaleAttrList()
    },
    async getSpuInfo(){
      const result = await this.$API.spu.get(this.spuId)
      this.spuInfo = result.data
    },
    async getSpuImageList () {
      const result = await this.$API.sku.getSpuImageList(this.spuId)
      const spuImageList = result.data
      spuImageList.forEach(item => {
        item.name = item.imgName
        item.url = item.imgUrl
      })
      this.spuImageList = spuImageList
    },
    async getTrademarkList () {
      const result = await this.$API.trademark.getList()
      this.trademarkList = result.data
    },
    async getSaleAttrList () {
      const result = await this.$API.spu.getSaleList()
      this.saleAttrList = result.data
    },

    handleSuccess(response, file, fileList) {
      console.log('handleSuccess', response, file, fileList);
      this.spuImageList = fileList
    },
    handleRemove(file, fileList) {
      console.log('handleRemove', file, fileList);
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    back(){
      this.resetData()
      this.$emit('update:visible', false)
      this.$emit('cancel')
    },
    deleteAttr (index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1)
    },
  }
}
</script>

<style lang="less" scoped>

</style>
