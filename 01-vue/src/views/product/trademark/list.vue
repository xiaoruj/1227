<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      @click="showAdd"
      style="margin-bottom:20px"
      >添加</el-button
    >

    <el-table v-loading="loading" :data="trademarks" border stripe>
      <!-- 序号列 -->
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>

      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 60px;" />
        </template>
      </el-table-column>
      <!-- 如果列表列的内容是指定指定的结构: 使用作用域插槽 -->
      <el-table-column prop="address" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="showUpdate(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTrademark(row)"
            >删除</el-button
          >
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
      @current-change="getTrademarks"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <el-dialog :title="form.id ? '更新' : '添加'" :visible.sync="isShowDialog">
      <!-- 内部会执行: $emit('update:visible', false) 自动关闭 -->
      <el-form :model="form" style="width: 80%" :rules="rules" ref="tmForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input
            v-model="form.tmName"
            autocomplete="off"
            placeholder="请输入品牌名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="品牌LOGO"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <!--
            action: 指定上传图片的接口地址   组件内部向发此地址发送上传文件的ajax请求
              http://182.92.128.115/admin/product/fileUpload: 不可以, 跨域了
              /dev-api/admin/product/fileUpload: 可以, 通过代理服务转发, 就没跨域了
            on-success: 指定上传成功时调用的回调函数
            before-upload: 指定在准备发送上传图片请求前的回调函数, 如果返回值为false, 不会发出请求
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TrademarkList",

  data() {
    return {
      loading: false, //不显示loading
      trademarks: [], // 当前页的列表数据
      total: 0, // 总数量
      page: 1, // 当前页码
      limit: 3, // 每页数量

      isShowDialog: false,
      form: {
        tmName: "",
        logoUrl: ""
      },
      formLabelWidth: "100px",
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trtgger: "change" },
          { validator: this.validateTmName, trigger: "blur" }
        ],
        logoUrl: [{ required: true, message: "请指定LOGO图片" }]
      }
    };
  },

  mounted() {
    // 测试新定义的接口请求函数
    // this.$API.trademark.getById(1)

    this.getTrademarks();
  },

  methods: {
    validateTmName(rule, value, callback) {
      console.log("validateTmName(), value");
      if (value.length < 2 || value.length > 10) {
        callback(new Error("长度在 2 到 10 个字符"));
      } else {
        callback();
      }
    },
    handleLogoSuccess(res, file) {
      // console.log('---', res, file)
      // 得到返回的图片url
      // const logoUrl = file.response.data
      const logoUrl = res.data;
      // 保存图片url
      this.form.logoUrl = logoUrl;
    },

    beforeLogoUpload(file) {
      const isJPGOrPNG = ["image/jpeg", "image/png"].indexOf(file.type) >= 0;
      const isLt500KB = file.size / 1024 < 500;

      if (!isJPGOrPNG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt500KB) {
        this.$message.error("上传头像图片大小不能超过 500kb!");
      }

      return isJPGOrPNG && isLt500KB;
    },

    /*
      异步获取指定页码列表数据显示
      */
    async getTrademarks(page = 1) {
      this.page = page;
      this.loading = true;
      const result = await this.$API.trademark.getList(page, this.limit);

      this.loading = false;
      if (result.code === 200) {
        const { records, total } = result.data;
        this.trademarks = records;
        this.total = total;
      } else {
        this.$message.error("获取品牌列表失败");
      }
    },

    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.getTrademarks();
    },

    showAdd() {
      this.form = {
        tmName: "",
        logoUrl: ""
      };
      this.isShowDialog = true;
    },

    showUpdate(trademark) {
      // this.fkrm = trademark;
      this.from = { ...trademark };
      this.isShowDialog = true;
    },
    addOrUpdateTrademark() {
      this.$refs.tmForm.validate(async valid => {
        if (valid) {
          const trademark = this.form;
          let result;
          if (trademark.id) {
            result = await this.$API.trademark.update(trademark);
          } else {
            result = await this.$API.trademark.add(trademark);
          }
          if (result.code === 200) {
            this.$message.success(`${trademark.id ? "更新" : "添加"}品牌成功`);
            this.isShowDialog = false;
            this.getTrademarks(trademark.id ? this.page : 1);
            this.form = {
              tmName: "",
              logoUrl: ""
            };
          } else {
            this.$message.error(`${trademark.id ? "更新" : "添加"}品牌失败`);
          }
        } else {
        }
      });
    },

    deleteTrademark(trademark) {
      this.$confirm(`确定删除 ${trademark.tmName} 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const result = await this.$API.trademark.remove(trademark.id);
          if (result.code === 200) {
            this.$message.success("删除品牌成功!");
            const page =
              this.trademarks.length === 1 ? this.page - 1 : this.page;
            this.getTrademarks(page);
          } else {
            this.$message.error("删除品牌失败!");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
