import '../App.css';

import React, { useState, useEffect } from 'react';

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Home() {

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        //Override styling for this individual page
        document.body.style.overflowY = 'hidden';
        document.body.style.backgroundColor = '#FFFFFF';
        document.getElementById('root').style.backgroundColor = '#FFFFFF';
        document.children[0].style.backgroundColor = '#FFFFFF';

        const renderer = new THREE.WebGLRenderer();
        const viewHeight = document.getElementById('App').clientHeight;
        const getStartedHeight = document.getElementById('GetStarted').clientHeight;
        const headerheight = document.getElementById('Header').clientHeight;

        var canvasHeight;
        var canvasWidth;

        if(window.innerWidth < 800){
            canvasHeight = viewHeight - getStartedHeight - headerheight;
            canvasWidth = window.innerWidth - getStartedHeight;
        } else if (window.innerWidth < 500) {
            canvasHeight = viewHeight - getStartedHeight - headerheight;
            canvasWidth = window.innerWidth;
        } else if (window.innerWidth < 300){
            canvasHeight = viewHeight - getStartedHeight - (headerheight * 2);
            canvasWidth = window.innerWidth;
        } else {
            canvasHeight = viewHeight - getStartedHeight - headerheight;
            canvasWidth = window.innerWidth - getStartedHeight - (headerheight*2);
        }

        renderer.setSize( canvasWidth, canvasHeight );
        console.log(window.innerWidth, window.innerHeight, getStartedHeight - headerheight)

        document.getElementById('GetStarted').parentNode.insertBefore(renderer.domElement, document.getElementById('GetStarted'));
        //document.getElementById('App').prepend( renderer.domElement );

        const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
        camera.position.set( 0, 0, 100 );
        camera.lookAt( 0, 0, 0 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableZoom = false;
        controls.enablePan = false;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color( '#FFF' );

        const lights = [];
        lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
        lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );

        lights[ 0 ].position.set( 0, 200, 0 );
        lights[ 1 ].position.set( 100, 200, 100 );
        lights[ 2 ].position.set( - 100, - 200, - 100 );

        scene.add( lights[ 0 ] );
        scene.add( lights[ 1 ] );
        scene.add( lights[ 2 ] );

        const geometry = new THREE.IcosahedronGeometry( 15 , 1 );

        const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff, transparent: true, opacity: 1, linewidth: 2 } );
        const meshMaterial = new THREE.MeshPhongMaterial( { color: '#e74c3c', emissive: '#c0392b', side: THREE.DoubleSide, flatShading: true, polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1} );

        const mesh = new THREE.Mesh( geometry, meshMaterial );
        var line = new THREE.LineSegments( geometry, lineMaterial );

        mesh.add( line );
        scene.add( mesh );

        renderer.render( scene, camera );
        var animate = function () {
            requestAnimationFrame( animate );
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.005;
            renderer.render( scene, camera );
          };
        animate();

    }, []);

    const handleClick = () => {
        window.location = '/new'
    }

    const handleHelp = () => {
        setModalOpen(!modalOpen);
    }

    return (
        <>
            <div className="App" id="App">
                <div className="Header" id="Header">
                    <h1 className="welcomeHeader">Text Lab</h1>
                </div>
                <div className="GetStarted" id="GetStarted">
                    <button className="secondaryButton" onClick={handleHelp}>HELP</button>
                    <button className="primaryButton" onClick={handleClick}>GET STARTED</button>
                </div>
            </div>
            {modalOpen &&
                <div className="backdrop">
                    <div className="content">
                        <div>
                            <p>
                                This tool will automatically analyse your text for toxicity using machine learning. 
                                It assesses for identity attacks, insults, obscenity, severe toxicity, sexual explicitness, threats, and toxicity.
                            </p>
                            <p>
                                Let the tool analyse single sentences at a time, or upload a csv document and have your text analysed in bulk.
                            </p>
                            <p>
                                Customise the confidence threshold of the tool to cater to your needs.
                            </p>
                        </div>
                        <button className="secondaryButton" onClick={handleHelp}>CLOSE</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Home;
