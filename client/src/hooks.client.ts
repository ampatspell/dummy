import { createPageDefinitions } from '$dummy/lib/pages/definition/definition.svelte';
import { themePageDefinitions } from '$lib/pages/definition.svelte';

createPageDefinitions(themePageDefinitions());
