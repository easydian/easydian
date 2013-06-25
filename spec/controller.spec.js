var Controller = require("../lib/easydian/controller")
require('../lib/easydian/config')

xdescribe("Controller",function(){
  
  var cs = new Controller();
  var ExistID = '514b0e2c8b4309c20a000001';
  var req = {};
  var params = {};
  var res = {};
  
  it("contructor: can create an instance",function(){
    expect(typeof cs.ss).toEqual("object");
    expect(typeof cs.us).toEqual("object");
    expect(typeof cs.ns).toEqual("object");
    expect(typeof cs.ca).toEqual("object");
    waits(100);
  });
 
  // just have the simplest unit test right now
  it("get_shops: can get a number of shops",function(){
     runs(function(){
       params.start = 0;
       params.limit = 4;
       params.category = "Dining";
       params.fields = "shopname shoplogo";
       req.params = params;
       res.json = function(docs){
        //console.log(docs);
        expect(docs.length).toEqual(4);
       };
       cs.get_shops(req, res);       
     });
     waits(100);
     
  });

  it("get_shop_info: can get shop detail",function(){
    params.id = ExistID;
    params.start = 0;
    params.limit = 5;
    params.category = "Dining";
    params.news = 0;  //news schema did not tested
    params.comments = 0;
    params.fields = "shopname shoplogo shopwebsite";
    req.params = params;
    runs(function(){
      res.json = function(shopinfo){
        //console.log(shopinfo);
        expect(shopinfo.fields.shopname).toBeDefined();
        expect(shopinfo.fields.shoplogo).toBeDefined();
        expect(shopinfo.fields.shopwebsite).toBeDefined();      
      };
      cs.get_shop_info(req, res);
    });
    waits(100);

  });

  it("update_visit_num: can update visit num",function(){
    params.id = ExistID;
    req.params = params;
    runs(function(){
      res.json = function(info){
       expect(info.visit).toBeDefined();
      };
      cs.update_visit_num(req, res);
    });
    waits(100);
  });

  it("update_goodbad_value: can update bg value",function(){
    params.id = ExistID;
    params.category = "Dining";
    params.type = "good";
    req.params = params;
    runs(function(){
      res.json = function(info){
       expect(info.value).toBeDefined();
      };
      cs.update_goodbad_value(req, res);
    });
    waits(100);
  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });
  
  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });
  
  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });

  it("",function(){

  });
  
  it("",function(){

  });
})