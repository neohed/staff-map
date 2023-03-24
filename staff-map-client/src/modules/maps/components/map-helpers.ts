// @ts-nocheck
// TS generates too many "Object is possibly 'undefined'" errors
type LatLngLiteral = google.maps.LatLngLiteral;
type Map = google.maps.Map;

const generateHouses = (position: LatLngLiteral) => {
    const _houses: Array<LatLngLiteral> = [];
    for (let i = 0; i < 100; i++) {
      const direction = Math.random() < 0.5 ? -2 : 2;
      _houses.push({
        lat: position.lat + Math.random() / direction,
        lng: position.lng + Math.random() / direction,
      });
    }
    return _houses;
  };

  function latLng2Point(latLng: LatLngLiteral, map: Map) {
    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = Math.pow(2, map.getZoom());
    var worldPoint = map.getProjection().fromLatLngToPoint(latLng);

    return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale)
  }
  
  function point2LatLng(point: google.maps.Point, map: Map) {
    var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
    var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
    var scale = Math.pow(2, map.getZoom());
    var worldPoint = new google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);

    return map.getProjection().fromPointToLatLng(worldPoint)
  }

  export {
    generateHouses,
    latLng2Point,
    point2LatLng,
  }