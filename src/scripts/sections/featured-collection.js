/**
 * Section: Featured collection
 * ------------------------------------------------------------------------------
 * Featured collection configuration for complete theme support
 * - https://github.com/Shopify/theme-scripts/tree/master/packages/theme-sections
 *
 * @namespace featuredCollection
 */
import {register} from '@shopify/theme-sections';

/**
 * Featured collection constructor
 * Executes on page load as well as Theme Editor `section:load` events.
 *
 * @param {string} container - selector for the section container DOM element
 */
register('featured-collection', {

  init() {
    window.console.log('Initialising featured collection section');

    let x = document.querySelectorAll(".carousel-cell"), i = 0;
    for (i = 0; i < x.length; i++) {
      x[i].addEventListener("mouseover", function($e) {
        // console.log($e.currentTarget);
        $e.currentTarget.querySelector(".add-to-cart").style.opacity = 1;
      });


      x[i].addEventListener("mouseout", function($e) {
        // console.log($e.currentTarget);
        $e.currentTarget.querySelector(".add-to-cart").style.opacity = 0;
      });
    }

    this.politeLoad([
        "https://unpkg.com/flickity@2/dist/flickity.min.css",
        "https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"
      ],

      function() {
        console.log(":: LOADER - all initial loads complete ::");
        // this.startFlickity();
        let elem = document.querySelector('.main-carousel');
        let flkty = new Flickity( elem, {
          // options
          cellAlign: 'left',
          contain: true,
          wrapAround: true,
          groupCells: true
        });
       }
    );
  },

  loadScript($url, $callback) {
    console.log(String(":: LOADER - loading " + $url + " ::"));

    let filetype = $url.split('.').pop();

    switch (filetype) {
        case "js":
            let script  = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {  //IE
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        console.log(String(":: LOADER - successfully loaded " + $url + " ::"));
                        $callback();
                    }
                };
            } else {  //Others
                script.onload = function() { 
                    $callback(); 
                    console.log(String(":: LOADER - successfully loaded " + $url + " ::"));
                };
	
				script.onerror = function() {
					console.error(String(":: LOADER ERROR - failed to load " + $url + " ::"));
				}
            }

            script.src = $url;
            document.getElementsByTagName("head")[0].appendChild(script);
            break;

        case "css":
            let extCSS = document.createElement("link");
            extCSS.setAttribute("rel", "stylesheet");
            extCSS.setAttribute("type", "text/css");
            extCSS.setAttribute("href", $url); 
            document.getElementsByTagName("head")[0].appendChild(extCSS);
            console.log(String(":: LOADER - successfully loaded " + $url + " ::"));
            $callback();
            break;
    }
  },

  politeLoad($urls, $onComplete) {
    let l = $urls.length, loaded = 0, checkProgress = function() { if (++loaded === l && $onComplete) $onComplete(); }, i, varType;

    for (i = 0; i < l; i++) {					
        varType = typeof $urls[i];

        switch (varType) {
            case "string":					
                this.loadScript($urls[i], checkProgress); //Using the Enabler script loader to politely load the javascript
                break;
        }
    }
  },

  // startFlickity() {
  //   console.log("start flickity");
  // },

  publicMethod() {
    // Custom public section method
  },

  _privateMethod() {
    // Custom private section method
  },

  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad() {
    // Do something when a section instance is loaded
    this.init();
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload() {
    // Do something when a section instance is unloaded
  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect() {
    // Do something when a section instance is selected
  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect() {
    // Do something when a section block is selected
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect() {
    // Do something when a section block is deselected
  },
});
