import * as L from 'leaflet';

export class Watermark extends L.Control {

  onAdd(map: L.Map) {
    let img = L.DomUtil.create('img') as HTMLImageElement;
    // img.src = '../../docs/images/logo.png';
    img.style.width = '200px';
    return img;
  }

  onRemove(map: L.Map) {
    // Nothing to do here
  }

  constructor(options?: L.ControlOptions) {
    super(options);
  }
}