/**
 * The Room class represents a room in the museum. It is intended to provide
 * a common interface for communication between rooms
 */

export default class Room {
    constructor(engine, canvas, roomManager) {
        this.engine = engine; // Rendering engine
        this.canvas = canvas; // Rendering canvas
        this.roomManager = roomManager; 
        this.scene = this.createScene(this.engine, this.canvas);
        
        this.portalMeshes = []; 

        this.prepareCameraIntersectionMesh();
        this.preparePortalChecks();
    }

    prepareCameraIntersectionMesh() {
        // Get scene's active camera
        const activeCam = this.scene.activeCamera;

        // Create the invisible box that will be used to check for intersections
        const boundingMesh = BABYLON.MeshBuilder.CreateBox("boundingMesh", {width: 1, height: 3, depth: 1}, this.scene);
        this.boundingMesh = boundingMesh;

        // Set the bounding mesh as the camera's child
        boundingMesh.parent = activeCam;
    }

    preparePortalChecks() {
        this.scene.onBeforeRenderObservable.add(() => {
            for (let portalMesh of this.portalMeshes) {
                if (this.boundingMesh.intersectsMesh(portalMesh)) {
                    // Change active scene
                    this.roomManager.setActiveScene(portalMesh.metadata.connectedRoom);
                }
            }
        });
    }

    /**
     * Add a portal between two scenes, making it that when the camera approaches
     * the portal, it is transported to the connection point
     * @param {*} connectedRoom the room that is connected to it
     * @param {*} position the position of the portal in the current room
     */
    addConnection(connectedRoom, position) {
        const portalMesh = BABYLON.MeshBuilder.CreateBox("portal", {width: 3, height: 4, depth: 1}, this.scene);
        portalMesh.position = position;
        
        portalMesh.metadata.connectedRoom = connectedRoom;
        this.portalMeshes.push(portalMesh);
    }
}