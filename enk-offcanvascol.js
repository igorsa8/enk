/* USAGE

<button type="button" data-toggle="offcanvas" data-target="#contentX" data-source="#sidebarX" data-canvas="body">
        Open/Close
    </button>

    <div class="row" id="row-main">
        <div class="col-md-12" id="contentX">
        </div>
        <div class="col-md-3 collapsed" id="sidebarX">
        </div>
    </div>
*/

/* CSS
<style>
        #row-main {
            overflow-x: hidden;
        }

        #contentX {
            transition: width 0.3s ease;
        }
        
        #sidebarX {
            background: blue;
            transition: margin 0.3s ease;
       }

        .collapsed {
            margin-right: -25%;
        }

</style>
*/


+function ($) {
    "use strict";

  // OFFCANVAS PUBLIC CLASS DEFINITION
  // =================================

  var EnkOffCanvas = function (element, target, options) {
      this.$element = $(element)
      this.$target = target
      this.options  = $.extend({}, EnkOffCanvas.DEFAULTS, options)
  }

  EnkOffCanvas.DEFAULTS = {
    toggle: true,
    autohide: true,
  }
  
  EnkOffCanvas.prototype.toggle = function () {
    console.log('toggle');
	
	this.$target.toggleClass("collapsed");	
	this.$element.toggleClass("col-md-12 col-md-9");
  }

  // OFFCANVAS PLUGIN DEFINITION
  // ==========================

  var old = $.fn.enkoffcanvas

  $.fn.enkoffcanvas = function (option) {
      return this.each(function () {
          var $this = $(this)
          var data = $this.data('bs.enkoffcanvas')
          var options = $.extend({}, EnkOffCanvas.DEFAULTS, $this.data(), typeof option === 'object' && option)

          if (!data) $this.data('bs.enkoffcanvas', (data = new EnkOffCanvas(this, $(option.source), options)))
          if (typeof option === 'string') data[option]()
      })
  }

  $.fn.enkoffcanvas.Constructor = EnkOffCanvas


  // OFFCANVAS NO CONFLICT
  // ====================

  $.fn.enkoffcanvas.noConflict = function () {
    $.fn.enkoffcanvas = old
    return this
  }

  // OFFCANVAS DATA-API
  // =================

  $(document).on('click.bs.enkoffcanvas.data-api', '[data-toggle=enkoffcanvas]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $canvas = $(target)
    var data    = $canvas.data('bs.enkoffcanvas')
    var option  = data ? 'toggle' : $this.data()

    e.preventDefault();
    e.stopPropagation()

    if (!data) {
	    $canvas.enkoffcanvas(option)
	    data = $canvas.data('bs.enkoffcanvas')
    }
    data.toggle()
  })

}(window.jQuery);
