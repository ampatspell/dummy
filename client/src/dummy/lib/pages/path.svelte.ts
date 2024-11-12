import * as fs from '@firebase/firestore';
import { Subscribable } from '../firebase/fire/model.svelte';
import { QueryFirst } from '../firebase/fire/query.svelte';
import { isTruthy } from '../utils/array';
import { getter } from '../utils/options';
import { PageModel } from './page.svelte';
import { pagesCollection } from './pages.svelte';
import { MapModel } from '../firebase/fire/models.svelte';
import type { PageData } from '$dummy-shared/documents';
import { isLoaded } from '../firebase/fire/utils.svelte';
import { serialized } from '../utils/object';

export const normalizePathBase = (path: string) => {
  return [
    '/',
    path
      .split('/')
      .filter(isTruthy)
      .map((component) => component.trim())
      .join('/'),
  ].join('');
};

const parsePathArgs = (path?: string) => {
  return (path ?? '').split('-').filter(isTruthy);
};

export const toPathArgs = (args: string[]) => {
  return args.filter(isTruthy).join('-');
};

export const urlForPath = (path: string, args?: string[]) => {
  if (args && args.length > 0) {
    return [path, toPathArgs(args)].join(':');
  } else {
    return path;
  }
};

export type PathWithArgs = {
  path: string;
  args: string[];
};

export const parsePath = (path?: string): PathWithArgs => {
  if (!path) {
    path = '';
  }
  if (!path.startsWith('/')) {
    path = `/${path}`;
  }
  const colon = path.lastIndexOf(':');
  if (colon !== -1) {
    return {
      path: normalizePathBase(path.substring(0, colon)),
      args: parsePathArgs(path.substring(colon + 1, path.length)),
    };
  }
  return {
    path: normalizePathBase(path),
    args: parsePathArgs(),
  };
};

export type PathModelOptions = {
  path: PathWithArgs | undefined;
};

export class PathModel extends Subscribable<PathModelOptions> {
  private readonly parsed = $derived(this.options.path);
  readonly path = $derived(this.parsed?.path);
  readonly args = $derived(this.parsed?.args);

  _query = new QueryFirst<PageData>({
    ref: getter(() => {
      const path = this.path;
      if (path) {
        return fs.query(pagesCollection, fs.where('path', '==', path));
      }
    }),
  });

  readonly doc = $derived(this._query.content);

  _page = new MapModel({
    source: getter(() => this.doc),
    target: (doc) => new PageModel({ doc }),
  });

  readonly page = $derived(this._page.content);

  readonly backendRoute = $derived(['/backend/pages', this.page?.id].filter(isTruthy).join('/'));

  readonly isLoaded = $derived(isLoaded([this._query, this.page, this.page?.settings]));
  readonly dependencies = [this._query, this._page];
  readonly serialized = $derived(serialized(this, ['path', 'args']));
}
