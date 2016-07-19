'use strict';


//var test = require("/home/xjy/Downloads/pos-master/pos_v1/test/fixtures.js")
//document.write('<script src="/home/xjy/Downloads/pos-master/pos_v1/test/fixtures.js"></script>')


//*************  #No.1


function  getInput() {
    var input=[
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
    ];
    var countedInput=[];
    //console.linfo(input[0]);
    //subInput.push(input[0],1);
    // countedInput[0].num=input[0];
    //countedInput[0].count=1;
    // console.info(subInput[0].num+","+subInput[0].count);
    countedInput.push({barcode:input[0],count:1});
    var flag = false
    for(var j=1;j<input.length;j++)
    {
        //console.info(input[j])
        for(var i=0;i<countedInput.length;i++)
        {
            if(countedInput[i].barcode===input[j])
            {
                flag = true;
                // countedInput[i].count++;
                break;
            }
            else {
                flag = false
            }

        }

        if(flag) {
            countedInput[i].count++;
        }
        else {
            countedInput.push({barcode:input[j],count:1});
        }
    }
    // console.info(countedInput);
    for(var i=0;i<countedInput.length;i++)
    {
        //console.info("sdf")
        var temp=countedInput[i].barcode.split('-');
        if(temp.length==2)
        {
            countedInput[i].barcode=temp[0];
            countedInput[i].count=parseInt(temp[1]);
        }
    }
    // console.info(countedInput);
    return(countedInput);
}


//********* #No.2


function loadAllItems() {
    return [
        {
            barcode: 'ITEM000000',
            name: '可口可乐',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
        },
        {
            barcode: 'ITEM000002',
            name: '苹果',
            unit: '斤',
            price: 5.50
        },
        {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
        },
        {
            barcode: 'ITEM000004',
            name: '电池',
            unit: '个',
            price: 2.00
        },
        {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
        }
    ];
}
var countedInput=getInput();
function getBuyedItems(countedInput){
    var allItems=[],buyedItems=[];
    //  allItems= require("/home/xjy/Downloads/pos-master/pos_v1/test/fixtures.js");
    //console.info(allItems.loadAllItems());
    allItems=loadAllItems();
    //console.info(allItems);

    for(var i=0;i<countedInput.length;i++)
        for(var j=0;j<allItems.length;j++)
        {
            if(countedInput[i].barcode===allItems[j].barcode)
            {
                buyedItems.push({barcode:allItems[j].barcode,name:allItems[j].name,unit:allItems[j].unit,price:allItems[j].price,count:countedInput[i].count});
            }
        }

//console.info(buyedItems);
    return (buyedItems);
}


//************ #No.3


function loadPromotions() {
    return [
        {
            type: 'BUY_TWO_GET_ONE_FREE',
            barcodes: [
                'ITEM000000',
                'ITEM000001',
                'ITEM000005'
            ]
        }
    ];
}
var buyedItems=getBuyedItems(countedInput);

function getBuyedPromotedItems(buyedItems)
{
    var promoteItems=[],buyedPromotedItems=[];
    promoteItems=loadPromotions();
    // console.info(promoteItems);
    var flag=false;

    for(var i=0;i<buyedItems.length;i++)
    {
        for(var j=0;j<promoteItems.length;j++)
        {
            for(var k=0;k<promoteItems[j].barcodes.length;k++)
            {
                if(buyedItems[i].barcode===promoteItems[j].barcodes[k])
                {
                    //console.info(buyedItems[i].barcode)
                    //buyedPromotedItems.push({barcode:buyedItems[i].barcode,name:buyedItems[i].name,unit:buyedItems[i].unit,price:buyedItems[i].price,count:buyedItems[i].count,type:promoteItems[j].type});
                    flag=true;
                    break;
                }
                else {
                    flag=false;
                    //buyedPromotedItems.push({barcode:buyedItems[i].barcode,name:buyedItems[i].name,unit:buyedItems[i].unit,price:buyedItems[i].price,count:buyedItems[i].count});
                }
            }
            if(flag)
            {
                buyedPromotedItems.push({barcode:buyedItems[i].barcode,name:buyedItems[i].name,unit:buyedItems[i].unit,price:buyedItems[i].price,count:buyedItems[i].count,type:promoteItems[j].type});
            }
            else
            {
                buyedPromotedItems.push({barcode:buyedItems[i].barcode,name:buyedItems[i].name,unit:buyedItems[i].unit,price:buyedItems[i].price,count:buyedItems[i].count});
            }
        }
    }


    //console.info(buyedPromotedItems);
    return(buyedPromotedItems);
}


//*********** #No.4


var buydePromotedItems= getBuyedPromotedItems(buyedItems);

function getSmallTotal(buyedPromotedItems)
{
    var buyedSmallTotalItems=[];

    for(var i=0;i<buyedPromotedItems.length;i++)
    {
        if((buyedPromotedItems[i].count>2)&&(buyedPromotedItems[i].type==='BUY_TWO_GET_ONE_FREE'))
        {
            buyedSmallTotalItems.push({barcode:buyedPromotedItems[i].barcode,name:buyedPromotedItems[i].name,unit:buyedPromotedItems[i].unit,price:buyedPromotedItems[i].price,count:buyedPromotedItems[i].count,type:buyedPromotedItems[i].type,smallTotalMoney:(buyedPromotedItems[i].price*(buyedPromotedItems[i].count-1))});
        }
        else {
            buyedSmallTotalItems.push({barcode:buyedPromotedItems[i].barcode,name:buyedPromotedItems[i].name,unit:buyedPromotedItems[i].unit,price:buyedPromotedItems[i].price,count:buyedPromotedItems[i].count,type:buyedPromotedItems[i].type,smallTotalMoney:(buyedPromotedItems[i].price*(buyedPromotedItems[i].count))});
        }
    }
    // console.info(buyedSmallTotalItems);
    return buyedSmallTotalItems;
}


// *********** #No.5


var buyedSmallTotalItems=getSmallTotal(buydePromotedItems);

function getSum(buyedSamllTotalItems)
{
    var sumItems={};

    sumItems.arr=buyedSamllTotalItems;
    sumItems.sumMoney=0;
    sumItems.spareMoney=0;

    for(var i=0;i<sumItems.arr.length;i++)
    {
        sumItems.sumMoney+=sumItems.arr[i].smallTotalMoney;

        if(sumItems.arr[i].type=="BUY_TWO_GET_ONE_FREE")
        {
            sumItems.spareMoney+=sumItems.arr[i].price;
        }
    }
    //console.info(sumItems);
    return sumItems;
}

//********** #No.6


var sumItems=getSum(buyedSmallTotalItems);

function print(sumItems)
{
    console.info("*************<没钱赚商店>收据***************");
    for(var i=0;i<sumItems.arr.length;i++)
    {
        console.info("名称："+sumItems.arr[i].name+","+"数量："+sumItems.arr[i].count+","+"单价："+sumItems.arr[i].price.toFixed(2)+"(元)"+","+"小计："+sumItems.arr[i].smallTotalMoney.toFixed(2)+"(元)");
    }
    console.info("----------------------------------------");
    console.info("总计："+sumItems.sumMoney.toFixed(2)+"(元)");
    console.info("节省："+sumItems.spareMoney.toFixed(2)+"(元)");
    console.info("******************************************");
}
print(sumItems);
//module.exports = getBuyedItems;
