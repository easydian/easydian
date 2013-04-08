



class Userinfo_Schema
  constructor : () ->
    @addr_info = new Schema({
      address: {type:String,required:true,unique:true}, # add ",unique:true,trim:true" in
      gps:{x:0.00,y:0.00},
      usetime: {type:Date, default:Date.now}
    })
    @phone_info = new Schema({
      phone: {type:String,unique:true}
      usetime:{type:Date, default: Date.now}
    });
    @user_schema = new Schema({
      username: {type:String, required: true}, # add ",unique:true,trim:true" in
      useralias: {type:String, default: "Mr Lazy"},
      useraddress: [@addr_info],
      userpassword: {type:String, default:"md5"}, #havn't decided how to auth
      usertargetaddress: [@addr_info],
      userphone: [@phone_info], #phone num to be unique
      logintime: [{login:Date, logduration:Number}],
      belogin: {type:Boolean, default: true}
    })
    @user_model = Mongoose.model 'user_info', @user_schema
    return

  insert_user : (user, callback) ->
    user_doc = new @user_model user
    if not callback?
      user_doc.save (err) ->
        if err?
          logger.info "failed to insert_shop: " + err 
          return false 
        true
    else
      user_doc.save callback

  get_user: (id,fields,callback) ->
    @user_model.findById id, fields, (err,doc)->
      if err?
        logger.info "failed to get_user: " + err 
        return false
      true 
      callback(doc)

  get_user_by_name: (name, fields, callback) ->
    @user_model.find {username: name}, fields, (err,doc)->
      if err?
        logger.info "failed to get_user_by_name: " + err
        return false
      true  
      callback(doc)

  add_address_to_user: (id, addrinfo) -> #address should be a json
    @user_model.findById id,"useraddress", (err,doc) ->
      doc.useraddress.push addrinfo
      doc.markModified("useraddress")
      doc.save (err) ->
        logger.info "failed to add_address_to_user: " + err  if err?

  add_address_to_target: (id,addrinfo) ->
    @user_model.findById id, "usertargetaddress", (err,doc) ->
      doc.usertargetaddress.push addrinfo
      doc.markModified("usertargetaddress")
      doc.save (err) ->
        logger.info "failed to add_address_to_target: " + err  if err?

  remove_user_address: (id,address) -> #FIXme if "address" is "all", remove all
    condition = {_id:id}
    update = {$pull:{useraddress:{address:address}}}
    @user_model.update condition, update, false, false

  remove_target_address: (id,address) ->
    condition = {_id:id}
    update = {$pull:{usertargetaddress:{address:address}}}
    @user_model.update condition, update, false, false

  add_phone_to_user: (id,phoneinfo) ->
    @user_model.findById id, "userphone", (err,doc)->
      doc.userphone.push phoneinfo
      doc.markModified("userphone")
      doc.save (err) ->
        logger.info "failed to add_phone_to_user: " + err  if err?

  remove_user_phone: (id,phonenum) ->
    condition = {_id:id}
    update = {$pull:{userphone:{phone:phonenum}}}
    @user_model.update condition, update, false, false

  remove_user: (id) ->
   @user_model.remove {_id:id}, (err) ->
     logger.info "failed to remove_user: "+err if err?

  update_logintime: (id,inflag) ->
    @user_model.findById id , "logintime", (err,doc) ->
      if inflag is true
        doc.logintime.push {login:Date.now, logduration:0}
      else
        logintime = doc.logintime[0].login
        logoutime = Date.now
        doc.logintime[0].logduration = logoutime - logintime
      doc.markModified("logintime")
      doc.save (err) ->
        logger.info "failed to update_logintime: " + err  if err?

  update_login_status: (id, status) ->
    condition = {_id:id}
    update = {$set: {belogin: status}}
    option = {upsert: false}
    @user_model.update condition, update, option,(err)->
      logger.info "failed to update_login_status: "+err if err?

  update_user_alias: (id, alias) ->
    condition = {_id:id}
    update = {$set: {useralias: alias}}
    option = {upsert: false}
    @user_model.update condition, update, option,(err)->
      logger.info "failed to update_user_alias: "+err if err?
    

  

module.exports = Userinfo_Schema