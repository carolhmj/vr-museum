# vr-museum
VR experience utilizing Babylon.js

Asset credits:
* https://sketchfab.com/3d-models/stone-arch-aefd167806504fb3aa1ec34288d73575
* https://polyhaven.com/
* https://thebasemesh.com/
* https://sketchfab.com/3d-models/stone-pillar-4b74c340d1bf47ccad35b57deb78b58a

# Adding a room

Adding a new room to the museum can be accomplished by creating a new class that extends from `Room`, and overriding the `createScene` method:

```
import Room from '../room.js';

export default class Room1 extends Room {
    createScene(engine, canvas) {
        var scene = new BABYLON.Scene(engine);

        // YOUR SCENE CODE...
        
        return scene;
    }
}
```

To connect it to the museum rooms, create a new instance of the room in `RoomManager` and add the connections with `addConnection`. For creation, the first argument is the Babylon.js engine, the second is the rendering canvas, the third is the RoomManager itself and the fourth is the room name. For adding connections, the first argument is the room to connect to, and the second argument is the position of the door that connects between them:

```
export default class RoomManager {
    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
        
        const lobby = new Lobby(engine, canvas, this, 'Lobby');
        const room1 = new Room1(engine, canvas, this, 'Test Room');

        lobby.addConnection(room1, new BABYLON.Vector3(0, 0, 1));

        this.activeRoom = lobby;
    }
...

```