var Flowers = Backbone.Collection.extend({
  url: "/posts"
})
var flowers = new Flowers;

var Plant = Backbone.Model.extend({
  defaults: {
    name: "rose",
    intro: "I can't walk"
  },

  selfIntroduction: function(){
    console.log("Kind Of Plant");
  }
});

var Flower = Plant.extend({
  validate: function(attrs){
    if (attrs.name == "") return "Even alert sucks. but no name is worse..";
  }
});

var Tree = Plant.extend({
  selfIntroduction: function(){
    console.log("Kind Of Tree");
  }
});

var FlowerV = Backbone.View.extend({
  tagName: "li",
  className: "a-flower",

  initialize: function(){
    this.model.bind('change', this.render, this);
  },

  events: {
    "click .cut-flower": function(){
      console.log("cut a flower");
      this.remove();
    },
    "click .back2origin": function(){
      console.log("fetch from server");
      this.model.fetch();
    },
    "click .save-flower": "saveFlower",
    "dblclick h2": "editName",
    "blur input": "updateName"
  },

  render: function(){
    console.log("render a flower");

    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
    var template = _.template($("#flower-template").html());

    this.options.field.append(this.$el.html(template({
      intro: this.model.get("intro"),
      name: this.model.get("name")
    })));

    return this;
  },

  editName: function(){
    this.$("h2").hide();
    this.$("input").show();
    this.$("input").focus();
  },

  updateName: function(){
    this.model.set({ name: this.$("input").val() });
    this.$("h2").show();
    this.$("input").hide();
  },

  saveFlower: function(){
    this.model.save({
      title: this.model.get("name"),
      content: this.model.get("intro")
    },

    { success: function(){
      console.log("flower saved");
    }});
  }
});

var Garden = Backbone.View.extend({
  events: {
    "click #add-flower": "addFlower"
  },

  render: function(){
    console.log("render garden");

    this.$el.append("<h1>Garden</h1>");

    return this;
  },

  addFlower: function(){
    var flower = new Flower;
    flowers.push(flower);

    var flowerV = new FlowerV({
      model: flower,
      field: $(".flowers")
    });

    flowerV.render();
  },

  addFlowersFromDb: function(flowersFromDb){
    $.each(flowersFromDb, function(i,n){
      var flower = new Flower({id: n["id"], name: n["title"], intro: n["content"]});
      flower.on("error", function(model, msg){
        alert(msg);
      });

      flowers.add(flower);
      var flowerV = new FlowerV({
        model: flower,
        field: $(".flowers")
      });

      flowerV.render();
    });
  }
});

var Router = Backbone.Router.extend({
  routes: {
    "help": "help", // localhost:3000#help
    "home": "home",
    "model/inheritable": "modelInheritableDemo"
  },

  help: function(){
    $.get("/backbone_help", function(data){
      $("article").hide();
      $("#demoAppPage2 div").html(data);
      $("#demoAppPage2").show();
      $("#anchor").attr("href", "#home");
    });
  },

  home: function(){
    $("article").hide();
    $("#demoApp").show();
    $("#anchor").attr("href", "#help");
  },

  modelInheritableDemo: function(){
    $("article").hide();
    $("#model-inheritable").show();
  }
});
