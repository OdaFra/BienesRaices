(function () {
  // Coordenadas por defecto (si falla la geolocalización)
  let lat = -25.2714174;
  let lng = -57.49259;
  const mapa = L.map("mapa").setView([lat, lng], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa);

  const geocoderService = L.esri.Geocoding.geocodeService();

  // El PIN
  const marker = L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(mapa);

  // Detectar cuando se deja de arrastrar el marcador
  marker.on("moveend", function (e) {
    const marker = e.target; // este es el marcador actual
    const posicion = marker.getLatLng();

    console.log("Marcador arrastrado:", marker);
    console.log(`Posición del marcador: ${posicion.lat}, ${posicion.lng}`);

    mapa.panTo(posicion);

    // Obtener información de la calle
    geocoderService
      .reverse()
      .latlng(posicion, 12)
      .run(function (error, resultado) {
        if (error) {
          console.error("Error en geocoder:", error);
          return;
        }

        const address =
          (resultado && resultado.address && (
            resultado.address.LongLabel ||
            resultado.address.Match_addr ||
            resultado.address.Address
          )) || "Dirección no encontrada";

        // Mostrar popup en el marcador correcto
        marker.bindPopup(address).openPopup();

        console.log("Resultado del geocoder:", resultado);

        // Llenar campos ocultos
        const calleP = document.querySelector("p.calle");
        if (calleP) calleP.textContent = address;

        const calleInput = document.getElementById("calle");
        if (calleInput) calleInput.value = address;

        const latInput = document.getElementById("lat");
        if (latInput) latInput.value = String(posicion.lat);

        const lngInput = document.getElementById("lng");
        if (lngInput) lngInput.value = String(posicion.lng);
      });
  });
})();
