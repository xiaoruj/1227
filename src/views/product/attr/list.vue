<template>
  <div>
    <el-card>
      <CategorySelector ref="cs" @categoryChange="handleCategoryChange" />
    </el-card>

    <el-card>
      <div v-show="isShowList">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          @click="showAdd"
          :disabled="!category3Id"
          >添加属性</el-button
        >

        <el-table border :data="attrs">
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="150"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin: 2px"
                type="info"
                v-for="value in row.attrValueList"
                :key="value.id"
                >{{ value.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <HintButton
                title="修改"
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showUpdate(row)"
              ></HintButton>
              <el-popconfirm
                :title="`确定删除属性 ${row.attrName} 吗?`"
                @onConfirm="deleteAttr(row.id)"
              >
                <hint-button
                  slot="reference"
                  title="删除"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-show="!isShowList">
        <el-form inline :model="attr">
          <el-form-item label="属性名">
            <el-input
              type="text"
              v-model="attr.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attr.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowList = true">取消</el-button>
        <!--
            {
              "attrId": 0,
              "id": 0,
              "valueName": "string"
            }
           -->
        <el-table border style="margin: 20px 0" :data="attr.attrValueList">
          <el-table-column
            label="序号"
            type="index"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.edit"
                v-model="row.valueName"
                size="mini"
                placeholder="请输入属性值名称"
                @blur="toShow(row)"
                @keyup.enter.native="toShow(row)"
              ></el-input>
              <span
                v-else
                @click="toEdit(row)"
                style="display: inline-block; width: 100%"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <HintButton
                title="删除"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="attr.attrValueList.splice($index, 1)"
              ></HintButton>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowList = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "AttrList",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrs: [],
      isShowList: true,
      attr: {
        attrName: "",
        attrValueList: [],
        categoryId: "",
        categoryLevel: 3
      }
    };
  },
  mounted() {
    // this.category1Id = 2;
    // this.category2Id = 13;
    // this.category3Id = 61;
    // this.getAttrs();
  },
  methods: {
    toEdit(value) {
      if (value.hasOwnProperty("edit")) {
        value.edit = true;
      } else {
        this.$set(value, "edit", true);
      }
    },
    toShow(value) {
      if (value.valueName) {
        const isRepeat = this.attr.attrValueList.some((item, index) => {
          if (item !== value) {
            return item.valueName === value.valueName;
          }
        });
        // console.log("---", value.valueName, isRepeat);
        if (!isRepeat) {
          value.edit = false;
        } else {
          value.valueName = "";
          this.$message.warning("输入的名称已存在");
        }
      }
    },
    showAdd() {
      this.attr = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3
      };
      this.isShowList = false;
    },
    showUpdate(attr) {
      // this.attr = attr;
      // this.attr = {...attr}
      this.attr = cloneDeep(attr);
      this.isShowList = false;
    },
    addAttrValue() {
      this.attr.attrValueList.push({
        attrId: this.attr.id,
        valueName: "",
        edit: true
      });
    },
    handleCategoryChange({ categoryId, level }) {
      // console.log('handleCategoryChange', categoryId, level)
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
        this.attrs = [];
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
        this.attrs = [];
      } else {
        this.category3Id = categoryId;
        this.getAttrs();
      }
    },
    async getAttrs() {
      const { category1Id, category2Id, category3Id } = this;
      const result = await this.$API.attr.getList(
        category1Id,
        category2Id,
        category3Id
      );
      this.attrs = result.data;
    },
    deleteAttr(id) {
      this.$API.attr
        .remove(id)
        .then(result => {
          this.getAttrs();
        })
        .catch(error => {
          this.$message.error("删除属性失败");
        });
    }
  }
};
</script>

<style scoped>
.edit-input {
  padding-right: 60px;
}
.save-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
