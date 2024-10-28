import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { buildPathModel, urlForPath } from '$dummy/lib/pages/path.svelte';
import { createContext } from '$dummy/lib/utils/context';
import { getter, type OptionsInput } from '$dummy/lib/utils/options';

export type PathContextOptions = {
  path: string | undefined;
};

export class PathContext extends Model<PathContextOptions> {
  readonly model = $derived(
    buildPathModel({
      path: getter(() => this.options.path),
    }),
  );

  path = $derived(this.model.path);
  args = $derived(this.model.args);
  page = $derived(this.model.page);

  urlFor(path: string, args?: string[]) {
    return urlForPath(path, args);
  }

  urlForArgs(args?: string[]) {
    return this.urlFor(this.path, args);
  }
}

const { get: getPathContext, set: setPathContext } = createContext<PathContext>('path');

const createPathContext = (opts: OptionsInput<PathContextOptions>) => {
  return setPathContext(new PathContext(opts));
};

export { createPathContext, getPathContext };
