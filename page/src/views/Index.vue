<template>
  <div class="index">
    <el-header>
      <div
        style="
          display: block;
          width: 35%;
          margin: 20px auto;
          border: 1px solid #ccc;
          padding: 10px;
        "
        class="header"
      >
      <div align="center">上传需要预测的图片</div>
      </div>
    </el-header>
    <el-main>
      <div class="upload">
        <input
          style="
            display: block;
            width: 35%;
            margin: 20px auto;
            border: 1px solid #ccc;
            padding: 10px;
          "
          type="file"
          id="fileinp"
          accept="image/*"
          ref="avatarInput"
          @change="update"
        />
      </div>
      <img
        :src="avatar"
        style="
          display: block;
          width: 500px;
          height:500px;
          margin: 20px auto;
          border: 1px solid #ccc;
          padding: 10px;
        "
        id="show"
      />
      <div
        class="vertify"
        style="
          display: block;
          width: 35%;
          margin: 20px auto;
          padding: 10px;
          margin-right:0;
        "
      >
        <el-button type="primary" @click="uploadbtn">上传</el-button>
      </div>
    </el-main>
    <el-footer
      style="
        display: block;
        width: 35%;
        margin: 20px auto;
        border: 1px solid #ccc;
        padding: 10px;
      "
    >
      <div class="footer">预测结果为：{{ result }}</div>
      <!-- <div class="footer">可能性为：{{ possible }}</div> -->
    </el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: "",
      imgname: "",
      result: "",
      possible: "",
    };
  },
  methods: {
    update: function (e) {
      let that = this;
      let file = e.target.files[0];
      let imgsize = file.size;
      if (imgsize > 5242880) {
        alert("图片大小不能超过5M");
        return false;
      }
      var reads = new FileReader();
      let f = document.getElementById("fileinp").files[0];
      reads.readAsDataURL(f);
      reads.onload = function () {
        document.getElementById("show").src = this.result;
      };
    },
    uploadbtn: function () {
      let that = this;
      let files = this.$refs.avatarInput.files[0];
      let param = new FormData(); //创建form对象
      param.append("file", files); //通过append向form对象添加数据
      $.ajax({
        url: "http://192.168.0.109:5000/predict",
        type: "post",
        data: param,
        dataType: "json",
        processData: false,
        contentType: false,
        success: function (res) {
          console.log(res);
          that.result = res.classname;
          that.possible = res.possible;
        },
        error: function (err) {
          alert("error!");
          console.log(err);
        },
      });
    },
  },
};
</script>

<style scoped>
</style>