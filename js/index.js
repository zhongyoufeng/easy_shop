var index_js = (function(){
    var $ul = $('.tbox');
    return {
        init() {
            this.events();
            this.getData()
        },
        //获取商品内容
        getData() {
            $.get('json/shop.json',this.insertData , "json")
        },
        insertData(data) {
            var str = ''
            for(var i = 0; i < data.length; i++) {
                var li = `<tr id="${data[i].id}">
                            <td>${data[i].name}</td>
                            <td>${data[i].price}</td>
                            <td><input type='number' value='1' /></td>
                            <td><button class='btn btn-danger'>添加购物车</button></td>
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
            $ul.on('click', '.btn', function() {
                // 获取此li
                var tr = $(this).closest('tr');
                var tdAll = tr.children('td');
                console.log(tdAll.eq(2).val());
                var obj = {
                    id: tr.attr('id'),
                    count: Number(tdAll.find('input').val()),
                    name: tdAll.eq(0).html(),
                    price: tdAll.eq(1).html()
                }
                _this.addShop(obj);
            })
        }
    }
})()
index_js.init()