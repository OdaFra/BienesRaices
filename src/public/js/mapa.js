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

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\n    // Coordenadas por defecto (si falla la geolocalización)\n    let lat = -25.2714174;\n    let lng = -57.49259;\n\n    const mapa = L.map('mapa').setView([lat, lng], 12);\n    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n        attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\n    }).addTo(mapa);\n\n    let marker;\n\n    const agregarMarcador = (lat, lng) => {\n        if (marker) mapa.removeLayer(marker);\n        \n        marker = L.marker([lat, lng], {\n            draggable: true,\n            autoPan: true\n        }).addTo(mapa);\n\n        // Evento único para manejar el fin del arrastre/movimiento\n        marker.on('dragend', (e) => {\n            const nuevaPos = marker.getLatLng();\n            console.log(\"Posición después de arrastrar (dragend):\", nuevaPos.lat, nuevaPos.lng);\n            mapa.panTo(nuevaPos); // Centrar el mapa en la nueva posición\n            lat = nuevaPos.lat;\n            lng = nuevaPos.lng;\n        });\n    };\n\n    // Geolocalización\n    if (navigator.geolocation) {\n        navigator.geolocation.getCurrentPosition(\n            (position) => {\n                lat = position.coords.latitude;\n                lng = position.coords.longitude;\n                mapa.setView([lat, lng], 12);\n                agregarMarcador(lat, lng);\n            },\n            (error) => {\n                console.error(\"Error:\", error);\n                agregarMarcador(lat, lng);\n            }\n        );\n    } else {\n        console.error(\"Geolocalización no soportada.\");\n        agregarMarcador(lat, lng);\n    }\n})();\n\n//# sourceURL=webpack://bienesraices/./src/js/mapa.js?");

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