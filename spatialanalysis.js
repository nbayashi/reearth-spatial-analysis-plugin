reearth.ui.show(
  `<style>
      body { 
        margin: 0;
      }
      #wrapper {
        background: #232226;
        min-height:60px;
        height: 100%;
        color: white;
        border: 3px dotted red;
        border-radius: 5px;
        padding: 10px 10px 10px;
      }
      #dist{
        width:80px;
      }
      button{
        margin-left:20px;
      }
      h2{
        margin:1px;
      }
      .btn-wrapper{
        margin-top:10px;
      }

      /*タブ切り替え全体のスタイル*/
      .tabs {
        margin-top: 50px;
        background-color: rgba(0,0,0,0);
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        margin: 0 auto;
        }

      /*タブのスタイル*/
      .tab_item {
        width:50px;
        height: 50px;
        background-color: #d9d9d9;
        margin:5px;
        border-radius: 2px;
        line-height: 50px;
        font-size: 16px;
        text-align: center;
        color: #565656;
        display: block;
        float: left;
        text-align: center;
        font-weight: bold;
        transition: all 0.2s ease;
      }
      .tab_item:hover {
        opacity: 0.75;
      }

      /*ラジオボタンを全て消す*/
      input[name="tab_item"] {
        display: none;
      }

      /*タブ切り替えの中身のスタイル*/
      .tab_content {
        display: none;
        padding: 20px;
        clear: both;
        overflow: hidden;
        background-color: rgba(0,0,0,0);
      }


      /*選択されているタブのコンテンツのみを表示*/
      #buffer:checked ~ #buffer_content,
      #ana_distance:checked ~ #ana_distance_content,
      #ana_convex:checked ~ #ana_convex_content {
        display: block;
      }

      /*選択されているタブのスタイルを変える*/
      .tabs input:checked + .tab_item {
        background-color: #5ab4bd;
      }
      img{
        position: relative;
        top: 50%;
        -webkit-transform: translateY(-50%); /* Safari用 */
        transform: translateY(-50%);
        }

      p {
        display: inline-block;
        width: 50px;
        margin: 5px 0px;
      }
      .bufferp, .convexp{
        width:100px;
        vertical-align: top; 
      }
  </style>
  
  <script src='https://unpkg.com/@turf/turf@6/turf.min.js'></script>  




  <div id="wrapper">
    <div class="tabs">
      <input id="buffer" type="radio" name="tab_item">
      <label class="tab_item anaBuffer" for="buffer" style="display: block;">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49" fill="none">
      <circle cx="24" cy="24" r="20.5" fill="#F3EF7C" stroke="#989B01"/>
      <circle cx="24" cy="24" r="6" fill="#F37C7C"/>
      </svg>
      
      
      
      </label>
      <input id="ana_distance" type="radio" name="tab_item">
      <label class="tab_item anaDistance" for="ana_distance">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
      <line x1="13.9393" y1="36.3784" x2="37.3784" y2="12.9393" stroke="#CAC43A" stroke-width="3"/>
      <circle cx="15" cy="35" r="4" fill="#F28A8A"/>
      <circle cx="36" cy="14" r="4" fill="#F28A8A"/>
      </svg>

      </label>
      <input id="ana_convex" type="radio" name="tab_item">
      <label class="tab_item anaConvex" for="ana_convex">
      
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
<path d="M37 17.6514V39.944L11.693 38.5636L17.2503 8.92479L37 17.6514Z" fill="#F5F1C9" stroke="#CAC43A" stroke-width="2"/>
<circle cx="11" cy="39" r="4" fill="#F28A8A"/>
<circle cx="17" cy="8" r="4" fill="#F28A8A"/>
<circle cx="36" cy="18" r="4" fill="#F28A8A"/>
<circle cx="36" cy="39" r="4" fill="#F28A8A"/>
</svg>
      
      
      </label>


      <!-- Buffer -->
      <div class="tab_content" id="buffer_content">
        <div class="tab_content_description">
          <div>
          <h2>Buffer</h2>
            <p class="bufferp">Input Layer : </p>
            <select name="lyrlist" class="lyrlist" id= "inputlayer_buffer" size="4" multiple>
            </select>
          </div>
          <p class="bufferp">Distance : </p>
          <input type="number" id="dist">
          <span>m</span>
          <p class="bufferp">Dissolve : </p>
          <input type="checkbox" id="buffer_dissolve">
          <div class="btn-wrapper">
            <button onclick="runBuffer()">
              Run
            </button>
            <button onclick="closeTabContents()">
              Close
            </button>
          </div>
        </div>
      </div>

      <!-- Distance -->
      <div class="tab_content" id="ana_distance_content">
        <div class="tab_content_description">
            <h2>Distance</h2>
            <div>
                <span>
                    <p>From</p> :
                </span>
                <select name="lyrlist" class="lyrlist" id="input_from_distance">
                </select>
            </div>
            <span>
                <p>To</p> :
            </span>
            <select name="lyrlist" class="lyrlist" id="input_to_distance">
            </select>
            <h4 id ="output_distance"></h4>
            <div class="btn-wrapper">
                <button onclick="runDistance()">
                    Run
                </button>
                <button onclick="closeTabContents()">
                    Close
                </button>
            </div>
        </div>
      </div>

      
      <!-- CONVEX -->
      <div class="tab_content" id="ana_convex_content">
        <div class="tab_content_description">
          <div>
            <h2>Convex</h2>
            <p class="convexp">Input Layer : </p>
            <select name="lyrlist" class="lyrlist" id= "inputlayer_convex" size="8" multiple>
            </select>
          </div>
          
          <div class="btn-wrapper">
            <button onclick="runConvex()">
              Run
            </button>
            <button onclick="closeTabContents()">
              Close
            </button>
          </div>
        </div>
      </div>



    </div>
  </div>


  <script>


  window.addEventListener("message", e => {
    if (e.source !== parent) return;
    reearth = e.source.reearth;
    property = e.data.property;
    l = e.source.reearth.layers.layers;

    // select widget
    if(property.default.anaBuffer == false){
      document.getElementsByClassName('anaBuffer')[0].style.display = "none";
    }else{
      document.getElementsByClassName('anaBuffer')[0].style.display = "block";
    }
    // select distance
    if(property.default.anaDistance == false){
      document.getElementsByClassName('anaDistance')[0].style.display = "none";
    }else{
      document.getElementsByClassName('anaDistance')[0].style.display = "block";
    }
    // select distance
    if(property.default.anaConvex == false){
      document.getElementsByClassName('anaConvex')[0].style.display = "none";
    }else{
      document.getElementsByClassName('anaConvex')[0].style.display = "block";
    }


    // Make layer list
    var layers= l.filter(function(l) {
    return l.type != 'resource';
    });

    var lyr_list = document.getElementsByClassName('lyrlist');
    

    for(let j = 0; j < lyr_list.length; j++){
      clearSelect(lyr_list[j]);
      for (let i=0; i < layers.length; i++){
        if (layers[i].isVisible){
          addlist(layers[i],lyr_list[j]);
        }
      }
    }




    function addlist(layer,selecter){
      //option要素を新しく作る
      const option1 = document.createElement('option');

      //option要素にvalueと表示名を設定
      option1.value = layer.id;
      option1.textContent = layer.title;

      //select要素にoption要素を追加する
      selecter.appendChild(option1);
    }

  })

    // clear select
    function clearSelect(x){
      if (x.hasChildNodes()) {
        while (x.childNodes.length > 0) {
          x.removeChild(x.firstChild)
        }
      }
    }


  //// button
  //run buffer
  function runBuffer(){
    let input_buffer = document.getElementById('inputlayer_buffer');
    let selected_value = input_buffer.selectedOptions;
    let arraybuffers = [];
 
    // crreate buffer polygon
    for (let i = 0 ; i < selected_value.length ; i++){
      let selected_lyr = reearth.layers.findById(selected_value[i].value);
      let location = selected_lyr.property.default.location;
      let point = turf.point([location.lng, location.lat]);
      let distance = document.getElementById('dist').value;
      let buffered = turf.buffer(point, (distance)*0.001, {units: 'kilometers'});

      arraybuffers.push(buffered);
    }
    // create featureCollection
    let collection = turf.featureCollection(arraybuffers);

    // dissolve polygons
    if (document.getElementById('buffer_dissolve').checked === true){
      var output_buffer = turf.dissolve(collection, {propertyName: 'dissolved'});
    }else{
      var output_buffer = collection;
    }
    parent.postMessage({output_buffer}, "*");
  };


  //run distance
  function runDistance(){
    let input_from = document.getElementById('input_from_distance');
    let input_to = document.getElementById('input_to_distance');

    let lyr_from = reearth.layers.findById(input_from.value);
    let lyr_to = reearth.layers.findById(input_to.value);

    let location_from = lyr_from.property.default.location;
    let location_to = lyr_to.property.default.location;

    let point_from = turf.point([location_from.lng, location_from.lat]);
    let point_to = turf.point([location_to.lng, location_to.lat]);

    let output_distance = turf.distance(point_from, point_to, {units: 'meters'});
    document.getElementById('output_distance').innerHTML = "Distance : "+ turf.round(output_distance,3) +" m";

    let distance_line = turf.lineString([[location_from.lng,  location_from.lat], [location_to.lng, location_to.lat]], {name: 'line 2'});

    parent.postMessage({distance_line}, "*");

  };





  //run convex
  function runConvex(){
    let input_convex = document.getElementById('inputlayer_convex');
    let selected_value = input_convex.selectedOptions;
    let array_points = [];
 
    // crreate buffer polygon
    for (let i = 0 ; i < selected_value.length ; i++){
      let selected_lyr = reearth.layers.findById(selected_value[i].value);
      let location = selected_lyr.property.default.location;
      let point = turf.point([location.lng, location.lat]);
      array_points.push(point);
    }
    // create featureCollection
    let convex_polygon = turf.convex(turf.featureCollection(array_points));

    parent.postMessage({convex_polygon}, "*");
  };




  // close button
  function closeTabContents() {
    let close = document.getElementsByName('tab_item');
    for(var i = 0; i < close.length; i++) {
      close[i].checked = false ;
    }
  };




</script>

  `
  , { visible: true });




function renderingFile(tag, url, type) {
  // show rectangle
  let outputtag = tag;
  let outputlyr = reearth.layers.findByTagLabels(outputtag);
  let files = outputlyr.find((v) => v.type === "resource");
  if (files) {
    // refresh
    reearth.layers.overrideProperty(files.id, {
      default: {
        url: [],
        type: type
      }
    });
    // rendering
    reearth.layers.overrideProperty(files.id, {
      default: {
        url: url,
        type: type
      }
    });
  }
}

function send() {
  reearth.ui.postMessage({
    property: reearth.widget.property,
    layers: reearth.layers.layers
  });
}

reearth.on("update", send);
send();

reearth.on("message", msg => {
  if (msg.output_buffer) {
    renderingFile(reearth.widget.property.default.bufferfiletag, msg.output_buffer, "geojson");
  } else if (msg.distance_line) {
    renderingFile(reearth.widget.property.default.distancefiletag, msg.distance_line, "geojson");
  } else if (msg.convex_polygon) {
    renderingFile(reearth.widget.property.default.convexfiletag, msg.convex_polygon, "geojson");
  }
});