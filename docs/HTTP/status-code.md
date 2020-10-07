# 认识HTTP----状态码

**本文内容大多参考[《图解HTTP》一书](https://book.douban.com/subject/25863515/)**

## 什么是状态码？
当我们向服务端发送请求的时候，为了让用户更好的理解返回结果，通常要借助状态码来通知用户服务器端是正常处理了请求，还是出现了偏差。

![响应的状态码可描述请求的处理结果](http://upload-images.jianshu.io/upload_images/4337988-58f1c4215d05ea95.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**状态码如200 OK，以3 位数字和原因短语组成。**
**数字中的第一位指定了响应类别，后两位无分类。响应类别有以下5 种。**

![](http://upload-images.jianshu.io/upload_images/4337988-bf822bc144edc3e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

状态码数量繁多，实际经常使用只有14多种，下面只介绍一下具有代表性的14 个状态码。

##  2XX 成功
2XX 的响应结果表明请求被正常处理了。
### 200 OK

![](http://upload-images.jianshu.io/upload_images/4337988-61676b0654a08ac5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

表示从客户端发来的请求在服务器端被正常处理了。
### 204 No Content

![](http://upload-images.jianshu.io/upload_images/4337988-f9d6fbcced90d307.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
该状态码代表服务器接收的请求已成功处理，但在返回的响应报文中不含实体的主体部分。另外，也不允许返回任何实体的主体。比如，当从浏览器发出请求处理后，返回204 响应，那么浏览器显示的页面不发生更新。
一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用。
### 206 Partial Content

![](http://upload-images.jianshu.io/upload_images/4337988-3026ffedffa36572.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的GET 请求。响应报文中包含由Content-Range 指定范围的实体内容。

## 3XX重定向

3XX 响应结果表明浏览器需要执行某些特殊的处理以正确处理请求。

### 301 Moved Permanently

![](http://upload-images.jianshu.io/upload_images/4337988-b1345d016e324c54.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源现在所指的URI。

### 302 Found

![](http://upload-images.jianshu.io/upload_images/4337988-da317dbc465ef206.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

临时性重定向。该状态码表示请求的资源已被分配了新的URI，希望用户（本次）能使用新的URI 访问。
和301 Moved Permanently 状态码相似，但302 状态码代表的资源不是被永久移动，只是临时性质的。换句话说，已移动的资源对应的URI 将来还有可能发生改变。

### 303 See Other

![](http://upload-images.jianshu.io/upload_images/4337988-42dfb7ef295639d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

该状态码表示由于请求对应的资源存在着另一个URI，应使用GET方法定向获取请求的资源。
303 状态码和302 Found 状态码有着相同的功能，但303 状态码明确表示客户端应当采用GET 方法获取资源，这点与302 状态码有区别。
比如，当使用POST 方法访问CGI 程序，其执行后的处理结果是希望客户端能以GET 方法重定向到另一个URI 上去时，返回303 状态码。虽然302 Found 状态码也可以实现相同的功能，但这里使用303 状态码是最理想的。

### 304 Not Modified

![](http://upload-images.jianshu.io/upload_images/4337988-e014430e6b091447.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
该状态码表示客户端发送附带条件的请求时，服务器端允许请求访问资源，但未满足条件的情况。304 状态码返回时，不包含任何响应的主体部分。304 虽然被划分在3XX 类别中，但是和重定向没有关系。

### 307 Temporary Redirect
临时重定向。该状态码与302 Found 有着相同的含义。尽管302 标准禁止POST 变换成GET，但实际使用时大家并不遵守。
307 会遵照浏览器标准，不会从POST 变成GET。但是，对于处理响应时的行为，每种浏览器有可能出现不同的情况。


## 4XX 客户端错误
4XX 的响应结果表明客户端是发生错误的原因所在。

### 400 Bad Request

![](http://upload-images.jianshu.io/upload_images/4337988-a76b87f7b3357e68.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
该状态码表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。另外，浏览器会像200 OK 一样对待该状态码。

### 401 Unauthorized

![](http://upload-images.jianshu.io/upload_images/4337988-fcd2dcebfb074152.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
该状态码表示发送的请求需要有通过HTTP 认证（BASIC 认证、DIGEST 认证）的认证信息。另外若之前已进行过1 次请求，则表示用户认证失败。
返回含有401 的响应必须包含一个适用于被请求资源的WWWAuthenticate首部用以质询（challenge）用户信息。当浏览器初次接收到401 响应，会弹出认证用的对话窗口。

### 403 Forbidden

![](http://upload-images.jianshu.io/upload_images/4337988-604eb2183c50e7d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
该状态码表明对请求资源的访问被服务器拒绝了。服务器端没有必要给出拒绝的详细理由，但如果想作说明的话，可以在实体的主体部分对原因进行描述，这样就能让用户看到了。
未获得文件系统的访问授权，访问权限出现某些问题（从未授权的发送源IP 地址试图访问）等列举的情况都可能是发生403 的原因。

### 404 Not Found

![](http://upload-images.jianshu.io/upload_images/4337988-1802cc9939aae6c4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

该状态码表明服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。

## 5XX服务器错误
5XX 的响应结果表明服务器本身发生错误。

### 500 Internal Server Error

![](http://upload-images.jianshu.io/upload_images/4337988-beb418dab1c3dbba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

该状态码表明服务器端在执行请求时发生了错误。也有可能是Web应用存在的bug 或某些临时的故障。

### 503 Service Unavailable


![](http://upload-images.jianshu.io/upload_images/4337988-46134e7be9df6947.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。如果事先得知解除以上状况需要的时间，最好写入Retry-After 首部字段再返回给客户端。