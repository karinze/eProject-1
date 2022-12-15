function toast({title='' , message='',type='' , duration=1000}){
    const main = document.getElementById('toast');
    if(main){
        const toast=document.createElement('div');
        //Auto remove toast
        const autoRemoveId= setTimeout(function(){
            main.removeChild(toast);
        },duration + 1000)
        toast.onclick=function(e) {
            if(e.target.closest('.toast__close')){
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        }
        const delay = (duration / 1000).toFixed(2);
        toast.classList.add('toast',`toast--${type}`);
        toast.style.animation = `slideInLeft ease 2s, linear 3s ${delay}s forwards `;
        toast.innerHTML =`
                <div class="toast__icon">
                <i class="fa-solid fa-circle-check"></i>
            </div>
            <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(toast);             
    }
  }
  
  function showSuccessToast(){
        toast({
        title:'Success',
        message:'Added to your cart',
        type:'success',
        duration : 1000
    })
  }

  function showSuccessCheckoutToast(){
        toast({
        title:'Successfully checked out',
        message:'Thank you for your purchase!',
        type:'success',
        duration : 1000
    })
  }

  function showFailCheckoutToast(){
        toast({
        title:'Uh oh!',
        message:'You have no items in your cart',
        type:'failure',
        duration : 1000
    })
  }
  
  function showSuccessReviewToast(){
        toast({
        title:'Review received',
        message:'Thank you for your thoughts!',
        type:'success',
        duration : 1500
    })
  }

$.getJSON("products.json", function (json) {
var productArray = [];
for (var key in json) {
if (json.hasOwnProperty(key)) {
    var item = json[key];
    productArray.push({
        id: item.id,
        name: item.name,
        brand: item.brand,
        category: item.category,
        madeIn: item.madeIn,
        price: item.price,
        imgSrc: item.imgSrc,
        quantity: item.quantity
    });
}
}
});

var app = angular.module("mainApp", ["ngRoute", "ngStorage"]);

app.config(function ($routeProvider) {
$routeProvider.when("/", {templateUrl: "main.html"}).when("/404", {templateUrl: "404.html"}).when("/about", {templateUrl: "about.html"}).when("/stores", {templateUrl: "stores.html"}).when("/news", {templateUrl: "news.html"}).when("/news-2", {templateUrl: "news-2.html"}).when("/news-3", {templateUrl: "news-3.html"}).when("/compare", {templateUrl: "compare.html"}).when("/franchise", {templateUrl: "franchise.html"}).when("/resources", {templateUrl: "resources.html"}).when("/category-grid", {
templateUrl: "category-grid.html",
controller: 'productsListController'
}).when("/login", {templateUrl: "login.html"}).when("/register", {templateUrl: "register.html"}).when("/contact", {templateUrl: "contact.html"}).when("/cart", {templateUrl: "cart.html"}).when("/product-1/:id", {templateUrl: "product-full.html"});
});

app.controller("productsListController", function ($scope, $http, $localStorage, $sessionStorage, $routeParams, $timeout) {
const max = +10;
    const min = 0;

$scope.$storage = $localStorage.$default({

'products': []

});
function nuke() {   
    $timeout(function () {
        location.reload();;
        }, 3000);
    
}
$http.get("./js/products.json").then(function (response) {
function getRandomProduct(){    
return $scope.myData[Math.floor(Math.random() * $scope.myData.length)];
};

$scope.myData = response.data.products;
$scope.products = {};
$scope.categories = ['Baby Food','Formula','Body Care', 'Diapers', 'Softeners', 'Toys', 'Vitamins', 'Clothes'];
$scope.filterProductsByCategory = function(category){
        $scope.search = category;
    };
$scope.cloneItem = function(myData) {
    myData.quantity++;
    $scope.$storage.products.push({
        "id": myData.id,
        "name": myData.name,
        "brand": myData.brand,
        "category": myData.category,
        "madeIn": myData.madeIn,
        "price": myData.price,
        "imgSrc": myData.imgSrc,
        "quantity": myData.quantity  
    })
}

$scope.deleteItem = function(item) {
    $localStorage.products.splice($localStorage.products.indexOf(item), 1);
}
$scope.increment = function(item){
    if (item.quantity >= max) {
        return;
    }
    item.quantity++;

}
$scope.decrement = function(item){
    if (item.quantity <= min) {
        return;
    }
    item.quantity--;

}
$scope.getLocalData = $localStorage.products;

$scope.checkoutConfirm = function() {
    
    if($scope.$storage.products.length == 0) {
        showFailCheckoutToast();
    } else {
        showSuccessCheckoutToast();
        $localStorage.$reset({
            products: []
        });
        nuke();
    };
  }


$scope.getCurrentQuantity = function (item) {
var number = document.getElementById("currentQuantity");
if (number > item.quantity) {
    increment(item);
} else if (number < item.quantity) {
    decrement(item);
} else {
    return;
}
}        
});
});

app.controller("singleProductController", function ($scope, $http, $localStorage, $sessionStorage, $routeParams) {
function getById(arr, paramId) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == paramId) {
                return arr[i];
            }
        }
    }
    $scope.$storage = $localStorage.$default({
'products': []
});        
$http.get("./js/products.json").then(function (response) {
$scope.myData = response.data.products;
$scope.products = getById($scope.myData, $routeParams.id);

$scope.cloneItem = function(myData) {
    myData.quantity++;
    $scope.$storage.products.push({
        "id": myData.id,
        "name": myData.name,
        "brand": myData.brand,
        "category": myData.category,
        "madeIn": myData.madeIn,
        "price": myData.price,
        "imgSrc": myData.imgSrc,
        "quantity": myData.quantity  
    })
}
$scope.getLocalData = $localStorage.products;
});

$scope.txt='';

$scope.resetText = function() {
$scope.txt = '';
};
});
