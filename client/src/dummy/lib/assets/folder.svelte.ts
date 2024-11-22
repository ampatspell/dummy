import { Model, Subscribable } from '../firebase/fire/model.svelte';
import { Document, type UpdateCallback, update } from '../firebase/fire/document.svelte';
import * as fs from '@firebase/firestore';
import { serialized } from '../utils/object';
import { data, DocumentModelProperties } from '../utils/property.svelte';
import { getter } from '../utils/options';
import { FolderUploadModel } from './upload.svelte';
import { QueryAll } from '../firebase/fire/query.svelte';
import { MapModel, MapModels } from '../firebase/fire/models.svelte';
import { existing, isExisting } from '../utils/existing';
import type { SortDescriptor } from '../utils/array';
import { isLoaded } from '../firebase/fire/utils.svelte';
import type { HasSubscriber } from '../firebase/fire/subscriber.svelte';
import type { AssetsFileData, AssetsFolderData } from '$dummy-shared/documents';
import { assetsCollection } from './folders.svelte';
import { FileModel } from './file.svelte';

export type FolderBaseModelOptions = {
  doc: Document<AssetsFolderData>;
};

export class FolderBaseModel extends Subscribable<FolderBaseModelOptions> {
  readonly doc = $derived(this.options.doc);
  readonly id = $derived(this.doc.id!);
  readonly ref = $derived(this.doc.ref!);
  readonly path = $derived(this.doc.path!);
  readonly data = $derived(this.doc.data);
  readonly exists = $derived(this.doc.exists);

  readonly isLoaded = $derived(isLoaded([this.doc]));

  readonly name = $derived(this.data?.name);
  readonly numberOfFiles = $derived(this.data?.files);

  readonly dependencies: HasSubscriber[] = [this.doc];
  readonly serialized = $derived(serialized(this, ['id']));

  static documentForId(id: string) {
    return new Document<AssetsFolderData>({
      ref: fs.doc(assetsCollection, id),
    });
  }

  static buildById(id: string) {
    return new FolderModel({
      doc: FolderBaseModel.documentForId(id),
    });
  }
}

class FolderProperties extends DocumentModelProperties<AssetsFolderData> {
  readonly name = data(this, 'name');
}

export type FolderRuntimeModelOptions = {
  folder: FolderModel;
};

export class FolderRuntimeModel extends Model<FolderRuntimeModelOptions> {
  readonly folder = $derived(this.options.folder);

  private _selected = $state.raw<FileModel[]>([]);

  readonly selected = $derived(
    this._selected.filter((file) => {
      return isExisting(file) && this.folder.files.includes(file);
    }),
  );

  isMultiple = $derived(this.selected.length > 1);

  clear() {
    this._selected = [];
  }

  isSelected(file: FileModel) {
    return this.selected.includes(file);
  }

  select(files: FileModel[]) {
    this._selected = [...files];
  }

  selectAll() {
    this.select(this.folder.files);
  }
}

export class FolderModel extends FolderBaseModel {
  readonly _filesQuery = new QueryAll<AssetsFileData>({
    ref: getter(() => fs.collection(this.ref, 'files')),
  });

  readonly _files = new MapModels({
    source: getter(() => this._filesQuery.content),
    target: (doc) => new FileModel({ folder: this, doc }),
    sort: getter<SortDescriptor<FileModel>>(() => {
      return { value: (file) => file.position ?? Infinity, direction: 'asc' };
    }),
  });

  readonly files = $derived(this._files.sorted);
  readonly images = $derived(this.files.filter((file) => file.isImage));

  readonly properties = new FolderProperties({
    model: this,
  });

  readonly runtime = new FolderRuntimeModel({
    folder: this,
  });

  async save() {
    return await this.doc.save();
  }

  async delete() {
    await this.doc.delete();
  }

  update = (cb: UpdateCallback<AssetsFolderData>) => update(this.doc, cb);

  upload() {
    return new FolderUploadModel({
      folder: this,
    });
  }

  reorder(models: FileModel[]) {
    models.forEach((model, idx) => {
      if (model.position !== idx) {
        model.update((data) => (data.position = idx));
      }
    });
  }

  readonly isLoaded = $derived(isLoaded([this.doc, this._filesQuery]));
  readonly dependencies = [this.doc, this._filesQuery, this._files];
  readonly serialized = $derived(serialized(this, ['id']));

  async load() {
    await this.doc.load();
    await this._filesQuery.load();
    await this._files.load();
  }

  static buildNew({ data }: { data: AssetsFolderData }) {
    return new FolderModel({
      doc: new Document<AssetsFolderData>({
        ref: fs.doc(assetsCollection),
        data,
      }),
    });
  }

  static buildById(id: string) {
    return new FolderModel({
      doc: FolderBaseModel.documentForId(id),
    });
  }

  static async createNew() {
    const folder = FolderModel.buildNew({
      data: {
        name: 'Untitled',
        files: 0,
      },
    });
    await folder.save();
    return folder;
  }
}

export type FolderByIdModelOptions = {
  id: string | undefined;
};

export class FolderByIdModel extends Subscribable<FolderByIdModelOptions> {
  readonly id = $derived(this.options.id);

  readonly _model = new MapModel({
    source: getter(() => this.id),
    target: (id) => FolderModel.buildById(id),
  });

  readonly content = $derived(this._model.content);
  readonly existing = $derived(existing(this.content));
  readonly exists = $derived(this.content?.exists);

  readonly isLoaded = $derived(isLoaded([this.content]));
  readonly dependencies = [this._model];
  readonly serialized = $derived(serialized(this, ['id', 'exists', 'isLoaded']));

  async load() {
    await this._model.load(model => model.load());
  }
}
