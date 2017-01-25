+ function($) {
  "use strict";

  // OFFCANVAS PUBLIC CLASS DEFINITION
  // =================================

  var EnkOffCanvas = function(element, target, options) {
    this.$element = $(element)
    this.$sidepanel = target
    this.options = $.extend({}, EnkOffCanvas.DEFAULTS, options)

    this.isOpen = false;
    this.activePanel = '';
  }

  EnkOffCanvas.DEFAULTS = {
    toggle: true,
    autohide: true,
  }

  EnkOffCanvas.prototype.toggle = function(panel) {

    var updateState = !this.isOpen;

    if (panel !== this.activePanel) {

      this.$sidepanel.children().addClass('enk-offcanvas-panel-hidden');
      this.$sidepanel.children().removeClass('enk-offcanvas-panel-visible');

      this.activePanel = panel;

      this.$sidepanel.children(this.activePanel).addClass('enk-offcanvas-panel-visible');

      updateState = true;
    }

    var changeState = this.isOpen != updateState;

    this.isOpen = updateState;

    // state change
    if (changeState) {
      this.$sidepanel.toggleClass("enk-offcanvas-collapsed");
      this.$element.toggleClass("col-lg-12 col-lg-9");
      this.$element.toggleClass("col-md-12 col-md-9");
      this.$element.toggleClass("col-xs-12 col-xs-9");
    }
  }

  // OFFCANVAS PLUGIN DEFINITION
  // ==========================

  var old = $.fn.enkoffcanvas

  $.fn.enkoffcanvas = function(option) {
    return this.each(function() {
      var $this = $(this)
      var data = $this.data('bs.enkoffcanvas')
      var options = $.extend({}, EnkOffCanvas.DEFAULTS, $this.data(), typeof option === 'object' && option)

      if (!data) $this.data('bs.enkoffcanvas', (data = new EnkOffCanvas(this, $(option.sidebar), options)))
      if (typeof option === 'string') data[option]()
    })
  }

  $.fn.enkoffcanvas.Constructor = EnkOffCanvas


  // OFFCANVAS NO CONFLICT
  // ====================

  $.fn.enkoffcanvas.noConflict = function() {
    $.fn.enkoffcanvas = old
    return this
  }

  // OFFCANVAS DATA-API
  // =================

  $(document).on('click.bs.enkoffcanvas.data-api', '[data-toggle=enkoffcanvas]', function(e) {
    var $this = $(this),
      href
    var target = $this.attr('data-content') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $canvas = $(target)
    var data = $canvas.data('bs.enkoffcanvas')
    var option = data ? 'toggle' : $this.data()

    e.preventDefault();
    e.stopPropagation()

    if (!data) {
      $canvas.enkoffcanvas(option)
      data = $canvas.data('bs.enkoffcanvas')
    }

    data.toggle($this.attr('data-panel'));
  })

}(window.jQuery);
