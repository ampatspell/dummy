import { Deferred } from './promise';

export const preloadImage = (src: string, opts?: { anonymous?: boolean }) => {
  const deferred = new Deferred<HTMLImageElement>();

  const image = new Image();
  if(opts?.anonymous) {
    image.crossOrigin = "Anonymous";
  }

  const onload = () => {
    deferred.resolve(image);
    cancel();
  };

  const onerror = () => {
    deferred.reject(new Error('Failed to load an image'));
    cancel();
  };

  const listen = () => {
    image.addEventListener('load', onload);
    image.addEventListener('error', onerror);
    return () => {
      image.removeEventListener('load', onload);
      image.removeEventListener('error', onerror);
    };
  };

  const cancel = listen();
  image.src = src;

  return deferred.promise;
};

export const preloadImages = async (src: string[], opts?: { anonymous?: boolean }) => {
  return await Promise.all(src.map((src) => preloadImage(src, opts)));
};
