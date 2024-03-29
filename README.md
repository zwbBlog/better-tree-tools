# better-tree-tools
## 一个好用的树方法合集
### *使用方法*
- *npm i better-tree-tools*
- *or*
- *yarn add better-tree-tools*
#### way1：
``` js
import BetterTreeTools from "better-tree-tools"
or
const BetterTreeTools = require('better-tree-tools')
```
#### way2：
``` js
<script src="xxx/xxx/better-tree-tools.js"></script>
or
<script src="xxx/xxx/better-tree-tools.min.js"></script>
```
- 具体使用
``` js
const config = {
  id:'id',  //id标识
  pId:'pId', //pId标识
  children:'children' //children标识
}
const TreeTools = new BetterTreeTools(config)
const list = [
  {
    id: '1',
    title: '节点1',
    pId: '0',
  },
  {
    id: '1-1',
    title: '节点1-1',
    pId: '1'
  },
  {
    id: '1-2',
    title: '节点1-2',
    pId: '1'
  },
  {
    id: '1-1-1',
    title: '节点1-1-1',
    pId: '1-1'
  },
  {
    id: '2',
    title: '节点2',
    pId: ''
  },
  {
    id: '2-1',
    title: '节点2-1',
    pId: '2'
  }
]
const tree = TreeTools.listToTree(list)
console.log(tree)
[
    {
        "id": "1",
        "title": "节点1",
        "pId": "0",
        "children": [
            {
                "id": "1-1",
                "title": "节点1-1",
                "pId": "1",
                "children": [
                    {
                        "id": "1-1-1",
                        "title": "节点1-1-1",
                        "pId": "1-1"
                    }
                ]
            },
            {
                "id": "1-2",
                "title": "节点1-2",
                "pId": "1"
            }
        ]
    },
    {
        "id": "2",
        "title": "节点2",
        "pId": "0",
        "children": [
            {
                "id": "2-1",
                "title": "节点2-1",
                "pId": "2"
            }
        ]
    }
]
``` 
##### 方法集合如下：
``` js
* list转为树
  listToTree(list)
* 树转为list
  treeToList(tree)  
* 根据id在data中查找值
  getNode(data = [], idValue)  
* 根据data中查找符合条件的值
  opts = {
    id:'1',
    pId:'2-1'
  }
  getNodeList(data = [], opts)   
* 插入到指定的id值中作为子集
  newItem = [{
    id: '666', 
    pId: '2',
    title: '新加的' 
  }]
  insert(data, newItem)    
```
## 程序更新日志 ##

> ### 0.0.1-beta.5 更新时间：2022-7-21 ###
1. treeToList、getNode、getNodeList、removeNode、insert方法内部修改，采用深度克隆模式，保持传入原始值不变
> ### 0.0.1-beta.6 更新时间：2023-10-12 ###
1. 修复listFastToTree方法中，节点pId为null，id为'0'没有被作为父节点
> ### 0.0.1-beta.7 更新时间：2023-10-12 ###
1. 优化listFastToTree方法
> ### 0.0.1-beta.8 更新时间：2023-10-13 ###
1. 去除listFastToTree方法，优化insert方法,传入参数为数组