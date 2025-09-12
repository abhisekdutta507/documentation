# Strategy Pattern

Example of `Polymorphism` in Object-oriented programming. Similar to `State Pattern` but in case `Strategy Pattern` we can have multiple states in a class. For the below example the states are `#compressor` & `#filter`. Exactly same way we can implement `#encryptor` state too.

## Problem

As the `class ImageStorage` is responsible for compressing, applying filters & storing the files into image server. It will difficult to enhance or extend the features. And we are also violating the single resposibility principle. Our system should be `Closed for modification & Open for extensions`.

```ts
enum FilterType {
  BlackAndWhite,
  FullBrightness,
  FullContrast,
  ColurfullBackground
}

enum CompressorType {
  JPEG,
  PNG,
  GIF,
  WEBP,
}

class ImageStorage {
  #compressor: CompressorType;
  #filter: FilterType;

  constructor(compressor: CompressorType, filter: FilterType) {
    this.#compressor = compressor;
    this.#filter = filter;
  }

  #compress(fName: string): boolean {
    switch (this.#compressor) {
      case CompressorType.JPEG: {
        console.log("Compressing into JPEG");
        return true;
      }
      case CompressorType.PNG: {
        console.log("Compressing into PNG");
        return true;
      }
      case CompressorType.GIF: {
        console.log("Compressing into GIF");
        return true;
      }
      default: {
        return false;
      }
    }
  }

  #applyFilter(fName: string): boolean {
    switch (this.#filter) {
      case FilterType.BlackAndWhite: {
        console.log("Setting b&w filter");
        return true;
      }
      case FilterType.FullBrightness: {
        console.log("Setting full brightness");
        return true;
      }
      case FilterType.FullContrast: {
        console.log("Setting full contrast");
        return true;
      }
      default: {
        return false;
      }
    }
  }

  store(fileName: string): boolean {
    this.#compress(fileName);
    this.#applyFilter(fileName);
    console.log(`Storing the image ${fileName} in S3`);
    return true;
  }
}

const imageStorage = new ImageStorage(
  CompressorType.JPEG,
  FilterType.BlackAndWhite,
);
imageStorage.store("profile.png");
```

## Solution

We need a class only responsible to store the images on file server. We can have multiple file servers. Here we will create the `class S3ImageStorage` that will store the images on S3.

```ts
interface ImageStorage {
  store(fileName: string): boolean;
}

class S3ImageStorage implements ImageStorage {
  #compressor: Compressor;
  #filter: Filter;

  constructor(compressor: Compressor, filter: Filter) {
    this.#compressor = compressor;
    this.#filter = filter;
  }

  store(fileName: string): boolean {
    this.#compressor.compress(fileName);
    this.#filter.apply(fileName);
    console.log(`Storing the image ${fileName} in S3`);
    return true;
  }
}
```

In future if we need a class to store the image files on Google Cloud, we can simply come up with the below `class GCPImageStorage`.

```ts
class GCPImageStorage implements ImageStorage {
  #compressor: Compressor;
  #filter: Filter;

  constructor(compressor: Compressor, filter: Filter) {
    this.#compressor = compressor;
    this.#filter = filter;
  }

  store(fileName: string): boolean {
    this.#compressor.compress(fileName);
    this.#filter.apply(fileName);
    console.log(`Storing the image ${fileName} in Google Cloud`);
    return true;
  }
}
```

How to use the classes?

```ts
const imageStorage: ImageStorage = new S3ImageStorage(
  new JPEGCompressor(),
  new BlackAndWhiteFilter()
);
imageStorage.store("profile.png");

// or

const imageStorage = new GCPImageStorage(
  new WEBPCompressor(),
  new FullContrastFilter()
);
imageStorage.store("car.png");
```

Let's understand the detailed implementation of the `interface Filter`,

```ts
interface Filter {
  apply(fName: string): boolean;
}

class BlackAndWhiteFilter implements Filter {
  apply(fName: string): boolean {
    console.log("Setting b&w filter");
    return true;
  }
}

class FullBrightnessFilter implements Filter {
  apply(fName: string): boolean {
    console.log("Setting full brightness");
    return true;
  }
}

class FullContrastFilter implements Filter {
  apply(fName: string): boolean {
    console.log("Setting full contrast");
    return true;
  }
}
```

Similar way we should implement the `interface Compressor`,

```ts
interface Compressor {
  compress(fName: string): boolean;
}

class JPEGCompressor implements Compressor {
  compress(fName: string): boolean {
    console.log("Compressing into JPEG");
    return true;
  }
}

class PNGCompressor implements Compressor {
  compress(fName: string): boolean {
    console.log("Compressing into PNG");
    return true;
  }
}

class GIFCompressor implements Compressor {
  compress(fName: string): boolean {
    console.log("Compressing into GIF");
    return true;
  }
}

class WEBPCompressor implements Compressor {
  compress(fName: string): boolean {
    console.log("Compressing into WEBP");
    return true;
  }
}
```
