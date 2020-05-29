<template>
  <!--查询表单-->
  <el-form :inline="true" :model="cForm" class="demo-form-inline">
    <el-form-item label="一级分类">
      <el-select
        :disabled="disabled"
        v-model="cForm.category1Id"
        placeholder="选择一级分类"
        @change="handleChange1"
      >
        <el-option
          :label="c.name"
          :value="c.id"
          v-for="c in category1List"
          :key="c.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select
        :disabled="disabled"
        v-model="cForm.category2Id"
        placeholder="选择二级分类"
        @change="handleChange2"
      >
        <el-option
          :label="c.name"
          :value="c.id"
          v-for="c in category2List"
          :key="c.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select
        :disabled="disabled"
        v-model="cForm.category3Id"
        placeholder="选择三级分类"
        @change="handleChange3"
      >
        <el-option
          :label="c.name"
          :value="c.id"
          v-for="c in category3List"
          :key="c.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      // 查询表单数据
      cForm: {
        category1Id: "",
        category2Id: "",
        category3Id: ""
      },
      category1List: [],
      category2List: [],
      category3List: []
    };
  },

  mounted() {
    this.getCategory1List();
  },

  methods: {
    async getCategory1List() {
      const result = await this.$API.category.getCategorys1();
      // console.log('result', result)
      this.category1List = result.data;
    },

    async handleChange1(category1Id) {
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.category2List = [];
      this.category3List = [];
      this.$emit("categoryChange", { categoryId: category1Id, level: 1 });
      const result = await this.$API.category.getCategorys2(category1Id);
      this.category2List = result.data;
    },
    async handleChange2(category2Id) {
      this.cForm.category3Id = "";
      this.category3List = [];
      this.$emit("categoryChange", { categoryId: category2Id, level: 2 });
      const result = await this.$API.category.getCategorys3(category2Id);
      this.category3List = result.data;
    },
    handleChange3(category3Id) {
      this.$emit("categoryChange", { categoryId: category3Id, level: 3 });
    }
  }
};
</script>
