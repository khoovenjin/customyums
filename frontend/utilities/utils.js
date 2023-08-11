import moment from "moment";

import { payloadChecker } from "./payloadChecker";

export default class Utils {
  static #dateFormat = 'YYYY-MM-DD';

  static dateToString = ( date ) => moment( date ).format( this.#dateFormat );

  static arrayToString = ( data ) => payloadChecker.typeChecker( false, data, 'array' )?
                                        data.join( ',' ) : data;
}