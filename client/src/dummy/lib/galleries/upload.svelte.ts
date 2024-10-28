import * as storage from 'firebase/storage';
import { Model } from '../firebase/fire/model.svelte';
import { firebase } from '../firebase/firebase.svelte';
import type { GalleryModel } from './gallery.svelte';
import { progress, sum } from '../utils/number';
import { removeObject } from '../utils/array';

export type GalleryUploadFileStatus = 'idle' | 'uploading' | 'uploaded' | 'error';

export type GalleryUploadFileModelOptions = {
  upload: GalleryUploadModel;
  file: File;
};

export class GalleryUploadFileModel {
  constructor(private options: GalleryUploadFileModelOptions) {}

  status = $state<GalleryUploadFileStatus>('idle');
  readonly name = $derived.by(() => this.options.file.name);

  total = $state(0);
  transferred = $state(0);

  readonly progress = $derived.by(() => progress(this.total, this.transferred));
  readonly data = $derived.by(() => this.options.file);
  readonly contentType = $derived.by(() => this.data.type);
  readonly size = $derived.by(() => this.data.size);
  readonly path = $derived.by(() => `${this.options.upload.path}/${this.data.name}`);
  readonly ref = $derived.by(() => storage.ref(firebase.storage, this.path));

  remove() {
    if (this.status === 'idle') {
      removeObject(this.options.upload.files, this);
    }
  }

  async onUpload() {
    if (this.status === 'uploading') {
      return;
    }

    const { ref, data, contentType } = this;

    const task = storage.uploadBytesResumable(ref, data, { contentType });

    this.status = 'uploading';

    const next = (snapshot: storage.UploadTaskSnapshot) => {
      this.total = snapshot.totalBytes;
      this.transferred = snapshot.bytesTransferred;
    };

    const error = (err: storage.StorageError) => {
      console.log(err);
      this.status = 'error';
    };

    const complete = () => {
      this.status = 'uploaded';
      cancel();
    };

    const cancel = task.on('state_changed', next, error, complete);

    await task;
  }
}

export type GalleryUploadModelOptions = {
  gallery: GalleryModel;
};

export class GalleryUploadModel extends Model<GalleryUploadModelOptions> {
  files = $state<GalleryUploadFileModel[]>([]);
  readonly primitive = $derived.by(() => this.files.map((model) => model.data));

  onFiles(files: File[]) {
    this.files = files.map((file) => new GalleryUploadFileModel({ file, upload: this }));
  }

  readonly isBusy = $derived.by(() => {
    return !!this.files.find((file) => file.status === 'uploading');
  });

  readonly total = $derived.by(() => sum(this.files, (file) => file.total));
  readonly transferred = $derived.by(() => sum(this.files, (file) => file.transferred));
  readonly progress = $derived.by(() => progress(this.total, this.transferred));

  readonly gallery = $derived(this.options.gallery);
  readonly path = $derived(this.gallery.path);

  async onUpload() {
    if (this.isBusy) {
      return;
    }
    await Promise.all(this.files.map((file) => file.onUpload()));
  }
}
