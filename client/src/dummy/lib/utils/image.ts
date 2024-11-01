import { Deferred } from './promise';

export const preloadImage = (src: string) => {
  const deferred = new Deferred<void>();

  const image = new Image();

  const onload = () => {
    deferred.resolve();
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
