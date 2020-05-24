<template>
  <div>
    <el-card style="margin-bottom: 20px">
      <category-selector
        @categoryChange="handleCategoryChange"
      ></category-selector>
    </el-card>
    <el-card>
      <div v-show="!isShowSpuForm && !isShowSkuForm">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          @click="showAddSpu"
          >添加SPU</el-button
        >
        <el-table v-loading="loading" :data="spuList" border stripe>
          <!-- 序号列 -->
          <el-table-column label="序号" type="index" width="80" align="center">
          </el-table-column>
          <el-table-column label="SPU名称" prop="spuName"> </el-table-column>
          <el-table-column label="SPU描述" prop="description">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <hint-button
                title="添加SKU"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="showSkuAdd"
              ></hint-button>
              <hint-button
                title="修改SPU"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showUpdateSpu(row.id)"
              ></hint-button>
              <hint-button
                title="查看所有SKU"
                type="info"
                icon="el-icon-info"
                size="mini"
              ></hint-button>
              <el-popconfirm title="确定删除吗?" @onConfirm="deleteSpu(row.id)">
                <hint-button
                  slot="reference"
                  title="删除SPU"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></hint-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          style="text-align: center; margin-top: 20px;"
          :current-page="page"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="limit"
          layout="prev, pager, next, jumper, ->, sizes, total"
          :total="total"
          @current-change="getSpuList"
          @size-change="handleSizeChange"
        />
      </div>
      <!-- @update:visible="isShowSpuForm=$event" -->
      <!--
        一旦使用.sync, 必须是一个动态的变量属性值, 且属性名必须使用:
        但如果不加:, 传递给子组件的总是false值
       -->
      <SpuForm ref="spuForm" :visible.sync="isShowSpuForm"></SpuForm>

      <SkuForm v-show="isShowSkuForm"></SkuForm>
    </el-card>
    <el-dialog
      :title="spuName + '->SKU列表'"
      :visible.sync="isShowSkuList"
      :before-close="handleBeforeClose"
    >
      <el-table :data="skuList">
        <el-table-column label="名称" prop="skuName"></el-table-column>
        <el-table-column label="价格(元)" prop="price"></el-table-column>
        <el-table-column label="重量(KG)" prop="weight"></el-table-column>
        <el-table-column label="默认图片">
          <template slot-scope="{ row }">
            <img
              :src="row.skuDefaultImg"
              alt=""
              style="width: 100px;height:100px"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SpuForm from "../components/SpuForm";
import SkuForm from "../components/SkuForm";
export default {
  name: "SpuList",

  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",

      loading: false,
      spuList: [],
      page: 1,
      limit: 3,
      total: 0,

      isShowSpuForm: false,
      spuId: "",
      isShowSkuForm: false,
      isShowSkuList: false,
      skuList: [],
      spuName: ""
    };
  },

  mounted() {
    this.category3Id = 61;
    this.getSpuList();
  },

  methods: {
    showSkuAdd() {
      this.isShowSkuForm = true;
    },
    showAddSpu() {
      this.isShowSpuForm = true;
      this.$refs.spuForm.initLoadAddData();
    },
    showUpdateSpu(id) {
      this.isShowSpuForm = true;
      this.$refs.spuForm.initLoadUpdateData(id);
    },
    handleCategoryChange({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
        (this.spuList = []), (this.total = 0);
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
        (this.spuList = []), (this.total = 0);
      } else {
        this.category3Id = categoryId;
        this.getSpuList();
      }
    },
    async getSpuList(page = 1) {
      this.page = page;
      const { limit, category3Id } = this;
      const result = await this.$API.spu.getList(page, limit, category3Id);
      if (result.code === 200) {
        const { records, total } = result.data;
        this.spuList = records;
        this.total = total;
      }
    },
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.getSpuList(1);
    },

    async deleteSpu(spuId) {
      const result = await this.$API.spu.remove(spuId);
      if (result.code === 200) {
        this.$message.success("删除成功");
        this.getSpuList();
      } else {
        this.$message.error("删除成功");
      }
    },
    async showSkuList(spu) {
      this.spuName = spu.spuName;
      this.isShowSkuList = true;
      const result = await this.$API.sku.getListBySpuId(spu.id);
      this.skuList = result.data;
    },
    handleBeforeClose() {
      this.isShowSkuList = false;
      this.skuList = [];
    }
  },

  components: {
    SpuForm,
    SkuForm
  }
};
</script>
