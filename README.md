# enk
Enk jquery extensions

## offcanvas

```html
<button type="button" data-toggle="enkoffcanvas" data-content="#content"
		data-sidebar="#sidebar" data-panel="#p1">Panel 1
</button>
<button type="button" data-toggle="enkoffcanvas" data-content="#content"
		data-sidebar="#sidebar" data-panel="#p2">Panel 2
</button>

<div class="row enk-offcanvas-container" id="row-main">
	<div class="col-xs-12 col-md-12 enk-offcanvas-content" id="content"></div>
	<div class="col-xs-3 col-md-3 enk-offcanvas-sidebar enk-offcanvas-collapsed" id="sidebar">
		<div id="p1">p1</div>
		<div id="p2">p2</div>
		<div id="p3">p3</div>
	</div>
</div>
```
