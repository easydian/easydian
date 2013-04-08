var Comment_Schema = require("../lib/easydian/model/comment_schema")
require('../lib/easydian/config')

xdescribe("Comment Schema", function(){
  //var ExistID = '514ace690a16f3140c000001';
  var ExistID = '514b0e2c8b4309c20a000001';
  var cs = new Comment_Schema();
  var doc = {
  	shopid : ExistID,
  	comment: "This shop is great!"
  };
  var category = "Dining";
  it("constructor: can create an instance", function(){
    expect(typeof cs.comm_schema).toEqual("object");
  });

  it("insert/remove_comment: can insert/remove a comment to db", function(){
  	var thisid;
    runs(function(){
      var callback = function(err,doc){
        expect(doc.shopid).toEqual(ExistID);
        thisid = doc._id;
      }
      cs.insert_comment(doc, category, callback)
    })
    waits(100);
    runs(function(){
      cs.remove_comment_by_id(thisid,category);
    });
    waits(50);
  });

  it("get_comments: can get a rank of comments from db",function(){
    runs(function(){
      var callback = function(err,docs){
      	var num = 0;
      	for (var index in docs){
          //logger.info("--->: "+docs[index]);
      	  expect(docs[index].comment).toEqual("This shop is great!");
      	  num++;
      	}
      	expect(num).toEqual(4);
      };
      cs.get_comments(ExistID,"Dining",1,4,callback);
    });
    waits(100);
  });


});