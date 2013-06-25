

banjia = require './banjia_controller'
canyin = require './canyin_controller'
zhuangxiu = require './zhuangxiu_controller'
user_ctrl = require './user_controller'

class initcontroller
  constructor: () -> return

  get_route: () ->
    route = [
      {path:"/",  http_method: "get",    method:"index"},
      {path:"/index",  http_method: "get",    method:"index"}
    ]

  index: (req,res) ->
    res.render(new EJS('index.ejs'))
    

class Controller
  constructor: () ->
    @__banjia = new banjia()
    @__canyin = new canyin()
    @__zhuangxiu = new zhuangxiu()
    @__user_ctrl = new user_ctrl()
    @__init = new initcontroller()

  get_all_controllers: () ->
    ctrllers =  [
      @__banjia,
      @__canyin,
      @__zhuangxiu,
      @__user_ctrl,
      @__init
    ]
    return ctrllers



module.exports = Controller