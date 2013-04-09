
Shop_Schema = require './model/shop_schema'
Userinfo_Schema = require './model/userinfo_schema'
News_Schema = require './model/news_schema'
Comment_Schema = require './model/comment_schema'
Controller_Assisstant = require './controller_assisstant'

class Controller
  constructor: () ->
    # get, post, delete, put
    @routes = [
      {path: "/",               http_method: "get",   method: "index" },
      {path: "/index",          http_method: "get",   method: "index" },
      {path: "/shops",          http_method: "get",   method: "get_shops" },
      {path: "/shop/:id",       http_method: "get",   method: "get_shop_info"},
      {path: "/shop/:id",       http_method: "delete",method: "delete_shop"},
      {path: "/visit/:id",      http_method: "put",   method: "update_visit_num"},
      {path: "/shop",           http_method: "post",  method: "insert_shop"},
      {path: "/validate_field", http_method: "get",   method: "validate_field"},
      {path: "/goodbad/:id",    http_method: "put",   method: "update_goodbad_value"},      
      
      {path: "/register",       http_method: "post",  method: "register_user"},
      {path: "/login/:id",      http_method: "get",   method: "login_user"},
      {path: "/logout/:id",     http_method: "get",   method: "logout_user"},

      {path: "/comment/:id",    http_method: "post",  method: "insert_comment"},
      {path: "/comments/:id",   http_method: "get",   method: "get_comments"},
      {path: "/comments/:id",   http_method: "delete",method: "delete_comments"},
      {path: "/comment/:id",    http_method: "delete",method: "delete_comment"},

      {path: "/news/:id",       http_method: "get",   method: "get_news"},
      {path: "/news/:id",       http_method: "delete",   method: "delete_news"},

    ]
    @ss = new Shop_Schema()
    @us = new Userinfo_Schema()
    @ns = new News_Schema()
    @cs = new Comment_Schema()
    @ca = new Controller_Assisstant @ss, @us
    return
    
  #show the shops
  index: (req, res) ->    
    res.render 'index.ejs' 

  get_shops: (req, res) ->
    category = req.params.category
    start = req.params.start || 0
    limit = req.params.limit || 0
    fields = req.params.fields
    
    if @ca.validate_category category 
      @ss.get_shops category, fields, start, limit, (err, docs)=>
        if not err?
          if docs?.length > 0
            #console.log docs
            res.json(docs)
          else
            res.json 404, {"error": "Did not find any shops"}
        else   
          res.json 400, {"error":err}
    else
      res.json 400, {"error":"Invalid category"}

  get_shop_info: (req, res) ->
    id = req.params.id
    start = req.params.start
    limit = req.params.limit
    type = req.params.category
    news = req.params.news || 0
    comments = req.params.comments || 0
    fields = req.params.fields || 0
    fieldinfo = ""
    newsinfo = ""
    comminfo = ""
    
    if fields is 0 and news is 0 and comments is 0
      return  #don't do any response

    if fields isnt 0 
      @ss.get_shop_by_id id, fields, (doc)->
        fieldinfo = doc
        if news isnt 0
          @ns.get_news_by_id id, type, start, limit, (err, docs)->
            if not err?
              newsinfo = docs
            if comments isnt 0
              @cs.get_comments id, type, start, limit, -1, (err,docs)->
                if not err?
                newsinfo = docs
        else
          if comments isnt 0
              @cs.get_comments id, type, start, limit, -1, (err,docs)->
                if not err?
                newsinfo = docs           
    else
      if news isnt 0
          @ns.get_news_by_id id, type, start, limit, (err, docs)->
            if not err?
              newsinfo = docs
            if comments isnt 0
              @cs.get_comments id, type, start, limit, -1, (err,docs)->
                if not err?
                newsinfo = docs
        else
          if comments isnt 0
              @cs.get_comments id, type, start, limit, -1, (err,docs)->
                if not err?
                newsinfo = docs    
                console.log fieldinfo
                shopinfo = {
                  "fields": fieldinfo,
                  "comments": comminfo,
                  "news": newsinfo
                }
                res.json shopinfo
                #fix it here

  update_visit_num: (req,res) ->
    id = req.params.id
    visit = @ss.update_visit id
    if visit isnt -1
      res.json {"visit": visit}
    else
      res.json 400, {"error": "failed to update visit number"}

  insert_shop: (req, res) ->
    shopinfo = req.body
    if @ca.validate_shop shopinfo
      if @ss.insert_shop shopinfo
        res.json {"insert":"success"}
      else
        res.json 400, {"insert":"failed"}
    else
      res.json {"error": "Invalid shop information"}

  delete_shop: (req,res) ->
    id = req.params.id
    if @ss.remove_shop_by_id id
      res.json {"info":"success"}
    else
      res.json {"info":"failed"}
  
  validate_field: (req, res) ->
    table = req.params.table #shop / user
    field = req.params.field
    value = req.params.value
    if table? and field? and value?
      result = @ca.validate_field table, field, value
      res.json result
    else
      res.json 400, {"error":"bad request"}
  
  update_goodbad_value: (req, res) ->
    id = req.params.id
    category = req.params.category 
    type = req.params.type
    if @ca.validate_category category 
      num = @ss.update_badgood id, type
      if num is -1
        res.json 400, {"error": "failed to update"}
      else
        res.json {"value", num}
    else
     res.json 400, {"error":"Invalid category"}
   
  register_user: (req, res) ->
    userinfo = req.body
    if @ca.validate_username userinfo.username
      if @us.insert_user userinfo is true
         res.json {"info":"ok"}
      else
        res.json 400, {"error":"failed to register"}
    else
      res.json 400, {"error":"This name is already exist"}
   
   #next
  login_user: (req, res) ->
   #next 
  logout_user: (req, res) ->

  insert_comment: (req, res) ->
    category = req.params.category
    comment = req.body
    vca = @ca.validate_category category
    vco = @ca.validate_comment comment
    if vca and vco
      @cs.insert_comment comment, category, (err) ->
        if not err?
          res.json {insert: "success"}
        else
          res.json 400, {insert: "failed"}
    else
      res.json 400, {"error":"Please try again"}

  get_comments: (req, res) ->
    id = req.params.id
    category = req.params.category
    start = req.params.start
    limit = req.params.limit
    level = req.params.level || -1
    docs = @get_comments_inner id, category,start,limit,level
    if docs is false
      res.json 404, {"error":"did not find any comment"}
    else
      res.json docs

  get_news: (req, res) ->
    id = req.params.id
    category = req.params.category
    start = req.params.start
    limit = req.params.limit
    news = @get_news_inner id, category,start,limit
    if news is false
      res.json 404, {"error":"did not find any news"}
    else
      res.json news

  #supports later 
  delete_comments: (req, res) ->
  
  #supports later 
  delete_comment: (req, res) ->

  #supports later  
  delete_news: (req, res) ->





module.exports = Controller
