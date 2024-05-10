export interface Options {
  // define your plugin options here
  buildModeOnly: boolean
  fileExtensions: string[]
}

export interface Compatibility {
  type: string
  value: string
}

export interface CompatibilityList {
  [key: string]: Compatibility[]
}

export interface InCompatibilityList {
  name: string
  table: string[][]
}

export interface MapToPlatform {
  [key: string]: string
}
