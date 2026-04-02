/**
 * CE.SDK Design Validation Editor - Initialization Module
 *
 * This module configures CE.SDK for design validation workflows:
 * - Design editor with standard creative capabilities
 * - Asset sources for images, text, shapes, and effects
 *
 * @see https://img.ly/docs/cesdk/js/getting-started/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import {
  BlurAssetSource,
  ColorPaletteAssetSource,
  CropPresetsAssetSource,
  DemoAssetSources,
  EffectsAssetSource,
  FiltersAssetSource,
  PagePresetsAssetSource,
  StickerAssetSource,
  TextAssetSource,
  TextComponentAssetSource,
  TypefaceAssetSource,
  UploadAssetSources,
  VectorShapeAssetSource
} from '@cesdk/cesdk-js/plugins';

import { DesignValidationEditorConfig } from './config/plugin';

// Re-export configuration plugin
export { DesignValidationEditorConfig } from './config/plugin';

// Re-export types
export { type BlockValidationResult, type ValidationState } from './types';

// Re-export validation functions
export {
  validateOutsideBlocks,
  validateProtrudingBlocks,
  validatePartiallyHiddenTexts,
  validateLowResolution
} from './validation';

/**
 * Initialize the CE.SDK Design Validation Editor.
 *
 * @param cesdk - The CreativeEditorSDK instance to configure
 */
export async function initDesignValidationEditor(
  cesdk: CreativeEditorSDK
): Promise<void> {
  // Configuration Plugin (handles features, UI, settings)
  await cesdk.addPlugin(new DesignValidationEditorConfig());

  // Navigation bar configuration
  cesdk.ui.setComponentOrder({ in: 'ly.img.navigation.bar' }, [
    'ly.img.undoRedo.navigationBar',
    'ly.img.pageResize.navigationBar',
    'ly.img.spacer',
    'ly.img.title.navigationBar',
    'ly.img.spacer',
    'ly.img.zoom.navigationBar',
    'ly.img.preview.navigationBar',
    {
      id: 'ly.img.actions.navigationBar',
      children: [
        'ly.img.exportImage.navigationBar',
        'ly.img.exportPDF.navigationBar'
      ]
    }
  ]);

  // Asset Source Plugins
  await cesdk.addPlugin(new ColorPaletteAssetSource());
  await cesdk.addPlugin(new TypefaceAssetSource());
  await cesdk.addPlugin(new TextAssetSource());
  await cesdk.addPlugin(new TextComponentAssetSource());
  await cesdk.addPlugin(new StickerAssetSource());
  await cesdk.addPlugin(new VectorShapeAssetSource());
  await cesdk.addPlugin(new FiltersAssetSource());
  await cesdk.addPlugin(new EffectsAssetSource());
  await cesdk.addPlugin(new BlurAssetSource());
  await cesdk.addPlugin(new CropPresetsAssetSource());
  await cesdk.addPlugin(new PagePresetsAssetSource());

  // Upload sources
  await cesdk.addPlugin(new UploadAssetSources());

  // Demo assets
  await cesdk.addPlugin(
    new DemoAssetSources({
      include: ['ly.img.image.*']
    })
  );

  // Load the scene
  await cesdk.loadFromURL(
    'https://img.ly/showcases/cesdk/cases/design-validation/example.scene'
  );
}
