/**
 * The Room manager initializes all of the Rooms,
 * connects them and manages which room is active
 * at the moment
 */
import Lobby from './room/lobby.js';
import Room1 from './room/room1.js';

class RoomManager {
    constructor(engine, canvas) {
        this.engine = engine;
        this.canvas = canvas;
        
        const lobby = new Lobby(engine, canvas);
        const room1 = new Room1(engine, canvas);

        lobby.addConnection(room1, new BABYLON.Vector3(5, 3, 5));

        this.activeRoom = lobby;
        this.start();
    }

    start() {

    }
}