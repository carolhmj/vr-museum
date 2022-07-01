/**
 * The lobby is the starting room
 */
import Room from '../room.js';

export default class Lobby extends Room {
    createScene(engine, canvas) {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);
        scene.debugLayer.show({});

        const skyboxSize = 1000;
        const environmentHelper = scene.createDefaultEnvironment({
            environmentTexture: "./assets/textures/environments/old_room.env",
            skyboxTexture: "./assets/textures/environments/old_room.env",
            createGround: false
        });
        environmentHelper.skyboxMaterial.primaryColor = new BABYLON.Color3(1,1,1);
        
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: skyboxSize, height: skyboxSize}, scene);
        var groundMaterial = new BABYLON.PBRMaterial("groundMaterial", scene);
        ground.material = groundMaterial;
        groundMaterial.albedoTexture = new BABYLON.Texture("./assets/textures/materials/kitchen_wood_diff_2k.jpg", scene);
        groundMaterial.bumpTexture = new BABYLON.Texture("./assets/textures/materials/kitchen_wood_nor_gl_2k.png", scene);
        groundMaterial.metallicTexture = new BABYLON.Texture("./assets/textures/materials/kitchen_wood_rough_2k.png", scene);
        groundMaterial.albedoTexture.uScale = 100;
        groundMaterial.albedoTexture.vScale = 100;
        ground.receiveShadows = true;
        groundMaterial.roughness = 0.9;
        groundMaterial.metallic = 0.01;
        
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 1, 10), scene);
        camera.target = new BABYLON.Vector3(0, 1, 0);
        
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        const light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0.5, -1, -1), scene);
        light.intensity = 1.0;
        light.autoCalcShadowZBounds = true;

        var light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(0, 1, 0), scene);
        light2.intensity = 0.4;
        
        const shadowGenerator = new BABYLON.ShadowGenerator(512, light);

        BABYLON.SceneLoader.ImportMesh("", "./assets/meshes/", "lousa.glb", scene, (meshes) => {
            const root = meshes[0];
            const mesh = root.getChildren()[0];

            const lousaTransform = new BABYLON.TransformNode("lousaTransform");
            root.parent = lousaTransform;

            lousaTransform.position.z = 5;
            lousaTransform.position.x = 1;

            lousaTransform.rotation.y = BABYLON.Tools.ToRadians(-20);
            console.log('mehs', mesh);
            //shadowGenerator.addShadowCaster(mesh, true);
        });
        
        scene.metadata = {
            environmentHelper: environmentHelper,
            shadowGenerator: shadowGenerator
        };

        return scene;
    }
};