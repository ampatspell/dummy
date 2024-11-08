import { LayoutSettingsModel } from '$dummy/lib/layouts/layout.svelte';

export type DummyLayoutSettings = {
  title: string;
};

export class DummyLayoutSettingsModel extends LayoutSettingsModel<DummyLayoutSettings> {
  isLoaded = true;
}
