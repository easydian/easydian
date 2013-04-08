var Userinfo_Schema = require("../lib/easydian/model/userinfo_schema")
require('../lib/easydian/config')

describe("Userinfo Schema",function(){
  var us, doc, addrinfo, addrinfo1, phoneinfo;
  var ExistID = "5150170e1541c17b0c000005";
  us = new Userinfo_Schema();
  doc = {
  	username: "lining@gmail.com",
    useralias: "李宁",
    useraddress: [{
      address: "xueyuanlu 39 haidian beijing",
      gps:{x:100.01, y:200.01}
    }],
    userpassword: "0000xxxxx000cccc0vvv000bbb",
    usertargetaddress: [{
      address: "jingshuyuan 102 haidian beijing",
      gps:{x:50.01, y:60.01}	
    }],
    userphone: [{
      phone:"010-22789276", 
      usetime:new Date
    }], 
    logintime: [{
      login:new Date, 
      logduration:10
    }],
    belogin: false
  };
  addrinfo = {
    address: "jingshuyuan 102 haidian beijing",
    gps:{x:10.01, y:20.01},
  };

  addrinfo1 = {
    address: "nanjing 102 haidian beijing",
    gps:{x:10.01, y:20.01},
  };

  phoneinfo = {
    phone: "020-110101010",
    usetime: new Date
  };

  it("Constructor: can create an instance for userinfo schema",function(){
  	runs(function(){
      expect(typeof us.addr_info).toEqual("object");
      expect(typeof us.user_schema).toEqual("object");
      expect(typeof us.user_model).toEqual("function");
  	});
  });
  
  it("insert_user: can insert a user to db",function(){
  	var thisid;
    runs(function(){
      var callback = function(err,doc){
        thisid = doc._id;
        expect(thisid).toBeDefined();
        us.remove_user(thisid);
      };
      us.insert_user(doc, callback)	
    })
    waits(80);
  });

  it("add_address_to_user: can insert a user address",function(){
  	runs(function(){
      us.add_address_to_user(ExistID,addrinfo)
  	});
    waits(50);
    runs(function(){
      var index = 0;
      var callback = function(doc){
        uas = doc.useraddress;
        for (one in uas){
          if("jingshuyuan 102 haidian beijing" == uas[one].address){
            index = 1;
            break;
          }
        }
        expect(index).toEqual(1);
      };
      us.get_user(ExistID,"useraddress",callback);
    });
    waits(50);
  });

  it("add_address_to_target: can insert a target address",function(){
    runs(function(){
      us.add_address_to_target(ExistID,addrinfo1)
    });
    waits(50);
    runs(function(){
      var index = 0;
      var callback = function(doc){
        uas = doc.usertargetaddress;
        for (one in uas){
          if("nanjing 102 haidian beijing" == uas[one].address){
            index = 1;
            break;
          }
        }
        expect(index).toEqual(1);
      };
      us.get_user(ExistID,"usertargetaddress",callback);
    });
    waits(50);
  });

  it("remove_user_address: can remove a user address",function(){
    runs(function(){
      us.remove_user_address(ExistID,"jingshuyuan 102 haidian beijing");
    });
    waits(50);
    runs(function(){
      var index = 0;
      var callback = function(doc){
        uas = doc.useraddress;
        for (one in uas){
          if("jingshuyuan 102 haidian beijing" == uas[one].useraddress){
            index = 1;
            break;
          }
        }
        expect(index).toEqual(0);
      };
      us.get_user(ExistID,"useraddress",callback)
    });
    waits(50);
  });

  it("remove_target_address: can remove a target address",function(){
    runs(function(){
      us.remove_target_address(ExistID,"nanjing 102 haidian beijing");
    });
    waits(50);
    runs(function(){
      var index = 0;
      var callback = function(doc){
        uas = doc.useraddress;
        for (one in uas){
          if("nanjing 102 haidian beijing" == uas[one].useraddress){
            index = 1;
            break;
          }
        }
        expect(index).toEqual(0);
      };
      us.get_user(ExistID,"usertargetaddress",callback)
    });
    waits(50);
  });

  it("add_phone_to_user: can add a phone number to user",function(){
  	runs(function(){
  		us.add_phone_to_user(ExistID,phoneinfo);
  	});
  	waits(50);
  	runs(function(){
  	  var index = 0;
  	  var callback = function(doc){
        ups = doc.userphone;
        for (one in ups){
          if("020-110101010" == ups[one].phone){
          	index = 1;
          	break;
          }
        }
        expect(index).toEqual(1);
  	  };
  	  us.get_user(ExistID,"userphone",callback);
  	})
  	waits(50);
  });

  it("remove_user_phone: can remove a phone number",function(){
  	runs(function(){
      us.remove_user_phone(ExistID,"020-110101010");
  	});
  	waits(50);
  	runs(function(){
      var index = 0;
  	  var callback = function(doc){
        ups = doc.userphone;
        for (one in ups){
          if("020-110101010" == ups[one].phone){
          	index = 1;
          	break;
          }
        }
        expect(index).toEqual(0);
  	  };
  	  us.get_user(ExistID,"userphone",callback)
  	});
  	waits(50);
  });
  

  it("update_logintime: can update login time",function(){
  	runs(function(){
      
  	});
  });

  it("update_login_status: can update login status",function(){
  	runs(function(){

  	});
  });

  it("update_user_alias: can update user alias",function(){
  	runs(function(){

  	});
  });


});