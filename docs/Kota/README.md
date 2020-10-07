# Completed Kata8

## 获取中间字符串 
> 描述：返回一个字符串中间字符/或字符串,如果字符串的长度是奇数，则返回中间字符。如果单词的长度是偶数，请返回中间的2个字符组成的字符串。

示例输入输出：

```
getMiddle("test") should return "es"

getMiddle("testing") should return "t"

getMiddle("middle") should return "dd"

getMiddle("A") should return "A"
```

解决方法1：

```
function getMiddle(s)
{
   return s.length%2 === 0 ?  s[s.length/2-1]+s[s.length/2]:s[Math.round(s.length/2)-1];
}
```

解决方法2
```
function getMiddle(s)
{
  return s.substr(Math.ceil(s.length / 2 - 1), s.length % 2 === 0 ? 2 : 1);
}
```


## 获取字符串中字符在字母表中的位置

> 描述：需要给定一个字符串，将每个字母替换为其在字母表中的位置。
如果文本中的任何内容都不是字母，忽略它，不要返回它。


示例输入输出
```
alphabetPosition("The sunset sets at twelve o' clock.")
应该返回"20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11"（作为字符串）
```

解决方法：
```
function alphabetPosition(text) {
   return text
     .split("") // 分割成字元
     .filter(f => f.toLowerCase() != f.toUpperCase()) // 判定是否为英文字母
     .map(m => m.toLowerCase().charCodeAt(0) - 96 ) // 转换成小写取得 ascii 并減去 96
     .join(" ") // 再把这些分割的字元組合在一起并且用空格分隔
}
```

## 将字符串abcd转换成A-Bb-Ccc-Dddd

解决方法1：
```
// @params accum的参数是一个字符串，仅包含来自a..z和的字母A..Z。
function accum(s) {
    var tempStr = s.split(""); 
    var result = [];
    for (var i = 0; i < tempStr.length; i++) {
        if (i > 0) {
            var str = "-" + tempStr[i].toUpperCase() + tempStr[i].toLowerCase().repeat(i);
            result.push(str);
        }
        else {
            result.unshift(tempStr[0].toUpperCase());
        }
    }
    return result.join("");
}

accum("abcdef"); //"A-Bb-Ccc-Dddd-Eeeee-Ffffff"
```

解决方法2:
```
function accum(s) {
  return s.split('').map((c, i) => (c.toUpperCase() + c.toLowerCase().repeat(i))).join('-');
}
```
