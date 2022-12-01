// $(document).ready(function () {
//   // const swiper = new Swiper(".swiper", {
//   //   // Optional parameters
//   //   direction: "vertical",
//   //   loop: true,

//   //   // If we need pagination
//   //   pagination: {
//   //     el: ".swiper-pagination",
//   //   },

//   //   // Navigation arrows
//   //   navigation: {
//   //     nextEl: ".swiper-button-next",
//   //     prevEl: ".swiper-button-prev",
//   //   },

//   //   // And if we need scrollbar
//   //   scrollbar: {
//   //     el: ".swiper-scrollbar",
//   //   },
//   // });
//   // var app = angular.module("products", []);

//   // app.controller("list", function ($scope, $http) {
//   //   $scope.test = "TinyTots Sales Products";
//   //   $http.get("js/products.json").then(function (response) {
//   //     $scope.products = response.data.productList;
//   //   });
//   // });

//   $.getJSON("products.json", function (json) {
//     var productArray = [];
//     for (var key in json) {
//       if (json.hasOwnProperty(key)) {
//         var item = json[key];
//         productArray.push({
//           id: item.id,
//           name: item.name,
//           brand: item.brand,
//           category: item.category,
//           madeIn: item.madeIn,
//           price: item.price,
//           imgSrc: item.imgSrc,
//         });
//       }
//     }
//   });

//   // var options = {
//   //   valueNames: ["id", "name", "brand", "category", "madeIn", "price", "imgSrc"],
//   //   item: '<li><div class="col-lg-3 col-md-6 col-sm-12 list"><div class="product-col"><div class="image"><img src="" alt= "product" class="img-responsive imgSrc"/></div><div class="caption"><div class="price price-new"></div><h4><a href="#!product-1 name"></a></h4><div class="ratings"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><span><a href="#">12 review(s)</a></span></div><div class="cart-button button-group"><button type="button" class="btn btn-cart"><i class="fa fa-shopping-cart"></i></button><button type="button" title="Wishlist" class="btn btn-wishlist"><i class="fa fa-heart"></i></button><button type="button" title="Compare" class="btn btn-compare"><i class="fa fa-bar-chart-o"></i></button></div></div></div></div>',
//   // };
//   // var productList = new List("product-list", options, productArray);

//   angular.module("productsList").component("productsList", {
//     templateUrl: "products-list.template.html",
//     controller: function productsListController($http) {
//       var self = this;
//       self.orderProp = "id";
//       var mainApp = angular.module("mainApp", []);

//       mainApp.controller(
//         "productsListController",
//         function productsListController($scope) {
//           $scope.products = productArray;
//         }
//       );

//       describe("productsListController", function () {
//         beforeEach(module("mainApp"));

//         it("should create a `products` model with 45 products", inject(function (
//           $controller
//         ) {
//           var scope = {};
//           var ctrl = $controller("productsListController", { $scope: scope });

//           expect(scope.products.length).toBe(45);
//         }));
//       });

//       $http.get("/js/products.json").then(function (response) {
//         self.products = response.data;
//       });
//     },
//   });
// });
