import type { XYCoord } from "react-dnd";

type LatLngLiteral = google.maps.LatLngLiteral;
type Map = google.maps.Map;

type MapProjection = {
  topRight: google.maps.Point | null;
  bottomLeft: google.maps.Point | null;
  scale: number;
}

function getMapProjection(map: Map): MapProjection {
  const topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  const bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  const scale = Math.pow(2, map.getZoom());

  return {
    topRight,
    bottomLeft,
    scale,
  }
}

function getDropPoint(dropOffset: XYCoord, dropTargetRect: DOMRect) {
  const offsetX: number = dropOffset.x - dropTargetRect.left;
  const offsetY: number = dropOffset.y - dropTargetRect.top;

  return new google.maps.Point(offsetX, offsetY)
}

function latLng2Point(latLng: LatLngLiteral, map: Map) {
  const { topRight, bottomLeft, scale } = getMapProjection(map);
  const worldPoint = map.getProjection().fromLatLngToPoint(latLng);

  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale)
}

function point2LatLng(point: google.maps.Point, map: Map) {
  const { topRight, bottomLeft, scale } = getMapProjection(map);
  var worldPoint = new google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);

  return map.getProjection().fromPointToLatLng(worldPoint)
}

export {
  getDropPoint,
  latLng2Point,
  point2LatLng,
}