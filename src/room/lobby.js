/**
 * The lobby is the starting room
 */
import Room from '../room.js';

export default class Lobby extends Room {
    createScene(engine, canvas) {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        scene.clearColor = new BABYLON.Color4(0,0,0,0);
        scene.debugLayer.show({});

        scene.createDefaultEnvironment({
            environmentTexture: "https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/textures/environments/chapel.env",
            skyboxTexture: "https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/textures/environments/chapel.env",
        });

        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 1.0;

        BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/", "floor.glb", scene, (meshes) => {
            const ground = meshes[1];

            const floorMaterial = new BABYLON.PBRMetallicRoughnessMaterial("floor");
            floorMaterial.baseTexture = new BABYLON.Texture("https://raw.githubusercontent.com/carolhmj/quick-demos/main/assets/textures/materials/weathered_brown_planks_1k/weathered_brown_planks_diff_1k.jpg")
            console.log(floorMaterial);

            ground.material = floorMaterial;
        });

        return scene;
    }
};