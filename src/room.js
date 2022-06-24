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

    render() {
        this.scene.render();
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
                // if (this.boundingMesh.intersectsMesh(portalMesh)) {
                if (portalMesh.intersectsPoint(this.scene.activeCamera.position)) {
                    // Change active scene
                    console.log('change active scene');
                    this.roomManager.setActiveRoom(portalMesh.metadata.connectedRoom);
                }
            }
        });
    }

    /**
     * Add a portal between two scenes, making it that when the camera approaches
     * the portal, it is transported to the connection point.
     * I'm just reimporting the portal mesh every time we want to add a connection,
     * but this isn't the most efficient approach.
     * @param {*} connectedRoom the room that is connected to it
     * @param {*} position the position of the portal in the current room
     */
    addConnection(connectedRoom, position) {
        //const portalMesh = BABYLON.MeshBuilder.CreateBox("portal", {width: 3, height: 4, depth: 1}, this.scene);
        
        BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/", "door_03.obj", this.scene, (meshes) => {
            const portalMesh = meshes[0];
            portalMesh.position = position;
            
            const portalMaterial = new BABYLON.PBRMaterial("portalMaterial", this.scene);
            portalMaterial.albedoTexture = new BABYLON.Texture("../../assets/textures/materials/wood_cabinet_worn_long_diff_2k.jpg", this.scene);
            portalMaterial.bumpTexture = new BABYLON.Texture("../../assets/textures/materials/wood_cabinet_worn_long_nor_gl_2k.png", this.scene);
            portalMaterial.metallicTexture = new BABYLON.Texture("../../assets/textures/materials/wood_cabinet_worn_long_rough_2k.png", this.scene);
            portalMesh.material = portalMaterial;
            portalMesh.material.roughness = 0.95;
            portalMesh.material.metallic = 0.01;
            
            portalMesh.metadata = {connectedRoom};
            this.portalMeshes.push(portalMesh);

            if (this.scene.metadata?.shadowGenerator) {
                this.scene.metadata.shadowGenerator.addShadowCaster(portalMesh);
            }
        });
    }
}