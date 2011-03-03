/**
 * @file
 * JS Implementation of OpenLayers behavior.
 */

(function($) {
  
/**
 * geojump Behavior
 */
Drupal.behaviors.openlayers_behavior_geojump = {
  'attach': function(context, settings) {
    var data = $(context).data('openlayers');
    
    if (data && data.map.behaviors['openlayers_behavior_geojump']) {
      
      jump_text = '                                                ' + data.map.behaviors['openlayers_behavior_geojump']['jumptext'];
      
      $(data.openlayers.div).before("<div class='geojump-container'><input class='geojump-text' type='text' value='" + jump_text + "'></input></div>");

      $('input.geojump-text').focus(function(event) {
        $('input.geojump-text').val('').css('color','black');
      });
      
      $('input.geojump-text').keydown(function(event) {
        // Trigger on enter or tab
        if (event.keyCode == 13 || event.keyCode == 9) {
          $.ajax({
            type: 'GET',
            url: Drupal.settings.basePath + 'geojump',
            data: 'query=' + $('input.geojump-text').val(),
            dataType: 'json',
            success: function(result){
              // If it's an area, zoom to that area
       	    var projection = new OpenLayers.Projection(data.openlayers.baseLayer.projection.getCode());
            var displayProjection = new OpenLayers.Projection(data.openlayers.displayProjection.getCode());
            var bounds = new OpenLayers.Bounds(result.box.west, result.box.south, result.box.east, result.box.north).transform(displayProjection, projection);
                
              data.openlayers.zoomToExtent(bounds);
           }
         });
        }
      });
    }
  }
};
})(jQuery);
