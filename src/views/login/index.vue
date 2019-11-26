<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-width="80px"
      class="login-form"
    >
      <h2 class="login-title">Momoda Admin</h2>
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitLogin('loginForm')">提交</el-button>
      </el-form-item>

      <!-- <el-form-item>
        <el-button type="primary" @click="submitByFacebook">Facebook登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="logoutByFacebook">退出Facebook登录</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import login from "@/api/login.js";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "96535_super_2019"
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitLogin: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          let promise = login.login(this.loginForm.username, this.loginForm.password)
          this.afterLogin(promise)
        } else {
          alert("wont submit!");
          console.log("error submit!!");
          return false;
        }
      });
    },

    logoutByFacebook() {
      // 退出登录
      FB.logout(function(response) {
        console.log("用户已退出");
        alert("用户已退出");
      });
    },

    afterLogin(promise){
      promise.then(response => {
              if (response.data.code == 0) {
                // alert("登录成功");
                localStorage.setItem(
                  "login-token",
                  JSON.stringify(response.data.data)
                );
                localStorage.setItem("login-user", this.loginForm.username);
                localStorage.setItem(
                  "login-avatar",
                  "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571140057647&di=3889906be762d1c2f9907f153c6d5a52&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F5%2Fe5%2Fa9dd420433.jpg"
                );
                localStorage.setItem("login-nickname", "管理员儿");
                localStorage.setItem("login-role", response.data.data.role);
                this.$router.push("/");
              } else {
                alert("登录失败：" + response.data.message);
              }
            })
            .catch(function(error) {
              alert("登录失败--" + error.msg);
            })
    },

    submitByFacebook() {
      // checkLoginState();
      FB.login(
        function(response) {
          if (response.status === "connected") {
            FB.api("/me?fields=email,name", function(response) {
              console.log("Successful login for: " + JSON.stringify(response));
              let promise = api.loginFacebook(response.name, JSON.stringify({name: response.name}))
              this.afterLogin(promise)
              // alert("Successful login for: " + JSON.stringify(response));
            });

            // alert(JSON.stringify(response));
            // console.log(JSON.stringify(response));
          } else {
            console.log("该用户没有登录");
            alert("该用户没有登录");
          }
        },
        { scope: "public_profile,email" }
      );
    }
  }
};

function statusChangeCallback(response) {
  //可用于后台验证，但是前台调用SDK则会自动验证
  var accessToken = response.authResponse.accessToken;
  console.log(response.authResponse.accessToken);
  if (response.status === "connected") {
    //sdk会自动保留accessToken，并且验证该请求是否来自我的应用
    FB.api("/me?fields=name,first_name,last_name,email", function(response) {
      //将用户信息传回服务端
      window.location.href =
        "http://gntina.iok.la/userInfo?userInfo=" + JSON.stringify(response);
      /* $.ajax({
	                    url:"http://gntina.iok.la/userInfo",
	                    data:{
	                    	userInfo:JSON.stringify(response)
	                    },
	                    dataType:"json",
	                    async:false,
	                    success:function(data){
	                    	window.location.href="";
	                    } 
	                }); */
      console.log("Thanks for logging in, " + response.name + "!");
    });
  } else {
    console.log("Please log " + "into this app.");
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// 加载Facebook SDK

function onInit() {
  FB.init({
    appId: "399106320980343",
    cookie: true,
    xfbml: true,
    version: "v4.0"
  });

  // 添加facebook回调：
  // FB.getLoginStatus(function(response) {
  //   statusChangeCallback(response);
  //   //console.log(JSON.stringify(response));
  // });
}

window.fbAsyncInit = onInit;

// Load the SDK asynchronously
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
</script>

<style scope>
.login-form {
  width: 350px;
  margin: 160px auto;
  background-color: rgb(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
}

.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/login-bg.jpg") repeat;
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>