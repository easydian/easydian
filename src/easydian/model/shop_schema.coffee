#desc:
###
  put all the shops into one collection, which is called 'shops'
  e.g:
  @shop_model = Mongoose.model('shops',@shop_schema)
  name->index, id->index
  shopweekstats prototype
  shopweekstats:[
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
###

class Shop_Schema 
  constructor: () -> 
    @shop_schema = new Schema({
      shopname : {type:String, default:'fullname'},
      shopalias : {type:Array, default: ['short name']},
      shoptype : {type:String, default:'Dining'},
      shopvisit : {type:Number, default:1000},
      shoppriority : {type: Number, default:1000},
      shopwebsite: {type:String, default: 'fullurl'},
      shopphone: {type:Array, default: ['010-22222222']},
      shoponbusiness: {type:Boolean, default: true},
      shoponadv: {type:Boolean, default: true},
      shopweekstats:[],
      weekday:     {type:Array, default:[0,0,0,0,0,0,0]},#visit
      weekdaygood: {type:Array, default:[0,0,0,0,0,0,0]},
      weekdaybad:  {type:Array, default:[0,0,0,0,0,0,0]},
      shopgoodt: {type:Number, default:0},
      shopbadt: {type:Number, default:0},
      shopdaystats:{type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},#visit
      shopmonthstats: {type:Array,default:[0,0,0,0,0,0,0,0,0,0,0,0]}, #visit     
      shoplogo: {type:String, default: './images/default.jpg'}, 
      shopcover:{type:Array, default: ['beijing','shanghai']},
      shopaccount: {type:Number, default:0}, 
      shopcreatetime: {type:Date, default: Date.now},
      shopcommentsnum: {type:Number, default:0}
    })
    @shop_model = Mongoose.model "shops", @shop_schema
    return

  insert_shop: (shop,callback) ->
    shop_doc = new @shop_model shop
    if not callback?
      shop_doc.save (err)->
        if err?
          logger.info "failed to insert_shop: " + err 
          return false 
        true
    else
      shop_doc.save callback

  #callback: (err,docs)
  get_shops: (category, fields, start, limit, callback) ->
    if typeof category is 'function'
      @shop_model.find()
      .sort('-shoppriority')
      .select(fields)
      .exec(callback)
    else
      @shop_model.find({shoptype:category})
      .sort('-shoppriority')
      .skip(start)
      .limit(limit)
      .select(fields)
      .exec(callback)
   
  update_visit: (id) ->
    fields = "shopvisit shopweekstats weekday shopdaystats shoppriority shopmonthstats"
    @shop_model.findById id, fields, (err,doc) ->
      if err?
        logger.info "update_visit.findbyIDd: "+err 
        return -1
      curtime = new Date()
      day = curtime.getDay() - 1
      hour = curtime.getHours() - 1  #hour: 0-->23
      month = curtime.getMonth()
      doc.shopvisit = doc.shopvisit + 1
      doc.shopweekstats[day][hour] = doc.shopweekstats[day][hour] + 1
      doc.weekday[day] = doc.weekday[day] + 1
      doc.shopdaystats[hour] = doc.shopdaystats[hour] + 1
      doc.shoppriority = doc.shoppriority + 1
      doc.shopmonthstats[month] = doc.shopmonthstats[month] + 1
      doc.markModified("shopweekstats")
      doc.markModified("weekday")
      doc.markModified("shopdaystats")
      doc.markModified("shopmonthstats")
      doc.save (err)->
        if err?
          logger.info "failed to update_visit.save: "+err
          return -1
        return doc.shopvisit 
        
  update_badgood: (id,type) ->
    fields = "weekdaygood shoppriority shopgoodt shopbadt weekdaybad"
    num = 0
    @shop_model.findById id, fields,(err,doc) ->
      logger.info "update_badgood.findbyID: "+err if err?
      curtime = new Date()
      day = curtime.getDay() - 1 # 1 base -> 0 base
      hour = curtime.getHours() - 1 #1 base -> 0 base
      month = curtime.getMonth()
      if type is 'good'
        doc.weekdaygood[day] = doc.weekdaygood[day] + 1
        doc.shoppriority = doc.shoppriority + 2
        doc.shopgoodt = doc.shopgoodt + 1
        doc.markModified("weekdaygood")
        num = doc.shopgoodt
      else
        doc.weekdaybad[day] = doc.weekdaybad[day] + 1
        doc.shoppriority = doc.shoppriority - 2
        doc.shopbadt = doc.shopbadt + 1
        doc.markModified("weekdaybad")
        num = doc.shopbadt
      doc.save (err) ->
        if err?
          logger.info "failed to update_badgood.save: "+err 
          return -1
        num
 
  get_shop_by_id: (id,fields, callback) ->
    @shop_model.findById id,fields,(err,doc) ->
      if err?
        logger.info "failed to get_shop_by_id.findById: "  + err 
        return false
      callback(doc) 

  get_shop_by_name: (name,fields, callback) ->
    @shop_model.find {shopname:name},fields,(err,doc) ->
      if err?
        logger.info "failed to get_shop_by_name.find: "  + err
        return false 
      callback(doc)  

  update_shop_account: (id,num) ->
    @shop_model.update {_id:id},{"shopaccount":num}, {upsert: false}, (err,num,doc) ->
      logger.info "failed to update_shop_account: "+err if err?
  ### 
  update_field_by_id: (id, field, newvalue) ->
    @shop_model.update {_id:id},{field:newvalue}, {upsert: false}, (err,num,doc) ->
      logger.info "failed to update_field_by_id: "+err if err?
  ###
  update_shop_logo: (id, logo) ->
    @shop_model.update {_id:id},{"shoplogo":logo}, {upsert: false}, (err,num,doc) ->
      if err?
        logger.info "failed to update_shop_logo: "+err 
        false
      true

  update_comments_num: (id) ->
    fields = "shopcommentsnum"
    @shop_model.findById id, fields, (err,doc) ->
      if err?
        logger.info "failed to update_comments_num.findById: "  + err 
        false
      else
        doc.shopcommentsnum = doc.shopcommentsnum + 1
        doc.save (err) ->
          if err?
            logger.info "failed to update_comments_num.save: "+err 
            false
          true

  remove_shop_by_id: (id) ->
    @shop_model.remove {_id:id}, (err) ->
      if err?
        logger.info "failed to remove_shop_by_id: "+err
        false
      true


module.exports = Shop_Schema
