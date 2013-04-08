
class Comment_Schema
  constructor: () ->
    @comm_schema = new Schema({
      shopid : {type:String, default:'shopid'}, 
      level: {type:Number,default: 4}
      comment: {type:String, default:'context'},
      createtime: {type:Date, default: Date.now}
    })

  insert_comment: (comment,category,callback) ->
    comm_model = Mongoose.model "comments", @comm_schema, category
    comment_doc = new comm_model comment
    if not callback?
      comment_doc.save (err) ->
        logger.info "failed to insert_comment: " + err  if err?
    else
      comment_doc.save callback
    
    
  get_comments: (shopid,category,start,limit,level,callback) ->
    cur_model = Mongoose.model "comments", @comm_schema, category
    if level is -1
      cur_model.find({shopid:shopid})
      .sort('-createtime')
      .skip(start)
      .limit(limit)
      .select("comment")
      .exec(callback)
    else
      cur_model.find({shopid:shopid,level:level})
      .sort('-createtime')
      .skip(start)
      .limit(limit)
      .select("comment")
      .exec(callback)

  remove_comment_by_id: (id,category) ->
    cur_model = Mongoose.model "comments", @comm_schema, category
    cur_model.remove {_id:id}, (err) ->
      logger.info "failed to remove_shop_by_id: "+err if err?


module.exports = Comment_Schema