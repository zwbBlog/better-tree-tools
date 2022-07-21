# better-util-tools
## 一个好用的树方法合集
### *使用方法*
- *npm i better-tree-tools*
- *or*
- *yarn add better-tree-tools*
#### way1：
```
import BetterTreeTools from "better-tree-tools"
or
const BetterTreeTools = require('better-tree-tools')
```
#### way2：
```
<script src="xxx/xxx/better-tree-tools.js"></script>
or
<script src="xxx/xxx/better-tree-tools.min.js"></script>
```
- 具体使用
```
const config = {
  id:'id',  //id标识
  pId:'pId', //pId标识
  children:'children' //children标识
}
const _ = new BetterTreeTools(config)
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
const tree = _.listToTree(list)
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
```
* list转为树
  listToTree(list) or listFastToTree(list)
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
  newItem = {
    id: '666', 
    title: '新加的' 
  }
  insert(data, newItem, id)    
```
## 程序更新日志 ##

> ### 0.0.1-beta.5 更新时间：2022-7-21 ###
1. treeToList、getNode、getNodeList、removeNode、insert方法内部修改，采用深度克隆模式，保持传入原始值不变
