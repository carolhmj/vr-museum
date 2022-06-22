/**
 * The lobby is the starting room
 */
import Room from '../room.js';

export default class Lobby extends Room {
    createScene(engine, canvas) {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        //scene.clearColor = new BABYLON.Color4(0,0,0,0);
        scene.debugLayer.show({});

        const skyboxSize = 15;
        const environmentHelper = scene.createDefaultEnvironment({
            environmentTexture: "../../assets/textures/environments/old_room.env",
            skyboxTexture: "../../assets/textures/environments/old_room.env",
            groundTexture: "../../assets/textures/materials/planks.jpg",
            enableGroundMirror: false,
            groundMirrorAmount: 0.05,
            enableGroundShadow: true,
            skyboxSize: skyboxSize,
            groundSize: skyboxSize
        });
        environmentHelper.skybox.position.y += 2;
        environmentHelper.skyboxMaterial.primaryColor = new BABYLON.Color3(1,1,1);
        environmentHelper.groundMaterial.primaryColor = new BABYLON.Color3(1,1,1);

        
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, -5), scene);
        
        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(1, 1, 1), scene);
        
        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 1.0;
        
        const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
        
        scene.metadata = {
            environmentHelper: environmentHelper,
            shadowGenerator: shadowGenerator
        };

        return scene;
    }
};