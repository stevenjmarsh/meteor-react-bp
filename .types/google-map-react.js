// Hand creating google-map-react libdef
import type { ILatLng } from "../imports/config/types";

declare module "google-map-react" {
  declare type IBootstrapURLKeys = {
    key: string;
  };

  declare type GoogleMapProps = {
    bootstrapURLKeys: IBootstrapURLKeys,
    defaultCenter?: ILatLng,
    defaultZoom?: number,
  };

  declare export default class GoogleMap extends React$Component {
    props: GoogleMapProps;
  }
}
