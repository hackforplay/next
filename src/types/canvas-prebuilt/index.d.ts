declare module 'canvas-prebuilt' {
  export const Canvas: any;
  export const Context2d: any;
  export const CanvasRenderingContext2D: any;
  export const CanvasGradient: any;
  export const CanvasPattern: any;
  export const Image: any;
  export const ImageData: any;
  export const PNGStream: any;
  export const PDFStream: any;
  export const JPEGStream: any;
  export const DOMMatrix: any;
  export const DOMPoint: any;
  export const registerFont: any;
  export const parseFont: any;
  export const createCanvas: any;
  export const createImageData: any;
  export const loadImage: any;

  export const backends: any;

  /** Library version. */
  export const version: any;
  /** Cairo version. */
  export const cairoVersion: any;
  /** jpeglib version. */
  export const jpegVersion: any;
  /** gif_lib version. */
  export const gifVersion: any;
  /** freetype version. */
  export const freetypeVersion: any;
}

/* global declaration */
declare var Image: new (width?: number, height?: number) => HTMLImageElement;
declare namespace NodeJS {
  export interface Global {
    Image: new (width?: number, height?: number) => HTMLImageElement;
  }
}
