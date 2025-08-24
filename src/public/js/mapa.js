/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\n  // Coordenadas por defecto (si falla la geolocalización)\n  let lat = -25.2714174;\n  let lng = -57.49259;\n  const mapa = L.map(\"mapa\").setView([lat, lng], 12);\n\n  L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n    attribution:\n      '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n  }).addTo(mapa);\n\n  const geocoderService = L.esri.Geocoding.geocodeService();\n\n  // El PIN\n  const marker = L.marker([lat, lng], {\n    draggable: true,\n    autoPan: true,\n  }).addTo(mapa);\n\n  // Detectar cuando se deja de arrastrar el marcador\n  marker.on(\"moveend\", function (e) {\n    const marker = e.target; // este es el marcador actual\n    const posicion = marker.getLatLng();\n\n    console.log(\"Marcador arrastrado:\", marker);\n    console.log(`Posición del marcador: ${posicion.lat}, ${posicion.lng}`);\n\n    mapa.panTo(posicion);\n\n    // Obtener información de la calle\n    geocoderService\n      .reverse()\n      .latlng(posicion, 12)\n      .run(function (error, resultado) {\n        if (error) {\n          console.error(\"Error en geocoder:\", error);\n          return;\n        }\n\n        const address =\n          (resultado && resultado.address && (\n            resultado.address.LongLabel ||\n            resultado.address.Match_addr ||\n            resultado.address.Address\n          )) || \"Dirección no encontrada\";\n\n        // Mostrar popup en el marcador correcto\n        marker.bindPopup(address).openPopup();\n\n        console.log(\"Resultado del geocoder:\", resultado);\n\n        // Llenar campos ocultos\n        const calleP = document.querySelector(\"p.calle\");\n        if (calleP) calleP.textContent = address;\n\n        const calleInput = document.getElementById(\"calle\");\n        if (calleInput) calleInput.value = address;\n\n        const latInput = document.getElementById(\"lat\");\n        if (latInput) latInput.value = String(posicion.lat);\n\n        const lngInput = document.getElementById(\"lng\");\n        if (lngInput) lngInput.value = String(posicion.lng);\n      });\n  });\n})();\n\n\n//# sourceURL=webpack://bienesraices/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;