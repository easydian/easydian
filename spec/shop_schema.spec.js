var Shop_Schema = require("../lib/easydian/model/shop_schema")
require('../lib/easydian/config')

xdescribe("shop schema",function(){
  
  var sd, doc;
  //var ExistID = '514ace690a16f3140c000001';
  var ExistID = '514b0e2c8b4309c20a000001';
  sd = new Shop_Schema();
  doc = {
    shopname : 'fullname',
    shopalias : ['short name'],
    shoptype : 'Dining',
    shopvisit : 1000,
    shoppriority : 1000,
    shopwebsite: 'fullurl',
    shopphone:  ['010-22222222'],
    shoponbusiness: true,
    shoponadv: true,
    shopweekstats:[
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ],
    weekday:     [0,0,0,0,0,0,0],
    weekdaygood: [0,0,0,0,0,0,0],
    weekdaybad:  [0,0,0,0,0,0,0],
    shopgoodt: 0,
    shopbadt: 10,
    shopdaystats:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    shopmonthstats: [0,0,0,0,0,0,0,0,0,0,0,0],    
    shoplogo: './images/default.jpg', 
    shopcover: ['beijing','shanghai'],
    shopaccount: 0, 
    shopcreatetime: Date.now,
    shopcommentsnum: 0
  };

  doc.shopname = "Kentucky Fried Chicken";
  doc.shopalias.push("KFC");
  doc.shopwebsite = "http://www.kfc.com.cn/kfccda/index.aspx";
  doc.shopphone.push("400-882-3823");
  doc.shopweekstats[0][1] = 550;
  doc.shopweekstats[1][1] = 550;
  doc.shopmonthstats[1] = 1000;
  doc.shoplogo = "./images/kfc_0.jpg";
  doc.shopcreatetime = new Date;
  doc.shopcommentsnum = 10;

  it("constructor: can create an instance",function(){
    expect(typeof sd.shop_schema).toEqual("object");
    expect(typeof sd.shop_model).toEqual("function");
  });
  
  it("insert_shop: can insert shop to mongodb",function(){
    var thisid;
     runs(function(){
      var callback = function(err,doc){
        thisid = doc._id;
        expect(thisid).toBeDefined();
        sd.remove_shop_by_id(thisid);
      };
       sd.insert_shop(doc,callback)
     });
     waits(50)
    
  });

  it("get_shops: can find docs from db",function(){
    var index = 0;
    var fields = "shopname shoplogo";
    runs(function(){
      var callback = function(err,docs){
        if(err) logger.info(err)
          for (var one in docs){
            //logger.info(docs[one]); 
            index = index + 1;
          }      
      }; 
      sd.get_shops("Dining",fields,0,2,callback);
    });
    waits(50);
    runs(function(){
      expect(index).toEqual(2);
    })

  });

  xit("get_shop_by_id: get a shop by id", function(){
    runs(function(){
      var callback = function(doc){
        expect(doc._id).toEqual(Mongoose.Types.ObjectId(ExistID));
        expect(doc.shopname).toBeDefined();
        expect(doc.shoplogo).toBeDefined();
        expect(doc.weekdaygood).toBeDefined();
      };
      var fields = "shopname shoplogo weekdaygood";
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(50);
  });

  xit("update_shop_account: update shop account", function(){
    var num = Math.ceil(Math.random()*1000);
    runs(function(){
      sd.update_shop_account(ExistID, num);
    });
    waits(50);
    runs(function(){
      var callback = function(doc){
        expect(doc.shopaccount).toEqual(num);
      };
      var fields = "shopaccount";
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(50);
  });

  xit("update_visit: visit, priority, stats will be updated",function(){
    var visit, prio, wd, sds, sms,sws;
    var visit1, prio1, wd1, sds1, sms1,sws1;
    var curtime = new Date();
    var day = curtime.getDay() - 1;
    var hour = curtime.getHours() - 1; //0->23
    var month = curtime.getMonth();
    var fields = "shopvisit shopweekstats weekday shopdaystats shoppriority shopmonthstats"
    runs(function(){
      var callback = function(doc){
        visit = doc.shopvisit;
        sws = doc.shopweekstats[day][hour];
        wd = doc.weekday[day];
        sds = doc.shopdaystats[hour];
        prio = doc.shoppriority;
        sms = doc.shopmonthstats[month];       
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    })
    waits(50);
    runs(function(){
      sd.update_visit(ExistID);
    });
    waits(50);
    runs(function(){
      var callback = function(doc){
        sws1 = doc.shopweekstats[day][hour];
        wd1 = doc.weekday[day];
        sds1 = doc.shopdaystats[hour];
        prio1 = doc.shoppriority;
        sms1 = doc.shopmonthstats[month];
        visit1 = doc.shopvisit;
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    })
    waits(50);
    runs(function(){
      expect(sws).toEqual(sws1-1);
      expect(wd).toEqual(wd1-1);
      expect(sds).toEqual(sds1-1);
      expect(prio).toEqual(prio1-1);
      expect(sms).toEqual(sms1-1);
      expect(visit).toEqual(visit1-1);
    });

  });

  it("update_badgood: can update daygood daybad goodt badt priority",function(){
    var goodt, badt, wdg, prio, wdb
    var goodt1, badt1, wdg1, prio1, wdb1;
    var curtime = new Date();
    var day = curtime.getDay() - 1;
    var fields = "weekdaygood shoppriority shopgoodt shopbadt weekdaybad";
    runs(function(){
      var callback = function(doc){
        wdg = doc.weekdaygood[day];
        wdb = doc.weekdaybad[day];
        goodt = doc.shopgoodt;
        badt = doc.shopbadt;
        prio = doc.shoppriority;
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(50);
    runs(function(){
      //here comes out a concurrency problem
      sd.update_badgood(ExistID,"good");    
    });
    waits(5);
    runs(function(){
      sd.update_badgood(ExistID,"bad");  
    });
    waits(50);
    runs(function(){
      var callback = function(doc){
        wdg1 = doc.weekdaygood[day];
        wdb1 = doc.weekdaybad[day];
        goodt1 = doc.shopgoodt;
        badt1 = doc.shopbadt;
        prio1 = doc.shoppriority;
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(50);
    runs(function(){
      expect(wdg1).toEqual(wdg+1);
      expect(wdb1).toEqual(wdb+1);
      expect(goodt1).toEqual(goodt+1);
      expect(badt1).toEqual(badt+1);
      expect(prio1).toEqual(prio);
    });
  });
  
  it("update_shop_logo: can update the logo of a shop in db",function(){
    var shoplogo = "./images/test.jpg";
    var shopdefault = "./images/default.jpg";
    var fields = "shoplogo";
    var logo1;
    runs(function(){
      sd.update_shop_logo(ExistID,shoplogo);
    })
    waits(50);
    runs(function(){
      var callback = function(doc){
        logo1 = doc.shoplogo;
      }
      sd.get_shop_by_id(ExistID, fields, callback);
    })
    waits(50);
    runs(function(){
      expect(shoplogo).toEqual(logo1);
      sd.update_shop_logo(ExistID,shopdefault);
    });
    waits(50);

  });

  it("update_comments_num: can update comment num", function(){
    var fields = "shopcommentsnum";
    var num, num1;
    runs(function(){
      var callback = function(doc){
        num = doc.shopcommentsnum;
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(50);
    runs(function(){
      sd.update_comments_num(ExistID);
    })
    waits(50);
    runs(function(){
      var callback = function(doc){
        num1 = doc.shopcommentsnum;
      };
      sd.get_shop_by_id(ExistID, fields, callback);
    });
    waits(50);
    runs(function(){
      expect(num1).toEqual(num+1);
    })
  });

  it("remove_shop_by_id: can remove a shop from db",function(){
    var thisid;
    var tdoc;
    runs(function(){
      var callback = function(err,doc){
        thisid = doc._id;
      };
      sd.insert_shop(doc,callback);
    });
    waits(50);
    runs(function(){
      sd.remove_shop_by_id(thisid);
    });
    waits(50);
    runs(function(){
      var callback = function(doc){
        tdoc = doc;
      }
      sd.get_shop_by_id(thisid,"shopname",callback)
    });
    waits(50);
    runs(function(){
    expect(tdoc).toBeNull();
    });
  });



})
