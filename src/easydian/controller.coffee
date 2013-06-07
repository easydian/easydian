
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
      {path: "/news/:id",       http_method: "delete",method: "delete_news"},

      {path: "/dining",         http_method: "get",   method: "dining_index" }
    ]
    @ss = new Shop_Schema()
    @us = {} #Userinfo_Schema()
    @ns = new News_Schema()
    @cs = new Comment_Schema()
    @ca = new Controller_Assisstant @ss, @us
    return

  #show the index page
  index: (req, res) ->    
    res.render 'index.ejs' 

  get_shops: (req, res) ->
    category = req.param "category"
    start = (req.param "start") || 0
    limit = (req.param "limit") || 0
    fields = req.param "fields"
    if @ca.validate_category category 
      @ss.get_shops category, fields, start, limit, (err, docs)->
        if not err?
          if docs?.length > 0
            #res.render("dining/shopviewtmpl.ejs",{"shops": docs})
            res.json docs
          else        
            #res.json 404, {"error": "Did not find any shops"}
            res.json docs            
        else   
          res.json 400, {"error":err}
    else
      res.json 400, {"error":"Invalid category"}

  get_shop_info: (req, res) ->
    id = req.params.id
    start = (req.param "start") || 0
    limit = (req.param "limit") || 1
    type = req.param "category"
    nf = (req.param "news") || 0
    cf = (req.param "comments") || 0
    fields = (req.param "fields") || 0
    
    logger.info ">>>>>>>>>>>>>id: " + id
    logger.info ">>>>>>>>>>>>>start: " + start
    logger.info ">>>>>>>>>>>>>limit: " + limit
    logger.info ">>>>>>>>>>>>>type: " + type
    logger.info ">>>>>>>>>>>>>nf: " + nf
    logger.info ">>>>>>>>>>>>>cf: " + cf
    logger.info ">>>>>>>>>>>>>fields: " + fields

    if fields is 0 and nf is 0 and cf is 0
      return  #don't do any response

    if fields isnt 0 
      @ss.get_shop_by_id id, fields, (err, doc)=>
        if err?
          doc = ""
        @send_shop_info res, doc, id, type, nf, cf, start, limit
    else
      @send_shop_info res, "", id, type, nf, cf, start, limit
        
  send_shop_info: (res, fieldinfo, id, type, news_t, comm_t, start, limit) ->
    news = ""
    comments = ""
    if news_t is 0 and comm_t is 0
      res.json {
        "news": news,
        "comments": comments,
        "fields":fieldinfo
      } 
      return    
    if comm_t isnt 0
      @cs.get_comments id, type, start, limit, -1, (err,docs)=>
        if not err?
          comments = docs
          logger.info ">>>>>>>>>>>>>comments: " + comments
          if news_t isnt 0
            @ns.get_news_by_id id, type, start, limit, (err, docs)->
              if not err?
                news = docs
                logger.info ">>>>>>>>>>>>>news: " + news
                res.json {
                  "news": news,
                  "comments": comments,
                  "fields":fieldinfo
                }
              else
                res.json {
                  "news": news,
                  "comments": comments,
                  "fields":fieldinfo
                }
          else
            res.json {
              "news": news,
              "comments": comments,
              "fields":fieldinfo
            }
        else
          if news_t isnt 0
            @ns.get_news_by_id id, type, start, limit, (err, docs)=>
              if not err?
                news = docs
                logger.info ">>>>>>>>>>>>>news: " + news
                res.json {
                  "news": news,
                  "comments": comments,
                  "fields":fieldinfo
                }
              else
                res.json {
                  "news": news,
                  "comments": comments,
                  "fields":fieldinfo
                }
          else
            res.json {
              "news": news,
              "comments": comments,
              "fields":fieldinfo
            }
    else
      @ns.get_news_by_id id, type, start, limit, (err, docs)->
        if not err?
          news = docs
          logger.info ">>>>>>>>>>>>>news: " + news
          res.json {
            "news": news,
            "comments": comments,
            "fields":fieldinfo
          }
        else
          res.json {
            "news": news,
            "comments": comments,
            "fields":fieldinfo
          }
      
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
    table = req.param table #shop / user
    field = req.param field
    value = req.param value
    if table? and field? and value?
      result = @ca.validate_field table, field, value
      res.json result
    else
      res.json 400, {"error":"bad request"}
  
  update_goodbad_value: (req, res) ->
    id = req.params.id
    category = req.param category 
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
    id = req.params.id
    category = req.param category
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
    category = req.param category
    start = req.param start
    limit = req.param limit
    level = (req.param level) || -1
    @cs.get_comments id, type, start, limit, level, (err,docs)->
      if err?
        res.json 404, {"error":"did not find any comment"}
      else
        res.json docs

  get_news: (req, res) ->
    id = req.params.id
    category = req.param category
    start = req.param start
    limit = req.param limit
    @ns.get_news_by_id id, type, start, limit, (err, docs)->
      if err?
        res.json 404, {"error":"did not find any news"}
      else
        res.json docs

  #supports later 
  delete_comments: (req, res) ->
  
  #supports later 
  delete_comment: (req, res) ->

  #supports later  
  delete_news: (req, res) ->

  #show the dining page  
  dining_index: (req, res) ->
    res.render "dining.ejs"

module.exports = Controller
