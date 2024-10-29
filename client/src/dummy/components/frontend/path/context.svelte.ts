import { Model } from '$dummy/lib/firebase/fire/model.svelte';
import { buildPathModel, urlForPath, type PathWithArgs } from '$dummy/lib/pages/path.svelte';
import { createContext } from '$dummy/lib/utils/context';
import { getter, type OptionsInput } from '$dummy/lib/utils/options';

export type PathContextOptions = {
  path: PathWithArgs | undefined;
};

export class PathContext extends Model<PathContextOptions> {
  readonly model = $derived(
    buildPathModel({
      path: getter(() => this.options.path),
    }),
  );

  path = $derived(this.options.path?.path);
  args = $derived(this.options.path?.args);

  page = $derived(this.model.page);

  urlFor(path: string, args?: string[]) {
    return urlForPath(path, args);
  }

  urlForArgs(args?: string[]) {
    const path = this.path;
    if(path) {
      return this.urlFor(path, args);
    }
  }
}

const { get: getPathContext, set: setPathContext } = createContext<PathContext>('path');

const createPathContext = (opts: OptionsInput<PathContextOptions>) => {
  return setPathContext(new PathContext(opts));
};

export { createPathContext, getPathContext };
