import type { DropTargetMonitor, XYCoord } from "react-dnd";
import type { DropItem } from "./DragItem";

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

function getDropScreenPoint(dropOffset: XYCoord, dropTargetRect: DOMRect) {
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

function getDropMapPoint(monitor: DropTargetMonitor<DropItem, unknown>, dropTarget: HTMLDivElement, map: Map): LatLngLiteral {
  // Get the dropped item's client offset
  const dropOffset = monitor.getClientOffset() as XYCoord;

  // Get the drop target's bounding client rect
  const dropTargetRect = dropTarget.getBoundingClientRect() as DOMRect;
  const dropPoint: google.maps.Point = getDropScreenPoint(dropOffset, dropTargetRect);
  const dropCoords = point2LatLng(dropPoint, map);

  return {
    lat: dropCoords?.lat() ?? 0,
    lng: dropCoords?.lng() ?? 0
  }
}

export {
  getDropScreenPoint,
  latLng2Point,
  point2LatLng,
  getDropMapPoint,
}