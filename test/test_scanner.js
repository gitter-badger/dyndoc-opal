var Opal=require("../dist/npm/dyndoc.js")()
var Dyndoc=Opal.Dyndoc

dt = Dyndoc.DevTagScanner.$new("dtag")
//console.log(dt)

aa = dt.$process("{#document][#main]titééi[#}")
Opal.top.$p(aa)


vsc = Dyndoc.VarsScanner.$new("vars")
console.log(vsc.$build_vars("<<[tutu]<<[toto]"))

/* Generated by Opal 0.6.2 */
// (function($opal) {
//   var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, d = nil, aa = nil, vsc = nil;

//   $opal.add_stubs(['$new', '$process', '$p', '$build_vars']);
//   ;
//   d = ($scope.Dyndoc)._scope.DevTagScanner.$new("dtag");
//   aa = d.$process("{#document][#main]titééi[#}");
//   self.$p(["process", aa]);
//   vsc = ($scope.Dyndoc)._scope.VarsScanner.$new("vars");
//   self.$p(vsc);
//   return self.$p(vsc.$build_vars("<<[tutu]<<[toto]"));
// })(Opal);
