


class Sys_Schema
  #probally, this will not be used
  #just leave it here
  constructor: () ->
    @sys_schema = new Schema({
      shoptype: {type:String, default: "default type"}, # add ",unique:true,trim:true" in
      shopnum: {type:Number, default: 10},
      column:{type:Number, default:4},
      taborder : {type:Number, default: 1},
      createtime: {type:Date, default: Date.now}
    })
    @sys_model = Mongoose.model "sys_manager", @sys_schema
    return
    
  insert_shop_type: (sys,callback) ->
    sys_doc = new @sys_model sys
    if not callback?
      sys_doc.save (err) ->
        logger.info "failed to create_sys_manager: " + err  if err?
    else
      sys_doc.save callback

  get_shop_type: (fields,callback) ->
    @sys_model.find()
    .select(fields)
    .sort('taborder')
    .exec(callback)


  increase_shopnum: (num,type) ->
    condition = {shoptype:type}
    update = {$inc: {shopnum:num}} #how to pass a parameter to shopnum ?
    option = {upsert: false}
    @sys_model.update condition, update, option,(err)->
      logger.info "failed to update_shopnum: "+err if err?

  update_column: (num, type) ->
    condition = {shoptype:type}
    update = {$set: {column:num}} #how to pass a parameter to shopnum ?
    option = {upsert: false}
    @sys_model.update condition, update, option,(err)->
      logger.info "failed to update_column: "+err if err?

  update_taborder: (order,type) ->
    condition = {shoptype:type}
    update = {$set: {taborder:order}} #how to pass a parameter to shopnum ?
    option = {upsert: false}
    @sys_model.update condition, update, option,(err)->
      logger.info "failed to update_taborder: "+err if err?

  remove_shop_type: (type) ->
    @shop_model.remove {shoptype:type}, (err) ->
      logger.info "failed to remove_shop_type: "+err if err?

  
 module.exports = Sys_Schema