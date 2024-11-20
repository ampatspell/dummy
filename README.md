# dummy

## Create new site

```
$ mkdir amateurinmotion
$ cd amateurinmotion
$ npx sv create
```

```
* Folder: client
* SvelteKit minimal
* Yes, TypeScript
* prettier, eslint
* npm
```

```
Delete
* src/routes/+page.svelte,
* src/lib/index.ts
```

```
$ cd dummy/tools
$ npm run link -- ../../amateurinmotion --dry-run
```

…

## TODO

- [x] Upload throttle
- [x] Number of images in galleries
- [ ] Select single image in gallery prop
- [ ] Download image in backend
- [ ] Simpler page + layout runtime
- [x] Rename galleries as assets, support any files
- [x] Users list in settings, promote to admin
- [x] Don't use nulls in firestore
- [x] Default to `visitor` role for new users and set it in custom claims
- [ ] change page/layout definition sets defaults to undefined props
- [x] Separate test project id for dummy
- [ ] Remove `GalleryImageRuntimeModel` and `GalleryRuntimeModel`
- [ ] Update Lightbox and Grid for assets
