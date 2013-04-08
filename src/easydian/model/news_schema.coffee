


#a crawler will insert news to mongodb, 
#node.js just get news from db
class News_Schema
  constructor : () ->
    @news_schema = new Schema({
      shopid : {type:String, default:'shopid'}, 
      news: {type:String, default:'abstract'},
      newsurl: {type:String, default:'full_url'},
      createtime:{type:Date, default: Date.now}
    })
    news = "news_"
    return
  #to identify how to insert a group of news an once
  insert_news: (news,category) ->
    news_models = Mongoose.model "news", @news_schema, (news+category)
    news_doc = new news_models news
    news_doc.save (err,doc) ->
      logger.info "failed to insert_comment: " + err  if err?
  
  #FIXme, use collection scope to search
  get_news_by_id: (shopid,category,start,limit,callback) ->
    cur_model = Mongoose.model "news", @news_schema, (news+category)
    cur_model.find({shopid:shopid})
    .sort('-createtime')
    .skip(start)
    .limit(limit)
    .select("news newsurl")
    .exec(callback)

  #remove the news before time
  remove_news_by_time:(time,category) ->
  
  remove_news_by_id: (id,category) ->

module.exports = News_Schema