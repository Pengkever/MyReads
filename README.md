# 图书应用

## 安装及使用

正确安装配置node.js及npm
* 使用 `npm install` 命令安装项目依赖
* 使用 `npm start` 命令启动程序

#### 主要实现功能

* 从服务器获取书籍并分配到`Currently Reading` `Want to Read` `Read` 三大书架
* 点击 `▼` 选择书架名来移动图书到相应书架
* 点击 `+` 输入书名或作者姓名来查询图书，点击 `▼` 选择书架名来移动图书到相应书架
* 点击图书封面进入书籍详情页
* 依据访问者浏览器平台不同，展示不同的`select`标签样式（主要分为`windows`平台和非`windows`平台）

~~#### 不合理功能~~（已使用原生`select`标签解决）

* ~~在`windows`平台浏览器中，可以同时展开多个`select`
* 点击空白处，未能关闭`select`~~

#### 2018-01-14 修改
* `src/SelectShelf.js`去除了，平台判断，使用原生`selec`t标签
* `src/SearchBook.js` 修改：如果图书已经同时存在于书架和搜索页中，该图书的书架信息正常显示
* `src/BookDetail.js` 及 `src/Book.js` 中 `style` 修改，可正常显示图书封面
* 修改：`src/App.js` 执行 `BooksAPI.getAll（）`获取服务器书籍信息，传递给`Shelf`和`SearchBook`组件

#### 修改后引发的问题
* 由于在`src/App.js`中从服务器获取信息，且执行一次，在`src/BookDetail.js`修改了图书书架信息后，回到`shelf`页面，无法触发刷新，导致图书显示的书架不正确

