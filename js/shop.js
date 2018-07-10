var index_js = (function(){
    var $ul = $('.tbox');
    var shopList = localStorage.shopList || '[]';
    shopList = JSON.parse(shopList);
    return {
        init() {
            this.events();
            this.insertData(shopList);
        },
        insertData(data) {
            var str = ''
            for(var i = 0; i < data.length; i++) {
                var li = `<tr id="${data[i].id}">
                            <td>${data[i].name}</td>
                            <td>${data[i].price}</td>
                            <td><input type='number' value='${data[i].count}' /></td>
                            <td><button class='btn btn-danger del-btn'>删除</button></td>
                            </tr>`
                str += li;
            }
            $ul.html(str);
        },
        addShop(obj) {
            var add = true;
            // 没有商品的时候，获取的是undifinde
            var shopList = localStorage.shopList || '[]';
            shopList = JSON.parse(shopList);
            for(var i= 0; i<shopList.length; i++) {
                if(obj.id == shopList[i].id) {
                    add = false
                    shopList[i].count += obj.count;
                    break;
                }
            }
            if(add) {
                shopList.push(obj);
            }
            localStorage.shopList= JSON.stringify(shopList);
            console.log(localStorage.shopList)
        },
        events() {
            var _this = this;
            $ul.on('change', 'input', function() {
                // 获取此li
                var tr = $(this).closest('tr');
                // 获取文本值
                var val = $(this).val();
                shopList[tr.index()].count = val;
                localStorage.shopList = JSON.stringify(shopList);
                
            })
            $ul.on('click', '.del-btn', function() {
               var tr = $(this).closest('tr');
               shopList.splice(tr.index(), 1);
               localStorage.shopList = JSON.stringify(shopList);
               tr.remove()
                // 获取此li
                // var li = $(this).closest('li');
                // var obj = {
                //     id: li.attr('id'),
                //     count: Number(li.find('input').val()),
                //     name: li.children('.name').html()
                // }
                // _this.addShop(obj);
            })
        }
    }
})()
index_js.init()