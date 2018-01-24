# Swiftx 开发辅助套件

Swiftx Guardian 是一款基于 webpack 的前端继承调试套件，目的在于迅速提供开箱即用的调试
开发环境，免除繁杂的配置编写工作，尤其是针对 react 项目中单独的UI组件调试，可以迅速提
供单组件的调试环境，免除大量繁琐的测试环境编写的困扰。

### 1. 安装

* 全局安装

~~~
npm install swiftx-guardian -g
~~~

* 项目安装

~~~
npm install swiftx-guardian --save-dev
~~~

### 基础用法

1. 创建配置文件 guardian.json
2. 切换当前目录到配置文件所在路径
3. 运行命令

### 命令说明

* 运行调试服务器

~~~
guardian server
~~~

* 编译项目代码

~~~
guardian build
~~~

### 配置详解

~~~
{
    "server" : {
        "host" : "localhost",       // 开发服务器域名
        "port" : 3000,              // 监听服务器端口
        "root" : "public"           // 静态资源目录
    },
    "entry" : {
        "main " : 'src/index.js',   // 项目主入口
        "favicon" : "favicon.ico',  // 图标路径
        "index" : "template.ejs',   // 入口模板
        "title" : "index"           // 网页标题
    },
    "output" : {
        "index" : "index.html",       // 访问入口
        "path" : "dist",              // 输出目录
        "filename" : "main.js"        // 脚本入口
    },
    "loaders" : [
        {
            "extensions" : ["ts", "tsx"], //  文件类型
            "loader" : "ts-loader"        //  加载器说明
        },
        {
            "extensions" : ["js", "jsx"],
            "loader" : "babel-loader",
            "exclude" : "node_modules"
        },
        {
            "extensions" : ["css"],
            "loader" : "style-loader!css-loader?modules",
            "exclude": "node_modules"
        },
        {
            "extensions" : ["css"],
            "loader" : "style-loader!css-loader",
            "include" : "node_modules"
        },
        {
            "extensions" : ["less"],
            "loader" : "style-loader!css-loader!less-loader?modules"
        },
        {
            "extensions" : ["png","jpg", "gif"],
            "loader" : "url-loader?limit=8192&name=./static/img/[hash].[ext]"
        }
    ],
    "webpack" : false,        // 指定外部webpack文件
    "debug" : {
        "sourceMap" : false   // 生成资源地图
    }
}

~~~

以上配置为系统默认配置，其中封装了webpack基础配置和常用加载器，对于一般用户来说，我们指在提供一个快捷的开箱即用的运行环境，因此对于大部分开发者来说，尽量采用默认配置即可，以下提供了日常开发环境下开发者通常所需的最精简配置,这里值得关注的是工具运行时是到命令执行的当前目录下寻找配置文件,所以可以在react的组件目录下放置精简配置,实现一键运行脚本调试，方便开发：

~~~
{
  "entry" : {
    "main" : "src/index.tsx",
    "title" : "Swiftx 脚手架"
  },
  "output" : {
    "index" : "index.html",
    "path" : "dist"
  },
  "debug" : {
    "sourceMap" : false
  }
}
~~~

针对部分高级用户，以上简化配置无法满足复杂需求，希望使用 webpack 原生配置的方式来整合调试工具，可在配置文件中设置 webpack 配置项，该配置项一般默认为 false,表述不使用原生配置文件, 设置为 true 时工具会到运行目录下查找 webpack.config.js 的配置文件进行编译和调试，也可以设置相对路径的字符串来指定要使用的自定义配置文件
