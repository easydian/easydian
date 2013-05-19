

class base_controller
  constructor: (@shop_kls) ->
  	
  get_shops: (req,res) ->
    start = (req.param "start") || 0
    limit = (req.param "limit") || 0
    fields = req.param "fields"
    GShop.get_shops @shop_kls, fields, start, limit, (err, docs)->
      if not err?
        if docs?.length > 0
           res.json docs
        else
           res.json 400, {"error":"no shops matched"}
      else
        res.json 400, {"error":"query info failed"}

  get_shop_info: (req,res) ->
    id = req.params.id
    news_num = (req.param "news") || 0  #first n
    com_num = (req.param "comments") || 0 #first n
    fields = (req.param "fields") || 0
 
    #should not be all zero, or no response, even a warning info
    return if (news_flag is 0) and (com_flag is 0) and (fi_flag is 0)
    
    self = this
    fe_f = false
    ce_f = false
    ne_f = false

    GShop.get_shop_by_id id, fields, (err, docs)->
      if err?
      	fe_f = true 
        _fileds = ""
      else
        _fileds = docs
      #comment should use the same machanism  with news
      GComment.get_comments id, 0, com_num, -1, (err,docs)->
      	if err?
      	  ce_f = true
      	  _comments = ""
      	 else
      	   _comments = docs
      	GNews.get_news_by_id id, 0, news_num, (err, docs)->
      	  if err?
      	  	ne_f = true
      	    _news = ""
      	  else
      	    _news = docs

      	  if (ne_f || ce_f || fe_f) is false
      	  	res.json 400, {"error":"query is failed"}
      	  else
      	    res.json {
      	  	  "news": _news,
      	  	  "fields": _fileds,
      	  	  "comments":_comments
      	    }

  update_visit_num: (req,res) ->
    id = req.params.id
    visit = GShop.update_visit id
    if visit isnt -1
      res.json {"visit": visit}
    else
      res.json 400, {"error": "failed to update visit number"}

  insert_shop: (req,res) ->
  	shopinfo = req.body
    if GAssisstant.validate_shop shopinfo
      if GShop.insert_shop shopinfo
        res.json {"insert":"success"}
      else
        res.json 400, {"insert":"failed"}
    else
      res.json 400, {"error": "Invalid shop information"}

  #maybe just use a flag should be ok
  delete_shop: (req,res) ->
    id = req.params.id
    if @ss.remove_shop_by_id id
      res.json {"info":"success"}
    else
      res.json {"info":"failed"}

  update_shop:(req,res) ->

  update_bad_value: (req,res) ->

  update_good_value: (req,res) ->

  get_comments: (req,res) ->

  insert_comment:(req,res)->

  delete_comment:(req,res)->

  update_comment:(req,res)->

  get_news:(req,res)->








