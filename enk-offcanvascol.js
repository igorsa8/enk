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

  var OffCanvas = function (element, target, options) {
      this.$element = $(element)
      this.$target = target
      this.options  = $.extend({}, OffCanvas.DEFAULTS, options)
  }

  OffCanvas.DEFAULTS = {
    toggle: true,
    placement: 'auto',
    autohide: true,
    recalc: true,
    disableScrolling: true,
    modal: false
  }
  
  OffCanvas.prototype.toggle = function () {
    console.log('toggle');
	
    this.$target.toggleClass("collapsed");	
	this.$element.toggleClass("col-md-12 col-md-9");
	
  }

  // OFFCANVAS PLUGIN DEFINITION
  // ==========================

  var old = $.fn.offcanvas

  $.fn.offcanvas = function (option) {
      return this.each(function () {
          var $this = $(this)
          var data = $this.data('bs.offcanvas')
          var options = $.extend({}, OffCanvas.DEFAULTS, $this.data(), typeof option === 'object' && option)

          if (!data) $this.data('bs.offcanvas', (data = new OffCanvas(this, $(option.source), options)))
          if (typeof option === 'string') data[option]()
      })
  }

  $.fn.offcanvas.Constructor = OffCanvas


  // OFFCANVAS NO CONFLICT
  // ====================

  $.fn.offcanvas.noConflict = function () {
    $.fn.offcanvas = old
    return this
  }

  // OFFCANVAS DATA-API
  // =================

  $(document).on('click.bs.offcanvas.data-api', '[data-toggle=offcanvas]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $canvas = $(target)
    var data    = $canvas.data('bs.offcanvas')
    var option  = data ? 'toggle' : $this.data()

    e.preventDefault();
    e.stopPropagation()

    //$canvas.toggle();

    if (data) data.toggle()
      else $canvas.offcanvas(option)
  })

}(window.jQuery);