function toast({ title = "", message = "", type = "", duration }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    //Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 2000);
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };
    const delay = (duration / 1000).toFixed(2);
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease 1.2s, linear 4.5s ${delay}s forwards `;
    toast.innerHTML = `
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

function showSuccessToast() {
  toast({
    title: "Success",
    message: "Added to your cart",
    type: "success",
    duration: 3000,
  });
}

function showSuccessCheckoutToast() {
  toast({
    title: "Successfully checked out",
    message: "Thank you for your purchase!",
    type: "success",
    duration: 2000,
  });
}

function showFailCheckoutToast() {
  toast({
    title: "Uh oh!",
    message: "You have no items in your cart",
    type: "failure",
    duration: 2000,
  });
}

function showSuccessReviewToast() {
  toast({
    title: "Review received",
    message: "Thank you for your thoughts!",
    type: "success",
    duration: 2000,
  });
}
function LoginToast() {
  toast({
    title: "Login successful",
    message: "Welcome!",
    type: "success",
    duration: 2000,
  });
}
function RegisterToast() {
  toast({
    title: "Register successful",
    message: "Thank you for joining us!",
    type: "success",
    duration: 2000,
  });
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
        quantity: item.quantity,
      });
    }
  }
});

var app = angular.module("mainApp", ["ngRoute", "ngStorage"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", { templateUrl: "main.html" })
    .when("/404", { templateUrl: "404.html" })
    .when("/about", { templateUrl: "about.html" })
    .when("/stores", { templateUrl: "stores.html" })
    .when("/news", { templateUrl: "news.html" })
    .when("/news-2", { templateUrl: "news-2.html" })
    .when("/news-3", { templateUrl: "news-3.html" })
    .when("/compare", { templateUrl: "compare.html" })
    .when("/franchise", { templateUrl: "franchise.html" })
    .when("/resources", { templateUrl: "resources.html" })
    .when("/category-grid", {
      templateUrl: "category-grid.html",
      controller: "productsListController",
    })
    .when("/login", { templateUrl: "login.html" })
    .when("/register", { templateUrl: "register.html" })
    .when("/contact", { templateUrl: "contact.html" })
    .when("/cart", { templateUrl: "cart.html" })
    .when("/product-1/:id", { templateUrl: "product-full.html" });
});
app.run.$inject = ["$rootScope", "$location", "$cookieStore", "$http"];
function run($rootScope, $location, $cookieStore, $http) {
  // keep user logged in after page refresh
  $rootScope.globals = $cookieStore.get("globals") || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common["Authorization"] =
      "Basic " + $rootScope.globals.currentUser.authdata; // jshint ignore:line
  }
}
app.controller(
  "productsListController",
  function (
    $scope,
    $http,
    $localStorage,
    $sessionStorage,
    $routeParams,
    $timeout
  ) {
    $scope.$storage = $localStorage.$default({
      products: [],
    });
    function nuke() {
      $timeout(function () {
        window.location.href = "#/!";
      }, 3000);
    }
    $http.get("./js/products.json").then(function (response) {
      function getRandomProduct() {
        return $scope.myData[Math.floor(Math.random() * $scope.myData.length)];
      }

      $scope.myData = response.data.products;
      $scope.products = {};
      $scope.getLocalData = $localStorage.products;
      $scope.categories = [
        "Baby Food",
        "Formula",
        "Body Care",
        "Diapers",
        "Softeners",
        "Toys",
        "Vitamins",
        "Clothes",
      ];
      $scope.filterProductsByCategory = function (category) {
        $scope.search = category;
      };
      $scope.cloneItem = function (myData) {
        var found = false;
        var items = $localStorage.products;
        angular.forEach(items, function (obj, index) {
          if (obj.id == myData.id) {
            items[index].quantity++;
            found = true;
          }
        });
        if (!found) {
          myData.quantity++;
          $scope.$storage.products.push({
            id: myData.id,
            name: myData.name,
            brand: myData.brand,
            category: myData.category,
            madeIn: myData.madeIn,
            price: myData.price,
            imgSrc: myData.imgSrc,
            quantity: myData.quantity,
          });
        }
      };

      $scope.deleteItem = function (item) {
        $localStorage.products.splice($localStorage.products.indexOf(item), 1);
      };
      $scope.increment = function (item) {
        if (item.quantity >= 99) {
          return;
        }
        item.quantity++;
      };
      $scope.decrement = function (item) {
        if (item.quantity <= 1) {
          return;
        }
        item.quantity--;
      };

      $scope.checkoutConfirm = function () {
        if ($scope.$storage.products.length == 0) {
          showFailCheckoutToast();
        } else {
          showSuccessCheckoutToast();
          $localStorage.$reset({
            products: [],
          });
          nuke();
        }
      };
    });
  }
);

app.controller(
  "singleProductController",
  function ($scope, $http, $localStorage, $sessionStorage, $routeParams) {
    function getById(arr, paramId) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == paramId) {
          return arr[i];
        }
      }
    }
    $scope.$storage = $localStorage.$default({
      products: [],
    });
    $http.get("./js/products.json").then(function (response) {
      $scope.myData = response.data.products;
      $scope.products = getById($scope.myData, $routeParams.id);
      $scope.getLocalData = $localStorage.products;
      $scope.cloneItem = function (myData) {
        var found = false;
        var items = $localStorage.products;
        angular.forEach(items, function (obj, index) {
          if (obj.id == myData.id) {
            items[index].quantity++;
            found = true;
          }
        });
        if (!found) {
          myData.quantity++;
          $scope.$storage.products.push({
            id: myData.id,
            name: myData.name,
            brand: myData.brand,
            category: myData.category,
            madeIn: myData.madeIn,
            price: myData.price,
            imgSrc: myData.imgSrc,
            quantity: myData.quantity,
          });
        }
      };
    });

    $scope.txt = "";

    $scope.resetText = function () {
      $scope.txt = "";
    };
  }
);
app.controller("LoginController", LoginController);

LoginController.$inject = [
  "$location",
  "AuthenticationService",
  "FlashService",
];
function LoginController($location, AuthenticationService, FlashService) {
  var vm = this;

  vm.login = login;

  (function initController() {
    // reset login status
    AuthenticationService.ClearCredentials();
  })();

  function login() {
    vm.dataLoading = true;
    AuthenticationService.Login(vm.username, vm.password, function (response) {
      if (response.success) {
        AuthenticationService.SetCredentials(vm.username, vm.password);
        $location.path("/");
      } else {
        FlashService.Error(response.message);
        vm.dataLoading = false;
      }
    });
  }
}
app.factory("UserService", UserService);

UserService.$inject = ["$timeout", "$filter", "$q"];
function UserService($timeout, $filter, $q) {
  var service = {};

  service.GetAll = GetAll;
  service.GetById = GetById;
  service.GetByUsername = GetByUsername;
  service.Create = Create;
  service.Update = Update;
  service.Delete = Delete;

  return service;

  function GetAll() {
    var deferred = $q.defer();
    deferred.resolve(getUsers());
    return deferred.promise;
  }

  function GetById(id) {
    var deferred = $q.defer();
    var filtered = $filter("filter")(getUsers(), { id: id });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
  }

  function GetByUsername(username) {
    var deferred = $q.defer();
    var filtered = $filter("filter")(getUsers(), { username: username });
    var user = filtered.length ? filtered[0] : null;
    deferred.resolve(user);
    return deferred.promise;
  }

  function Create(user) {
    var deferred = $q.defer();

    // simulate api call with $timeout
    $timeout(function () {
      GetByUsername(user.username).then(function (duplicateUser) {
        if (duplicateUser !== null) {
          deferred.resolve({
            success: false,
            message: 'Username "' + user.username + '" is already taken',
          });
        } else {
          var users = getUsers();

          // assign id
          var lastUser = users[users.length - 1] || { id: 0 };
          user.id = lastUser.id + 1;

          // save to local storage
          users.push(user);
          setUsers(users);

          deferred.resolve({ success: true });
        }
      });
    }, 1000);

    return deferred.promise;
  }

  function Update(user) {
    var deferred = $q.defer();

    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === user.id) {
        users[i] = user;
        break;
      }
    }
    setUsers(users);
    deferred.resolve();

    return deferred.promise;
  }

  function Delete(id) {
    var deferred = $q.defer();

    var users = getUsers();
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      if (user.id === id) {
        users.splice(i, 1);
        break;
      }
    }
    setUsers(users);
    deferred.resolve();

    return deferred.promise;
  }

  // private functions

  function getUsers() {
    if (!localStorage.users) {
      localStorage.users = JSON.stringify([]);
    }

    return JSON.parse(localStorage.users);
  }

  function setUsers(users) {
    localStorage.users = JSON.stringify(users);
  }
}
app.controller("RegisterController", RegisterController);

RegisterController.$inject = [
  "UserService",
  "$location",
  "$rootScope",
  "FlashService",
];
function RegisterController(UserService, $location, $rootScope, FlashService) {
  var vm = this;

  vm.register = register;

  function register() {
    vm.dataLoading = true;
    UserService.Create(vm.user).then(function (response) {
      if (response.success) {
        FlashService.Success("Registration successful", true);
        $location.path("/login");
      } else {
        FlashService.Error(response.message);
        vm.dataLoading = false;
      }
    });
  }
}
