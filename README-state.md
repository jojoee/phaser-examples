# Note

- `-` : description
- `+` : used for
- `*` : note

# State List

- create
- init
- loadRender
- loadUpdate
- paused
- pauseUpdate
- preload
- preRender
- render
- resize
- resumed
- shutdown
- update

## State - Init

- init
  - very first (when your `State` starts up)
  + route
  + prepare `var`, `obj`
  + setup (e.g. tracking system, ads)

## State - Pause

- paused
  - core game loop is paused
  + display `Resume` modal

- pauseUpdate
  - called when game is paused (instead of `preUpdate`, `update`, `postUpdate`)
  + ????

- resumed
  - when the core game loop resumes from a paused state.
  + welcome modal

## State - Load

- preload
  - first
  + load assets (don't create obj that require any assets (we don't know when downloading process has been completed))
  * while 'preload' is running the game doesn't call the `update` or `render` functions,
  instead it calls 2 special functions (if they exist): loadUpdate and loadRender.

- loadUpdate
  - loadUpdate is called during the Loader process.
  This only happens if you've set one or more assets to load in the preload method.
  - called while assets are preloading (as the standard update function is not)
  + update progress bar
  * special-case function

- create
  - once `preload` has completed
  + setup code (`var`, `obj`, etc) that related with assets
  create obj that related with assets (create sprites, set sound)
  assign assets to your obj

## State - Render

- preRender
  - The preRender method is called after all Game Objects have been updated,
  but before any rendering takes place.
  + ????

- render
  - Nearly all display objects in Phaser render automatically,
  you don't need to tell them to render.
  However the render method is called AFTER the game renderer and plugins have rendered,
  so you're able to do any final post-processing style effects here. Note that this happens before plugins postRender   takes place.
  + for `debug`

- loadRender
  - loadRender is called during the Loader process.
  This only happens if you've set one or more assets to load in the preload method.
  The difference between loadRender and render is that any objects you render in this method you must be sure their assets exist.
  + ????
  * optional special-case function

## State - Update

- update
  - called every frame (desktop ~60fps)
  - during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
  - If is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
  + game loop
  * heart of your game really

## State - Others

- resize
  - If your game is set to Scalemode RESIZE
  then each time the browser resizes it will call this function,
  passing in the new width and height.
  + set screen
  * should not used (hard to design)

- shutdown
  - This method will be called when the State is shutdown (i.e. you switch to another state from this one).
  + ????

# Ref

- http://phaser.io/docs/2.4.4/Phaser.State.html
- http://www.html5gamedevs.com/topic/1372-phaser-function-order-reserved-names-and-special-uses/
