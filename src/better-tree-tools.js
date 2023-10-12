/**
 *  Created by zlgb on 2020-11-24 17:27:14
 *  ------------------修改记录-------------------
 *  修改人      修改日期                 修改目的
 *  zlgb        2020-11-24               创建
 **/
(function (global, definition) {
    if (typeof define === 'function' && define.amd) {
        // AMD环境或CMD环境
        define(definition);
    } else if (typeof module !== 'undefined' && module.exports) {
        // 定义为普通Node模块
        module.exports = definition();
    } else {
        // 将模块的执行结果挂在全局变量中，在浏览器中指向window对象
        global = typeof globalThis !== 'undefined' ? globalThis : global;
        global.BetterTreeTools = definition();
    }
})(this, function () {
    var BetterTreeTools = function (config) {
        this.config = Object.assign({
            id: 'id',
            pId: 'pId',
            children: 'children'
        }, config);
    };
    BetterTreeTools.prototype = {
        typeIs(instance) {
            return Object.prototype.toString.call(instance).slice(8, -1).toLowerCase();
        },
        // 深克隆
        deepCopy(obj) {
            const clone = this.typeIs(obj) === 'array' ? [] : {};
            const types = ['array', 'object'];
            if (!types.includes(this.typeIs(obj))) {
                return obj
            }
            const copy = objClone => {
                for (var k in objClone) {
                    // 只拷贝实例属性
                    if (objClone.hasOwnProperty(k)) {
                        if (typeof objClone[k] === 'object') {
                            // 引用类型,数组和对象
                            if (types.includes(this.typeIs(objClone[k]))) {
                                clone[k] = this.deepCopy(objClone[k])
                            } else {
                                clone[k] = objClone[k]
                            }
                        } else {
                            // 值类型
                            clone[k] = objClone[k];
                        }
                    }
                }
            }
            copy(obj)
            return clone;
        },
        listToTree(data) {
            const { id, pId, children } = this.config
            let result = [];
            if (this.typeIs(data) !== 'array') {
                return result;
            }
            data.forEach(item => {
                delete item[children];
            });
            let map = {};
            data.forEach(item => {
                map[item[id]] = item;
            });
            data.forEach(item => {
                let parent = map[item[pId]];
                if (parent) {
                    (parent[children] || (parent[children] = [])).push(item);
                } else {
                    result.push(item);
                }
            });
            return result;
        },
        listFastToTree(data) {
            const { id, pId, children } = this.config
            const result = []
            const map = {}
            for (const item of data) {
                const sId = item[id]
                const sPid = item[pId]
                if (!map[sId]) map[sId] = { [children]: [] }
                map[sId] = Object.assign(item, { [children]: map[sId][children] })
                if (!sPid) {
                    result.push(map[sId])
                } else {
                    if (!map[sPid]) map[sPid] = { [children]: [] }
                    map[sPid][children].push(map[sId])
                }
            }
            return result;
        },
        treeToList(origin) {
            const data = [];
            const { children, id } = this.config
            const tree = this.deepCopy(origin)
            const filterAddData = c => {
                if (data.filter(d => d[id] === c[id]).length === 0) {
                    data.push(c)
                }
            }
            const recursion = t => {
                if (this.typeIs(t) !== 'array') {
                    filterAddData(t)
                } else {
                    for (let i = 0, len = t.length; i < len; i++) {
                        const c = t[i]
                        if (c[children] && this.typeIs(c[children]) === 'array') {
                            const child = this.deepCopy(c[children])
                            delete c[children]
                            filterAddData(c)
                            recursion(child)
                        } else {
                            filterAddData(c)
                        }
                    }
                }
            }
            recursion(tree);
            return data;
        },
        getNode(origin = [], idValue) {
            const data = this.deepCopy(origin)
            const { id } = this.config
            const d = this.treeToList(data)
            for (let i = 0, len = d.length; i < len; i++) {
                const c = d[i]
                if (c[id] === idValue) {
                    return c
                }
            }
            return null
        },
        getNodeList(origin = [], opts = {}) {
            const data = this.deepCopy(origin)
            const { id, pId } = this.config
            const idValue = opts[id]
            const pIdValue = opts[pId]
            const temp = []
            const d = this.treeToList(data)
            for (let i = 0, len = d.length; i < len; i++) {
                const c = d[i]
                if (c[id] === idValue || c[pId] === pIdValue) {
                    temp.push(c)
                }
            }
            return temp;
        },
        removeNode(data = [], opts = {}) {
            const { id, pId } = this.config
            const idValue = opts[id]
            const pIdValue = opts[pId]
            const list = this.treeToList(data)
            for (let i = 0, len = list.length; i < len; i++) {
                const cur = list[i]
                if (cur) {
                    if (cur[id] === idValue || cur[pId] === pIdValue) {
                        delete list[i];
                        i -= 1;
                    }
                }
            }
            return this.listToTree(list)
        },
        insert(data, newItem) {
            const list = this.treeToList(data)
            for (let i = 0, len = list.length; i < len; i++) {
                list[i].sort = i
            }
            const cur = this.getNode(list, newItem.pId)
            if (cur) {
                newItem.pId = cur.id
                newItem.sort = cur.sort - 1
            }
            list.push(newItem)
            const tree = this.listToTree(list)
            return this.sort(tree)
        },
        sort(tree) {
            const { children } = this.config
            const recSort = arr => {
                const t = arr.sort((a, b) => a.sort - b.sort);
                if (t.length) {
                    t.forEach(t1 => {
                        if (this.typeIs(t1[children]) === 'array') {
                            recSort(t1[children]);
                        }
                    });
                }
            };
            recSort(tree);
            return tree;
        }
    };
    return BetterTreeTools;
});
