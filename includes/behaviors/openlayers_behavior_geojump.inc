<?php

/**
 * @file
 * Implementation of OpenLayers behavior.
 */

/**
 * Doowhop!
 */
class openlayers_behavior_geojump extends openlayers_behavior {
  /**
   * Provide initial values for options.
   */
  function options_init() {
    //TODO: Set-up options for text and other bits
    return array(
      'jumptext' => t('Search around my Address'),
    );
  }

  /**
   * Render.
   */
  function render(&$map) {
    drupal_add_js(drupal_get_path('module', 'geojump') .'/includes/behaviors/js/openlayers_behavior_geojump.js');
    drupal_add_css(drupal_get_path('module', 'geojump') .'/includes/behaviors/css/openlayers_behavior_geojump.css');
    return $this->options;
  }
}
