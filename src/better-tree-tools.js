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
        treeToList(tree) {
            const data = [];
            const { children } = this.config
            const recursion = (t) => {
                if (this.typeIs(t) !== 'array') {
                    data.push(t)
                } else {
                    for (let i = 0, len = t.length; i < len; i++) {
                        const c = t[i]
                        const child = JSON.parse(JSON.stringify(c[children] || '[]'))
                        if (this.typeIs(c[children]) === 'array') {
                            delete c[children]
                            data.push(c)
                            recursion(child)
                        } else {
                            data.push(c)
                        }
                    }
                }
            }
            recursion(tree);
            return data;
        },
        getNode(data = [], idValue) {
            const { id, children } = this.config
            const recursion = (d) => {
                for (let i = 0, len = d.length; i < len; i++) {
                    const c = d[i]
                    if (c[id] === idValue) {
                        return c
                    }
                    if (this.typeIs(c[children]) === 'array') {
                        delete c[children]
                        recursion(c[children])
                    }
                }
            }
            return recursion(data)
        },
        getNodeList(data = [], opts = {}) {
            const { id, pId, children } = this.config
            const idValue = opts[id]
            const pIdValue = opts[pId]
            const temp = []
            const recursion = (d) => {
                for (let i = 0, len = d.length; i < len; i++) {
                    const c = d[i]
                    if (c[id] === idValue || c[pId] === pIdValue) {
                        temp.push(c)
                    }
                    if (this.typeIs(c[children]) === 'array') {
                        const child = JSON.parse(JSON.stringify(c[children]))
                        delete c[children]
                        recursion(child)
                    }
                }
            }
            recursion(data)
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
        insert(data, newItem, id) {
            const list = this.treeToList(data)
            for (let i = 0, len = list.length; i < len; i++) {
                list[i].sort = i
            }
            const cur = this.getNode(list, id)
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
