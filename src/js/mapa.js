(function() {
    // Coordenadas por defecto (si falla la geolocalización)
    let lat = -25.2714174;
    let lng = -57.49259;

    const mapa = L.map('mapa').setView([lat, lng], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    let marker;

    const agregarMarcador = (lat, lng) => {
        if (marker) mapa.removeLayer(marker);
        
        marker = L.marker([lat, lng], {
            draggable: true,
            autoPan: true
        }).addTo(mapa);

        // Evento único para manejar el fin del arrastre/movimiento
        marker.on('dragend', (e) => {
            const nuevaPos = marker.getLatLng();
            console.log("Posición después de arrastrar (dragend):", nuevaPos.lat, nuevaPos.lng);
            mapa.panTo(nuevaPos); // Centrar el mapa en la nueva posición
            lat = nuevaPos.lat;
            lng = nuevaPos.lng;
        });
    };

    // Geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                mapa.setView([lat, lng], 12);
                agregarMarcador(lat, lng);
            },
            (error) => {
                console.error("Error:", error);
                agregarMarcador(lat, lng);
            }
        );
    } else {
        console.error("Geolocalización no soportada.");
        agregarMarcador(lat, lng);
    }
})();