/**
 * The Room manager initializes all of the Rooms,
 * connects them and manages which room is active
 * at the moment
 */
import Lobby from './room/lobby.js';
import Room1 from './room/room1.js';

export default class RoomManager {
    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
        
        const lobby = new Lobby(engine, canvas, this, 'Lobby');
        const room1 = new Room1(engine, canvas, this, 'Exp. Rodin');

        lobby.addConnection(room1, new BABYLON.Vector3(0, 0, 1));
        room1.addConnection(lobby, new BABYLON.Vector3(-2, 0, 1));

        lobby.setAsActiveRoom();
    }

    setActiveRoom(room) {
        this.activeRoom = room;
    }

    start() {
        this.engine.runRenderLoop(() => {
            this.activeRoom.render();
        })
    }
}