const list = [
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


const list2 = [
    {
        id: '0',
        pId: '-1',
        value: '测试根节点',
        isLeaf: false
    },
    {
        id: '1',
        pId: '0',
        value: '测试节点1',
        isLeaf: false
    },
    {
        id: '2',
        pId: null,
        value: '测试节点2',
        isLeaf: false
    }
]