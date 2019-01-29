require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

var webpack = __webpack_require__(5);
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - NOTABLE「嘸位la！」奧客查詢服務',
    meta: [{ 'http-equiv': "Content-Type", content: "text/html", charset: "UTF-8" }, { charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: "description", content: "奧客警示/顧客負評最佳查詢網站，避免您的餐廳再接到澳洲來的客人" }, { name: "keywords", content: "靠北奧客 拒絕奧客 奧客查詢 澳洲來的客人 奧客電話查詢 用餐紀錄 餐廳黑名單" }, { hid: 'ogtitle', property: 'og:title', content: 'NOTABLE「嘸位la！」奧客查詢服務' }, { property: "fb:app_id", content: "1836475513305061" },
    // { hid: 'og:title', name: 'og:type', content: ''},
    { hid: 'ogimage', property: 'og:image', content: 'https://notable.wushan.io/notable-website-ogimage.jpg' }, { hid: 'ogurl', property: 'og:url', content: 'https://notable.wushan.io' }, { hid: 'ogdescription', property: 'og:description', content: '奧客警示/顧客負評最佳查詢網站，避免您的餐廳再接到澳洲來的客人' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' }, { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' }, { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' }, { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' }, { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' }, { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' }, { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' }, { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' }, { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' }, { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' }, { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }, { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' }, { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    script: [{ src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', type: 'text/javascript' }, { src: '/js/picker.js', type: 'text/javascript' }, { src: '/js/picker.date.js', type: 'text/javascript' }]
  },
  /*
  ** Global CSS
  */
  css: [{ src: '~assets/css/main.scss', lang: 'scss' }, { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }],
  /*
  ** Add axios globally
  */
  loading: { color: '#3B8070' },
  build: {
    vendor: ['axios'],
    plugins: [new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
      // ...etc.
    })],
    /*
    ** Run ESLINT on save
    */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  plugins: ['~plugins/clickoutside.js', 'plugins/vue-typer.js', 'plugins/vuelidate.js', 'plugins/ga.js']
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__users__ = __webpack_require__(4);




var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])

// Add USERS Routes
();router.use(__WEBPACK_IMPORTED_MODULE_1__users__["a" /* default */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);


var router = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])

// Mock Users
();var users = [{ name: 'Alexandre' }, { name: 'Sébastien' }];

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users);
}

/* GET user by ID. */
);router.get('/users/:id', function (req, res, next) {
  var id = parseInt(req.params.id);
  if (id >= 0 && id < users.length) {
    res.json(users[id]);
  } else {
    res.sendStatus(404);
  }
});

/* harmony default export */ exports["a"] = router;

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = require("webpack");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api__ = __webpack_require__(2);





var app = __WEBPACK_IMPORTED_MODULE_1_express___default()();
var host = process.env.HOST || '127.0.0.1';
var port = process.env.PORT || 5000;

app.set('port', port

// Import API Routes
);app.use('/api', __WEBPACK_IMPORTED_MODULE_2__api__["a" /* default */]

// Import and Set Nuxt.js options
);var config = __webpack_require__(1);
config.dev = !("development" === 'production');

// Init Nuxt.js
var nuxt = new __WEBPACK_IMPORTED_MODULE_0_nuxt___default.a(config);
app.use(nuxt.render

// Build only in dev mode
);if (config.dev) {
  nuxt.build().catch(function (error) {
    console.error(error // eslint-disable-line no-console
    );process.exit(1);
  });
}

// Listen the server
app.listen(port, host);
console.log('Server listening on ' + host + ':' + port // eslint-disable-line no-console
);

/***/ }
/******/ ]);
//# sourceMappingURL=main.map